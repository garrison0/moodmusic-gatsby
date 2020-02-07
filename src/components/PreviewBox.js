import React from 'react';
import Col from 'react-bootstrap/Col';
import Iframe from 'react-iframe'

function PreviewBox(props) {
    return (
      <a target="" href={props.dest}>
        <Col xs={{ span: 12, offset: 4 }} md= {{span: 4, offset: 0}}
            lg={{ span: 3, offset: 0 }}
          className="ml-md-5 mb-3">
          <div className="corner-wrapper">
            <Iframe url={props.url}
                    width="240px"
                    id={props.id}
                    position="relative" />
            <div className="textbox">
              <span className="textbox-text" id="mountainsPopup">
                {props.slogan}
              </span>
            </div>
          </div>
        </Col>
      </a>
    );
  }

export default PreviewBox;