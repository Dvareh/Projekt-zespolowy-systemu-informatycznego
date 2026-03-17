'use client';

import styled from 'styled-components';
import BookCard from './BookCard';

const Wrapper = styled.div`
  flex: 1;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Count = styled.p`
  font-size: 14px;
  color: #9a8a7a;
  margin: 0;
`;

const SortRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SortLabel = styled.span`
  font-size: 14px;
  color: #5a4a3a;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #c8bfb4;
  border-radius: 6px;
  font-size: 14px;
  color: #3d2f1e;
  background: #fff;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #7a6248;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const mockBooks = [
  { id: 1, title: '7 nawyków skutecznego...', author: 'Stephen Covey', price: 710 },
  { id: 2, title: 'Alicja w Krainie Czarów', author: 'Lewis Carroll', price: 520 },
  { id: 3, title: 'Anna Karenina', author: 'Lew Tołstoj', price: 950 },
  { id: 4, title: 'Bogaty ojciec, biedny ojciec', author: 'Robert Kiyosaki', price: 590 },
  { id: 5, title: 'Harry Potter i Kamień...', author: 'J.K. Rowling', price: 680 },
  { id: 6, title: 'Twisted Lies', author: 'Ana Huang', price: 420 },
  { id: 7, title: 'Zbrodnia i kara', author: 'Fiodor Dostojewski', price: 490 },
  { id: 8, title: 'Mały Książę', author: 'Antoine de Saint-Exupéry', price: 310 },
];

export default function BookGrid() {
  return (
    <Wrapper>
      <TopBar>
        <Count>Znaleziono {mockBooks.length} książek</Count>
        <SortRow>
          <SortLabel>Sortuj:</SortLabel>
          <SortSelect>
            <option>Nazwa</option>
            <option>Cena rosnąco</option>
            <option>Cena malejąco</option>
          </SortSelect>
        </SortRow>
      </TopBar>

      <Grid>
        {mockBooks.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
          />
        ))}
      </Grid>
    </Wrapper>
  );
}