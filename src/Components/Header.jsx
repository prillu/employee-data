import React from 'react'
import { Nav,Navbar,Container,NavDropdown } from 'react-bootstrap'

function Header() {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" ><i class="fa-solid fa-users-rays"></i>&nbsp;Employee Management App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    </>
  )
}

export default Header

// className="align-items-center"
