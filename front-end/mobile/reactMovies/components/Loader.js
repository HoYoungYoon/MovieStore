import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { TINT_COLOR } from '../constants/Color';


export default () =>
    <View style={styles.container}>
        <ActivityIndicator color={TINT_COLOR} ></ActivityIndicator>
    </View>

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: 'black',
        justifyContent: "space-around",
    }
})

