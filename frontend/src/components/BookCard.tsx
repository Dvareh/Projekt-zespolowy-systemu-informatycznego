'use client';

import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e8e3dc;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  background: #ede8e2;
`;

const Info = styled.div`
  padding: 12px 14px;
`;

const BookTitle = styled.h4`
  font-family: 'Georgia', serif;
  font-size: 15px;
  color: #3d2f1e;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Author = styled.p`
  font-size: 13px;
  color: #9a8a7a;
  margin: 0 0 10px 0;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #7a6248;
`;

const CartButton = styled.button`
  width: 34px;
  height: 34px;
  background: #7a6248;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: #5e4a36;
  }
`;

interface Props {
  title: string;
  author: string;
  price: number;
}

export default function BookCard({ title, author, price }: Props) {
  return (
    <Card>
      <ImagePlaceholder />
      <Info>
        <BookTitle>{title}</BookTitle>
        <Author>{author}</Author>
        <Bottom>
          <Price>{price} zł</Price>
          <CartButton>🛒</CartButton>
        </Bottom>
      </Info>
    </Card>
  );
}
