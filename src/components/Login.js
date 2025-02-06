import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { BG_URL, PHOTO_URL } from "../utils/constant.js";

const Login = () => {
  const [isSignInForm, setIsSingInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState();
  const dispatch = useDispatch()
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSingInForm(!isSignInForm);
  };

  //Validate form Data
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMsg(message);
    if (message) return;

    //SigIn and signUp logic
    if (!isSignInForm) {
      //This is my signUp Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:PHOTO_URL,
          })
            .then(async() => {
              await user.reload();
              const updateduser = auth.currentUser;
                      dispatch(
                        addUser({
                          uid: updateduser.uid,
                          email: updateduser.email,
                          displayName: updateduser.displayName,
                          photoURL: updateduser.photoURL,
                        })
                      );
            })
            .catch((error) => {
              setErrorMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //This is my signIn logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;


          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div className="relative w-full h-screen">
      <Header />
      <div className="absolute inset-0 -z-10">
        <img
          src={BG_URL}
          className="w-full h-full object-cover"
          alt="Background"
        />
      </div>

      <form
        className="w-3/12 flex flex-col absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="text-3xl py-4 ml-2 font-bold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="name"
            placeholder="Full Name"
            className="p-4 m-2 w-full bg-gray-700"
            ref={name}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 m-2 w-full bg-gray-700 "
          ref={email}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-4 m-2 w-full bg-gray-700"
          ref={password}
        />
        <p className="text-red-500 ml-2 font-bold text-lg pt-2">{errorMsg}</p>
        <button
          className="p-2 m-2 bg-red-700 text-white rounded w-full"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 ml-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? " New to Netflix? Sign Up Now"
            : "Already registered ? signIn Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
