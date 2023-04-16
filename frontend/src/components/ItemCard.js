import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <Link to={`/items/${item._id}`}>
        <img src={item.imageUrl} alt={item.name} />
      </Link>
      <p>Rarity: {item.rarity}</p>
    </div>
  );
};

export default ItemCard;
