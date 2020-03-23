import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, graphql, useStaticQuery } from 'gatsby'
import Iframe from 'react-iframe';
import Image from 'gatsby-image/withIEPolyfill';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';

function Projects() {
  const data = useStaticQuery(graphql`
    query projectFiles {
      mlImage: file(relativePath: {eq: "ML-DISPLAY.png"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      eulogyImage: file(relativePath: {eq: "EULOGY-DISPLAY.png"}) {
        childImageSharp {
          fluid { 
            ...GatsbyImageSharpFluid
          }
        }
      }
      boidsImage: file(relativePath: {eq: "BOIDS-DISPLAY.png"}) {
        childImageSharp {
          fluid { 
            ...GatsbyImageSharpFluid
          }
        }
      }
      cabinImage: file(relativePath: {eq: "textCabin.png"}) {
        childImageSharp {
          fluid { 
            ...GatsbyImageSharpFluid
          }
        }
      }
      gazeImage: file(relativePath: {eq: "textGazeOfSilence.png"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      seatedNudeImage: file(relativePath: {eq: "textSeatedNude.png"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }`
  );
  return (
    <div id="projects-container" className="image-border-big-container shadow-sm border">
      <Header layout="inline" />
      <Accordion>
        <Card className="grid border-0 image-border-big-container-bottom">
          <Accordion.Toggle as={Card.Header} className="grid__item border border-light" eventKey="0" tabIndex="1">
            <Image fluid={data.mlImage.childImageSharp.fluid} className="cover"/>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0" className="grid__description mx-5">
            <Card.Body>
              <Row className="h-100">
                {/* IMAGE(s) */}
                <Col xs={12} md={7}>
                  <Row className="py-3 px-2">
                    <Col>
                      <Image fluid={data.seatedNudeImage.childImageSharp.fluid} 
                          objectFit="contain"
                          style={{ maxHeight: "100%" }}
                          alt="picture of georgia o'keeffe's seated nude made with text" 
                          className="image-border-big border w-100 h-100" />
                    </Col>
                    <Col className="align-self-end">
                      <Image fluid={data.gazeImage.childImageSharp.fluid} 
                          objectFit="contain"
                          style={{width: "100%", maxHeight: "60%", bottom: 0}}
                          alt="picture of paul klee's gaze of silence made with text" 
                          className="image-reversed-border border w-100 h-100" />
                    </Col>
                  </Row>
                  <Row>
                    <Image fluid={data.cabinImage.childImageSharp.fluid} 
                          objectFit="contain"
                          style={{ maxHeight: "100%" }}
                          alt="picture of cabin made of text" 
                          className="image-border-big border w-100 h-100" />
                  </Row>
                </Col>
                {/* DESCRIPTION */}
                <Col xs={12} md={5}>
                  <div className="mx-3">
                    <h3><b>fontdraw</b></h3>
                    {/* adds a line */}
                    <p id="line" className="border border-light w-75 mb-2"></p> 
                    <p>Mimicking typewriter art algorithmically.</p>
                    <p>Made using p5.js for graphical ease, opentype.js for glyph inspection, 
                       and my own algorithm for minimizing the error while placing each letter.</p>
                    <p className="mt-4">
                      <Link to="projects">
                          <Button variant="outline-primary">
                              See it on GitHub!
                          </Button>
                      </Link>
                    </p>
                    <p>
                      <Link to="about">
                          <Button variant="outline-primary">
                            Check out a proof of concept!
                          </Button>
                      </Link>
                    </p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
          
          <Accordion.Toggle as={Card.Header} className="grid__item border border-light" eventKey="1" tabIndex="2">
            <Image fluid={data.boidsImage.childImageSharp.fluid} className="cover" /> 
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1" className="grid__description mx-5">
            <Card.Body>
              <Row>
                <Col xs={12} lg={6}>
                  <h3><b>boids 404</b></h3>
                  {/* adds a line */}
                  <p id="line" className="border border-light w-75 mb-2"></p> 
                  <p>I have a boids-knockoff script (basically, boids with only a separation force) simulating dust you can vacuum up
                     in the background of my 404 page. Like this:</p>
                </Col>
                <Col>
                  <Iframe url="/vanillajs/boids.html"
                    width="100%"
                    id="boids demo"
                    className="mt-4 image-reversed-border border"
                    position="relative" />
                </Col>
              </Row>

              
            </Card.Body>
          </Accordion.Collapse>
          
          <Accordion.Toggle as={Card.Header} className="grid__item border border-light" eventKey="2" tabIndex="3">
            <Image fluid={data.eulogyImage.childImageSharp.fluid} className="cover" />  
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2" className="grid__description mx-5">
            <Card.Body>
              <Row className="h-100">
                {/* IMAGE */}
                <Col xs={7}>
                  <Row>
                    <Col xs={12} md={7}> 
                      poooopo
                    </Col>
                    <Col xs={12} md={5}>
                      fuck
                    </Col>
                  </Row>
                  <Row className="h-100">
                    asdasd
                  </Row>
                </Col>
                {/* PROJECT DESCRIPTION */}
                <Col xs={5}>
                    yup
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
          
          <Accordion.Toggle href="#" className="grid__item border border-light image-border-big-bottomleft" eventKey="3" tabIndex="4">4</Accordion.Toggle>
          <Accordion.Collapse eventKey="3" className="grid__description mx-5">
            <Card.Body>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, dolorem! Esse earum quis neque soluta, id fugiat magni consequatur placeat praesentium illum a sit ex dolore nisi ipsa similique deserunt!
            </Card.Body>
          </Accordion.Collapse>

          <Accordion.Toggle href="#" className="grid__item border border-light" eventKey="4" tabIndex="5">5</Accordion.Toggle>
          <Accordion.Collapse eventKey="4" className="grid__description mx-5">
            <Card.Body>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, nulla voluptatibus eos quia sequi totam reprehenderit in cupiditate deserunt facere temporibus libero ut doloremque reiciendis
            ab commodi quibusdam consequatur corporis?
            </Card.Body>
          </Accordion.Collapse>
          
          <Accordion.Toggle href="#" className="grid__item border border-light image-border-big-bottomright" eventKey="5" tabIndex="6">6</Accordion.Toggle>
          <Accordion.Collapse eventKey="5" className="grid__description mx-5">
            <Card.Body>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste laborum atque numquam distinctio illum deleniti architecto voluptas modi, repellat non! Itaque numquam architecto pariatur impedit, tempora ab eius sint incidunt.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
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
        // <PreviewBox id="3dSite" url="../projects/babylon3dSite/index.html"
        //   dest="projects/babylon3dSite" 
        //   slogan="3D (!) proof of concept website" />
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