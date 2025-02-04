import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, TextField, Switch, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Trash2 } from "lucide-react";
import { db } from "../firebaseConfig";
import { ref, set, push, onValue, remove, update } from "firebase/database";

const HotBarAdmin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [category, setCategory] = useState("Misc"); // Default category

  // Fetch data from Firebase on component mount
  useEffect(() => {
    const menuRef = ref(db, "menuItems");
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMenuItems(itemsArray);
      }
    });
  }, []);

  const toggleAvailability = (index) => {
    const updatedItems = [...menuItems];
    updatedItems[index].available = !updatedItems[index].available;
    setMenuItems(updatedItems);

    // Update Firebase
    const item = updatedItems[index];
    const itemRef = ref(db, `menuItems/${item.id}`);
    update(itemRef, { available: item.available });
  };

  const addNewItem = () => {
    if (newItem.trim() !== "") {
      const menuRef = ref(db, "menuItems");
      const newItemRef = push(menuRef);
      set(newItemRef, { name: newItem, available: false, category })
        .then(() => {
          setNewItem("");
          setCategory("Misc"); // Reset category to default
        })
        .catch((error) => {
          console.error("Error adding item: ", error);
        });
    }
  };

  const deleteItem = (index) => {
    const item = menuItems[index];
    const itemRef = ref(db, `menuItems/${item.id}`);
    remove(itemRef)
      .then(() => {
        const updatedItems = menuItems.filter((_, i) => i !== index);
        setMenuItems(updatedItems);
      })
      .catch((error) => {
        console.error("Error deleting item: ", error);
      });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Hot Bar Admin</h1>
      <div className="flex mb-4">
        <TextField
          className="flex-1 mr-2"
          placeholder="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <FormControl className="w-32 mr-2">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="Meats">Meats</MenuItem>
            <MenuItem value="Rice">Rice</MenuItem>
            <MenuItem value="Veggies">Veggies</MenuItem>
            <MenuItem value="Misc">Misc</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={addNewItem}>
          Add
        </Button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Card key={item.id} className="flex items-center justify-between p-4 shadow-md rounded-2xl">
            <CardContent className="flex items-center justify-between w-full p-0">
              <span className="text-lg font-medium flex-1 text-center">
                {item.name} <span className="text-sm text-gray-500">({item.category})</span>
              </span>
              <Switch
                checked={item.available}
                onChange={() => toggleAvailability(index)}
                className="mx-4"
              />
              <Button
                variant="text"
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteItem(index)}
              >
                <Trash2 size={20} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotBarAdmin;