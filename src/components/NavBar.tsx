import React, { FC } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sync } from './Sync';
import { User } from './User';

interface NavLink {
  title: React.ReactNode;
  path: string;
}

const navItems: NavLink[] = [
  {
    title: 'List',
    path: '/',
  },
  {
    title: 'Practice',
    path: '/practice',
  },
];

export const NavBar: FC = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container style={{ gap: 8 }}>
        <Navbar.Toggle style={{ flexGrow: 1 }} />
        <Navbar.Collapse>
          <Nav>
            {navItems.map(({ title, path }) => (
              <Nav.Link key={path} active={path === pathname} href="#" onClick={() => navigate(path)}>
                {title}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
        <Sync />
        <User />
      </Container>
    </Navbar>
  );
};
