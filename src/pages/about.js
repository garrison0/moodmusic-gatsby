import React from 'react';
import Iframe from 'react-iframe'
import Header from '../components/Header'

function About() {
  return (
    <div>
      {/* a learned example: use layouts!
      for example, they bring the best code reuse/styling consistency
      using html body, for bg color for example, leads to stuff like this.. */}
      <div class="overlayHack">
      </div>
      <Header layout="vertical" />
      {/* typewriter art page  */}
      <div style={{zIndex: -1}}>
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