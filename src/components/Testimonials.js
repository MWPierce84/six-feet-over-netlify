import React, { useState } from "react"
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TestimonialsContainer = styled.div`

  margin: 80px auto;
  position: relative;
  width: 1200px;
  min-height: 867px;

  @media only screen and (max-width: ${props => props.theme.tablet}) {
    min-height: initial;
  }

  @media only screen and (max-width: ${props => props.theme.mobile}) {
    width: 350px;
    justify-content: center;
  }
`

const ArticleContainer = styled.div`
  &.inactive {
    display: none;
  }

  @media only screen and (max-width: ${props => props.theme.tablet}) {
    display: flex;
    width: 768px;
    justify-content: center;
    margin-top: 33px;
  }

  @media only screen and (max-width: ${props => props.theme.mobile}) {
    flex-direction: column;
    width: 350px;
  }

  article {
  background-color: #354463;
  color: white;
  width: 544px;
  top: 50px;

  @media only screen and (max-width: ${props => props.theme.tablet}) {
    width: 300px;
  }

  @media only screen and (max-width: ${props => props.theme.mobile}) {
    width: 350px;
  }

  z-index: 2;
  position: relative;

  .message-body {
    padding: 40px;
    font-family: ${props => props.theme.fontHeadingBold};
    font-size: 25px;
    line-height: 40px;

    @media only screen and (max-width: ${props => props.theme.tablet}) {
      font-size: 14px;
    }
    cite {
      font-family: ${props => props.theme.fontBase};
      font-style: normal;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }

`

const TestimonialImage = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  height: 800px;
  width: 720px;
  overflow: hidden;
  right: 0;
  display: flex;
  justify-content: flex-end;

  @media only screen and (max-width: ${props => props.theme.tablet}) {
    position: relative;
    width: 380px;
    top: 50px;
    height: initial;
  }

  @media only screen and (max-width: ${props => props.theme.mobile}) {
    width: 350px;
  }

  div {
    position: relative;
  }

  img {

    width: 100%;
  }
`

const DotContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    z-index: 3;
    position: relative;

    @media only screen and (max-width: ${props => props.theme.tablet}) {
      position: relative;
      width: 768px;
      justify-content: center;
    }

    @media only screen and (max-width: ${props => props.theme.mobile}) {
      width: 350px;
    }
`

const Dot = styled.a`
    position: relative;
    display: inline-block;
    margin-right: 21px;
    cursor: pointer;

    &.active {
      &:before {
        position: absolute;
        content: '';
        border-radius: 100%;
        width: 15px;
        height: 15px;
        background-color: #354463;
        top: 0;
        left: 0;
      }
    }

    &.inactive {
      &:before {
        position: absolute;
        content: '';
        border-radius: 100%;
        width: 14px;
        height: 14px;
        background-color: #fff;
        border: 1px solid #354463;
        top: 0;
        left: 0;
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
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;
  position: absolute;
  left: 319px;
  top: 30px;
  z-index: 10;
  border: 1px solid #3c4557;

  @media only screen and (max-width: ${props => props.theme.mobile}) {
    left: 92px;
  }

  @media only screen and (max-width: ${props => props.theme.tablet}) {
    top: 65px;
  }
  &.light {
      background-color: white;
      color: #3c4557;
    }


  &.center {
    display: flex;
    justify-content: center;
    width: max-content;
    margin: 0 auto;
  }
`


const Testimonials = ({ testimonials }) => {

  const [activePanel, setPanel] = useState(0)

  return (
    <TestimonialsContainer data-sal="slide-right" data-sal-duration="800" data-sal-easing="easeInOutCubic">
    <DotContainer>
      {testimonials.map((item, key) => {
        const active = activePanel === key ? 'active' : 'inactive'
        return (
            <Dot
              key={key}
              role="presentation"
              className={`${active}`}
              onClick={(e) => {
                e.preventDefault()
                setPanel(key)
              }}
            />
        )
      })}
      </DotContainer>
      {testimonials.map((testimonial, key) => {
        const firstItem = key === activePanel ? 'active' : 'inactive'
        return (
          <ArticleContainer key={key} className={`message ${firstItem}`}>
          <Heading className={`rel light`}>
            Stories
          </Heading>
            <article>
              <div className="message-body">
                &#8220;{testimonial.quote}&#8221;
                <br />
                <cite>{testimonial.author}</cite>
              </div>
            </article>

              <TestimonialImage>
                <div>
                {testimonial?.image &&
                  <img alt="" src={testimonial.image.publicURL} />
                }
                </div>
              </TestimonialImage>

          </ArticleContainer>
        )
        }
      )}
    </TestimonialsContainer>
  )
}

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
    })
  ),
}

export default Testimonials
