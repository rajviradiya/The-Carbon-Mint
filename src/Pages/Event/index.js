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

  const firebase = useFierbase()
  const currentDate = new Date();
  const date = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const navigate = useNavigate()

  console.log(firebase.downloadURL, "download Url2")
  const handlesubmmit = () => {
    let id = uuid().slice(0, 3)


    firebase.imageurl.forEach((imageUrl, index) => {
      const uploadTask = uploadBytesResumable(ref(storage, `uploads/${id}/${id}_${index}`), imageUrl);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          firebase.setUploadProgress((prevProgress) => {
            const updatedProgress = [...prevProgress];
            updatedProgress[index] = { [`${id}_${index}`]: progress };
            return updatedProgress;
          });
          //   fierbase.setUploadProgress((prevProgress) => ({
          //     ...prevProgress,
          //     [`${id}_${index}`]: progress,
          // }));
        },
        (error) => {
          console.error("Error uploading file: ", error);
        },
        () => {
          // Upload completed successfully
          const ImageRefforUrl = ref(storage, `uploads/${id}/${id}_${index}`)
          getDownloadURL(ImageRefforUrl)
            .then((Url) => {
              firebase.setdownloadURL(preUrl => [...preUrl, Url])
              console.log(Url, "Url")
            })
            .catch(error => {
              console.error("Error getting download URL: ", error);
            });
        }
      );
    })

    //store event data
    const newObj = {
      id: id,
      date: date,
      time: formattedTime,
      description: description,
    }

    if (firebase.downloadURL) {
      newObj.eventimg = firebase.downloadURL
    }

    if (firebase?.mediaBlobUrl) {
      newObj.audio = firebase.mediaBlobUrl
    }

    const updatedEvents = [...(firebase?.userdata?.event || []), newObj];
    firebase.Writedata("/users/" + firebase.userId + "/event/", updatedEvents);
    firebase.setOpen(true);//For snackbar home page
    firebase.setRecording(false)
    firebase.setUploadProgress([])
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
