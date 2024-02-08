import {RegisterFormData} from './pages/Register';
import {SignInFormData} from './pages/SignIn';

export const register = async (formData:RegisterFormData) =>{
    const response = await fetch('http://localhost:7000/api/users/register', {
        method: 'POST',
        credentials:"include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    return response.json()  
}

export const validateToken = async () =>{   
   const response = await fetch('http://localhost:7000/api/auth/validateToken',{
     credentials:"include", 

   });   
   
   if(!response.ok) {   
    throw new Error("Token is invalid.");   
   }

   return response.json();
}

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch("http://localhost:7000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };

  export const signOut = async () => {
    const response = await fetch("http://localhost:7000/api/auth/logout", {
      credentials: "include",
      method: "POST",
    });
  
    if (!response.ok) {
      throw new Error("Error during sign out");
    }
  };
  