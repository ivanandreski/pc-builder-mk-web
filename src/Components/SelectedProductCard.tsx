import React, { FC } from 'react'

import DividerTitle from './DividerTitle'

interface SelectedProductCardProps {
  title: string,
  product: object
}

const SelectedProductCard: FC<SelectedProductCardProps> = ({ title, product }) => {
  return (
    <>
      <DividerTitle title={title} />
    </>
  )
}

export default SelectedProductCard;