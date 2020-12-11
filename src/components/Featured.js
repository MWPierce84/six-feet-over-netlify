import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import styled from 'styled-components'

const FeaturedBox = styled.div`
  padding: 20px;
  display: flex;
  height: 400px;
  justify-content: center;

  .featured-image {
    position: relative !important;
    width: 400px;
  }

  .button {
    padding: 10px 30px;
    background-color: white;
    color: #000;
    border-radius: 15px;
    text-decoration: none;

  }
`

const FeaturedContent = styled.div`
  width: 400px;
  background-color: #C1F7D5;
  margin-right: 30px;
  padding: 20px;
`

class Featured extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <>
        {posts &&
          posts.map(({ node: post }) => (

            <FeaturedBox key={post.id}>
              <FeaturedContent>
              <h3>{post.frontmatter.title}</h3>
              {post.excerpt}
              <br />
              <br />
              <Link className="button" to={post.fields.slug}>
                Keep Reading
              </Link>
              </FeaturedContent>
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.coverImage,
                  alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                }}
                extraClass={'featured-image'}
              />
            </FeaturedBox>
          ))}
      </>
    )
  }
}

Featured.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query FeatureQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" }, featuredpost: { eq: true } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                coverImage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Featured data={data} count={count} />}
  />
)
