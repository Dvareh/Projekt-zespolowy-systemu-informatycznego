'use client';

import styled from 'styled-components';

const Nav = styled.nav`
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e8e3dc;
`;

const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  height: 100%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Georgia', serif;
  font-size: 20px;
  font-weight: 600;
  color: #3d2f1e;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const NavLink = styled.a`
  font-size: 15px;
  color: #5a4a3a;
  text-decoration: none;
  cursor: pointer;
  &:hover { color: #3d2f1e; }
`;

const RegisterButton = styled.button`
  background: #7a6248;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 22px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #5e4a36; }
`;

export default function Navbar() {
  return (
  <Nav>
    <NavInner>
      <Logo>
        <span>📖</span>
        <span>Księgarnia</span>
      </Logo>
      <NavLinks>
        <NavLink href="#">Katalog</NavLink>
        <NavLink href="#">Zaloguj</NavLink>
        <RegisterButton>Rejestracja</RegisterButton>
      </NavLinks>
    </NavInner>
  </Nav>
);
}