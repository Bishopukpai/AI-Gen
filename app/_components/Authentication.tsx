"use client"
import { auth } from "@/configs/firebaseconfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React from 'react'
import { useRouter } from "next/navigation";

const Authentication: React.FC<{ children: React.ReactNode }> = ({ children })=> {
   const router = useRouter();  
   const provider = new GoogleAuthProvider();

    const onSignInClick = () => {
        signInWithPopup(auth, provider)
         .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential) {
              const token = credential.accessToken; 
            }
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
             router.push("/create-video-script");
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
  return (
   <div onClick={onSignInClick}>{children}</div>
  )
}

export default Authentication