import React from 'react';
import Col from 'react-bootstrap/Col';
import { Link } from "gatsby"

export default function EmojiButton(props) {
  let dest = props.section.split(" ")[0];
  return (
    <Col xs={props.vertical ? 12 : 2} 
         className="text-center my-auto EmojiButton" style={{'paddingBottom': 3}}> 
      <Link to={'/' + dest}>
        <span role="img" aria-label={props.section + " link"}>
          {props.emoji}
        </span> 
      </Link>
    </Col>
  );
}