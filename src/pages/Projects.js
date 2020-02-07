import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PreviewBox from '../components/PreviewBox.js';

function Projects() {
  return (
    <Accordion className="">
      <Card className="grid">
        <Accordion.Toggle as={Card.Header} className="grid__item border border-top-0 border-right-0" eventKey="0" tabIndex="1">
          <Image src={require("../assets/ML-DISPLAY.png")} className="cover"/>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0" className="grid__description mx-5">
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet dolores quos laudantium harum ea minus magnam hic ut tempore. Ipsam doloribus perferendis architecto magnam, 
          exercitationem blanditiis corrupti totam ut praesentium
          </div>
        </Accordion.Collapse>
        
        <Accordion.Toggle as={Card.Header} className="grid__item border border-top-0" eventKey="1" tabIndex="2">
          <Image src={require("../assets/BOIDS-DISPLAY.png")} className="cover" /> 
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1" className="grid__description mx-5">
          <Card.Body>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dolores deserunt alias a earum, expedita ipsam ea tempora voluptatibus. Debitis modi tempore, totam doloribus sapiente qui quaerat eum fugit magni!
          </Card.Body>
        </Accordion.Collapse>
        
        <Accordion.Toggle as={Card.Header} className="grid__item border border-top-0 border-left-0" eventKey="2" tabIndex="3">
          <Image src={require("../assets/EULOGY-DISPLAY.png")} className="cover" />  
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2" className="grid__description mx-5">
          <Card.Body>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit magni similique esse, ipsum sapiente voluptate nihil nisi omnis nulla non consequatur veritatis voluptas sit cum sequi eaque, architecto, mollitia dolore.
          </Card.Body>
        </Accordion.Collapse>
        
        <Accordion.Toggle href="#" className="grid__item" eventKey="3" tabIndex="4">4</Accordion.Toggle>
        <Accordion.Collapse eventKey="3" className="grid__description mx-5">
          <Card.Body>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, dolorem! Esse earum quis neque soluta, id fugiat magni consequatur placeat praesentium illum a sit ex dolore nisi ipsa similique deserunt!
          </Card.Body>
        </Accordion.Collapse>

        <Accordion.Toggle href="#" className="grid__item" eventKey="4" tabIndex="5">5</Accordion.Toggle>
        <Accordion.Collapse eventKey="4" className="grid__description mx-5">
          <Card.Body>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, nulla voluptatibus eos quia sequi totam reprehenderit in cupiditate deserunt facere temporibus libero ut doloremque reiciendis
          ab commodi quibusdam consequatur corporis?
          </Card.Body>
        </Accordion.Collapse>
        
        <Accordion.Toggle href="#" className="grid__item" eventKey="5" tabIndex="6">6</Accordion.Toggle>
        <Accordion.Collapse eventKey="5" className="grid__description mx-5">
          <Card.Body>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste laborum atque numquam distinctio illum deleniti architecto voluptas modi, repellat non! Itaque numquam architecto pariatur impedit, tempora ab eius sint incidunt.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    // <div className="mt-5 pt-5">
    //   <div className="grid">
    //     <a href="#" className="grid__item" eventKey="0" tabIndex="1">1</a>
    //     <div className="grid__description" eventKey="0"><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet dolores quos laudantium harum ea minus magnam hic ut tempore. Ipsam doloribus perferendis architecto magnam, exercitationem blanditiis corrupti totam ut praesentium</div></div>
    //     <a href="#" className="grid__item" eventKey="1" tabIndex="2">2</a>
    //     <div className="grid__description" eventKey="1"><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dolores deserunt alias a earum, expedita ipsam ea tempora voluptatibus. Debitis modi tempore, totam doloribus sapiente qui quaerat eum fugit magni!</div></div>
    //     <a href="#" className="grid__item" eventKey="2" tabIndex="3">3</a>
    //     <div className="grid__description" eventKey="2"><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit magni similique esse, ipsum sapiente voluptate nihil nisi omnis nulla non consequatur veritatis voluptas sit cum sequi eaque, architecto, mollitia dolore.</div></div>
    //     <a href="#" className="grid__item" eventKey="3" tabIndex="4">4</a>
    //     <div className="grid__description" eventKey="3"><div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, dolorem! Esse earum quis neque soluta, id fugiat magni consequatur placeat praesentium illum a sit ex dolore nisi ipsa similique deserunt!</div></div>
    //     <a href="#" className="grid__item" eventKey="4" tabIndex="5">5</a>
    //     <div className="grid__description" eventKey="4"><div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, nulla voluptatibus eos quia sequi totam reprehenderit in cupiditate deserunt facere temporibus libero ut doloremque reiciendis ab commodi quibusdam consequatur corporis?</div></div>
    //     <a href="#" className="grid__item" eventKey="5" tabIndex="6">6</a>
    //     <div className="grid__description" eventKey="5"><div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste laborum atque numquam distinctio illum deleniti architecto voluptas modi, repellat non! Itaque numquam architecto pariatur impedit, tempora ab eius sint incidunt.</div></div>
    //   </div>
    // </div>
    // <div className="mt-5 pt-5">
    //   <div className="grid">
    //     <a href="#" className="grid__item" eventKey="0" tabIndex="1">1</a>
    //     <div className="grid__description" eventKey="0"><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet dolores quos laudantium harum ea minus magnam hic ut tempore. Ipsam doloribus perferendis architecto magnam, exercitationem blanditiis corrupti totam ut praesentium</div></div>
    //     <a href="#" className="grid__item" eventKey="1" tabIndex="2">2</a>
    //     <div className="grid__description" eventKey="1"><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dolores deserunt alias a earum, expedita ipsam ea tempora voluptatibus. Debitis modi tempore, totam doloribus sapiente qui quaerat eum fugit magni!</div></div>
    //     <a href="#" className="grid__item" eventKey="2" tabIndex="3">3</a>
    //     <div className="grid__description" eventKey="2"><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit magni similique esse, ipsum sapiente voluptate nihil nisi omnis nulla non consequatur veritatis voluptas sit cum sequi eaque, architecto, mollitia dolore.</div></div>
    //     <a href="#" className="grid__item" eventKey="3" tabIndex="4">4</a>
    //     <div className="grid__description" eventKey="3"><div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, dolorem! Esse earum quis neque soluta, id fugiat magni consequatur placeat praesentium illum a sit ex dolore nisi ipsa similique deserunt!</div></div>
    //     <a href="#" className="grid__item" eventKey="4" tabIndex="5">5</a>
    //     <div className="grid__description" eventKey="4"><div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, nulla voluptatibus eos quia sequi totam reprehenderit in cupiditate deserunt facere temporibus libero ut doloremque reiciendis ab commodi quibusdam consequatur corporis?</div></div>
    //     <a href="#" className="grid__item" eventKey="5" tabIndex="6">6</a>
    //     <div className="grid__description" eventKey="5"><div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste laborum atque numquam distinctio illum deleniti architecto voluptas modi, repellat non! Itaque numquam architecto pariatur impedit, tempora ab eius sint incidunt.</div></div>
    //   </div>
    // </div>
    // <div className="justify-content-xs-center">
    //   {/* fireworks script */}
    //   <Row className="top-margin"> 
    //     <Col sm={12} className="mt-4 mb-4">
    //       <p className="ml-5 ml-lg-5">Click them!</p>
    //     </Col>
    //   </Row>
    //   <Row className="mt-3 mr-xs-5 mr-md-2 ml-lg-0 justify-content-md-center">
    //     <PreviewBox id="3dSite" url="../projects/babylon3dSite/index.html"
    //       dest="projects/babylon3dSite" 
    //       slogan="3D (!) proof of concept website" />
    //     <PreviewBox id="gameSite" url="../projects/gameSite/index.html" 
    //       dest="projects/gameSite/"
    //       slogan="HTML integrated into a platformer for a fun UI" />
    //     <PreviewBox id="bgSite" url="../projects/bgSite/index.html?preview=true"
    //       dest="projects/bgSite/"
    //       slogan="proof of concept website" />
    //   </Row>
    //   <Row className="mt-3 mr-xs-5 mr-md-2 ml-lg-0 justify-content-md-center">
    //     <PreviewBox id="fountains" url="../projects/fountains.html" 
    //       dest="projects/fountains.html"
    //       slogan="particle engine toy" />
    //     <PreviewBox id="mountains" url="../projects/mountains.html?preview=true" 
    //       dest="projects/mountains.html"
    //       slogan="mountains for music visualization" />
    //     <PreviewBox id="sitting" url="../projects/sitting.html"
    //       dest="projects/sitting.html"
    //       slogan="i am sitting in a convolver" />
    //   </Row>
    // </div>
  );
}

export default Projects;