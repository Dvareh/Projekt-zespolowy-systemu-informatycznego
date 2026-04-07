'use client';

import Image from 'next/image';
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

const RegisterButton = styled.a`
  background: #7a6248;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 22px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:hover { background: #5e4a36; }
`;

const ProfileNav = styled.nav`
  background: #ffffff;
  border-bottom: 1px solid #e8e4de;
  padding: 0 40px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Lora', Georgia, serif;
  font-size: 16px;
  font-weight: 600;
  color: #2c2c2c;
  cursor: pointer;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ProfileNavLink = styled.span`
  font-size: 14px;
  color: #5a5249;
  cursor: pointer;
  transition: color 0.15s;
  &:hover { color: #2c2c2c; }
`;

const CartBtn = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #5a5249;
  padding: 0;
`;

const CartBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -6px;
  background: #c8a96e;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserChip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #5a5249;
  cursor: pointer;
`;

const LogoutBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #9a9086;
  &:hover { color: #2c2c2c; }
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
          <NavLink href="/login">Zaloguj</NavLink>
          <RegisterButton href="/register">Rejestracja</RegisterButton>
        </NavLinks>
      </NavInner>
    </Nav>
  );
}

interface ProfileNavbarProps {
  userName: string;
  cartBadge: number;
}

export function ProfileNavbar({ userName, cartBadge = 0 }: ProfileNavbarProps) {
  return (
    <ProfileNav>
      <ProfileLogo>📖 Księgarnia</ProfileLogo>
      <NavRight>
        <CartBtn>
          <Image src="/shopping-bag.png" width={24} height={24} alt="cart" />
          <CartBadge>{cartBadge}</CartBadge>
        </CartBtn>
        <UserChip>
          <Image src="/person.png" width={20} height={20} alt="avatar" />
          {userName}
        </UserChip>
        <LogoutBtn title="Wyloguj"><Image src="/logout.png" width={18} height={18} alt="avatar" /></LogoutBtn>
      </NavRight>
    </ProfileNav>
  );
}