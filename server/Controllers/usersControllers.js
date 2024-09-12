const users = require("../models/usersSchema");
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");
// Load environment variables
require("dotenv").config();

// Access the environment variable
const BASE_URL = process.env.BASE_URL;

// register user
exports.userspost = async (req, res) => {
  const file = req.file.filename; //profile image
  const { fname, lname, email, gender, mobile, location, status } = req.body;

  if (
    !file ||
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !status ||
    !location
  ) {
    res.status(401).json("All Inputs is Required");
  }

  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      res.status(401).json("This user already exist in our data base !");
    } else {
      const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const userData = new users({
        fname,
        lname,
        email,
        mobile,
        gender,
        status,
        location,
        profile: file,
        datecreated,
      });
      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block error");
  }
};

// userget
exports.userget = async (req, res) => {
  const search = req.query.search || "";
  const gender = req.query.gender || "";
  const status = req.query.status || "";
  const sort = req.query.sort || "";
  const page = req.query.page || 1;
  const ITEM_PER_PAGE = 4;

  const query = {
    fname: { $regex: search, $options: "i" },
  };

  if (gender !== "All") {
    query.gender = gender;
  }
  if (status !== "All") {
    query.status = status;
  }

  try {
    const skip = (page - 1) * ITEM_PER_PAGE;

    const count = await users.countDocuments(query);
    // console.log(count);

    const userdata = await users
      .find(query)
      .sort({ datecreated: sort == "new" ? -1 : 1 })
      .limit(ITEM_PER_PAGE)
      .skip(skip);

    const pageCount = Math.ceil(count / ITEM_PER_PAGE);
    res.status(200).json({
      Pagination: {
        count,
        pageCount,
      },
      userdata,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};

// Get Single User Data
exports.singleUserGet = async (req, res) => {
  const { id } = req.params;

  try {
    const userdata = await users.findOne({ _id: id });
    res.status(200).json(userdata);
  } catch (error) {
    res.status(401).json(error);
  }
};

// update user single edit data api
exports.useredit = async (req, res) => {
  const { id } = req.params;
  const {
    fname,
    lname,
    email,
    gender,
    mobile,
    location,
    status,
    user_profile,
  } = req.body;
  const file = req.file ? req.file.filename : user_profile; //profile image
  const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  try {
    const updateuser = await users.findByIdAndUpdate(
      { _id: id },
      {
        fname,
        lname,
        email,
        mobile,
        gender,
        status,
        location,
        profile: file,
        datecreated,
      },
      {
        new: true,
      }
    );
    await updateuser.save();
    res.status(200).json(updateuser);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.userdelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteuser = await users.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteuser);
  } catch (error) {
    res.status(401).json(error);
  }
};

// change status
exports.userstatus = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const userstatusupdate = await users.findByIdAndUpdate(
      { _id: id },
      { status: data },
      { new: true }
    );
    userstatusupdate;
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.userExport = async (req, res) => {
  try {
    const usersdata = await users.find();

    const csvStream = csv.format({ headers: true });

    if (!fs.existsSync("public/files/export/")) {
      if (!fs.existsSync("public/files")) {
        fs.mkdirSync("public/files/");
      }
      if (!fs.existsSync("public/files/export")) {
        fs.mkdirSync("./public/files/export/");
      }
    }

    const writablestream = fs.createWriteStream(
      "public/files/export/users.csv"
    );

    csvStream.pipe(writablestream);

    writablestream.on("finish", function () {
      res.json({
        downloadUrl: `${BASE_URL}/files/export/users.csv`,
      });
    });
    if (usersdata.length > 0) {
      usersdata.map((user) => {
        csvStream.write({
          FirstName: user.fname ? user.fname : "-",
          LastName: user.lname ? user.lname : "-",
          Email: user.email ? user.email : "-",
          Phone: user.mobile ? user.mobile : "-",
          Gender: user.gender ? user.gender : "-",
          Status: user.status ? user.status : "-",
          Profile: user.profile ? user.profile : "-",
          Location: user.location ? user.location : "-",
          DateCreated: user.datecreated ? user.datecreated : "-",
        });
      });
    }
    csvStream.end();
    writablestream.end();
  } catch (error) {
    res.status(401).json(error);
  }
};
