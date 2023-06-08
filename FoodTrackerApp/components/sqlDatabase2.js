/*
Copy and paste into App.js to test
SQLite database implementation that allows for the user to add, update, and delete an input.
Problem: connecting the file with the rest of the project (styling)
*/

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Pressable, Modal, TextInput, Alert, Text, FlatList, Image } from 'react-native';
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
            //Alert.alert('Success', 'Item added successfully!');
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
            //Alert.alert('Success', 'Item deleted successfully!');
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
            //Alert.alert('Success', 'Item quantity updated successfully!');
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

<View style={styles.rectangle}>
      <View style={styles.col1}>
            <Text style={styles.trackerText}>{item.name}</Text>
            <Text style={styles.expireText}>Best by: </Text>
          </View>
          <View style={styles.col2}>
            <Text style={styles.quantityText}>{item.quantity}</Text>
          </View>
          <View style={styles.col3}>
            <View style={styles.leftIcons}>
              <Pressable android_ripple={{ color: '#FFF', borderless: true }}>
                <Image style={styles.notifyIcon} source={require('./assets/images/bell_on.png')} />
              </Pressable>
              <Button title="Update" onPress={() => updateItemQuantity(item.id, quantity)} />
        <Button title="Delete" onPress={() => deleteItem(item.id)} />
              <Text style={styles.locationIcon}>Location</Text>
            </View>
          </View>
      </View>


    </View>
  );

  return (
    <View style={styles.appContainer}>
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


      <View style={styles.trackerContainer}>
        <FlatList
          data={itemList}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>


      <View style={styles.editContainer}>

        <View style={styles.test}>
          <View style={styles.press}>
            <View>
              <Pressable  android_ripple={{ color: '#FFF', borderless: true }}>
                <Text>ADD +</Text>
              </Pressable>
            
            </View>
          </View>
          <View style={styles.press}>
            <View>
              <Pressable android_ripple={{ color: '#FFF', borderless: true }}>
                <Text>REMOVE -</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.test}>
          <View style={styles.press}>
            <View>
              <Pressable android_ripple={{ color: '#FFF', borderless: true }}>
                <Text>CART</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.press}>
            <View>
              <Pressable android_ripple={{ color: '#FFF', borderless: true }}>
                <Text>WASTE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#efece8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  navContainer: {
    flex: .25,
    flexDirection: 'row',
    columnGap: 100,
    paddingTop: 30,
  },
  filterLocation: {
    width: 60,
    height: 20,
    backgroundColor: 'gray',

  },
  filterExpire: {
    width: 60,
    height: 20,
    backgroundColor: 'gray'
  },
  editContainer: {
    flex: 1,
    backgroundColor: '#efece8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  press: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 20,
    margin: 8,
    padding: 18,
    width: '40%',
    borderRadius: 20,
    backgroundColor: '#c7c6bd',
  },
  test: {
    flexDirection: 'row'
  },
  menuContainer: {
    flex: .5,
    flexDirection: 'row',

  },
  pagesContainer: {
    flexDirection: 'row',
    columnGap: 60
  },
  image: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20
  },
  trackerContainer: {
    flex: 3,
    backgroundColor: '#efece8',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  quantityText: {
    paddingStart: 10,
    fontSize: 30,
    fontFamily: '',
    flex: 1,
    //backgroundColor:'blue',
    paddingLeft: 30,
    paddingVertical: 30
  },
  trackerText: {
    paddingStart: 10,
    fontSize: 30,
    fontFamily: '',
    flex: 4
  },
  expireText: {
    paddingStart: 10,
    fontSize: 15,
    alignContent: 'stretch',
    flex: 1,
    //backgroundColor: 'red'
  },
  rectangle: {
    width: 350,
    height: 100,
    backgroundColor: "white",
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 10
  },
  leftIcons: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flex: 3
  },
  notifyIcon: {
    width: 35,
    height: 35,
    justifyContent: 'flex-start',
    alignContent: 'flex-end',
    paddingBottom: 5
  },
  locationIcon: {
    alignItems: 'flex-end',
    flex: 1,
    paddingRight: 10,
    paddingTop: 40,
    //backgroundColor: 'green'
  },
  col1: {
    flex: 4
  },
  col2: {
    flex: 1
  },
  col3: {
    flex: 2
  }
});


