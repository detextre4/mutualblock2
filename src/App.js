import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/AppStyles.scss';
import {Navbar, NavDropdown, Nav, Container, Row, Card} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Metadata from './Components/Metadata';
import SendTokens from './Components/SendTokens';



import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  return(
    <React.Fragment>
    <Navbar collapseOnSelect expand="lg" bg="muted" variant="primary">
    <Container>
    <Navbar.Brand >Block-Transfer</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
      </Nav>
      <Nav>
        <Nav.Link onClick={(window.accountId===''?login:logout)} >
          {window.accountId===''?'Login':window.accountId}
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>

    {(window.accountId!=='')?
    <Container>
      <Row className="d-flex justify-content-center"><Metadata/></Row>
      <Row className="d-flex justify-content-center"><SendTokens/></Row>
    </Container>
    :<Card>
      <Card.Header as="h5">Hello User!</Card.Header>
      <Card.Body>
        <Card.Title> Please Login</Card.Title>
        <Card.Text>
          This app will not work if you are not Logged, Sorry
        </Card.Text>
        <Button onClick={login}>Login Now</Button>
      </Card.Body>
    </Card>
    
    }

  </React.Fragment>

  );
}
