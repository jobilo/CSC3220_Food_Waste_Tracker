import { StyleSheet, View, TextInput, Button, Modal, Image, Switch, Text} from 'react-native'
import { useState } from 'react';


function FoodList(props) {
    const [enteredFoodText, setEnteredFoodText] = useState('');
    const [enteredExpiryText, setEnteredExpiryText] = useState('');
    const [enteredQuantity, setEnteredQuantity] = useState('');
    const [notifEnabled, setNotifEnabled] = useState(true);
    const [text, setText] = useState('Notifications On');
    const [selected, setSelected] = useState('');
    const data = [
        {key:'1',value:'Fruits'},
        {key:'1',value:'Vegetables'},
        {key:'2',value:'Grains'},
        {key:'3',value:'Protein'},
        {key:'4',value:'Dairy'},
        {key:'5',value:'Ready to Eat'},
    ]

    const toggleSwitch = () => {
        if (notifEnabled) {
            setText("Notifications Off")
        }
        else {
            setText("Notifications On")
        }
        setNotifEnabled(previousState => !previousState)
    }

    function foodInputHandler(enteredFoodText) {
        setEnteredFoodText(enteredFoodText);
    }

    function expiryInputHandler(enteredExpiryText) {
        setEnteredExpiryText(enteredExpiryText);
    }

    function quantityInputHandler(enteredQuantity) {
        setEnteredQuantity(enteredQuantity);
    }

    function renderElement(x){
        if(x = 'y')
           return <Text>data</Text>;
        return null;
     }
    
     function render() {
        return (   
            <View style={styles.container}>
                {this.state.value == 'news'? <Text>data</Text>: null }
            </View>
        )
    }

    function addFoodHandler() {
        console.log(enteredFoodText);
        console.log(enteredExpiryText);
        console.log(enteredQuantity)
        console.log(notifEnabled)
        props.onAddFood(enteredFoodText,enteredExpiryText,enteredQuantity,notifEnabled);
        setEnteredFoodText('');
        setEnteredExpiryText('');
        setEnteredQuantity('');
    }



    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../assets/images/serving_tray.png')} />
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter Food Item'
                    onChangeText={foodInputHandler}
                    value={enteredFoodText}
                    maxLength={15}>
                </TextInput>
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter Expiration Date'
                    onChangeText={expiryInputHandler}
                    value={enteredExpiryText}>
                </TextInput>
                <TextInput
                style={styles.textInput}
                    keyboardType='numeric'
                    placeholder='Enter Item Quantity'
                    onChangeText={quantityInputHandler}
                    maxLength={10}  //setting limit of input
                    value={enteredQuantity}
                />
                <Text>Type of Food Chooser</Text>
                <Text>Storage Location</Text>


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
                        <Button title='Cancel' onPress={props.onCancel} color='#f31282'></Button>
                    </View>
                    <View style={styles.button}>
                        <Button title='Add Food' onPress={addFoodHandler} color="#5e0acc"> </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#DDE5E3'
    },
    image: {
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
})
export default FoodList;

/*
import {SelectList} from 'react-native-dropdown-select-list';

<SelectList 
                data={data} 
                setSelected={setSelected}
                boxStyles={{backgroundColor: 'red'}}
                dropdownStyles={{backgroundColor: 'gray'}}
                dropdownItemStyles={{marginHorizontal:10}}
                dropdownTextStyles={{color:'white'}}
                placeholder='Select Food Group'
                maxHeight={300}
                />


*/