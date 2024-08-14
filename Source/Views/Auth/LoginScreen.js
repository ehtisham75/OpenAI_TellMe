import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import { Colors } from '../../Assets/Color/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NewFonts } from '../../Assets/Fonts/NewFonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, CommonActions } from '@react-navigation/native';

import Helpers from '../../Data/Helpers';
import Urls from '../../Data/Urls';
import ApiHandler from '../../Data/ApiHandler';
import PrefManager from '../../Data/PrefManager';

const helper = new Helpers()
const apiHandler = new ApiHandler()
const prefManager = new PrefManager()

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const LoginController = () => {
        helper.showTextToast("Login Successfully.", Colors.BLUE_BG)
        helper.resetAndGo(navigation, "TopTabs")

        return

        if (email == "") {
            helper.showTextToast("Enter email please.", Colors.RED_BG)
            return
        }
        if (!helper.isValidEmail(email)) {
            helper.showTextToast("Wrong email.", Colors.RED_BG)
            return
        }
        if (password == "") {
            helper.showTextToast("Enter password please.", Colors.RED_BG)
            return
        }
        // if (email == "employee@gmail.com" && password == "111222") {
        //     return
        // }

        if (password !== "" && email !== "") {
            prefManager.createUserSession({
                Email: email,
                Password: password
            })
            helper.showTextToast("Login Successfully.", Colors.BLUE_BG)
            helper.resetAndGo(navigation, "LoginScreen")
        }

        // alert(JSON.stringify(resp.data))
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={Colors.TRANSPARENT}
                barStyle={"dark-content"}
                translucent={true}
            />

            {/* <ImageBackground
                resizeMode='cover'
                source={require('../../Assets/Images/bg2.png')}
                style={styles.bgImage} >
            </ImageBackground> */}

            <View style={styles.topCircle}>
                <Text style={styles.screenTitle}>Login</Text>
            </View>

            <View style={styles.mainBox}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.keyboardView}>

                    {/* =============== Email ============= */}
                    <TextInput
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder={"Email"}
                        placeholderTextColor={Colors.SECONDARY_COLOR}
                        value={email}
                        OnChangeText={(text) => { setEmail(text) }}
                        returnKeyType="next"
                        // onSubmitEditing={(input2) => { secondTextInput.focus(input2); }}
                        style={styles.emailInput}>
                    </TextInput>

                    {/* =============== Password ============= */}
                    <View style={styles.passwordBox}>
                        <TextInput
                            autoCapitalize='none'
                            placeholder={"Password"}
                            placeholderTextColor={Colors.SECONDARY_COLOR}
                            // ref={(input) => { secondTextInput = input }}
                            returnKeyType='done'
                            value={password}
                            OnChangeText={(text) => { setPassword(text) }}
                            secureTextEntry={showPassword}
                            style={styles.passwordInput}>
                        </TextInput>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => { togglePasswordVisibility() }}
                            style={styles.passwordIcon}>
                            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={Colors.SECONDARY_COLOR} />
                        </TouchableOpacity>
                    </View>

                    {/* =========== Button =========== */}
                    {isLoading ?
                        <ActivityIndicator size="small" color={Colors.SECONDARY_COLOR}
                            style={styles.buttonLoader} />
                        :
                        <TouchableOpacity
                            onPress={() => { LoginController() }}
                            activeOpacity={0.5}
                            style={styles.button}>
                            <Text style={styles.buttonTitle}>Login</Text>
                        </TouchableOpacity>
                    }

                    {/* =========== Move to Screen =========== */}
                    <View style={styles.moveBox}>
                        <Text style={styles.moveText}>Don't have an account</Text>

                        <Text onPress={() => navigation.navigate('RegisterScreen')}
                            style={styles.navigateText}>Register</Text>
                    </View>

                </KeyboardAwareScrollView>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        // width: wp(100),
        // height: "100%",
        // height: vs(720),
    },
    topCircle: {
        width: hp(40),
        height: hp(39),
        borderRadius: hp(100),
        backgroundColor: Colors.SECONDARY_COLOR,
        top: hp(-10),
        left: wp(-10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenTitle: {
        fontSize: hp(5),
        color: Colors.PRIMARY_COLOR,
        textAlign: 'center',
        fontFamily: NewFonts.font2,
        marginTop: vs(70),
    },
    mainBox: {
        flex: 1,
        marginLeft: ms(8),
        marginTop: hp(-6),
    },
    keyboardView: {
        // backgroundColor: 'yellow',
        backgroundColor: Colors.PRIMARY_COLOR,
        borderTopLeftRadius: 100,
        paddingHorizontal: wp(10),
    },
    emailInput: {
        borderColor: Colors.SECONDARY_COLOR,
        borderBottomWidth: 2,
        width: wp(80),
        fontSize: hp(2),
        color: Colors.SECONDARY_COLOR,
        marginTop: hp(4),
        fontFamily: NewFonts.font2,
    },
    passwordBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.SECONDARY_COLOR,
        borderBottomWidth: 2,
        marginTop: hp(5),
        height: hp(6),
    },
    passwordInput: {
        flex: 1,
        fontSize: hp(2),
        color: Colors.SECONDARY_COLOR,
        fontFamily: NewFonts.font2,
    },
    passwordIcon: {
        padding: hp(1),
    },
    buttonLoader: {
        marginTop: hp(11),
        alignSelf: 'center',
    },
    button: {
        height: hp(7),
        // width: wp(80),
        backgroundColor: Colors.SECONDARY_COLOR,
        borderRadius: hp(10),
        marginTop: hp(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        fontSize: hp(2.7),
        color: Colors.PRIMARY_COLOR,
        fontFamily: NewFonts.font2,
    },
    moveBox: {
        flexDirection: 'row',
        marginTop: hp(5),
        // backgroundColor: 'cyan',
        alignItems: 'center',
        justifyContent: 'center',
    },
    moveText: {
        color: Colors.LIGHTGRAY_TEXT_COLOR,
        fontSize: hp(2),
        fontFamily: NewFonts.font2,
    },
    navigateText: {
        color: Colors.SECONDARY_COLOR,
        fontSize: hp(2),
        marginLeft: wp(2),
        fontFamily: NewFonts.font2,
    },
})
