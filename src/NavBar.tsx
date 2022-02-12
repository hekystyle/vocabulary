import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

interface NavLink {
  title: React.ReactNode;
  path: string;
}

const navItems: NavLink[] = [
  {
    title: "List",
    path: "/list",
  },
  {
    title: "Practice",
    path: "/practice",
  },
];

export const NavBar: FC<{}> = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  return (
    <Navbar variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Toggle style={{ flexGrow: 1 }} />
        <Navbar.Collapse>
          <Nav>
            {navItems.map(({ title, path }, idx) => (
              <Nav.Link
                key={idx}
                href="#"
                active={path === pathname}
                onClick={() => navigate(path)}
              >
                {title}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
