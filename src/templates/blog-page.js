import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import BlogRoll from '../components/BlogRoll'
import styled from 'styled-components'

const Heading = styled.div`
  padding: 10px 20px;
  position: absolute;
  background-color: #3c4557;
  font-family: ${props => props.theme.fontBase};
  font-size: 14px;
  color: #fff;
  left: 45%;
  top: -22px;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;

&.rel {
  position: relative;
  top: inherit;
  left: inherit;
  display: inline-block;


  &.light {
    background-color: white;
    color: #3c4557;
  }
}

&.center {
  display: flex;
  justify-content: center;
  width: max-content;
  margin: 0 auto;
}
`
const Section = styled.div`

  display: flex;
  width: 100%;
  height: max-content;
  position: relative;
  padding: 20px 0;

  text-align: center;

  ul {
    padding: 0;
  }

  ul li {
    list-style: none;
    font-style: italic;
  }

  h3 {
    font-family: ${props => props.theme.fontHeadingBold};
    font-size: 35px;
    text-align: center;
  }

&.bg-light {
  background-color: white;
  color: #000;
}

&.bg-dark {
  background-color: #3c4557;
  color: white;
  text-align: center;
}
`

const SectionContent = styled.div`
  width: 800px;
  margin: 0 auto;
`

export const BlogPageTemplate = (props) => {
  const { content, contentComponent, hero, section} = props

  const PageContent = contentComponent || Content

  return (
    <div>
      <PageHeader hero={hero} featured />
      {content &&
        <PageContent className="content" content={content} dark="dark" />
      }
      {section.map((item, key) => {
        const bkColor = key % 2 === 0 ? 'light' : 'dark'
        return (
          <Section className={`bg-${bkColor}`}>
            <SectionContent>
              <Heading>
                {item.heading}
              </Heading>
              <BlogRoll />
            </SectionContent>
          </Section>
        )
      })

      }
    </div>
  )
}

BlogPageTemplate.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const BlogPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout seo={post.frontmatter.seo}>
      <BlogPageTemplate
        contentComponent={HTMLContent}
        hero={post.frontmatter.hero}
        content={post.html}
        section={post.frontmatter.section}
      />
    </Layout>
  )
}

BlogPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default BlogPage

export const blogPageQuery = graphql`
  query BlogPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        seo {
          socialTitle
          description
          socialDescription
          keywords
          title
          socialImage {
            publicURL
          }
        }
        title
        hero {
          heading
          intro
          image {
            childImageSharp {
              fluid(maxWidth: 1200, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        section {
          heading
          content
        }
      }
    }
  }
`
