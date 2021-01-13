import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import logo from '../img/logo.png'

const FooterContainer = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: space-around;

  @media only screen and (max-width: ${props => props.theme.tablet}) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media only screen and (max-width: ${props => props.theme.mobile}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 350px;
    text-align: center;
  }
`

const Section = styled.div`

@media only screen and (max-width: ${props => props.theme.tablet}) {
  margin: 10px 0;

  &:first-of-type {
    width: 768px;
    justify-content: center;
  }
}

  h4 {
    font-family: ${props => props.theme.fontBase};
    font-size: 18px;
    margin: 0 0 15px 0;
    line-height: 18px;
    text-transform: uppercase;
    color: #354463;
    letter-spacing: 2px;
    position: relative;
    width: 160px;

    &:after {
      content: '';
      height: 1px;
      width: 100%;
      background-color: #354463;
      position: absolute;
      bottom: 0;
      left: 0;
    }

  }

  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;

      a {
        font-size: 18px;
        font-family: ${props => props.theme.fontBase};
        font-weight: 100;
        text-decoration: none;
        color: #354463;
      }
    }
  }



  &.tagline {
    font-family: ${props => props.theme.fontAccent};
    font-size: 44px;
    line-height: 46px;
    text-align: right;

    @media only screen and (max-width: ${props => props.theme.tablet}) {
      display: none;
    }
  }

`
const FooterLegal = styled.div`
  display: flex;
  justify-content: center;
  font-size: 13px;
  margin: 20px auto;

  @media only screen and (max-width: ${props => props.theme.mobile}) {
    padding-bottom: 50px;
    text-align: center;
  }

`

const Footer = class extends React.Component {

  render() {
    const today = new Date();
    const curYear = today.getFullYear();
    return (
      <>
      <FooterContainer className="footer has-background-black has-text-white-ter">
        <Section>
          <img src={logo} alt="Six Feet Over" style={{width: 252}} />
        </Section>
        <Section>
          <h4>Contact Us</h4>

          <ul>
          <li>
            <a className="navbar-item" href="mailto:info@sixftover.org">
              Email Us info@sixftover.org
            </a>
          </li>
          </ul>
        </Section>
        <Section>
          <h4>Links</h4>
          <ul>
          <li>
            <Link className="navbar-item" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/help">
              Help Center
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/news">
              News
            </Link>
          </li>
          <li>
								<a target="_blank" rel="noopener noreferrer" className="navbar-item" href="http://store.sixftover.org">
									Store
								</a>
							</li>
          <li>
            <a className="navbar-item donate" href="https://secure.givelively.org/donate/six-feet-over
" target="_blank" rel="noopener noreferrer">
									Donate
								</a>
          </li>
          </ul>
        </Section>
        <Section>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a className="navbar-item" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sixftover/">
                Facebook - Six Feet Over
              </a>
            </li>
            <li>
              <a className="navbar-item" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/SuckItSuicide/">
                Facebook - Suck It Suicide
              </a>
            </li>
            <li>
              <a className="navbar-item" target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/SuckItSuicide/">
                Twitter
              </a>
            </li>
            <li>
              <a className="navbar-item" target="_blank" rel="noopener noreferrer" href="https://instagram.com/suckitsuicide/">
                Instagram
              </a>
            </li>
          </ul>
        </Section>
        <Section className={`tagline`}>
          #HELP <br />
          PREVENT<br />
          SUICIDE<br />
        </Section>

      </FooterContainer>
      <FooterLegal>
        ©{curYear} Six Feet Over, 501(c)3 | PO Box 32394 Detroit, Michigan 48232 | (313) 723-0373
        All rights reserved.
      </FooterLegal>
      </>
    )
  }
}

export default Footer
