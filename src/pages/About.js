import React from 'react';
import Iframe from 'react-iframe'
import Header from '../components/Header'

function About() {
  return (
    <div>
      <Header layout="vertical" />
      {/* typewriter art page  */}
      <Iframe url="/vanillajs/typeWriterDemoP5.html" 
            width="100%"
            height="100%"
            id="myId"
            frameBorder="0"
            position="absolute"
            overflow='show'
            styles={{zIndex: -1}}
            />
    </div>
  );
}

export default About;