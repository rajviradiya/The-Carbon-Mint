import React, { useEffect, useState } from "react";
import { useFierbase } from "../../../context/fierbasecontext";
import MicIcon from '@mui/icons-material/Mic';
import { IoStopCircleOutline } from "react-icons/io5";
import { Container, LinearProgress } from '@mui/material';
import { MdMicNone } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

const MAX_RECORDING_TIME = 300;

const AudioRecord = () => {
  const [timer, setTimer] = useState(0);
  const [state, setState] = useState(1)

  const fierbase = useFierbase()

  useEffect(() => {
    let interval;
    if (fierbase.recording) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [fierbase.recording]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const startRecording = () => {
    fierbase.startRecording()
    fierbase.setRecording(true);
    setState(2)
  };

  const stopRecording = () => {
    fierbase.setRecording(false);
    setTimer(0); 
    fierbase.stopRecording()
    setState(3)
    // fierbase.setMediaUrl(fierbase.mediaBlobUrl)
    console.log(fierbase.mediaBlobUrl, ' <== I am blob url...')
  };

  const handlecloseAudio = () => {
    setState(1)
  }


  return (
    <Container className="Audiocont">

      {state === 2 || state === 3 ? state === 3 ? (
        <>
          {/* part 3 */}
          <div className="audiostart3cont">
            <audio className="audiostart2audio" src={fierbase.mediaBlobUrl} controls />
            <button className="audiostart3btn" onClick={() => handlecloseAudio()}>
              <IoCloseOutline />
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Part 2 */}
          <div className="audiostart2cont">
            <div className="audiostart2div1">
              <p className="audiostart2ico1">{fierbase.recording ? `${formatTime(timer)}` : 'No'} </p>
              <p>
                <MdMicNone className="audiostart2mic" />
              </p>
            </div>
            <div style={{ width: '100%', backgroundColor: '#e0e0e0', height: '2px', }}>
              <div style={{ width: `${fierbase.recording ? (timer * 100) / MAX_RECORDING_TIME : 0}%`, backgroundColor: '#2B9348', height: '100%' }} />
            </div>
            <div>
              <button className="audiostart2button" onClick={stopRecording}>
                <IoStopCircleOutline className="audiostart2icon" />
              </button>
            </div>
          </div>
        </>) : (<>  
          {/* part 1 */}
          <div className="audiostartcont">
            <button onClick={startRecording} className="audiostartbtn">
              <MicIcon />
            </button>
            <span className="audiostarttext">Tap and record the voice</span>
          </div>
        </>)}

      {/* <p>{fierbase.status}</p> */}
      {/* part 3 */}

    </Container >
  );
};

export default AudioRecord;
