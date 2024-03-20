import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, realDatabase } from "../Config/fierbase";
import {
  RecaptchaVerifier,
  onAuthStateChanged,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { child, get, onValue, push, ref, set } from "firebase/database";
import { useNavigate } from "react-router";
import { useReactMediaRecorder } from "react-media-recorder";

export const FierbaseContext = createContext(null);
export const useFierbase = () => useContext(FierbaseContext);

export const FierbaseProvidr = (props) => {
  const [authuserrrr, setauthuserrrr] = useState("");
  const [phoneloginuser, setPhoneLoginUser] = useState("");
  const [country, setCountry] = useState("in");
  const [dialcode, setDialcode] = useState("+91");
  const [searchcont, setSearchcont] = useState("");

  const [userdata, setUserdata] = useState({});
  const [userId, setUserId] = useState("");
  const [imageurl, setImageUrl] = useState([]);


  const [progress,setProgress] = useState({startd:false,pc:0});
  const [msg,setMsg] = useState(null)
  
  const navigate = useNavigate();

  //media recorder
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  //create user in db
  const Writedata = (key, data) => {
    return set(ref(realDatabase, key), data);
  };

  //read dataa
  const readdata = (key) => {
    if (!userId) {
      return
    }
    const starCountRef = ref(realDatabase, key);

    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserdata(data[userId]);
      } else {
        console.log("No data available");
      }
    })
  };

  //user State Logdin or Loged Out using
  //auth user changed
  const authuser = () => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        //use id for filter user
        setUserId(uid);

        //read data and if data not exists create data
        // get(child(ref(realDatabase), "/users/" + uid))
        //   .then((snapshot) => {
        //     if (!snapshot.exists()) {
        //       //create data
        //       Writedata("/users/" + uid, {
        //         phoneNumber: user.phoneNumber,
        //         email: user.email,
        //         displayName: user.displayName,
        //       });
        //       setUserdata(snapshot.val());
        //     } else {
        //       console.log("data available alrady");
        //     }
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });

        console.log(user, "useloged in");
        setauthuserrrr(user);
      } else {
        console.log("user Loged Out");
        setauthuserrrr("");
      }
    });
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
        userdata,
        userId,
        setUserId,
        imageurl,
        setImageUrl,
        setUserdata,
        readdata,
        phonelogin,
        veryfyotp,
        Writedata,
        signupwithgoogle,
        authuser,
        logoutuser,
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
      }}
    >
      {props.children}
    </FierbaseContext.Provider>
  );
};
