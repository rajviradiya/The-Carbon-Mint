import { createContext, useContext, useState } from "react";
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
import { getToken } from "firebase/messaging";

export const FierbaseContext = createContext(null);
export const useFierbase = () => useContext(FierbaseContext);

export const FierbaseProvidr = (props) => {
  const [phoneloginuser, setPhoneLoginUser] = useState("");
  const [country, setCountry] = useState("in");
  const [dialcode, setDialcode] = useState("+91");
  const [ponewithdial, setPhonewithdial] = useState("");
  const [searchcont, setSearchcont] = useState("");
  
  const [authuserdata, setauthuserdata] = useState("");
  const [errorMessageauth,sterrorMessageauth] = useState(null)
  const [userdata, setUserdata] = useState({});
  const [userId, setUserId] = useState("");
  const [imageurl, setImageUrl] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [imageUrlArray,setImageUrlArray] = useState([])
  const [totalProgress, setTotalProgress] = useState([])
  const [recording, setRecording] = useState(false);
  //snackbar event
  const [open, setOpen] = useState(false);
  //Enternet Conectivity
  const [internet, setinternet] = useState(false);

  //media recorder
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  //Internet Status
  window.addEventListener('online', () => {
    setinternet(false)
  });
  window.addEventListener('offline', () => {
    setinternet(true)
  });

  // Uploading All Images
  const total = totalProgress.reduce((acc, cur) => {
    return acc + cur
  }, 0)

  const totalPossibleProgress = totalProgress.length * 100;
  const AllImageUpload = (total / totalPossibleProgress) * 100;

  console.log(uploadProgress, totalProgress, AllImageUpload,imageurl, "Upload")

  //permission request`
  async function requestPermission() {
    const permisssion = await Notification.requestPermission()
    if (permisssion === "granted") {
      //Generate Tocken
      const tocken = await getToken(messaging, {
        vapidKey: "BBXIMssjEa4pDGe5lWmY6uEbr5WFCZz3-NI_p26nzq2j2yZ_I6WoiCOxlLk_i9UCiCjdjycGlSG0bQwl07IJTXA"
      })
      console.log("tocken", tocken, "tockien is")
    } else if (permisssion === "denied") {
      alert("you Denied withnotificatin")
    }
  }

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
    const recaptcha = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
    });
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
        imageUrlArray,
        setImageUrlArray,
        errorMessageauth,
        sterrorMessageauth,
        totalProgress,
        setTotalProgress,
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
        userdata,
        setUserdata,
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
        AllImageUpload,
      }}
    >
      {props.children}
    </FierbaseContext.Provider>
  );
};
