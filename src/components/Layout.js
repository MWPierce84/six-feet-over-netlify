import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../../static/scss/main.scss'
import { withPrefix } from 'gatsby'
import { ThemeProvider } from "styled-components"
import StickyFooter from './StickyFooter';

const theme = require("sass-extract-loader?{\"plugins\": [\"sass-extract-js\"]}!../../static/scss/_variables.scss")

const TemplateWrapper = ({ seo, children }) => {
  //const { title, description } = useSiteMetadata()


  let pageTitle = 'Six Feet Over'
  let desc = 'Six Feet Over is a Detroit-based nonprofit working to spread awareness about suicide prevention and provide financial assistance to suicide loss survivors.'
  let socImage = ''
  let keywords = ''

  if ( seo !== null && seo !== undefined) {
    pageTitle = seo.title
    desc = seo.description
    keywords = seo.keywords
    socImage = seo.socialImage.publicURL
  }

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{pageTitle}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('')}${socImage.publicURL}`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('')}${socImage.publicURL}`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('')}${socImage.publicURL}`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('')}${socImage.publicURL}`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('')}}${socImage.publicURL}`}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-138973260-1" />

          <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-96904622-1');
            `}
          </script>


      </Helmet>
			<ThemeProvider theme={theme}>
				<Navbar />
				<div>{children}</div>
        <StickyFooter />
				<Footer />

			</ThemeProvider>
    </>
  )
}

export default TemplateWrapper
