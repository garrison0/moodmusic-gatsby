import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import styled from 'styled-components'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import { SocialIcon } from 'react-social-icons';
import Header from '../components/Header.js'

const Footer = styled.footer`
  text-align: center;
  margin: 36px;
`

class Blog extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <div id="projects-container" title="words"
              className="image-border-big-container border neumorph--image-border-big">
        <Header layout="inline" className="image-border-big-top" />
        <Container fluid>
          <Row className="px-5 py-3"> 
            <SEO title="All posts" />
            <Bio />
            <div style={{ margin: "20px 0 40px" }}>
             {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                  <div key={node.fields.slug}>
                    <h3
                      style={{
                        marginBottom: rhythm(1 / 4),
                      }}
                    >
                      <Link
                        style={{ boxShadow: `none` }}
                        to={`/blog${node.fields.slug}`}
                      >
                        {title}
                      </Link>
                    </h3>
                    <small>{node.frontmatter.date}</small>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </Row>
          {/* TODO: cohesive footer component, REFACTOR TO USE LAYOUT!!! */}
          <Row className="footer justify-content-center image-border-big-bottom">
            <Col> 
              <SocialIcon url="https://www.soundcloud.com/garrison0"
                        style={{ height: '48px', width: '48px', margin: '2vmin' }} />
              <SocialIcon url="https://www.youtube.com/channel/UCcZYyXLJ7yEH3lWm58RoKRA" 
                        style={{ height: '48px', width: '48px', margin: '2vmin' }} />
              <SocialIcon url="https://www.paypal.me/moodmusic" 
                        style={{ height: '48px', width: '48px', margin: '2vmin' }} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  //   return (
  //     <Layout location={this.props.location} title={siteTitle}>
  //       
  //     </Layout>
  //   )
  // }
  }
}

export default Blog

export const pageQuery = graphql`
  query blog {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
