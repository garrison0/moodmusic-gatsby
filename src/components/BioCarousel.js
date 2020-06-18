import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image/withIEPolyfill';
import ItemsCarousel from 'react-items-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import BioDescriptions from './BioDescriptions.js'

export default function BioCarousel(props) {
  const data = useStaticQuery(graphql`
    query findSelfPortrait {
      selfPortrait: file(relativePath: {eq: "selfportrait_text.png"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      projectImage: file(relativePath: {eq: "girl_with_pe.png"}) {
        childImageSharp {
          fluid { 
            ...GatsbyImageSharpFluid
          }
        }
      }
      musicImage: file(relativePath: {eq: "wave_harmonics.png"}) {
        childImageSharp {
          fluid { 
            ...GatsbyImageSharpFluid
          }
        }
      }
      wowImage: file(relativePath: {eq: "wow.png"}) {
        childImageSharp {
          fluid { 
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  // label carousel index
  const [index, setIndex] = useState(0);
  // picture carousel index
  const [bsCarouselIndex, setBSCarouselIndex] = useState(0);
  const NUMBER_OF_CAROUSEL_ITEMS = 3;

  const handleCarouselClick = () => {
    setIndex(index+1)
    setBSCarouselIndex((index+2) % NUMBER_OF_CAROUSEL_ITEMS);
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Row id="about-section" style={{background: '#fff', height: '100%', minHeight: '35em', padding: '0'}} className="border border-dark">
      {/* another row, w the col inside being the text box */}
      <Col xs={{span: 12, order: 1}} md={6} className="bioDescription--higherPosition">
        <Col className="px-4 bio_descriptions_carousel">
          <h2 className="d-none d-md-block"><b>About</b></h2>
          <br className="d-none d-md-block"/>
          {/* adds a line */}
          <p id="line" className="border w-75 mb-3"></p> 
          <div className="mb-5"><BioDescriptions index={bsCarouselIndex}></BioDescriptions></div>
        </Col>
      </Col>

      <Col xs={{span: 12, order: 0}} md={{span: 6, order: 1}} className="overflow-hidden" >
        {/* CAROUSELS */}
        <Row className="justify-content-center image_carousel--inset">
          {/* IMAGE CAROUSEL. */}
          <Col xs={12} className="image_carousel">
            <Carousel style={{height: '100%'}}
                      className="margin_left_card"
                      fade={true}
                      indicators={false} controls={false} interval={null} 
                      activeIndex={bsCarouselIndex} onSelect={()=>{}}> 

              <Carousel.Item style={{height: "100%"}}>
                <Image fluid={data.selfPortrait.childImageSharp.fluid} 
                        objectFit="contain"
                        style={{ maxHeight: "100%", height: "70%", background: "rgb(255,255,255)" }}
                        alt="picture of me" 
                        className="my-auto mx-2 image-border-big border border-light neumorph" />
                {/* <Carousel.Caption>
                  <h3 style={{color: 'rgb(0,0,0)'}}><b></b></h3>
                </Carousel.Caption> */}
              </Carousel.Item>
              
              <Carousel.Item style={{height: "100%"}}>
                <Image fluid={data.projectImage.childImageSharp.fluid} 
                      objectFit="contain"
                      style={{ maxHeight: "100%", height: "70%", backgroundColor: "rgb(255,255,255)" }}
                      alt="picture of one of my projects" 
                      className="my-auto mx-2 image-border-big border border-light neumorph" />
                {/* <Carousel.Caption>
                  <h3 style={{color: 'rgb(0,0,0)'}}><b></b></h3>
                </Carousel.Caption> */}
              </Carousel.Item>
              
              <Carousel.Item style={{height: "100%"}}>
                <Image fluid={data.musicImage.childImageSharp.fluid} 
                      objectFit="contain"
                      style={{ maxHeight: "100%", height: "70%", backgroundColor: "rgb(255,255,255)" }}
                      alt="picture of harmonics" 
                      className="my-auto mx-2 image-border-big border border-light neumorph" />
                {/* <Carousel.Caption>
                  <h3 style={{color: 'rgb(0,0,0)'}}><b></b></h3>
                </Carousel.Caption> */}
              </Carousel.Item>

            </Carousel>
          </Col>
          {/* SEPARATE CAROUSEL OF LABELS THAT SLIDE BOTH CAROUSELS LEFT ON CLICK */}
          <Col xs={{span:6, offset:5}} style={{paddingRight: '0', paddingLeft: '0', bottom: 'calc(60px + 2vw)'}}>
            <div style={{"maxWidth":"100"}}>
              <ItemsCarousel
                infiniteLoop
                numberOfCards={1}
                slidesToScroll={1}
                showSlither={true}
                activeItemIndex={index}
                requestToChangeActive={value => setIndex(value)}
                disableSwipe={true}
                classes={{itemsWrapper: "overflow-visible"}}
                style={{overflow: 'visible!important'}}>
                    <a onClick={handleCarouselClick}><h3><b>Tech</b></h3></a>
                    <a onClick={handleCarouselClick}><h3><b>Music</b></h3></a>
                    <a onClick={handleCarouselClick}><h3><b>Me</b></h3></a>
              </ItemsCarousel>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}