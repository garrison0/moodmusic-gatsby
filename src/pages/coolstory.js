import React from 'react';
import Iframe from 'react-iframe'
import Header from '../components/Header'

function CoolStory() {
  return (
    <div>
      {/* a learned example: use layouts!
      for example, they bring the best code reuse/styling consistency
      using html body, for bg color for example, leads to stuff like this.. */}
      <div style={{height: '2625px', overflow: 'hidden', zIndex: -1}} id="about-page-container" 
           className="neumorph--image-border-big image-border-big-container">
        <Header layout="inline" />
        <Iframe url="/vanillajs/pixiJSTypeWriter.html" 
            width="100%"
            height="2600px"
            frameBorder="0"
            overflow='show'
            className="overlay image-border-big-bottom"
            styles={{'background-color':'rgb(255,255,255)'}}
            />
      </div>
    </div>
  );
}

export default CoolStory;