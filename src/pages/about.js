import React from 'react';
import Iframe from 'react-iframe'
import Header from '../components/Header'

function About() {
  return (
    <div>
      <Header layout="vertical" />
      {/* typewriter art page  */}
      <div style={{zIndex: -1, marginTop: 12}}>
        <Iframe url="/vanillajs/pixiJSTypeWriter.html" 
            width="100%"
            height="100%"
            id="myId"
            frameBorder="0"
            position="absolute"
            overflow='show'
            />
      </div>
    </div>
  );
}

export default About;