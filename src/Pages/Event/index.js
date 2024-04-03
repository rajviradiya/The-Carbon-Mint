import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./Event.css";
import CloaseNav from "./components/CloaseNav";
import Camera from "./components/Camera";
import AudioRecord from "./components/AudioRecord";
import ButtonComp from "../../Components/ButtonComp";
import { useFierbase } from "../../context/fierbasecontext";
import { v4 as uuid } from 'uuid';
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from "../../Config/fierbase";

const Index = () => {
  const [description, setDescription] = useState("")
  const firebase = useFierbase()
  const navigate = useNavigate()
  let id = uuid()
  const params = useParams();
  const currentDate = new Date();
  const date = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  console.log(params?.name,'paramssss')
  const UploadData = (id, date, formattedTime, description, urls, audio) => {
    const newObj = {
      id: id,
      date: date,
      time: formattedTime,
      description: description,
    }
    if(params?.name){
      newObj.name = params?.name
    }
    if (urls) {
      newObj.eventimg = urls
    }
    if (audio) {
      newObj.audio = audio
    }

    let updatedEvents = [...(firebase?.userdata?.event || []), newObj];
    firebase.Writedata("/users/" + firebase.userId + "/event/", updatedEvents);
    return updatedEvents;
  }

  const handlesubmmit = async () => {
    let urls = []
    // Upload Image
    UploadData(id, date, formattedTime, description, urls, firebase.mediaBlobUrl)
    firebase?.imageurl?.forEach(async (imageUrl, index) => {
      const uploadTask = uploadBytesResumable(ref(storage, `uploads/${id}/${id}_${index}`), imageUrl);
      //On state change byte receved from blob
      let data = new Promise(function (resolve, reject) {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
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
            reject(error);
          },
          async function Upload() {
            const ImageRefforUrl = ref(storage, `uploads/${id}/${id}_${index}`)
            try {
              const Url = await getDownloadURL(ImageRefforUrl)
              urls = [...urls, Url]
              resolve(urls);
            } catch (error) {
              console.error("Error getting download URL: ", error);
              reject(error);
            }
          });
      })

      data.then((res) => {
        UploadData(id, date, formattedTime, description, urls, firebase.mediaBlobUrl)
        console.log(res, "res isthis")
        //store event data
        firebase.setImageUrl([])
        firebase.setOpen(false);
      })
    });
    firebase.setRecording(false)
    firebase.setOpen(true);//For snackbar home page
    navigate("/home")
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
        <CloaseNav params={params} />
      </section>
      <section className="Cameramain">
        <Camera cropnmaeparam={params?.name}/>
      </section>
      <section className="Eventdescriptionmain">
        <Container className="EventDescription">
          <span>Please write a notes below</span>
          <textarea placeholder="Notes Here..." onChange={(e) => setDescription(e.target.value)} />
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
