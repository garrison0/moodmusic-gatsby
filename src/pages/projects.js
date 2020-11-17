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
            className="image-border-big-container border neumorph--image-border-big">
        <Header layout="inline" titleLeftMargin="2em" className="image-border-big-top" />
        <Accordion>
          <Card className="grid border-0 image-border-big-bottom">
            <Accordion.Toggle as={Card.Header} className="grid__item border border-light" 
                              eventKey="0" tabIndex="1"
                              onClick={() => setTimeout(() => {
                                scrollTo('#text-art-section')
                              }, 100)} >
              <Image fluid={data.mlImage.childImageSharp.fluid} className="cover"/>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0" className="grid__description mx-md-5" id="text-art-section">
              <Card.Body>
                <Row className="h-100 mx-2 my-3">
                  {/* IMAGE(s) */}
                  <Col xs={12}>
                    <Row>
                      <Col>
                        <Image fluid={data.seatedNudeImage.childImageSharp.fluid} 
                            objectFit="contain"
                            style={{ maxHeight: "100%" }}
                            alt="picture of georgia o'keeffe's seated nude made with text" 
                            className="image-border-big border  w-100 h-100" />
                      </Col>
                      <Col className="align-self-end">
                        <Image fluid={data.gazeImage.childImageSharp.fluid} 
                            objectFit="contain"
                            style={{width: "100%", maxHeight: "60%", bottom: 0}}
                            alt="picture of paul klee's gaze of silence made with text" 
                            className="image-reversed-border border  w-100 h-100" />
                      </Col>
                    </Row>
                  </Col>
                  {/* DESCRIPTION */}
                  <Col xs={12}>
                    <div className="my-3 py-3 px-4 border rounded ">
                      <h3><b>fontdraw</b></h3>
                      {/* adds a line */}
                      <p id="line" className="border border-light w-75 mb-2"></p> 
                      <p>Mimicking typewriter art algorithmically.</p>
                      <p>Made using p5.js for graphical ease, opentype.js for glyph inspection, 
                        and my own algorithm for minimizing the error while placing each letter.</p>
                      <p className="mt-4">
                        <a href="https://github.com/garrison0/fontdraw">
                          <Button variant="outline-primary">
                              See all the details on GitHub!
                          </Button>
                        </a>
                      </p>
                      <p>
                        And here's a demo. Fair warning - your browser must support WebGL for the demo!
                      </p>
                      <p className="mb-0">
                        <Link to="/coolstory">
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
                            className="image-border-big  border w-100 h-100" />
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
            
            <Accordion.Toggle as={Card.Header} className="grid__item border border-light" 
                              eventKey="1" tabIndex="2"
                              onClick={() => setTimeout(() => {
                                scrollTo('#boids-section')
                              }, 100)}>
              <Image fluid={data.boidsImage.childImageSharp.fluid} className="cover" /> 
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1" className="grid__description mx-md-5" id="boids-section">
              <Card.Body>
                <Row className="mx-2 my-3 py-3 px-4 border rounded ">
                  <Col xs={12}>
                    <h3><b>boids 404</b></h3>
                    {/* adds a line */}
                    <p id="line" className="border border-light w-75 mb-2"></p> 
                    <p>I have a boids-knockoff script (basically, boids with only a separation force) simulating dust you can vacuum up
                      in the background of my 404 page.
                    </p>
                    <Link to="/404">
                      <Button variant="outline-primary">
                        Click here to check it out!
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
            
            <Accordion.Toggle as={Card.Header} className="grid__item border border-light" 
                              eventKey="2" tabIndex="3"
                              onClick={() => setTimeout(() => {
                                scrollTo('#eulogy-gen-section')
                              }, 100)}>
              <Image fluid={data.eulogyImage.childImageSharp.fluid} className="cover" />  
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2" className="grid__description mx-md-5" id="eulogy-gen-section">
              <Card.Body>
                <Row className="h-100 mx-2 my-3 py-3 px-4 border rounded ">
                  {/* PROJECT DESCRIPTION */}
                  <Col xs={12}>
                    <h3><b>eulogizer</b></h3>
                    {/* adds a line */}
                    <p id="line" className="border border-light w-75 mb-2"></p> 
                    <p>A machine learning model (textgenrnn) trained on online eulogies I personally harvested 
                      off the web using BeautifulSoup (a python web scraper). Some absurd generated quotes with names censored:
                    </p>
                    <blockquote>
                      NAME always danged dangels. Bondand condirestion.
                    </blockquote>
                    <blockquote>
                      he loved the state of the working he would brighten up to your whole room. He was just the warrotiates. He got never seeing to have for there. He would be the time on him. I feel the boyfriend, he telling them not totallys. NAME was very nurturing.
                    </blockquote>
                    <blockquote>
                      She was just a good her.
                    </blockquote>
                    <p>
                      I find it impressive, and pretty funny, how the model picks up on the general structure of eulogy sentences. I.e., 
                    </p>
                    <p style={{marginLeft: '8px'}}>
                      (pronoun or name) + (superlative) + (past tense verb) + (noun)
                    </p>
                    <p>
                      So, as you increase the "temperature" or "random variation" of the generated text, it retains the structure even as it makes up words -- "NAME always danged dangels."
                    </p>
                  </Col>
                  {/* IMAGE */}
                  <Col>
                    <a href="https://github.com/garrison0/eulogizer">
                      <Button variant="outline-primary">
                        See more details on GitHub!
                      </Button>
                    </a>
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
            
            <Accordion.Toggle href="#" className="grid__item border border-light image-border-big-bottomleft" 
                              eventKey="3" tabIndex="4"
                              onClick={() => setTimeout(() => {
                                scrollTo('#letsbefriends-section')
                              }, 100)}>
              the more the time is
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3" className="grid__description mx-md-5" id="letsbefriends-section">
              <Card.Body>
                <Col xs={12}>
                  <h3><b>the more the time is</b></h3>
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
                              }, 100)}>
              art n stuff
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4" className="grid__description mx-md-5" id="fluidwalk-section">
              <Card.Body>
                <Col xs={12}>
                  <h3><b>art n stuff</b></h3>
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
                              }, 100)}>
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
                  </Row>
                  <Row className="justify-content-center">
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