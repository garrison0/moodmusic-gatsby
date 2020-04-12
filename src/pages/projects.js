import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import PreviewBox from '../components/PreviewBox'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, graphql, useStaticQuery } from 'gatsby'
import Iframe from 'react-iframe';
import Layout from "../components/layout"
import Image from 'gatsby-image/withIEPolyfill';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import scrollTo from 'gatsby-plugin-smoothscroll';

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
      <div id="projects-container"
            style={{backgroundColor: 'rgb(97, 122, 128)'}}
            className="image-border-big-container border neumorph--image-border-big">
        <Header layout="inline" className="image-border-big-top" />
        <Accordion>
          <Card className="grid border-0 image-border-big-bottom">
            <Accordion.Toggle as={Card.Header} className="grid__item border border-light" 
                              eventKey="0" tabIndex="1"
                              onClick={() => setTimeout(() => {
                                scrollTo('#text-art-section')
                              }, 1000)} >
              <Image fluid={data.mlImage.childImageSharp.fluid} className="cover"/>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0" className="grid__description mx-md-5" id="text-art-section">
              <Card.Body>
                <Row className="h-100">
                  {/* IMAGE(s) */}
                  <Col xs={12}>
                    <Row className="py-3 px-2">
                      <Col>
                        <Image fluid={data.seatedNudeImage.childImageSharp.fluid} 
                            objectFit="contain"
                            style={{ maxHeight: "100%" }}
                            alt="picture of georgia o'keeffe's seated nude made with text" 
                            className="image-border-big border neumorph w-100 h-100" />
                      </Col>
                      <Col className="align-self-end">
                        <Image fluid={data.gazeImage.childImageSharp.fluid} 
                            objectFit="contain"
                            style={{width: "100%", maxHeight: "60%", bottom: 0}}
                            alt="picture of paul klee's gaze of silence made with text" 
                            className="image-reversed-border border neumorph w-100 h-100" />
                      </Col>
                    </Row>
                  </Col>
                  {/* DESCRIPTION */}
                  <Col xs={12}>
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
                  <Col>
                      <Image fluid={data.cabinImage.childImageSharp.fluid} 
                            objectFit="contain"
                            style={{ maxHeight: "100%" }}
                            alt="picture of cabin made of text" 
                            className="image-border-big neumorph border w-100 h-100" />
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
            
            <Accordion.Toggle as={Card.Header} className="grid__item border border-light" 
                              eventKey="1" tabIndex="2"
                              onClick={() => setTimeout(() => {
                                scrollTo('#boids-section')
                              }, 1000)}>
              <Image fluid={data.boidsImage.childImageSharp.fluid} className="cover" /> 
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1" className="grid__description mx-md-5" id="boids-section">
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
                      className="mt-4 image-reversed-border neumorph border"
                      position="relative" />
                  </Col>
                </Row>

                
              </Card.Body>
            </Accordion.Collapse>
            
            <Accordion.Toggle as={Card.Header} className="grid__item border border-light" 
                              eventKey="2" tabIndex="3"
                              onClick={() => setTimeout(() => {
                                scrollTo('#eulogy-gen-section')
                              }, 1000)}>
              <Image fluid={data.eulogyImage.childImageSharp.fluid} className="cover" />  
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2" className="grid__description mx-md-5" id="eulogy-gen-section">
              <Card.Body>
                <Row className="h-100">
                  {/* PROJECT DESCRIPTION */}
                  <Col xs={12}>
                    <h3><b>eulogizer</b></h3>
                    {/* adds a line */}
                    <p id="line" className="border border-light w-75 mb-2"></p> 
                    <p>A machine learning model (LSTM) trained on online eulogies I personally harvested 
                      off the web using BeautifulSoup (a python web scraper). 
                    </p>
                  </Col>
                  {/* IMAGE */}
                  <Col xs={7}>
                    <Row>
                      <Col xs={12} md={7}> 
                        
                      </Col>
                      <Col xs={12} md={5}>
                        
                      </Col>
                    </Row>
                    <Row className="h-100">
                    
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
            
            <Accordion.Toggle href="#" className="grid__item border border-light image-border-big-bottomleft" 
                              eventKey="3" tabIndex="4"
                              onClick={() => setTimeout(() => {
                                scrollTo('#letsbefriends-section')
                              }, 1000)}>
              let's be friends
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3" className="grid__description mx-md-5" id="letsbefriends-section">
              <Card.Body>
                <Col xs={12}>
                  <h3><b>let's be friends</b></h3>
                  {/* adds a line */}
                  <p id="line" className="border border-light w-75 mb-2"></p> 
                  <p>t - b - a!
                  </p>
                </Col>
              </Card.Body>
            </Accordion.Collapse>

            <Accordion.Toggle href="#" className="grid__item border border-light" 
                              eventKey="4" tabIndex="5"
                              onClick={() => setTimeout(() => {
                                scrollTo('#fluidwalk-section')
                              }, 1000)}>
              fluidwalk
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4" className="grid__description mx-md-5" id="fluidwalk-section">
              <Card.Body>
                <Col xs={12}>
                  <h3><b>fluidwalk</b></h3>
                  {/* adds a line */}
                  <p id="line" className="border border-light w-75 mb-2"></p> 
                  <p>t - b - a!
                  </p>
                </Col>
              </Card.Body>
            </Accordion.Collapse>
            
            <Accordion.Toggle href="#" className="grid__item border border-light image-border-big-bottomright" 
                              eventKey="5" tabIndex="6"
                              onClick={() => setTimeout(() => {
                                scrollTo('#misc-stuff-section')
                              }, 1000)}>
              misc
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="5" className="grid__description mx-md-5" id="misc-stuff-section">
              <Card.Body>
                <div>
                  <Row className="justify-content-center">
                    <PreviewBox id="3dSite" url="/vanillajs/projects/babylon3dSite/index.html"
                      dest="/vanillajs/projects/babylon3dSite" 
                      slogan="3D (!) proof of concept website" />
                    <PreviewBox id="gameSite" url="vanillajs/projects/gameSite/index.html" 
                      dest="vanillajs/projects/gameSite/"
                      slogan="HTML integrated into a platformer for a fun UI" />
                    <PreviewBox id="bgSite" url="vanillajs/projects/bgSite/index.html?preview=true"
                      dest="vanillajs/projects/bgSite/"
                      slogan="proof of concept website" />
                  </Row>
                  <Row className="justify-content-center">
                    <PreviewBox id="fountains" url="vanillajs/projects/fountains.html" 
                      dest="vanillajs/projects/fountains.html"
                      slogan="particle engine toy" />
                    <PreviewBox id="mountains" url="vanillajs/projects/mountains.html?preview=true" 
                      dest="vanillajs/projects/mountains.html"
                      slogan="mountains for music visualization" />
                    <PreviewBox id="sitting" url="vanillajs/projects/sitting.html"
                      dest="vanillajs/projects/sitting.html"
                      slogan="i am sitting in a convolver" />
                  </Row>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
  );
}

export default Projects;