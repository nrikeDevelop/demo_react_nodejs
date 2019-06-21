import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles.css'


const NavMenu = () => {
  return (
    <div>
      <div className='cNavbar'>
        <Navbar>
          <Navbar.Brand href='/News'>
            <span className='cText'>¿What's News?</span>
          </Navbar.Brand>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav>
                <Nav.Link href='/News'>
                  <span className='cText'>
                    <FontAwesomeIcon icon={faNewspaper} className='cIcon' />
                    News
                  </span>
                </Nav.Link>
                <Nav.Link href='/Archive'>
                  <span className='cText'>
                    <FontAwesomeIcon icon={faFolder} className='cIcon' />
                    Archive
                  </span>
                </Nav.Link>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  )
}

export default NavMenu
