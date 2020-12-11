import React from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { navigate } from 'gatsby-link'

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}


export const ContactPageTemplate = (props) => {

  const handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }


  const { content, contentComponent, hero } = props

  const PageContent = contentComponent || Content

  return (
    <div>
      <PageHeader hero={hero} />
      {content &&
        <>
        <PageContent className="content" content={content} dark="dark" />
        <form
          name="contact"
          method="post"
          action="/contact/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" onChange={handleChange}/>
          <div hidden>
            <label>
              Don’t fill this out:{' '}
              <input name="bot-field"  />
            </label>
          </div>
          <div className="field">
            <label className="label" htmlFor={'name'}>
              Your name
            </label>
            <div className="control">
              <input
                className="input"
                type={'text'}
                name={'name'}
                id={'name'}
                required={true}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'email'}>
              Email
            </label>
            <div className="control">
              <input
                className="input"
                type={'email'}
                name={'email'}
                id={'email'}
                required={true}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'message'}>
              Message
            </label>
            <div className="control">
              <textarea
                className="textarea"
                name={'message'}
                id={'message'}
                required={true}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <button className="button is-link" type="submit">
              Send
            </button>
          </div>
        </form>
        </>
      }

    </div>
  )
}

ContactPageTemplate.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout seo={post.frontmatter.seo}>
      <ContactPageTemplate
        contentComponent={HTMLContent}
        hero={post.frontmatter.hero}
        content={post.html}
        section={post.frontmatter.section}
      />
    </Layout>
  )
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactPage

export const ContactPageQuery = graphql`
  query ContactPage($id: String!) {
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

      }
    }
  }
`
