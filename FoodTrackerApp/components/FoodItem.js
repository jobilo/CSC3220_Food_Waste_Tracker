import { StyleSheet, View, Text, Pressable } from 'react-native';

function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

function FoodItem(props,eText) {
  return (
    <View style={styles.goalItem}>
      
      <Pressable android_ripple={{ color: '#dddddd' }}
        onPress={props.onDeleteItem.bind(this, props.id)}>
      <View style={styles.rectangle}>
        <View>
          <Text style={styles.trackerText}>{props.text}</Text>
          <Text style={styles.expireText}>Best by: {eText.text}</Text>
        </View>
        <View style={styles.leftIcons}>
          <Text style={styles.notifyIcon}>Notify</Text>
          <Text style={styles.locationIcon}>Location</Text>
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
    flex: 3,
    paddingRight: 10
  },
  locationIcon: {
    alignItems: 'flex-end',
    flex: 1,
    paddingRight: 10
  },
});