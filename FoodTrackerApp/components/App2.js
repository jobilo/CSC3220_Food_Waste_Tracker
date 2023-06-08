import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Pressable, Modal, TextInput, Text, FlatList, Image, Switch } from 'react-native';
import * as SQLite from 'expo-sqlite';

// Initialize SQLite database
const db = SQLite.openDatabase('mydb.db');

const App = () => {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [location, setLocation] = useState('');
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [text, setText] = useState('Notifications On');
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    // Open or create database
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS foods (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTEGER, expiration TEXT, location TEXT);'
      );
    });
  }, []);

  // Function to fetch data from the database
  const fetchData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM foods;', [], (_, { rows }) => {
        setItemList(rows._array);
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to add a new record to the database
  const addRecord = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO foods (name, quantity, expiration, location) VALUES (?, ?, ?, ?);',
        [foodName, quantity, expirationDate, location],
        () => {
          fetchData();
        }
      );
    });
  };

  // Function to delete a record from the database
  const deleteRecord = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM foods WHERE id = ?;', [id], () => {
        fetchData();
      });
    });
  };

  // Function to update a record in the database
  const updateRecord = (id, newQuantity) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE foods SET quantity = ? WHERE id = ?;', [newQuantity, id], () => {
        fetchData();
      });
    });
  };

  const renderItem = ({ item }) => (

    <View>

      <View style={styles.rectangle}>
        <View style={styles.col1}>
          <Text style={styles.trackerText}>{item.name}</Text>
          <Text style={styles.expireText}>Best by:{item.expiration}</Text>
        </View>
        <View style={styles.col2}>
          <Text style={styles.quantityText}>{item.quantity}</Text>
        </View>
        <View style={styles.col3}>
          <View style={styles.leftIcons}>
            <Pressable android_ripple={{ color: '#FFF', borderless: true }}>
              <Image style={styles.notifyIcon} source={require('./assets/images/bell_on.png')} />
            </Pressable>
            <Button title="Update" onPress={() => updateRecord(item.id, quantity)} />
            <Button title="Delete" onPress={() => deleteRecord(item.id)} />
            <Text style={styles.locationIcon}>{item.location}</Text>
          </View>
        </View>
      </View>
    </View>
  );
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => {
    if (notifEnabled) {
      setText("Notifications Off")
    }
    else {
      setText("Notifications On")
    }
    setNotifEnabled(previousState => !previousState)
  }

  return (
    <View style={styles.appContainer}>

      <TextInput
        placeholder="New Quantity"
        value={quantity}
        onChangeText={text => setQuantity(text)}
        keyboardType="numeric"
      />
      
      <View style={styles.trackerContainer}>
        <FlatList
          style={{ marginTop: 20 }}
          data={itemList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.inputContainer}>
          <Image style={styles.modalimage} source={require('./assets/images/serving_tray.png')} />
          <TextInput
            placeholder="Food Name"
            value={foodName}
            onChangeText={text => setFoodName(text)}
          />
          <TextInput
            placeholder="Quantity"
            value={quantity}
            onChangeText={text => setQuantity(text)}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Expiration Date"
            value={expirationDate}
            onChangeText={text => setExpirationDate(text)}
          />
          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={text => setLocation(text)}
          />
          <Text>Type of Food Chooser</Text>

          <View style={styles.notifBox}>
            <View style={styles.notifText}>
              <Text style={{ fontWeight: 'bold' }}>{text}</Text>
            </View>
            <View style={styles.notifSwitch}>
              <Switch trackColor={{ false: 'gray', true: 'green' }}
                thumbColor={notifEnabled ? '#f4f3f4' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={notifEnabled}>
              </Switch>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title='Cancel' onPress={() => setModalVisible(!modalVisible)} color='#f31282'></Button>
            </View>
            <View style={styles.button}>
              <Button title="Add" onPress={addRecord} />
            </View>
          </View>
        </View>

      </Modal>


      <View style={styles.editContainer}>

        <View style={styles.test}>
          <View style={styles.press}>
            <View>
              <Pressable android_ripple={{ color: '#FFF', borderless: true }}
                onPress={() => setModalVisible(true)}>
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

      <View style={styles.menuContainer}>
        <View style={styles.pagesContainer}>
          <Pressable android_ripple={{ color: '#FFF' }}>
            <Image style={styles.image} source={require('./assets/images/home.png')} />
          </Pressable>
          <Pressable android_ripple={{ color: '#FFF' }}>
            <Image style={styles.image} source={require('./assets/images/Cart.png')} />
          </Pressable>
          <Pressable android_ripple={{ color: '#FFF' }}>
            <Image style={styles.image} source={require('./assets/images/leaf.png')} />
          </Pressable>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#DDE5E3'
},
modalimage: {
    width: 100,
    height: 100,
    margin: 20
},
textInput: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    width: '100%',
    padding: 8,
    color: '#120438',
    borderRadius: 6,
    margin: 5
},
buttonContainer: {
    marginTop: 8,
    flexDirection: 'row'
},
button: {
    width: '30%',
    marginHorizontal: 8
},
notifBox: {
    flexDirection: 'row',
    paddingHorizontal: 60,
    paddingVertical: 10
},
notifText: {
    flex: 3,
    justifyContent: 'center'
},
notifSwitch: {
    flex: 2,
    justifyContent: 'center'
}
});


