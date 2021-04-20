import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse'
import EmojiButton from './EmojiButton.js';
import { Link } from "gatsby"

/* @layout := [default, vertical, inline]
    inline lies within a div (see projects, blog)
    vertical expands vertically (see sinewave page)
    default has margin, etc (see home)
*/
export default function Header(props){
  const [open, setOpen] = useState(true);
  const [enter, setEnter] = useState(false);

  let button_styling = { 
    'paddingBottom': '4px',
    'paddingLeft': '0px',
  };
  
  let CLASSES = "";
  let SHOW_CLASSES = "";
  let isVertical = false;
  let isInline = false;
  var button_classes = "";
  switch ( (props.layout || '').toLowerCase() ) { 
    case "inline":
      CLASSES += " Header__inline image-border-big-top border-bottom";
      button_styling['display'] = 'none';
      button_classes = "text-left text-muted EmojiButton pr-0 my-auto"
      isInline = true;
      break;
    case "vertical":
      CLASSES += " Header__vertical border border-light neumorph-dark height image-border";
      SHOW_CLASSES = "show";
      button_classes = "text-left text-muted EmojiButton pr-0 mt-1"
      isVertical = true;
      break;
    default:
      CLASSES += " Header mt-3 border border-light width neumorph";
      button_classes = "text-left text-muted EmojiButton pr-0 my-auto"
      SHOW_CLASSES = "show";
      break;
  }

  let expandButton;
  if (props.align !== "left") {
    expandButton = <Col xs={1} className={button_classes}
                        style={isVertical ? {height: '50px'} : 
                              (isInline ? {display: 'none'} : {})}>
      <div style={button_styling}>
        <a
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}> 
          ⁘
        </a> 
      </div>
    </Col>
  }
  const showButtonsLogic = () => 
  {
    if (isVertical) 
    { 
      return {};
    } 
    return open && !enter 
                ? {'display': 'flex',  } 
                : {'display': 'none'}
  }

  return (
    <Collapse in={open} 
              onEnter={function () { setEnter(true) }} 
              onEntered={function () { setEnter(false) }}
              >
      <Row className={enter ? SHOW_CLASSES + CLASSES : CLASSES}>
        {/* emoji icons */}
        {expandButton}
        <Col style={showButtonsLogic()} xs={isInline ? 12 : 11}>
          <Row style={isVertical ? {} : {width: '100vw'}}> 
            <Col xs={isVertical ? 12 : 8} 
                 className="text-left my-auto">
              <div style={isVertical ? {paddingBottom: '2em'} : {paddingTop: '0.2vw'}}>
                <Link to="/">
                  <div className={isInline ? "header__title" : ""}>
                    {isVertical ? "MDMC" : props.title || 'MOODMUSIC'}
                  </div>
                </Link>
              </div>
            </Col>
            {/* <EmojiButton vertical={isVertical} emoji="∿&#xFE0E;" section="about page"/> */}
            <EmojiButton vertical={isVertical} emoji="⊥&#xFE0E;" section="blog"/>
            <EmojiButton vertical={isVertical} emoji="𝕌&#xFE0E;" section="projects"/>
          </Row>
        </Col>
      </Row>
    </Collapse>
  );
}