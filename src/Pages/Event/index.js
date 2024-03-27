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
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage';
import { storage } from "../../Config/fierbase";

const Index = () => {
  const [description, setDescription] = useState("")
  const firebase = useFierbase()
  const currentDate = new Date();
  const date = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const navigate = useNavigate()

  const handlesubmmit = () => {
    let id = uuid().slice(0, 3)
    const newObj = {
      id: id,
      date: date,
      time: formattedTime,
      description: description,
    }

    if (firebase.mediaBlobUrl) {
      console.log("hiiiii")
      newObj.audio = firebase.mediaBlobUrl
    }

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
        }
      );
    })

    //store event data
    const updatedEvents = [...(firebase?.userdata?.event || []), newObj];
    firebase.Writedata("/users/" + firebase.userId + "/event/", updatedEvents);
    navigate("/home")
    firebase.setOpen(true);//For snackbar home page
    firebase.setImageUrl([])
    firebase.setRecording(false)
    firebase.setUploadProgress([])
    return updatedEvents;
  };

  // For navbar
  const handleClosenav = () => {
    navigate("/home")
    firebase.setImageUrl([])
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
