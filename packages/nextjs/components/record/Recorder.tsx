import React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

export const Recorder = () => {
  const addAudioElement = (blob: Blob) => {
    console.log("QUI");
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
    // const link = document.createElement("a");
    // link.href = audio.src;
    // link.download = "test";
    // link.click();
  };

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
          // autoGainControl,
          // channelCount,
          // deviceId,
          // groupId,
          // sampleRate,
          // sampleSize,
        }}
        onNotAllowedOrFound={err => console.table("cazzo" + err)}
        downloadOnSavePress={true}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
        showVisualizer={true}
      />
      <br />
    </div>
  );
};
