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

const Wrapper = styled.div`
  padding: 20px 0;
  bottom: 19px;
  text-align: left;
  max-width: 1000px;
  left: 0;
  right: 0;
  position: absolute;
`;

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
    }
  `)
  // label carousel index
  const [index, setIndex] = useState(0);
  // picture carousel index
  const [bsCarouselIndex, setBSCarouselIndex] = useState(0);
  const NUMBER_OF_CAROUSEL_ITEMS = 3;

  const handleCarouselClick = () => {
    setIndex(index+1)
    setBSCarouselIndex((index+1) % NUMBER_OF_CAROUSEL_ITEMS);
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Row style={{height: '100%', minHeight: '100vh'}} className="border border-light"> 

      <Col xs={{span: 12, order: 1}} md={{span: 5, order: 0}}>
        {/* another row, w the col inside being the text box */}
        <Row style={{height: '100%'}} className="justify-content-end mr-3">
          <Col xs="9" className="bio_descriptions_carousel">
            <h2 className="d-none d-md-block"><b>About</b></h2>
            <br className="d-none d-md-block"/>
            {/* adds a line */}
            <p id="line" className="border border-light w-50 mb-2"></p> 
            <BioDescriptions index={bsCarouselIndex}></BioDescriptions>
          </Col>
        </Row>
      </Col>

      <Col xs={{span: 12, order: 0}} md={{span: 7, order: 1}}>
        {/* CAROUSELS */}
        <Row style={{height: '100%'}} >
          {/* IMAGE CAROUSEL */}
          <Col xs={6} className="image_carousel">
            <Carousel style={{height: '100%', marginTop: '0vh'}}
                      indicators={false} controls={false} interval={null} 
                      activeIndex={bsCarouselIndex} onSelect={()=>{}}> 

              <Carousel.Item style={{height: "100%"}}>
                <Image fluid={data.selfPortrait.childImageSharp.fluid} 
                        objectFit="contain"
                        style={{ maxHeight: "100%", height: "70%" }}
                        alt="picture of me" 
                        className="my-auto mx-2 image-border-big border border-light neumorph--image-border-big" />
                <Carousel.Caption>
                  <h3 style={{color: 'rgb(0,0,0)'}}><b>Me</b></h3>
                </Carousel.Caption>
              </Carousel.Item>
              
              <Carousel.Item style={{height: "100%"}}>
                <Image fluid={data.projectImage.childImageSharp.fluid} 
                      objectFit="contain"
                      style={{ maxHeight: "100%", height: "70%" }}
                      alt="picture of one of my projects" 
                      className="my-auto mx-2 image-border-big border border-light neumorph--image-border-big" />
                <Carousel.Caption>
                  <h3 style={{color: 'rgb(0,0,0)'}}><b>Tech</b></h3>
                </Carousel.Caption>
              </Carousel.Item>
              
              <Carousel.Item style={{height: "100%"}}>
                <Image fluid={data.musicImage.childImageSharp.fluid} 
                      objectFit="contain"
                      style={{ maxHeight: "100%", height: "70%" }}
                      alt="picture of harmonics" 
                      className="my-auto mx-2 image-border-big border border-light neumorph--image-border-big" />
                <Carousel.Caption>
                  <h3 style={{color: 'rgb(0,0,0)'}}><b>Music</b></h3>
                </Carousel.Caption>
              </Carousel.Item>

            </Carousel>
          </Col>
          {/* SEPARATE CAROUSEL OF LABELS THAT SLIDE BOTH CAROUSELS LEFT ON CLICK */}
          <Col xs={6} className="image_carousel" style={{paddingRight: '0', paddingLeft: '0'}}>
            <Wrapper>
              <div style={{"maxWidth":"1000"}}>
                <ItemsCarousel
                  infiniteLoop
                  numberOfCards={2}
                  slidesToScroll={1}
                  showSlither={true}
                  activeItemIndex={index}
                  requestToChangeActive={value => setIndex(value)}>
                      <a onClick={handleCarouselClick}><h3><b>Tech</b></h3></a>
                      <a onClick={handleCarouselClick}><h3><b>Music</b></h3></a>
                      <a onClick={handleCarouselClick}><h3><b>Me</b></h3></a>
                </ItemsCarousel>
              </div>
            </Wrapper>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}