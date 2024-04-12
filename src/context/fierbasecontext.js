import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, realDatabase, messaging } from "../Config/fierbase";
import {
  RecaptchaVerifier,
  onAuthStateChanged,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import { useReactMediaRecorder } from "react-media-recorder";

export const FierbaseContext = createContext(null);
export const useFierbase = () => useContext(FierbaseContext);

export const FierbaseProvidr = (props) => {
  //Phone login
  const [phoneloginuser, setPhoneLoginUser] = useState("");
  const [country, setCountry] = useState("in");
  const [dialcode, setDialcode] = useState("+91");
  const [ponewithdial, setPhonewithdial] = useState("");
  const [searchcont, setSearchcont] = useState("");
  //Auth user
  const [authuserdata, setauthuserdata] = useState("");
  const [multipleLandParcel, setMultipleLandParcel] = useState({})
  const [userId, setUserId] = useState("");
  const [errorMessageauth, sterrorMessageauth] = useState(null)
  //Imaghe Click
  const [imageurl, setImageUrl] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [recording, setRecording] = useState(false);
  const [Allprocess, setAllProcess] = useState(0)
  //snackbar event
  const [open, setOpen] = useState(false);
  //internet Conectivity
  const [internet, setinternet] = useState(true);
  //params for speeddial
  const [landparcelspeeddial, setLandparcelSpeeddial] = useState("")

  //media recorder
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  useEffect(() => {
    authuser();
  }, [authuserdata]);

  useEffect(() => {
    readdata("/users/");
  }, [authuserdata]);

  //Internet Status
  window.addEventListener('online', () => {
    setinternet(true)
  });
  window.addEventListener('offline', () => {
    setinternet(false)
  });

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
        setMultipleLandParcel(data[userId])
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

        console.log(user, "user loged in");
        setauthuserdata(user);
      } else {
        console.log("user Loged Out");
        setauthuserdata("");
      }
    });
  };

  //signup with google
  const signupwithgoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //Phone login
  const phonelogin = (phone) => {
    var recaptcha
    try {
      recaptcha = new RecaptchaVerifier(auth, "sign-in-button", {
        'size': 'invisible',
      });
    } catch (err) { console.log(err) }
    return signInWithPhoneNumber(auth, phone, recaptcha)
  };

  //resend otp
  const resendOTP = (phone) => {
    return signInWithPhoneNumber(auth, phone)
  }

  //veryfy OTP
  const veryfyotp = (otp) => {
    return phoneloginuser.confirm(otp)
  };

  //signout
  const logoutuser = () => {
    console.log(auth, "auth");
    return signOut(auth);
  };

  return (
    <FierbaseContext.Provider
      value={{
        multipleLandParcel,
        setMultipleLandParcel,
        Allprocess,
        setAllProcess,
        errorMessageauth,
        sterrorMessageauth,
        internet,
        setinternet,
        uploadProgress,
        setUploadProgress,
        phoneloginuser,
        setPhoneLoginUser,
        authuserdata,
        setauthuserdata,
        country,
        setCountry,
        searchcont,
        setSearchcont,
        dialcode,
        setDialcode,
        ponewithdial,
        setPhonewithdial,
        userId,
        setUserId,
        imageurl,
        setImageUrl,
        landparcelspeeddial,
        setLandparcelSpeeddial,
        open,
        setOpen,
        resendOTP,
        readdata,
        phonelogin,
        veryfyotp,
        Writedata,
        signupwithgoogle,
        authuser,
        logoutuser,
        status,
        recording,
        setRecording,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        requestPermission,
      }}
    >
      {props.children}
    </FierbaseContext.Provider>
  );
};
