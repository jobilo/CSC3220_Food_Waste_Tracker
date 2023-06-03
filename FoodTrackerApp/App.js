import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native';
//import * as SQLite from "expo "
import FoodItem from './components/FoodItem';
import FoodList from './components/FoodInput';
import useDBClient from "./components/sqlClient";

export default function App() {

  // [setAddFoodButton, setAddFood] = useState("");
  //const [addFoodVisible, setAddFoodVisible] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const dbClient = useDBClient();

  /*
  const initialLoad = useCallback(async () => {
    await dbClient.loadData();
    setLoaded(true);
  }, [dbClient]);
  

  useEffect(() => {initialLoad()},[]);
  */

  //function taskInputHandler() {
  //  setAddFood(true);
  //}

  //const db = SQLite.openDatabase("foodLog.db");

  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddFoodHandler() {
    setModalIsVisible(true);
  };

  function endAddFoodHandler() {
    setModalIsVisible(false);
  }

  function addFoodHandler(enteredFoodText) {
    setFoodList(currentFoodList => [
      ...currentFoodList,
      { text: enteredFoodText, id: Math.random().toString() }
    ]);
    endAddFoodHandler();
  };

  function deleteFoodHandler(id) {
    setFoodList((currentFoodList) => {
      return currentFoodList.filter((food) => food.id !== id);
    })
  }

  function setNotifications(){

  }
  
  
  return (
    <View style={styles.appContainer}>
      <View style={styles.navContainer}>
        <View style={styles.filterExpire}>
          <Text>Expire</Text>
        </View>
        <View style={styles.filterLocation}>
          <Text>Location</Text>
        </View>
      </View>


      <View style={styles.trackerContainer}>
        <Text>Begin logging food!</Text>
        <StatusBar style="auto"></StatusBar>
        <View style={styles.rectangle}>
          <View>
            <Text style={styles.trackerText}>SAMPLE</Text>
            <Text style={styles.expireText}>Best by: Date</Text>
          </View>
          <View style={styles.leftIcons}>
          <Pressable onPress={setNotifications} android_ripple={{ color: '#FFF', borderless: true }}>
        <Image style={styles.notifyIcon} source={require('./assets/images/bell_on.png')} />
        </Pressable>
            <Text style={styles.locationIcon}>Location</Text>
          </View>
        </View>
        <View>


          <FlatList
            data={foodList}
            renderItem={(itemData) => {
              return (
                <FoodItem text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteFoodHandler} />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}>
          </FlatList>
        </View>

      </View>



      <View style={styles.editContainer}>

        <View style={styles.test}>
          <View style={styles.press}>
            <View>
              <Pressable onPress={startAddFoodHandler} android_ripple={{ color: '#FFF', borderless: true }}>
                <Text>ADD +</Text>
              </Pressable>
              <FoodList
                visible={modalIsVisible}
                onAddFood={addFoodHandler}
                onCancel={endAddFoodHandler}
              />
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
  )
}

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
    flex: 1
  },
  rectangle: {
    width: 350,
    height: 100,
    backgroundColor: "white",
    flexDirection: 'row',
    borderRadius: 5
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
    paddingRight: 10
  },
});


