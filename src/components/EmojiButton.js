import React from 'react';
import Col from 'react-bootstrap/Col';
import { Link } from "@reach/router"

export default function EmojiButton(props) {
  let dest = props.section.split(" ")[0];
  if (dest === "home"){
    return (
      <Col xs={3} md={2} className="nound text-center mt-1"> 
        <Link to='/'>
          <span role="img" aria-label={props.section + " link"}>
            {props.emoji}
          </span> 
        </Link>
      </Col>
    )
  } else {
    return (
      <Col xs={3} md={2} className="mt-1 text-center"> 
        <Link to={'/' + dest}>
          <span role="img" aria-label={props.section + " link"}>
            {props.emoji}
          </span> 
        </Link>
      </Col>
    );
  }
}