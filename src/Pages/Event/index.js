import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./Event.css";
import CloaseNav from "./components/CloaseNav";
import Camera from "./components/Camera";
import AudioRecord from "./components/AudioRecord";
import ButtonComp from "../../Components/ButtonComp";
import { useFierbase } from "../../context/fierbasecontext";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from "../../Config/fierbase";

const Index = () => {
  const [description, setDescription] = useState("")

  let id = uuid()
  const firebase = useFierbase()
  const currentDate = new Date();
  const date = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const navigate = useNavigate()


  const handleUpload = async (imageUrl,id, index,ArrayUrl) => {
    const uploadTask = uploadBytesResumable(ref(storage, `uploads/${id}/${id}_${index}`), imageUrl);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          firebase.setTotalProgress((prevTotal) => {
            const updatetotal = [...prevTotal]
            updatetotal[index] = progress
            return updatetotal;
          })

          //set Process In local Storage
          const existingProgressJSON = localStorage.getItem('progress');
          const existingProgress = existingProgressJSON ? JSON.parse(existingProgressJSON) : {};
          const existingIndex = (existingProgress[id] || []).findIndex(item => item.id === `${id}_${index}`);

          if (existingIndex !== -1) {
            existingProgress[id][existingIndex].process = progress;
          } else {
            if (!existingProgress[id]) {
              existingProgress[id] = [];
            }
            existingProgress[id].push({ id: `${id}_${index}`, process: progress });
          }
          localStorage.setItem('progress', JSON.stringify(existingProgress));

          //setProcess in UplodState
          firebase.setUploadProgress((prevProgress) => {
            const updatedProgress = { ...prevProgress };
            updatedProgress[id] = [...(prevProgress[id] || []), { id: `${id}_${index}`, process: progress }];
            return updatedProgress;
          });
        },
        (error) => {
          console.error("Error uploading file: ", error);
        },
        async function Upload() {
          const ImageRefforUrl = ref(storage, `uploads/${id}/${id}_${index}`)
          try {
            const Url = await getDownloadURL(ImageRefforUrl)
            ArrayUrl = await [...ArrayUrl,Url]
           console.log(Url,"urlllll")
          } catch (error) {
            console.error("Error getting download URL: ", error);
          }
        });
  }



  const handlesubmmit = async () => {
    let ArrayUrl = []
    let counter = 0;

    for (let index = 0; index < firebase.imageurl.length; index++) {
      await handleUpload(firebase.imageurl[index],id, index,ArrayUrl);
    }

    console.log(ArrayUrl,"Array of url is this")
    //Upload Image 
    // let data = new Promise(function (resolve, reject) {

    //   firebase.imageurl.forEach(async (imageUrl, index) => {
    //     const uploadTask = uploadBytesResumable(ref(storage, `uploads/${id}/${id}_${index}`), imageUrl);
    //     //On state change byte receved from blob
    //     uploadTask.on(
    //       "state_changed",
    //       (snapshot) => {
    //         const progress = Math.round(
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //         );

    //         firebase.setTotalProgress((prevTotal) => {
    //           const updatetotal = [...prevTotal]
    //           updatetotal[index] = progress
    //           return updatetotal;
    //         })

    //         //set Process In local Storage
    //         const existingProgressJSON = localStorage.getItem('progress');
    //         const existingProgress = existingProgressJSON ? JSON.parse(existingProgressJSON) : {};
    //         const existingIndex = (existingProgress[id] || []).findIndex(item => item.id === `${id}_${index}`);

    //         if (existingIndex !== -1) {
    //           existingProgress[id][existingIndex].process = progress;
    //         } else {
    //           if (!existingProgress[id]) {
    //             existingProgress[id] = [];
    //           }
    //           existingProgress[id].push({ id: `${id}_${index}`, process: progress });
    //         }
    //         localStorage.setItem('progress', JSON.stringify(existingProgress));

    //         //setProcess in UplodState
    //         firebase.setUploadProgress((prevProgress) => {
    //           const updatedProgress = { ...prevProgress };
    //           updatedProgress[id] = [...(prevProgress[id] || []), { id: `${id}_${index}`, process: progress }];
    //           return updatedProgress;
    //         });
    //       },
    //       (error) => {
    //         console.error("Error uploading file: ", error);
    //         reject(error);
    //       },
    //       async function Upload() {
    //         const ImageRefforUrl = ref(storage, `uploads/${id}/${id}_${index}`)
    //         try {
    //           const Url = await getDownloadURL(ImageRefforUrl)
    //           urls = [...urls, Url]
    //           resolve(urls);
    //         } catch (error) {
    //           console.error("Error getting download URL: ", error);
    //           reject(error);
    //         }
    //       });
    //   })
    // });

    //Get Respnse
    
    // data.then((res) => {
      //store event data
      const newObj = {
        id: id,
        date: date,
        time: formattedTime,
        description: description,
      }
      if (ArrayUrl) {
        newObj.eventimg = ArrayUrl
      }
      if (firebase?.mediaBlobUrl) {
        newObj.audio = firebase.mediaBlobUrl
      }

      const updatedEvents = [...(firebase?.userdata?.event || []), newObj];
      firebase.Writedata("/users/" + firebase.userId + "/event/", updatedEvents);

      firebase.setOpen(true);//For snackbar home page
      firebase.setRecording(false)
      firebase.setImageUrl([])
      navigate("/home")
      return updatedEvents;
  };


  // For navbar
  const handleClosenav = () => {
    navigate("/home")
    firebase.setRecording(false)
  }

  const customStyle = {
    backgroundColor: 'transperent'
  };

  return (
    <section className="EventPagemain">
      <section className="closenavmain">
        <CloaseNav handleClosenav={handleClosenav} customStyle={customStyle} />
      </section>
      <section className="Cameramain">
        <Camera />
      </section>
      <section className="Eventdescriptionmain">
        <Container className="EventDescription">
          <span>Please write a notes below</span>
          <textarea placeholder="Notes Hear..." onChange={(e) => setDescription(e.target.value)} />
          <p>Max 500</p>
        </Container>
      </section>
      <section className="Audiorecordmain">
        <span style={{ margin: "0 0 0 3vw", fontSize: "5vw", color: "#585758" }}>Voice recording</span>
        <AudioRecord />
      </section>
      <section className="EventButtonmain">
        <ButtonComp valuebutton="SUBMIT" className="EventButton" handleClick={handlesubmmit} ></ButtonComp>
      </section>
    </section>
  );
};

export default Index;
