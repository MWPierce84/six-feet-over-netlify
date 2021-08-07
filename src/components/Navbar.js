import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.png'
import styled from 'styled-components'

const NavBar = styled.nav`
	font-size: 30px;
	font-family: ${props => props.theme.fontBase};
	padding: 50px 0;

	.container {
		display: flex;
		justify-content: space-around;

    @media only screen and (max-width: ${props => props.theme.mobile}) and (max-width: ${props => props.theme.tablet}) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-content: center;
    }
	}
`

const NavMenuContainer = styled.div`
`

const NavMenu = styled.ul`
	display: flex;
	margin: 0;
	padding: 0;

	li {
		list-style: none;
		padding: 0;
		margin: 0;

		a {
			font-size: 20px;
			margin-right: 100px;
			text-decoration: none;
			color: ${props => props.theme.basicBlue};
      font-weight: 300;
      transition: width 200ms ease-in-out;
      position: relative;

      @media only screen and (max-width: ${props => props.theme.tablet}) {
        margin-right: 20px;
      }

      &:after {
        transition: width 800ms ease-in-out;
        content: '';
        width: 0;
        height: 0px;
        background-color: #354463;
        position: absolute;
        bottom: -10px;

        @media only screen and (max-width: ${props => props.theme.tablet}) {
          height: initial;
          position: initial;
        }
      }

      &:hover {
        &:after {
          content: '';
          height: 3px;
          width: 100%;
          background-color: #354463;
          position: absolute;
          bottom: -15px;
          left: 0;
        }
      }

      &.donate {
        background-color: #C1F7D5;
        border-radius: 20px;
        padding: 10px 30px;

        @media only screen and (max-width: ${props => props.theme.tablet}) {
          position: absolute;
          top: 10px;
          right: 4px;
        }
      }
		}
	}
`

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <NavBar
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="Six Feet Over" style={{ width: '252px' }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
              onKeyPress={() => this.toggleHamburger()}
              role="presentation"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <NavMenuContainer
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <NavMenu className="navbar-start has-text-centered">
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
              {/* <li>
								<Link className="navbar-item" to="/contact">
									Contact
								</Link>
							</li> */}
							<li>
								<a className="navbar-item donate" href="https://secure.givelively.org/donate/six-feet-over
" target="_blank" rel="noopener noreferrer">
									Donate
								</a>
							</li>
            </NavMenu>
          </NavMenuContainer>
        </div>
      </NavBar>
    )
  }
}

export default Navbar
