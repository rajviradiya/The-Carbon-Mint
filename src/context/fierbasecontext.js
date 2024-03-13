import { createContext, useContext, useState } from "react";
import {
  auth,
  googleProvider,
  realDatabase,
} from "../Config/fierbase";
import {
  RecaptchaVerifier,
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
  const [authuserrrr, setauthuserrrr] = useState("");
  const [phoneloginuser, setPhoneLoginUser] = useState("");
  const [country, setCountry] = useState("in");
  const [dialcode,setDialcode] = useState("+91");
  const [searchcont,setSearchcont ] = useState("")

  const navigate = useNavigate();

  //create user auth
  // const signInWithEmailAndPassword = (email, password) => {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // };

  //create user in db
  const Writedata = (key, data) => {
    return set(ref(realDatabase, key), data);
  };

  //signup with google
  const signupwithgoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //Phone login
  const phonelogin = (phone) => {
    const recaptcha = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
    });
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
  const veryfyotp = (otp) => {
    phoneloginuser
      .confirm(otp)
      .then((result) => {
        console.log(result, "respo ------------------>>>>>>");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  };

  //user State Logdin or Loged Out using
  //auth user changed
  const authuser = () => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setauthuserrrr(user);
      } else {
        setauthuserrrr("");
      }
    });
  };

  //signout
  const logoutuser = () => {
    console.log(auth, "auth");
    return signOut(auth);
  };

  return (
    <FierbaseContext.Provider
      value={{
        phoneloginuser,
        setPhoneLoginUser,
        authuserrrr,
        setauthuserrrr,
        country,
        setCountry,
        searchcont,
        setSearchcont,
        dialcode,
        setDialcode,
        phonelogin,
        veryfyotp,
        Writedata,
        signupwithgoogle,
        authuser,
        logoutuser,
      }}
    >
      {props.children}
    </FierbaseContext.Provider>
  );
};
