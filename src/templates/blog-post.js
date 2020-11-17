
import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import "katex/dist/katex.min.css"

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Container from 'react-bootstrap/Container'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <div id="projects-container"
              className="image-border-big-container border neumorph--image-border-big">
        <Header layout="inline" className="image-border-big-top" />
        <Container fluid>
          <Row className="px-5 py-3"> 
            <SEO
              title={post.frontmatter.title}
              description={post.frontmatter.description || post.excerpt}
            />
            <h1>{post.frontmatter.title}</h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                width: `100%`,
                marginBottom: rhythm(1),
                marginTop: rhythm(0),
              }}
            >
              {post.frontmatter.date}
            </p>
            <MDXRenderer>{post.body}</MDXRenderer>
            <hr
              style={{
                marginBottom: rhythm(1),
              }}
            />
            <Bio />

            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
                marginTop: '.75em'
              }}
            >
              <li style={{width: `100%`}}>
                {previous && (
                  <Link to={`/blog${previous.fields.slug}`} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li style={{float: `right`}}>
                {next && (
                  <Link to={`/blog${next.fields.slug}`} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </Row>
        </Container>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
