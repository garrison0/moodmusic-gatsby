import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import Iframe from 'react-iframe'
import { graphql, useStaticQuery } from 'gatsby'
import { SocialIcon } from 'react-social-icons';
import Header from '../components/Header.js'
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
      selfImage: file(relativePath: {eq: "me_cover.jpg"}) {
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
      <Header layout="inline" className="image-border-big-top" />
      <Container fluid>
        {/* fireworks script */}
        <Row> 
          <Col className="p-0 m-0">
            <Image fluid={data.selfImage.childImageSharp.fluid}/>
            {/* <Iframe url="/vanillajs/fireworks.html" 
              width="100%"
              height="100%"
              id="myId"
              display="initial"
              frameBorder="0"
              position="relative" />
            <div className="text-center w-100" onClick={() => scrollTo('#about-section')} >
              <Image fluid={data.downArrowIndicator.childImageSharp.fluid}  
                            style={{ width: '3.5em', position: 'absolute', bottom: 0, left: 'calc(50% - 1.5em)' }}
                            alt="hey, scroll down!"/>
            </div> */}
          </Col>
        </Row>
        <Row>
            <HereIAm></HereIAm>
        </Row>
        {/* TODO: cohesive footer component, REFACTOR TO USE LAYOUT!!! */}
        <Row className="footer justify-content-center image-border-big-bottom">
          <Footer>
            <Col> 
              <SocialIcon url="https://www.linkedin.com/in/garrisonmcmullen/"
                        style={{ height: '5vmin', width: '5vmin', margin: '2vmin' }} />
              <SocialIcon url="https://www.soundcloud.com/garrison0"
                        style={{ height: '5vmin', width: '5vmin', margin: '2vmin' }} />
              <SocialIcon url="https://www.youtube.com/channel/UCcZYyXLJ7yEH3lWm58RoKRA" 
                        style={{ height: '5vmin', width: '5vmin', margin: '2vmin' }} />
              <SocialIcon url="https://www.paypal.me/moodmusic" 
                        style={{ height: '5vmin', width: '5vmin', margin: '2vmin' }} />
            </Col>
          </Footer>
        </Row>
      </Container>
    </div>
  );
}

export default Home;

