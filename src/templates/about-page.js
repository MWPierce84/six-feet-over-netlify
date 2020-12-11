import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Bio from '../components/Bio'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import styled from 'styled-components'
import remark from 'remark'
import remarkHTML from 'remark-html'


const toHTML = value => remark()
                            .use(remarkHTML)
                            .processSync(value)
                            .toString()

const Vision = styled.div`
  display: flex;
  position: relative;
  background-color: #C1F7D5;



  .heading-vision {
    top: -22px;
  }

  img {
    width: 300px;
  }

  .founders-content {
    p {
      @media only screen and (max-width: ${props => props.theme.tablet}) {
        width: 600px;
      }
    }
  }

  p {
    font-family: ${props => props.theme.fontHeading};
    width: 800px;
    margin: 80px auto;
    font-size: 40px;
    text-align: center;
    line-height: 48px;
    z-index: 1;
    padding: 20px;
    background-color: white;
    color: black;


  }




  &.base-font {
    background-color: #fff;
    display: flex;
    justify-content: center;
    margin: 50px 0 50px 0;
    .heading {
      top: -69px;
    }
    p {
      font-family: ${props => props.theme.fontBase};
      font-size: 20px;
      line-height: 28px;
      margin: 0 0 20px 0;
    }
  }
`

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

  &.bio-heading {
    @media only screen and (max-width: ${props => props.theme.tablet}) {
      left: 20px !important;
    }
  }

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

const SectionDark = styled.div`
  background-color: #3c4557;
  padding: 86px 0;
  position: relative;

  &.impact {
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      background-image: url('/img/impact-bg.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      z-Index: 1;
      opacity: 0.1;
    }

  }
`
const ContentContainer = styled.div`
  width: 1024px;
  margin: 0 auto;

  .goals {
    margin: 30px 0 0 0;
    padding: 0;
    display: flex;
    justify-content: space-evenly;

    @media only screen and (max-width: ${props => props.theme.tablet}) {
      flex-wrap: wrap;
      width: 768px;
      flex-direction: row;
    }

    li {
      list-style: none;
      margin-right: 15px;
      color: white;

      @media only screen and (max-width: ${props => props.theme.tablet}) {
        width: 200px;
      }
      h3 {
        color: white;
        margin-bottom: 5px;
      }
      p {
        color: white;
        margin-top: 0;
        line-height: 26px;
      }
    }
  }
`

const Bios = styled.div`
  margin: 50px 0 50px 0;


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

export const AboutPageTemplate = (props) => {
  const { content, contentComponent, hero, visionSection, goals, founders, members, section } = props

  const PageContent = contentComponent || Content
  const foundersContent = toHTML(founders)

  return (
    <div>
      <PageHeader hero={hero} />
      <PageContent className="content" content={content} dark="dark" />
      {section && section.map((item, key) => {
        const bkColor = key % 2 === 0 ? 'light' : 'dark'
        return (
          <Section className={`bg-${bkColor}`}>
            <SectionContent>
              <Heading>
                {item.heading}
              </Heading>
              <div dangerouslySetInnerHTML={{__html: toHTML(item.content) }} />
            </SectionContent>
          </Section>
        )
      })

      }
      <Vision>
        <PreviewCompatibleImage
          imageInfo={{
            image: visionSection.image,
            alt: ``,
          }}
        />
        <Heading className="heading-vision">Vision</Heading>
        <p>{visionSection.copy}</p>
      </Vision>
      <SectionDark>
        <ContentContainer>
          <Heading className={`rel light`}>
            {goals.title &&
              <>
                {goals.title}
              </>
            }
          </Heading>

          <ul className="goals">
            {goals.items.map((item, index) => (
              <li key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </ContentContainer>
      </SectionDark>
      <Vision className="base-font">
        <Heading className="heading">Founders Story</Heading>
        <div className={`founders-content`} dangerouslySetInnerHTML={{__html: foundersContent }} />
      </Vision>
      <SectionDark>
        <ContentContainer>
          <Heading className={`rel light bio-heading`}>
            Board Members
          </Heading>

          <Bios>
            {members.map((member, key) => {
              console.log(member)
              const dir = key % 2 === 0 ? 1 : 0

              return (
                <Bio bio={member} key={key} dir={dir} />
              )
              })}
          </Bios>
        </ContentContainer>
      </SectionDark>
    </div>
  )
}

AboutPageTemplate.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout seo={post.frontmatter.seo}>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        hero={post.frontmatter.hero}
        visionSection={post.frontmatter.visionSection}
        content={post.html}
        section={post.frontmatter.section}
        goals={post.frontmatter.goals}
        founders={post.frontmatter.founders}
        members={post.frontmatter.members}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
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
        visionSection {
          copy
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
        goals {
          title
          items {
            title
            description
          }
        }
        founders
        members {
          photo {
            childImageSharp {
              fluid(maxWidth: 300, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }

          }
          name
          title
          bio
        }
      }
    }
  }
`
