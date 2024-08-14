import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Toast = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

export { Toast }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 50,
        zIndex: 999,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
})