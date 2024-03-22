import { createContext, useContext, useState } from "react";
import { auth, googleProvider, realDatabase, messaging, storage } from "../Config/fierbase";
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
import { getToken } from "firebase/messaging";
import { getDownloadURL, uploadBytesResumable, uploadString } from 'firebase/storage'

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
  const [file, setfile] = useState()

  const [progress, setProgress] = useState({ startd: false, pc: 0 });
  const [msg, setMsg] = useState(null)
  const [error, setError] = useState("")

  const navigate = useNavigate();

  //upload promises

  // const uploadfileProgress = (file,subfolder,imageName,setProgress) => {
  //   const promises = new Promise((resolve,reject)=>{
  //     const storageRef = ref(storage,subfolder + "/"+imageName)
  //     const upload = uploadBytesResumable(storageRef,file)
  //     upload.on("state_changed",(snapshot)=>{
  //         const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
  //         setProgress(progress)
  //     },(error)=>{
  //         reject(error)
  //     },async ()=>{
  //         try{
  //             const url = await getDownloadURL(storageRef,)
  //             resolve(url)
  //         }catch(error){
  //             reject(error)
  //         }
  //     })
  //   })
  //   return promises
  // }

  // const upload = () => {
  //   const message2 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…GFGMVBb3AgEA5EVpbigFGZsjxQw1u25WCQad/irQVuM//2Q==';
  //   const storageRef = ref(storage, "Images")
  //   uploadString(storageRef, message2, 'base64').then((snapshot) => {
  //     console.log('Uploaded a base64 string!',snapshot);
  //   });
  // }

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
        requestPermission,
        error,
        file,
        setfile,
        // uploadfileProgress,
        // upload,
      }}
    >
      {props.children}
    </FierbaseContext.Provider>
  );
};
