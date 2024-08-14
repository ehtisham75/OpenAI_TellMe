import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { vs } from 'react-native-size-matters';
import { Colors } from '../../Assets/Color/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//=============================================
import Home from '../Location/Home';
import ChatScreen from '../Chat/ChatScreen';
import ProfileScreen from '../Chat/ProfileScreen';
import CallScreen from '../Chat/CallScreen';

const TopTabs = () => {
    const Tab = createMaterialTopTabNavigator();

    return (
        <Tab.Navigator
            // screenOptions={({ route }) => ({ tabBarIcon: ({ focused, color, size }) => { }})}
            // tabBarOptions={{ style: {}, }}
            screenOptions={{
                tabBarActiveTintColor: Colors.SECONDARY_COLOR,
                tabBarInactiveTintColor: Colors.SECONDARY_COLOR,
                tabBarIndicatorStyle: { backgroundColor: Colors.SECONDARY_COLOR },
                tabBarStyle: {
                    backgroundColor: Colors.PRIMARY_COLOR,
                    height: vs(80),
                    justifyContent: 'center',
                },
                tabBarShowIcon: true
            }}>

            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={22} />
                    ),
                }}
            />

            <Tab.Screen name="ChatScreen" component={ChatScreen}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbox-ellipses" color={color} size={22} />
                    ),
                }}
            />

            <Tab.Screen name="CallScreen" component={CallScreen}
                options={{
                    tabBarLabel: 'Calls',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="call" color={color} size={22} />
                    ),
                }}
            />

            <Tab.Screen name="ProfileScreen" component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-alt" color={color} size={22} />
                    ),
                }}
            />

        </Tab.Navigator>
    )
}

export default TopTabs
