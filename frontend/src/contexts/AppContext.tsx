import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import *  as apiClient from "../apiClient";

type ToastMessage = {
   message:string;
   type:"SUCCESS" | "ERROR" ;
}

type AppContext = {
   showToast: (toastMessage: ToastMessage) => void;
   isLogged:boolean;
}

const AppContext = React.createContext<AppContext | undefined>(undefined); 

export const AppContextProvider = ({children}:{children:React.ReactNode})=>{

   const [toast,setToast] = useState<ToastMessage | undefined>(undefined); 
   const {isError} = useQuery("validateToken",apiClient.validateToken,{retry:false});

   return (
      <AppContext.Provider value={{
         showToast:(toastMessage) =>   {
           setToast(toastMessage);
         },
         isLogged:!isError
      }}>
         {toast && <Toast message={toast.message} type={toast.type} onClose={()=>setToast(undefined)}></Toast >}
         {children}  
      </AppContext.Provider>
   );

};


export const useAppContext = () => {
   const context = useContext(AppContext);
   return context as AppContext; 
};

