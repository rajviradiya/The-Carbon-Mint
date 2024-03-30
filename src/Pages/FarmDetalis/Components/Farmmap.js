import React from "react";

const Farmmap = () => {
  return (
    <div className=" container farmermap">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14688.18680620135!2d72.45710854415162!3d23.022057415585103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9ba1551ce393%3A0x501cc628f73ed0f5!2sSouth%20Bopal%2C%20Bopal%2C%20Ahmedabad%2C%20Gujarat%20380058!5e0!3m2!1sen!2sin!4v1710137691583!5m2!1sen!2sin"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="FarmMap"
      ></iframe>
    </div>
  );
};

export default Farmmap;
