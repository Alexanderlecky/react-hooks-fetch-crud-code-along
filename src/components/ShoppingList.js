// src/components/ShoppingList.js
import React, { useState, useEffect } from 'react';

// Mock server data and API calls
const fetchItems = async () => {
  // Replace this with your actual API call
  return [
    { id: 1, name: 'Yogurt', category: 'Dairy', isInCart: false },
    { id: 2, name: 'Pomegranate', category: 'Fruit', isInCart: false },
    { id: 3, name: 'Lettuce', category: 'Produce', isInCart: false },
  ];
};

const postItem = async (item) => {
  // Replace this with your actual API call
  return item;
};

const deleteItem = async (id) => {
  // Replace this with your actual API call
  return id;
};

const updateItem = async (item) => {
  // Replace this with your actual API call
  return item;
};

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  useEffect(() => {
    const loadItems = async () => {
      const items = await fetchItems();
      setItems(items);
    };
    loadItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    const newItem = { name, category, isInCart: false };
    const addedItem = await postItem(newItem);
    setItems([...items, addedItem]);
    setName("");
    setCategory("Produce");
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    setItems(items.filter(item => item.id !== id));
  };

  const handleToggleCart = async (id) => {
    const updatedItem = items.find(item => item.id === id);
    updatedItem.isInCart = !updatedItem.isInCart;
    await updateItem(updatedItem);
    setItems(items.map(item => item.id === id ? updatedItem : item));
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <form onSubmit={handleAddItem}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Produce">Produce</option>
            <option value="Dairy">Dairy</option>
            <option value="Fruit">Fruit</option>
            <option value="Dessert">Dessert</option>
          </select>
        </label>
        <button type="submit">Add to List</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name} - {item.category}</span>
            {item.isInCart ? (
              <button onClick={() => handleToggleCart(item.id)}>Remove From Cart</button>
            ) : (
              <button onClick={() => handleToggleCart(item.id)}>Add to Cart</button>
            )}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
