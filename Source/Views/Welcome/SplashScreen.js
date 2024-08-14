import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import changeNavigationBarColor, { hideNavigationBar, showNavigationBar, } from 'react-native-navigation-bar-color';

import NetInfo from "@react-native-community/netinfo";
import Onboarding from 'react-native-onboarding-swiper';
import { Colors } from '../../Assets/Color/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NewFonts } from '../../Assets/Fonts/NewFonts';

const swiperImage = (Img) => {
    return (
        <Image
            source={Img}
            style={{
                width: hp(40),
                height: hp(40),
                borderRadius: hp(1.5)
            }}
        />
    )
}

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        //     // changeNavigationBarColor(Colors.PRIMARY_COLOR);
    }, []);

    function navigateAction() {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        // name: "Home",
                        name: "LoginScreen",
                        //   params: {}
                    }
                ],
            })
        );
    }

    function OnboardSwiper() {
        return (
            <Onboarding
                showSkip={false}
                // showPagination={false}
                bottomBarHighlight={false}
                // bottomBarColor={Colors.PRIMARY_COLOR}
                onDone={navigateAction}

                titleStyles={{
                    color: Colors.WHITE_TEXT_COLOR,
                    fontSize: hp(5),
                    fontFamily: NewFonts.font2,
                    marginTop: hp(2),
                }}

                pages={[
                    {
                        backgroundColor: Colors.PRIMARY_COLOR,
                        image: swiperImage(require('../../Assets/Images/IntroScreen/Intro1.png')),
                        title: 'Share your feelings',
                    },
                    {
                        backgroundColor: Colors.c,
                        image: swiperImage(require('../../Assets/Images/IntroScreen/Intro2.png')),
                        title: 'Face Login',
                        //   subtitle: 'This is the subtitle.',
                    },
                    {
                        backgroundColor: Colors.e,
                        image: swiperImage(require('../../Assets/Images/IntroScreen/Intro3.png')),
                        title: 'Live Chatting',
                    },
                    {
                        backgroundColor: Colors.f,
                        image: swiperImage(require('../../Assets/Images/IntroScreen/Intro4.png')),
                        title: 'Video Calling',
                    }
                ]}
            />
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.PRIMARY_COLOR,
            }}>
            <StatusBar
                backgroundColor={Colors.TRANSPARENT}
                barStyle={"light-content"}
                translucent={true}
            />

            {OnboardSwiper()}
        </View>
    )
}

export default SplashScreen

// function navigateAction() {
//     NetInfo.addEventListener(state => {
//         console.log("Connection type", state.type);
//         console.log("Is connected?", state.isConnected);

//         if (state.isConnected == true) {
//             navigation.dispatch(
//                 CommonActions.reset({
//                     index: 0,
//                     routes: [
//                         {
//                             // name: "Home",
//                             name: "LoginScreen",
//                             //   params: {}
//                         }
//                     ],
//                 })
//             );
//         }
//         else {
//             navigation.dispatch(
//                 CommonActions.reset({
//                     index: 0,
//                     routes: [
//                         {
//                             name: "NoNetConnected",
//                         }
//                     ],
//                 })
//             );
//         }
//     })
// }
