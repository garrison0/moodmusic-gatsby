import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmojiButton from './EmojiButton.js';

export default function Header(){
  return (
    <Row className="fixed mt-2 justify-content-center border-light border
                    Header">
      {/* emoji icons */}
        <EmojiButton emoji="⌂&#xFE0E;" section="home" />
        <EmojiButton emoji="∿&#xFE0E;" section="about page" />
        <EmojiButton emoji="⊥&#xFE0E;" section="blog" />
        <EmojiButton emoji="𝕌&#xFE0E;" section="projects" />
    </Row>
  );
}