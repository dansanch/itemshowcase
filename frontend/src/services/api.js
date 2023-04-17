const API_BASE_URL = 'https://backend-new.herokuapp.com';

export const fetchItems = async () => {
  const response = await fetch(`${API_BASE_URL}/items`);
  const data = await response.json();
  return data;
};

export const fetchItem = async (id) => {
  const response = await fetch(`${API_BASE_URL}/items/${id}`);
  const data = await response.json();
  return data;
};

export const createItem = async (item) => {
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error('Failed to create item');
  }

  const data = await response.json();
  return data;
};

export const updateItem = async (id, updatedItem) => {
  const response = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(updatedItem),
  });

  if (!response.ok) {
    throw new Error('Failed to update item');
  }

  const data = await response.json();
  return data;
};

export const deleteItem = async (id) => {
  const response = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete item');
  }
};