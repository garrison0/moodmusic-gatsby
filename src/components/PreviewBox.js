import React from 'react';
import Col from 'react-bootstrap/Col';
import Iframe from 'react-iframe'

function PreviewBox(props) {
    return (
      <a style={{'width': '100%'}} target="" href={props.dest}>
        <Col xs={12} style={{'overflow': 'hidden'}}>
          <Iframe url={props.url}
                  id={props.id}
                  position="relative"
                  className="image-border neumorph preview" />
          <div className="textbox">
            <div className="textbox-text" id="mountainsPopup">
              {props.slogan}
            </div>
          </div>
        </Col>
      </a>
    );
  }

export default PreviewBox;