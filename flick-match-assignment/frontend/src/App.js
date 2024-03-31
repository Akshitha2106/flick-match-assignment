import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MatchList from "./MatchList";
import MatchForm from "./MatchForm";
import MatchById from "./MatchDetails";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Match App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/create-match">
                Create Match
              </Nav.Link>
              <Nav.Link as={Link} to="/match-by-id">
                Match By ID
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Routes>
          {" "}
          <Route path="/" element={<MatchList />} />
          <Route path="/create-match" element={<MatchForm />} />
          <Route path="/match-by-id" element={<MatchById />} />{" "}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
