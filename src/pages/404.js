import React from "react"
import { graphql } from "gatsby"
import Iframe from 'react-iframe'
import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <div> 
        <Iframe url="/vanillajs/boids.html" 
                  width="100%"
                  height="100%"
                  id="myId"
                  frameBorder="0"
                  position="absolute"
                  overflow='show'
                  styles={{zIndex: 0}}>  
          
        </Iframe>
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="404: Not Found" />
          <h1>404</h1>
          <p>You've found my closet... this page doesn't exist yet. Feel free to vaccuum.</p>
        </Layout>
      </div>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
