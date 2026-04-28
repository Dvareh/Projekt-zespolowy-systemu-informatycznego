'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';
import GenreFilter from '@/components/GenreFilter';
import { searchBooks, getGenres } from '@/api';
import type { Genre } from '@/api';
import type { Book } from '@/store/slices/booksSlice';

const PAGE_SIZE = 10;

const Page = styled.div`
  min-height: 100vh;
  background: #f5f0ea;
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 40px;
`;

const PageTitle = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 28px;
  color: #3d2f1e;
  margin: 0 0 24px 0;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 180px;
  padding: 10px 14px;
  border: 1px solid #c8bfb4;
  border-radius: 8px;
  font-size: 14px;
  color: #3d2f1e;
  background: #fff;
  outline: none;

  &::placeholder {
    color: #b0a090;
  }

  &:focus {
    border-color: #7a6248;
  }
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

const ResultCount = styled.p`
  font-size: 14px;
  color: #9a8a7a;
  margin: 0;
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

const Message = styled.p`
  font-size: 14px;
  color: #9a8a7a;
  text-align: center;
  padding: 48px 0;
`;

const Spinner = styled.div`
  text-align: center;
  padding: 48px 0;
  font-size: 14px;
  color: #9a8a7a;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

const PageButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 20px;
  border: 1px solid #c8bfb4;
  border-radius: 8px;
  background: ${({ disabled }) => (disabled ? '#f0ebe5' : '#fff')};
  color: ${({ disabled }) => (disabled ? '#b0a090' : '#3d2f1e')};
  font-size: 14px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #e8e3dc;
  }
`;

const PageIndicator = styled.span`
  font-size: 14px;
  color: #5a4a3a;
`;

export default function BooksPage() {
  const [titleInput, setTitleInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [debouncedTitle, setDebouncedTitle] = useState('');
  const [debouncedAuthor, setDebouncedAuthor] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(0);

  const [books, setBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedTitle(titleInput);
      setPage(0);
    }, 500);
    return () => clearTimeout(t);
  }, [titleInput]);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedAuthor(authorInput);
      setPage(0);
    }, 500);
    return () => clearTimeout(t);
  }, [authorInput]);

  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    searchBooks({
      title: debouncedTitle || undefined,
      author: debouncedAuthor || undefined,
      genreId: selectedGenreId,
      page,
      size: PAGE_SIZE,
    })
      .then((data) => {
        if (cancelled) return;
        setBooks(data.content ?? []);
        setTotal(data.totalElements ?? 0);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedTitle, debouncedAuthor, selectedGenreId, page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleGenreChange = (id: number | undefined) => {
    setSelectedGenreId(id);
    setPage(0);
  };

  return (
    <Page>
      <Navbar />
      <Content>
        <PageTitle>Szukaj książek</PageTitle>

        <SearchRow>
          <SearchInput
            placeholder="Tytuł..."
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <SearchInput
            placeholder="Autor..."
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
          />
        </SearchRow>

        <FilterRow>
          <GenreFilter
            genres={genres}
            value={selectedGenreId}
            onChange={handleGenreChange}
          />
          <ResultCount>Znaleziono {total} książek</ResultCount>
        </FilterRow>

        {loading && <Spinner>Ładowanie...</Spinner>}

        {!loading && error && <Message>Błąd: {error}</Message>}

        {!loading && !error && books.length === 0 && (
          <Message>Nie znaleziono żadnych książek.</Message>
        )}

        {!loading && !error && books.length > 0 && (
          <>
            <Grid>
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  genres={book.genres}
                  coverUrl={book.coverUrl}
                />
              ))}
            </Grid>

            {totalPages > 1 && (
              <Pagination>
                <PageButton
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ← Poprzednia
                </PageButton>
                <PageIndicator>
                  Strona {page + 1} z {totalPages}
                </PageIndicator>
                <PageButton
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Następna →
                </PageButton>
              </Pagination>
            )}
          </>
        )}
      </Content>
    </Page>
  );
}
