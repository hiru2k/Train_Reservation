import { Link as RouterLink, NavLink, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Image, NavDropdown } from "react-bootstrap";
import TrainLogo from "./../../assets/logo.png";
import { PersonCircle } from "react-bootstrap-icons";

export default function NavbarComponent() {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={RouterLink} to="#">
          <Image src={TrainLogo} alt="Train" width="40" height="40" rounded />
          <span>Traveller - Admin Application</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink
              exact
              to="#"
              activeClassName="active-link"
              className={`nav-link ${
                location.pathname === "#" ? "active" : ""
              }`}
            >
              User Management
            </NavLink>
            <NavLink
              exact
              to="#"
              activeClassName="active-link"
              className={`nav-link ${
                location.pathname === "#" ? "active" : ""
              }`}
            >
              Traveller Management
            </NavLink>
            <NavLink
              exact
              to="/bookings"
              activeClassName="active-link"
              className={`nav-link ${
                location.pathname === "/bookings" ? "active" : ""
              }`}
            >
              Reservations
            </NavLink>
            <NavLink
              exact
              to="#"
              activeClassName="active-link"
              className={`nav-link ${
                location.pathname === "#" ? "active" : ""
              }`}
            >
              Train Management
            </NavLink>
          </Nav>

          <NavDropdown
            className="d-flex"
            title={
              <>
                <PersonCircle /> User Accounts
              </>
            }
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item href="#action1">Account Settings</NavDropdown.Item>
            <NavDropdown.Item href="#action2">Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
