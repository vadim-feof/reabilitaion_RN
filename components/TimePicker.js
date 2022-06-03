import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Pressable, Platform} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from '@expo/vector-icons';

const TimePicker = ({value, setValue}) => {
    const [visible, setVisible] = useState(false)

    return (
        <View>
            <Pressable onPress={() => setVisible(visible => !visible)}>
                <View pointerEvents={'none'} style={styles.TimePicker}>
                    <TextInput
                        style={{fontSize: 20}}
                        value={new Date(value).toLocaleTimeString('ru-RU', {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                        editable={true}
                    />
                    <AntDesign name="clockcircleo" size={28} color="black" />
                </View>
            </Pressable>
            <View>
                {visible
                    ?
                    <DateTimePicker
                        style={{width: '100%'}}
                        value={new Date(value)}
                        mode={'time'}
                        is24Hour={true}
                        display={'clock'}
                        textColor={'black'}
                        locale={'ru-RU'}
                        onChange={(event, selectedDate) => {
                            if (Platform.OS === 'android') {
                                setVisible(false)
                                if (event.type === 'set')
                                    setValue(selectedDate)
                            }
                            if (Platform.OS === 'ios') {
                                setValue(selectedDate)
                            }
                        }}
                    />
                    :
                    null
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    TimePicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        marginTop: 15,
        padding: 15,
        borderColor: 'silver',
        borderRadius: 5,
        marginHorizontal: 12,
        marginVertical: 10
    }
})

export default TimePicker;