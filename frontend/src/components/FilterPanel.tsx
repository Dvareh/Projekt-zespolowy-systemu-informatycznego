'use client';

import styled from 'styled-components';

const Panel = styled.aside`
  width: 220px;
  min-width: 220px;
  background: #fff;
  border-radius: 10px;
  padding: 24px 20px;
  border: 1px solid #e8e3dc;
  align-self: flex-start;
`;

const Title = styled.h3`
  font-family: 'Georgia', serif;
  font-size: 18px;
  color: #3d2f1e;
  margin: 0 0 20px 0;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #5a4a3a;
  margin: 0 0 10px 0;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PriceInput = styled.input`
  width: 70px;
  padding: 6px 10px;
  border: 1px solid #c8bfb4;
  border-radius: 6px;
  font-size: 14px;
  color: #ffffff;
  outline: none;

  &:focus {
    border-color: #7a6248;
  }
`;

const Dash = styled.span`
  color: #9a8a7a;
`;

const CheckRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #3d2f1e;
  margin-bottom: 8px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #7a6248;
  cursor: pointer;
`;

const languages = ['Polski', 'Angielski'];
const years = ['Przed 1900', '1900-1950', '1950-2000', 'Po 2000'];

export default function FilterPanel() {
  return (
    <Panel>
      <Title>Filtry</Title>

      <Section>
        <Label>Cena</Label>
        <PriceRow>
          <PriceInput type="number" defaultValue={0} />
          <Dash>—</Dash>
          <PriceInput type="number" defaultValue={3000} />
        </PriceRow>
      </Section>

      <Section>
        <Label>Język</Label>
        {languages.map((lang) => (
          <CheckRow key={lang}>
            <Checkbox type="checkbox" />
            {lang}
          </CheckRow>
        ))}
      </Section>

      <Section>
        <Label>Rok wydania</Label>
        {years.map((year) => (
          <CheckRow key={year}>
            <Checkbox type="checkbox" />
            {year}
          </CheckRow>
        ))}
      </Section>
    </Panel>
  );
}