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

const Footer = styled.footer`
  text-align: center;
  margin: 36px;
`

const Home = () => {
  const data = useStaticQuery(graphql`
    query selfPortraitHome {
      selfPortrait: file(relativePath: {eq: "selfportrait.jpg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      projectImage: file(relativePath: {eq: "ML-DISPLAY.png"}) {
        childImageSharp {
          fluid { 
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  // console.log(data);
  return (
  <Container fluid='true'>
    {/* fireworks script */}
    <Header />
    <Row style={{height: '100vh'}}> 
      <Col className="p-0 m-0">
        <Iframe url="/vanillajs/fireworks.html" 
          width="100%"
          height="100%"
          id="myId"
          display="initial"
          frameBorder="0"
          position="relative" />
      </Col>
    </Row>
    <BioCarousel />
    {/* TO-DO: cohesive footer component, REFACTOR TO USE LAYOUT!!! */}
    <Footer>
      © {new Date().getFullYear()}, made by Garrison McMullen 
      <SocialIcon url="https://www.linkedin.com/in/garrisonmcmullen/"
                style={{ height: '5vmin', width: '5vmin', margin: '2vmin' }} />
      <SocialIcon url="https://www.soundcloud.com/garrison0"
                style={{ height: '5vmin', width: '5vmin', margin: '2vmin' }} />
      <SocialIcon url="https://www.paypal.me/moodmusic" 
                style={{ height: '5vmin', width: '5vmin', margin: '2vmin' }} />
    </Footer>
  </Container>);
}

export default Home;

