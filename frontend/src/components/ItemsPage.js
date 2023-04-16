import React, { useState, useEffect, useContext } from 'react';
import { fetchItems, createItem } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import ItemCard from './ItemCard';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItems();
      setItems(data);
    };

    getItems();
  }, []);

  const handleNewItem = async () => {
    const newItem = {
      name: 'New Item',
      description: 'Description',
      imageUrl: 'https://via.placeholder.com/150',
      rarity: 'Common',
    };

    const createdItem = await createItem(newItem);
    setItems([...items, createdItem]);
  };

  return (
    <div>
      <h1>Items</h1>
      {user && user.role === 'admin' && (
        <button onClick={handleNewItem}>Create New Item</button>
      )}
      <div>
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;
