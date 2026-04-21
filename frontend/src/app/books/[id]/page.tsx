'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';
import { getBookById } from '@/api';
import type { Book } from '@/store/slices/booksSlice';

const Page = styled.div`
  min-height: 100vh;
  background: #f5f0ea;
`;

const Content = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 40px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #7a6248;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: #5e4a36;
  }
`;

const BookLayout = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const CoverSection = styled.div`
  flex-shrink: 0;
  width: 260px;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const CoverImg = styled.img`
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: block;
`;

const CoverPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  background: #ede8e2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0a090;
  font-size: 14px;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const BookTitle = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 28px;
  color: #3d2f1e;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const AuthorName = styled.p`
  font-size: 17px;
  color: #7a6248;
  margin: 0 0 16px 0;
`;

const GenreBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: #e8e3dc;
  border-radius: 20px;
  font-size: 13px;
  color: #5a4a3a;
  margin-bottom: 20px;
`;

const MetaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

const MetaItem = styled.p`
  font-size: 14px;
  color: #9a8a7a;
  margin: 0;

  strong {
    color: #5a4a3a;
  }
`;

const Description = styled.p`
  font-size: 15px;
  color: #5a4a3a;
  line-height: 1.7;
  margin: 0 0 28px 0;
`;

const PriceBadge = styled.div`
  display: inline-block;
  font-size: 22px;
  font-weight: 700;
  color: #7a6248;
`;

const Message = styled.p`
  font-size: 14px;
  color: #9a8a7a;
  text-align: center;
  padding: 60px 0;
`;

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.id as string;
  const id = /^\d+$/.test(rawId) ? Number(rawId) : NaN;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    if (!id || isNaN(id)) {
      setError('Nieprawidłowe ID książki.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    getBookById(id)
      .then(setBook)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Page>
      <Navbar />
      <Content>
        <BackButton onClick={() => router.back()}>← Powrót</BackButton>

        {loading && <Message>Ładowanie...</Message>}
        {!loading && error && <Message>Błąd: {error}</Message>}

        {!loading && !error && book && (
          <BookLayout>
            <CoverSection>
              {book.coverUrl && !imgFailed ? (
                <CoverImg
                  src={book.coverUrl}
                  alt={book.title}
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <CoverPlaceholder>Brak okładki</CoverPlaceholder>
              )}
            </CoverSection>

            <InfoSection>
              <BookTitle>{book.title}</BookTitle>
              <AuthorName>{book.author}</AuthorName>

              {book.genres && book.genres.length > 0 && (
                <GenreBadge>{book.genres.join(', ')}</GenreBadge>
              )}

              <MetaRow>
                {book.isbn && (
                  <MetaItem>
                    <strong>ISBN:</strong> {book.isbn}
                  </MetaItem>
                )}
                {book.publicationYear && (
                  <MetaItem>
                    <strong>Rok wydania:</strong> {book.publicationYear}
                  </MetaItem>
                )}
                {book.stockQuantity !== undefined && (
                  <MetaItem>
                    <strong>Dostępność:</strong>{' '}
                    {book.stockQuantity > 0
                      ? `${book.stockQuantity} szt. w magazynie`
                      : 'Brak w magazynie'}
                  </MetaItem>
                )}
              </MetaRow>

              {book.description && (
                <Description>{book.description}</Description>
              )}

              <PriceBadge>{book.price} zł</PriceBadge>
            </InfoSection>
          </BookLayout>
        )}
      </Content>
    </Page>
  );
}
