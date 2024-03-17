import React from "react";
import { Container } from "react-bootstrap";
import { ReactMediaRecorder } from "react-media-recorder";
import { useFierbase } from "../../../context/fierbasecontext";

const AudioRecord = () => {
  const fierbase = useFierbase();

  return (
    <>
      <Container className="Audiocont">
        <div>
          <p>{fierbase.status}</p>
          <button onClick={fierbase.startRecording}>Start Recording</button>
          <button onClick={fierbase.stopRecording}>Stop Recording</button>
          <audio src={fierbase.mediaBlobUrl} controls autoPlay loop />
        </div>
      </Container>
    </>
  );
};

export default AudioRecord;
