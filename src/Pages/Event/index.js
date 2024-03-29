import React, { useEffect, useState } from "react";
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

  let id = uuid().slice(0, 3)
  const firebase = useFierbase()
  const currentDate = new Date();
  const date = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const navigate = useNavigate()

  const handlesubmmit = async () => {
    let urls = []
    //Upload Image 
    firebase.imageurl.forEach(async (imageUrl, index) => {
      const uploadTask = uploadBytesResumable(ref(storage, `uploads/${id}/${id}_${index}`), imageUrl);

      let data = new Promise(function (resolve, reject) {
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

            firebase.setUploadProgress((prevProgress) => {
              const updatedProgress = { ...prevProgress }; // Create a shallow copy of prevProgress

              // If prevProgress[id] exists, spread its contents into a new array, else create an empty array
              updatedProgress[id] = [...(prevProgress[id] || []), { id: `${id}_${index}`, process: progress }];
              

              // const updatedProgress = [...prevProgress];
              // updatedProgress[index] = { EventId: `${id}`, id: `${id}_${index}`, process: progress };

              return updatedProgress;
            });
          },
          (error) => {
            console.error("Error uploading file: ", error);
            reject(error);
          },
          async function Upload() {
            // Upload completed successfully
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
      //Get Respnse
      data.then((res) => {
        console.log(res, "is this res")
        //store event data
        const newObj = {
          id: id,
          date: date,
          time: formattedTime,
          description: description,
        }
        if (urls) {
          newObj.eventimg = urls
        }
        if (firebase?.mediaBlobUrl) {
          newObj.audio = firebase.mediaBlobUrl
        }

        const updatedEvents = [...(firebase?.userdata?.event || []), newObj];
        firebase.Writedata("/users/" + firebase.userId + "/event/", updatedEvents);

        firebase.setOpen(true);//For snackbar home page
        firebase.setRecording(false)
        firebase.setImageUrl([])
        return updatedEvents;
      })
    });
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
