// src/components/VideoCallRoom.js
import React, { useEffect } from "react";

const VideoCallRoom = ({ roomName }) => {
  useEffect(() => {
    // Jitsi Meet API options
    const domain = "meet.jit.si"; // Change this if you're using your own server
    const options = {
      roomName: roomName, // Dynamic room name
      width: "100%", // Full width of the container
      height: "600px", // Set a height for the video container
      parentNode: document.querySelector("#jitsi-container"), // Where to render the Jitsi iframe
      configOverwrite: {
        startWithAudioMuted: true, // Optional: Start with audio muted
      },
      interfaceConfigOverwrite: {
        filmStripOnly: false, // Optional: Disable filmstrip mode
      },
    };

    // Initialize Jitsi Meet API instance
    const api = new window.JitsiMeetExternalAPI(domain, options);

    // Cleanup function to dispose of the Jitsi instance on unmount
    return () => {
      api.dispose(); // Dispose of the instance to avoid memory leaks
    };
  }, [roomName]);

  return (
    <div>
      <h2>Join the Video Call</h2>
      <div id="jitsi-container" style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
};

export default VideoCallRoom;
