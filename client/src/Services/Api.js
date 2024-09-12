import {commonrequest} from "./ApiCall";
import {BASE_URL} from "./Helper"



export const registerFunc = async(data,header)=> {
    return await commonrequest('POST',`${BASE_URL}/user/register`,data,header);
}




export const usergetfun = async (search, gender, status, sort,page) => {
    // Create a URLSearchParams object to build the query string
    const params = new URLSearchParams();

    if (search) params.append('search', search);
    if (gender) params.append('gender', gender);
    if (status) params.append('status', status);
    if (sort) params.append('sort', sort);
    if (page) params.append('page', page);

    // Construct the full URL with query parameters
    const url = `${BASE_URL}/user/details?${params.toString()}`;

    // Perform the HTTP request using the constructed URL
    return await commonrequest('GET', url, "");
}

export const singleUserGetFunc = async(id)=>{
    return await commonrequest('GET',`${BASE_URL}/user/${id}`,"")
}


export const editfunc = async(id,data,header)=> {
    return await commonrequest('PUT',`${BASE_URL}/user/edit/${id}`,data,header);
}

export const deletefunc = async(id)=>{
    return await commonrequest('DELETE',`${BASE_URL}/user/delete/${id}`,{})
}

export const statuschangefunc = async(id,data)=>{
    return await commonrequest('PUT',`${BASE_URL}/user/status/${id}`,{data})
}

export const exporttocsvfunc = async()=>{
    return await commonrequest('GET',`${BASE_URL}/userexport/`,'')
}

export default {
    registerFunc,
    usergetfun,
    singleUserGetFunc,
    editfunc,
    deletefunc,
    statuschangefunc
};