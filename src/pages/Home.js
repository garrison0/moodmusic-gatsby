import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Iframe from 'react-iframe'
import { Link } from "@reach/router"
import selfportrait from '../assets/selfportrait.jpg';
import { SocialIcon } from 'react-social-icons';

function Home() {
  return (
    <div>
      {/* fireworks script */}
      <Row>> 
        <Col>
          {/* fireworks graphics  */}
          <Iframe url="/vanillajs/fireworks.html" 
            width="100%"
            height="700vh"
            id="myId"
            display="initial"
            frameBorder="0"
            position="relative" />
        </Col>
      </Row>

      {/* // about me sect */}
      <Row className="ml-4 mr-4 justify-content-center"
           style={{height: '100vh'}}>
        <Col className="textbox-container my-auto" sm={6} style={{marginBottom: '2vh'}}>
          <p className="border-light border-top border-bottom" > 
            <br/>
            My name is Garrison. 
            <br/><br/>  I graduated from Carnegie Mellon University in 
            December of 2018 with a B.Sc. in Logic and Computation and a minor in Sound Design. 
            <br/><br/>  I've worn a few hats since then, some of which are "Audio Engineer"
            and "Software Developer." My interests are pretty varied, but I do take music
            very seriously, and I get a big kick from learning new things and solving problems.
            <br/><br/> You can check out some of the stuff I've done, and some of the nonsense
            I've written, in the links below and in the navigation bar above. Be sure
            to hit the far right link...
            <br/><br/><br/>
          </p> 
          <Row className="mt-3 ml-4 mr-4 justify-content-center" style={{textAlign:'center'}}> 
            <Col xs="3"> 
              <SocialIcon url="mailto:mcmullengn@gmail.com" 
                style={{ height: '7vmin', width: '7vmin'}} />
            </Col>
            <Col xs="3">
              <SocialIcon url="https://www.linkedin.com/in/garrisonmcmullen/"
                style={{ height: '7vmin', width: '7vmin' }} />
            </Col>
            <Col xs="3">
              <SocialIcon url="https://soundcloud.com/garrison0" 
                style={{ height: '7vmin', width: '7vmin' }} />
            </Col>
            <Col xs="3">
              <SocialIcon url="https://www.paypal.me/moodmusic" 
                style={{ height: '7vmin', width: '7vmin' }} />
            </Col>
          </Row>
        </Col>
        <Col style={{marginTop:'15%',marginBottom:'10%'}} sm={4}>
          <Link to="/about">
            <Image src={selfportrait} rounded fluid/>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
