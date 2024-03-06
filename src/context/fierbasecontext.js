import { createContext, useContext, useState } from "react";
import {
  auth,
  googleProvider,
  provider,
  realDatabase,
} from "../Config/fierbase";
import {
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { ref, set } from "firebase/database";
import { useNavigate } from "react-router";

export const FierbaseContext = createContext(null);
export const useFierbase = () => useContext(FierbaseContext);

export const FierbaseProvidr = (props) => {
  const [phoneloginuser, setPhoneLoginUser] = useState("");
  const navigate = useNavigate();

  //create user auth
  const signInWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //create user in db
  const putdat = (key, data) => set(ref(realDatabase, key), data);

  //signup with google
  const signupwithgoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //Phone login
  const phonelogin = (phone) => {
    const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
    signInWithPhoneNumber(auth, phone, recaptcha)
      .then((res) => {
        console.log(res, "this is res");
        setPhoneLoginUser(res);
        navigate("/auth");
      })
      .catch((err) => {
        console.log(err, "otp error");
      });
  };

  //veryfy OTP
  const veryfyotp = (phoneloginotp, otp) => {
    phoneloginotp
      .confirm(otp)
      .then((result) => {
        console.log(result);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  };

  //user State Logdin or Loged Out using
  //auth user changed
  const authuser = (setUser) => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  //signout
  const logoutuser = () => {
    return signOut(auth);
  };

  return (
    <FierbaseContext.Provider
      value={{
        phoneloginuser,
        setPhoneLoginUser,
        phonelogin,
        veryfyotp,
        signInWithEmailAndPassword,
        putdat,
        signupwithgoogle,
        authuser,
        logoutuser,
      }}
    >
      {props.children}
    </FierbaseContext.Provider>
  );
};
