import React from 'react';
import Header from '../components/Header'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Image from 'gatsby-image/withIEPolyfill';
import { graphql, useStaticQuery } from 'gatsby'
import Button from 'react-bootstrap/Button'
import { SocialIcon } from 'react-social-icons';
import styled from 'styled-components'

const Footer = styled.footer`
  text-align: center;
  margin: 36px;
`

function About() {
  const data = useStaticQuery(graphql`
    query aboutPageFiles {
      mlImage: file(relativePath: {eq: "me_vertical.png"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }`
  )
  return (
    <div id="projects-container"
            className="image-border-big-container border neumorph--image-border-big">
      <Header layout="inline" className="image-border-big-top" />
      <Container fluid>
        <Row> 
          <Col xs={12} md={5}>
            <Image fluid={data.mlImage.childImageSharp.fluid} className="cover"/>
          </Col>
          <Col xs={12} md={7}>
            <p className="my-3">
              Hey, I have a YouTube channel for music - covers, guitar interpretations, original music, etc! I also showcase creative coding projects with my music.
            </p>
            <a href="https://www.youtube.com/channel/UCcZYyXLJ7yEH3lWm58RoKRA">
              <Button variant="outline-primary"
                      style={{marginBottom: '1rem'}}>
                Check it out!
              </Button>
            </a>
            <p style={{whiteSpace: 'pre-line'}}>
              Here's some equipment I use, if you're interested. <br/>

              <h4 className="mt-2">FOR GUITAR: </h4>
              <ul style={{fontSize: "14px"}}>
                <li>Larrivee OM-03R 2014 </li>
                <li>Seagull Maritime SWS Mini Jumbo </li>
                <li>Indio Telecaster with Seymour Duncan pickups (Little '59 bridge pickup and Hot for Tele neck pickup) </li>
                <li>Roland Cube Street amp (it works for me -- or I'll record direct) </li>
                <li>JamMan Solo XT Looper Pedal </li>
             </ul>
              <h4>FOR RECORDING:</h4>
              <ul style={{fontSize: "14px"}}>
                <li> Sony HDR-CX405 clipped onto mic boom stand with a clamping 'gooseneck' phone holder (super easy and cheap tripod!) </li>
                <li> Focusrite 18i8 3rd generation audio USB interface </li>
                <li> sE3 matched pair (in usually in X/Y or ORTF orientation) </li>
                <li> SM58 </li>
              </ul>
            </p>
          </Col>
        </Row>
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

export default About;