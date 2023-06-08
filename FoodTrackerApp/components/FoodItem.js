import { StyleSheet, View, Text, Pressable,Image } from 'react-native';

/*
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}
*/
function FoodItem(props) {
  return (
    <View style={styles.goalItem}>
      
      <Pressable android_ripple={{ color: '#dddddd' }}
        onPress={props.onDeleteItem.bind(this, props.id)}>
      <View style={styles.rectangle}>
      <View style={styles.col1}>
            <Text style={styles.trackerText}>{props.text}</Text>
            <Text style={styles.expireText}>Best by: {props.expiration}</Text>
          </View>
          <View style={styles.col2}>
            <Text style={styles.quantityText}>{props.quantity}</Text>
          </View>
          <View style={styles.col3}>
            <View style={styles.leftIcons}>
              <Pressable android_ripple={{ color: '#FFF', borderless: true }}>
                <Image style={styles.notifyIcon} source={require('../assets/images/bell_on.png')} />
              </Pressable>
              <Text style={styles.locationIcon}>Location</Text>
            </View>
          </View>
      </View>
      </Pressable>
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  goalItem: {
    width: 350,
    height: 100,
    backgroundColor: "white",
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 10
  },
  goalText: {
    color: "black",
    padding: 8
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