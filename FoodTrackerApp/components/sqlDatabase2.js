/*
Copy and paste into App.js to test
SQLite database implementation that allows for the user to add, update, and delete an input.
Problem: connecting the file with the rest of the project (styling)
*/

import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, Alert, Text, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

// Open or create the database
const db = SQLite.openDatabase('foodList.db');

const App = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    // Create the table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTEGER)'
      );
    });
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM items',
        [],
        (_, { rows }) => {
          setItemList(rows._array);
        }
      );
    });
  };

  const addItem = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO items (name, quantity) VALUES (?, ?)',
        [name, quantity],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('Success', 'Item added successfully!');
            fetchItems();
            setName('');
            setQuantity('');
          } else {
            Alert.alert('Error', 'Failed to add item.');
          }
        }
      );
    });
  };

  const deleteItem = (itemId) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM items WHERE id = ?',
        [itemId],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('Success', 'Item deleted successfully!');
            fetchItems();
          } else {
            Alert.alert('Error', 'Failed to delete item.');
          }
        }
      );
    });
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE items SET quantity = ? WHERE id = ?',
        [newQuantity, itemId],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('Success', 'Item quantity updated successfully!');
            fetchItems();
          } else {
            Alert.alert('Error', 'Failed to update item quantity.');
          }
        }
      );
    });
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name} - {item.quantity}</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="New Quantity"
          keyboardType="numeric"
          onChangeText={text => setQuantity(text)}
        />
        <Button title="Update" onPress={() => updateItemQuantity(item.id, quantity)} />
        <Button title="Delete" onPress={() => deleteItem(item.id)} />
      </View>
    </View>
  );

  return (
    <View>
      <TextInput
        placeholder="Item Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Item Quantity"
        value={quantity}
        onChangeText={text => setQuantity(text)}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={itemList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default App;
