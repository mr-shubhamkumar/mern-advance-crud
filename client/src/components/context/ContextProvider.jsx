import { createContext, useState } from "react";

export const addData = createContext();
export const updateData = createContext();
export const dltData = createContext();

function ContextProvider({ children }) {
  const [useradd, setUserAdd] = useState("");
  const [update, setUpdate] = useState("");
  const [deletedata, setDeleteData] = useState("");
  return (
    <>
      <addData.Provider value={{ useradd, setUserAdd }}>
        <updateData.Provider value={{ update, setUpdate }}>
          <dltData.Provider value={{ deletedata, setDeleteData }}>
            {children}
          </dltData.Provider>
        </updateData.Provider>
      </addData.Provider>
    </>
  );
}

export default ContextProvider;
