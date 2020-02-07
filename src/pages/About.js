import React from 'react';
import Iframe from 'react-iframe'

function About() {
  return (
    <div>
      {/* typewriter art page  */}
      <Iframe url="../typeWriterAbout.html" 
            width="100%"
            height="100%"
            id="myId"
            frameBorder="0"
            position="absolute"
            overflow='show'
            styles={{zIndex: 0}}
            />
    </div>
  );
}

export default About;