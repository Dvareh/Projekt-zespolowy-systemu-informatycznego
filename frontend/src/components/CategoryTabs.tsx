'use client';

import styled from 'styled-components';

const Wrapper = styled.div`
  background: #f5f0ea;
  padding: 16px 0;
`;

const Inner = styled.div`
  display: flex;
  gap: 10px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 8px 18px;
  border-radius: 6px;
  border: 1px solid #c8bfb4;
  background: ${({ $active }) => ($active ? '#7a6248' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#3d2f1e')};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ $active }) => ($active ? '#5e4a36' : '#ede8e2')};
  }
`;

interface Props {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryTabs({ categories, active, onChange }: Props) {
  return (
    <Wrapper>
      <Inner>
        {categories.map((cat) => (
          <Tab key={cat} $active={active === cat} onClick={() => onChange(cat)}>
            {cat}
          </Tab>
        ))}
      </Inner>
    </Wrapper>
  );
}
