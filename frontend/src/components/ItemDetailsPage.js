import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItem, deleteItem, updateItem } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import AdminItemForm from './AdminItemForm';

const ItemDetailsPage = () => {
  const [item, setItem] = useState(null);
  const [editing, setEditing] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getItem = async () => {
      const data = await fetchItem(id);
      setItem(data);
    };

    getItem();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        navigate('/path');
      } catch (error) {
        alert('Failed to delete item');
      }
    }
  };

  const handleUpdate = async (updatedItem) => {
    try {
      await updateItem(id, updatedItem);
      setItem({ ...item, ...updatedItem });
      setEditing(false);
    } catch (error) {
      alert('Failed to update item');
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <img src={item.imageUrl} alt={item.name} />
      <p>Rarity: {item.rarity}</p>
      {user && user.role === 'admin' && (
        <>
          {!editing && (
            <>
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </>
      )}
      {editing && <AdminItemForm item={item} onSubmit={handleUpdate} />}
    </div>
  );
};

export default ItemDetailsPage;
