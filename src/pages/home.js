import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import Iframe from 'react-iframe'
import { graphql, useStaticQuery } from 'gatsby'
import { SocialIcon } from 'react-social-icons';
import Header from '../components/Header.js'
import Rose from '../components/rose.js';
import BioCarousel from '../components/BioCarousel.js'
import Image from 'gatsby-image/withIEPolyfill';
import scrollTo from 'gatsby-plugin-smoothscroll';
import img from '../../content/assets/hereiam.png';

const Footer = styled.footer`
  text-align: center;
  margin: 36px;
`
const HereIAm = styled.div`
  background-image: url(${img});
  background-repeat: repeat;
  background-position: bottom right;
  width: 115%;
  height: 52rem;
  left: -4px;
  top: -4px;
`

const Home = () => {
  const data = useStaticQuery(graphql`
    query home {
      downArrowIndicator: file(relativePath: {eq: "arrowDownBig.png"}) {
        childImageSharp {
          fluid { 
            ...GatsbyImageSharpFluid
          }
        }
      }
      selfImage: file(relativePath: {eq: "me_cover_text.jpg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }`
  );

  const choices = {
    0: "vade mecum", 
    1: "katamari grain procurement",
    2: "cars and washing machines",
    3: "the cost of living",
    4: "turn the lights .",
    5: "master builder 222"
  }
  const choice = Math.floor(6 * Math.random());

  function graphicContainer(title) { 
    return (<Col className="p-0 m-0" style={{overflow: "hidden", height: '450px'}}>
              <Iframe url={`/vanillajs/projects/${title}`}
                width="100%"
                height="450px"
                id="graphicFrame"
                display="initial"
                frameBorder="0"
                scrolling="no"
                position="relative" />
            </Col>);
  }

  function renderGraphic() { 
    switch (choice) { 
      case 0:
        return (<Rose></Rose>);
      case 1: 
        return graphicContainer("catcradle")
      case 2: 
        return graphicContainer("cars")
      case 3:
        return graphicContainer("disintegrate")
      case 4:
        return graphicContainer("bearings2")
      case 5:     
        return graphicContainer("twgl-tfpx")
    }
  }

  return (
    <div id="projects-container"
            className="image-border-big-container border neumorph--image-border-big">
      <Header title={choices[choice]} layout="inline" className="image-border-big-top" />
      <Container fluid>
        <Row>
            {renderGraphic()}
        </Row>
        {/* TODO: cohesive footer component, REFACTOR TO USE LAYOUT!!! */}
        <Row className="footer justify-content-center image-border-big-bottom">
          <Footer>
            <Col> 
              <SocialIcon url="https://www.linkedin.com/in/garrisonmcmullen/"
                        style={{ height: '48px', width: '48px', margin: '2vmin' }} />
              <SocialIcon url="https://www.soundcloud.com/garrison0"
                        style={{ height: '48px', width: '48px', margin: '2vmin' }} />
              <SocialIcon url="https://www.youtube.com/channel/UCcZYyXLJ7yEH3lWm58RoKRA" 
                        style={{ height: '48px', width: '48px', margin: '2vmin' }} />
              <SocialIcon url="https://www.paypal.me/moodmusic" 
                        style={{ height: '48px', width: '48px', margin: '2vmin' }} />
            </Col>
          </Footer>
        </Row>
      </Container>
    </div>
  );
}

export default Home;

