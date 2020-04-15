import React from 'react';
import Iframe from 'react-iframe'
import Header from '../components/Header'

function About() {
  return (
    <div>
      {/* a learned example: use layouts!
      for example, they bring the best code reuse/styling consistency
      using html body, for bg color for example, leads to stuff like this.. */}
      <Header layout="vertical" />
      <div style={{height: '94vh', zIndex: -1}}>
        <Iframe url="/vanillajs/pixiJSTypeWriter.html" 
            width="100%"
            height="100%"
            id="about-page-container"
            frameBorder="0"
            overflow='show'
            className="neumorph--image-border-big image-border-big-container overlay"
            styles={{'background-color':'rgb(255,255,255)'}}
            />
      </div>
    </div>
  );
}

export default About;