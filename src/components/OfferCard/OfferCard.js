import React from 'react';

/* offset limit */
const OfferCard = ({
  card
}) => {

  return (
  <div className='cards__card'>
        <span>ID: {card.id}</span>
        <span> Name: {card.product}</span>
        <span>PRICE: {card.price}</span>
        <span>BRADN: {card.brand}</span>
      </div>
  )
}

export default OfferCard;