import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';
import './TVDisplayDashboard.css'; // Import the CSS file

function TVDisplayDashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const menuItemsRef = ref(db, 'menuItems');

    onValue(menuItemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const availableItems = Object.values(data).filter(item => item.available);
        setItems(availableItems);
      } else {
        setItems([]);
      }
    });
  }, []);

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = ["Meats", "Rice", "Veggies", "Misc"];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Hot Bar Items</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category} className="category-card">
            <h2 className="category-title">{category}</h2>
            <div>
              {groupedItems[category] ? (
                groupedItems[category].map((item, index) => (
                  <div key={index} className="item-card">
                    {item.name}
                  </div>
                ))
              ) : (
                <p className="no-items">No items available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TVDisplayDashboard;