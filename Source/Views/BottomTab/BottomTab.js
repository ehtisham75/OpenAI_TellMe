import React from 'react'
import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../../Assets/Color/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
// -----------------------
import Home from '../Location/Home';
import ChatScreen from '../Chat/ChatScreen';
import { NewFonts } from '../../Assets/Fonts/NewFonts';


const GetRoutes = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route)
    console.log("========&&&&&&&&& ", routeName)
    if (routeName?.includes("ShortVideos")) {
        return "none";
    }
    return "flex";
}

const BottamTab = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: hp(8),
                    backgroundColor: Colors.PRIMARY_COLOR,
                }
            }}>

            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text style={{
                                fontSize: hp(1.7),
                                color: focused ? Colors.SECONDARY_COLOR : Colors.GRAY,
                                top: -5,
                                fontWeight: '700',
                                fontFamily: NewFonts.font2
                            }}>{focused ? "Home" : "Home"}</Text>)
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                <Ionicons
                                    name={focused ? "home" : "home-outline"}
                                    size={25}
                                    color={focused ? Colors.SECONDARY_COLOR : Colors.GRAY}
                                />
                            </>
                        )

                    },
                }}
            />

            <Tab.Screen name="ChatScreen" component={ChatScreen}
                options={{
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text style={{
                                fontSize: hp(1.7),
                                color: focused ? Colors.SECONDARY_COLOR : Colors.GRAY,
                                top: -5,
                                fontWeight: '700',
                                fontFamily: NewFonts.font2
                            }}>{focused ? "Chat" : "Chat"}</Text>)
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                <Ionicons
                                    name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
                                    size={25}
                                    color={focused ? Colors.SECONDARY_COLOR : Colors.GRAY}
                                />
                            </>
                        )
                    },
                }}
            />

        </Tab.Navigator >
    )
}

export default BottamTab