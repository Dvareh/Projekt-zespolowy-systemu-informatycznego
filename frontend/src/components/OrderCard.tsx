import React from 'react'
import styled from 'styled-components'

export type OrderStatus = 'delivered' | 'in_transit' | 'processing' | 'cancelled'

export interface OrderCardProps {
  orderId: number
  date: string
  productsCount: number
  total: number
  status: OrderStatus
}

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  delivered: { label: 'Dostarczone', color: '#2d7a4f', bg: '#e8f5ee' },
  in_transit: { label: 'W drodze', color: '#5a6bbf', bg: '#eef0fb' },
  processing: { label: 'W realizacji', color: '#b07d2e', bg: '#fdf4e3' },
  cancelled: { label: 'Anulowane', color: '#b04040', bg: '#fbeaea' },
}

const Card = styled.div`
  border: 1px solid #e8e4de;
  border-radius: 10px;
  overflow: hidden;
  background: #ffffff;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid #f0ece6;
`

const OrderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const PackageIcon = styled.span`
  font-size: 15px;
  color: #8a7d6b;
`

const OrderName = styled.p`
  font-family: 'Lora', Georgia, serif;
  font-size: 14px;
  font-weight: 600;
  color: #2c2c2c;
  margin: 0;
`

const OrderDate = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 12px;
  color: #9a9086;
  margin: 2px 0 0;
`

const StatusBadge = styled.span<{ $status: OrderStatus }>`
  font-family: 'Lato', sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  color: ${({ $status }) => statusConfig[$status].color};
  background: ${({ $status }) => statusConfig[$status].bg};
`

const CardBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
`

const ProductsInfo = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 13px;
  color: #7a7169;
  margin: 0;
`

const TotalWrapper = styled.div`
  text-align: right;
`

const TotalLabel = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 11px;
  color: #aaa39b;
  margin: 0 0 2px;
`

const TotalAmount = styled.p`
  font-family: 'Lora', Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  color: #2c2c2c;
  margin: 0;
`

export const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  date,
  productsCount,
  total,
  status,
}) => {
  return (
    <Card>
      <CardHeader>
        <OrderTitle>
          <PackageIcon>📦</PackageIcon>
          <div>
            <OrderName>Zamówienie #{orderId}</OrderName>
            <OrderDate>Data: {date}</OrderDate>
          </div>
        </OrderTitle>
        <StatusBadge $status={status}>{statusConfig[status].label}</StatusBadge>
      </CardHeader>
      <CardBody>
        <ProductsInfo>Produkty: {productsCount}</ProductsInfo>
        <TotalWrapper>
          <TotalLabel>Łącznie</TotalLabel>
          <TotalAmount>{total.toLocaleString('pl-PL')} zł</TotalAmount>
        </TotalWrapper>
      </CardBody>
    </Card>
  )
}