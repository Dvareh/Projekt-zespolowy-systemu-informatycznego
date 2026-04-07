'use client'

import styled from 'styled-components'
import { ProfileNavbar } from '@/components/Navbar'
import { OrderCard } from '@/components/OrderCard'
import Image from 'next/image'

const mockUser = {
  name: 'User',
  email: 'test@gmail.com',
  userId: '#17755546',
  registeredAt: 'Marzec 2026',
}

const userStats = {
  totalOrders: 0,
  totalSpent: 0,
  booksInCollection: 0,
}

const orders: [] = []

const PageWrapper = styled.main`
  min-height: 100vh;
  background: #f4f1ec;
  font-family: 'Lato', sans-serif;
`

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px 60px;
`

const PageTitle = styled.h1`
  font-family: 'Lora', Georgia, serif;
  font-size: 24px;
  font-weight: 600;
  color: #2c2c2c;
  margin: 0 0 28px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e8e4de;
  border-radius: 12px;
  padding: 28px 24px;
`

const AvatarWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ede8e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
  font-size: 28px;
  color: #9a8c7c;
`

const UserName = styled.h2`
  font-family: 'Lora', Georgia, serif;
  font-size: 18px;
  font-weight: 600;
  color: #2c2c2c;
  text-align: center;
  margin: 0 0 4px;
`

const UserEmail = styled.p`
  font-size: 13px;
  color: #9a9086;
  text-align: center;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #f0ece6;
  margin: 18px 0;
`

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const MetaLabel = styled.span`
  font-size: 13px;
  color: #9a9086;
`

const MetaValue = styled.span`
  font-size: 13px;
  color: #2c2c2c;
  font-weight: 500;
`

const EditButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 11px;
  background: #ede8e0;
  border: none;
  border-radius: 8px;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #4a4238;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.15s;
  &:hover { background: #e0d8cc; }
`

const StatsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const StatsTitle = styled.h3`
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #5a5249;
  margin: 0 0 4px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

const StatItem = styled.div``

const StatLabel = styled.p`
  font-size: 13px;
  color: #9a9086;
  margin: 0 0 2px;
`

const StatValue = styled.p<{ $accent?: boolean }>`
  font-family: 'Lora', Georgia, serif;
  font-size: 22px;
  font-weight: 700;
  color: ${({ $accent }) => ($accent ? '#c8a96e' : '#2c2c2c')};
  margin: 0;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const SectionCard = styled.div`
  background: #ffffff;
  border: 1px solid #e8e4de;
  border-radius: 12px;
  padding: 24px;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`

const SectionTitle = styled.h3`
  font-family: 'Lora', Georgia, serif;
  font-size: 17px;
  font-weight: 600;
  color: #2c2c2c;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ContinueLink = styled.a`
  font-size: 13px;
  color: #9a9086;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.15s;
  &:hover { color: #2c2c2c; }
`

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const EmptyOrders = styled.p`
  font-size: 14px;
  color: #aaa39b;
  text-align: center;
  padding: 24px 0;
  margin: 0;
`

const UpcomingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const UpcomingItem = styled.li`
  font-size: 14px;
  color: #7a7169;
  display: flex;
  align-items: center;
  gap: 6px;
  &::before {
    content: '•';
    color: #c8a96e;
    font-size: 16px;
    line-height: 1;
  }
`

const UpcomingTitle = styled.h3`
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #2c2c2c;
  margin: 0 0 14px;
`

export default function ProfilePage() {
  return (
    <PageWrapper>
      <ProfileNavbar userName={mockUser.name} cartBadge={0} />

      <Container>
        <PageTitle>Moje konto</PageTitle>

        <Grid>
          <LeftColumn>
            <Card>
              <AvatarWrapper>
                <Image src="/person.png" width={48} height={48} alt="avatar" />
              </AvatarWrapper>
              <UserName>{mockUser.name}</UserName>
              <UserEmail>{mockUser.email}</UserEmail>
              <Divider />
              <MetaRow>
                <MetaLabel>ID użytkownika:</MetaLabel>
                <MetaValue>{mockUser.userId}</MetaValue>
              </MetaRow>
              <MetaRow>
                <MetaLabel>Data rejestracji:</MetaLabel>
                <MetaValue>{mockUser.registeredAt}</MetaValue>
              </MetaRow>
              <EditButton><Image src="/setting.png" width={15} height={15} alt="avatar" /> Edytuj profil</EditButton>
            </Card>

            <Card>
              <StatsTitle>Statystyki</StatsTitle>
              <StatsGrid>
                <StatItem>
                  <StatLabel>Zamówienia</StatLabel>
                  <StatValue>{userStats.totalOrders}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Łączne wydatki</StatLabel>
                  <StatValue $accent>
                    {userStats.totalSpent.toLocaleString('pl-PL')} zł
                  </StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Książki w kolekcji</StatLabel>
                  <StatValue>{userStats.booksInCollection}</StatValue>
                </StatItem>
              </StatsGrid>
            </Card>
          </LeftColumn>

          <RightColumn>
            <SectionCard>
              <SectionHeader>
                <SectionTitle>Historia zamówień</SectionTitle>
                <ContinueLink href="/katalog">Kontynuuj zakupy</ContinueLink>
              </SectionHeader>

              <OrdersList>
                {orders.length === 0 ? (
                  <EmptyOrders>Brak zamówień</EmptyOrders>
                ) : (
                  orders.map((order: any) => (
                    <OrderCard key={order.id} {...order} />
                  ))
                )}
              </OrdersList>
            </SectionCard>
          </RightColumn>
        </Grid>
      </Container>
    </PageWrapper>
  )
}
