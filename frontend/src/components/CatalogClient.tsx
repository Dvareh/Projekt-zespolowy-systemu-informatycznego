'use client';

import { useState } from 'react';
import styled from 'styled-components';
import CategoryTabs from './CategoryTabs';
import FilterPanel from './FilterPanel';
import BookGrid from './BookGrid';

const Content = styled.main`
  display: flex;
  gap: 24px;
  padding: 32px 40px;
  max-width: 1400px;
  margin: 0 auto;
`;

export default function CatalogClient() {
  const [activeCategory, setActiveCategory] = useState('Wszystkie');

  return (
    <>
      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
      <Content>
        <FilterPanel />
        <BookGrid />
      </Content>
    </>
  );
}