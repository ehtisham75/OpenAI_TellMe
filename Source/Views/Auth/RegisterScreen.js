import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import { Colors } from '../../Assets/Color/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NewFonts } from '../../Assets/Fonts/NewFonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

import Helpers from '../../Data/Helpers';
import Urls from '../../Data/Urls';
import ApiHandler from '../../Data/ApiHandler';
import PrefManager from '../../Data/PrefManager';

const helper = new Helpers()
const apiHandler = new ApiHandler()
const prefManager = new PrefManager()


const RegisterScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const RegistrationController = () => {
        if (name == "") {
            helper.showTextToast("Enter your name please.", Colors.RED_BG)
            return
        }
        if (username == "") {
            helper.showTextToast("Enter username please.", Colors.RED_BG)
            return
        }
        if (email == "") {
            helper.showTextToast("Enter email please.", Colors.RED_BG)
            return
        }
        if (!helper.isValidEmail(email)) {
            helper.showTextToast("Wrong email.", Colors.RED_BG)
            return
        }
        if (phone == "") {
            helper.showTextToast("Enter phone number please.", Colors.RED_BG)
            return
        }
        if (password == "") {
            helper.showTextToast("Enter password please.", Colors.RED_BG)
            return
        }
        // if (email == "employee@gmail.com" && password == "111222") {
        //     return
        // }

        if (name !== "" && username !== "" && password !== "" && email !== "" && phone !== "") {
            prefManager.createUserSession({
                Name: name,
                Username: username,
                Email: email,
                Phone: phone,
                Password: password
            })
            helper.showTextToast("Registered Successfully.", Colors.BLUE_BG)
            helper.resetAndGo(navigation, "LoginScreen")
        }

        // alert(JSON.stringify(resp.data))
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={Colors.TRANSPARENT}
                barStyle={"light-content"}
                translucent={true}
            />
            <View style={styles.topCircle}>
                <Text style={styles.screenTitle}>Register</Text>
            </View>

            <View style={styles.mainBox}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.keyboardView}>

                    {/* =============== Name ============= */}
                    <TextInput
                        keyboardType='default'
                        autoCapitalize='none'
                        placeholder={"Name"}
                        placeholderTextColor={Colors.PRIMARY_COLOR}
                        value={name}
                        onChangeText={(text) => { setName(text) }}
                        returnKeyType="next"
                        // onSubmitEditing={(input2) => { secondTextInput.focus(input2); }}
                        style={styles.emailInput}>
                    </TextInput>

                    {/* =============== Username ============= */}
                    <TextInput
                        keyboardType='default'
                        autoCapitalize='none'
                        placeholder={"Username"}
                        placeholderTextColor={Colors.PRIMARY_COLOR}
                        value={username}
                        onChangeText={(text) => { setUsername(text) }}
                        returnKeyType="next"
                        // onSubmitEditing={(input2) => { secondTextInput.focus(input2); }}
                        style={styles.emailInput}>
                    </TextInput>

                    {/* =============== Email ============= */}
                    <TextInput
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder={"Email"}
                        placeholderTextColor={Colors.PRIMARY_COLOR}
                        value={email}
                        onChangeText={(text) => { setEmail(text) }}
                        returnKeyType="next"
                        // onSubmitEditing={(input2) => { secondTextInput.focus(input2); }}
                        style={styles.emailInput}>
                    </TextInput>

                    {/* =============== phone ============= */}
                    <TextInput
                        keyboardType='numeric'
                        autoCapitalize='none'
                        placeholder={"Phone Number"}
                        placeholderTextColor={Colors.PRIMARY_COLOR}
                        value={phone}
                        onChangeText={(text) => { setPhone(text) }}
                        returnKeyType="next"
                        // onSubmitEditing={(input2) => { secondTextInput.focus(input2); }}
                        style={styles.emailInput}>
                    </TextInput>

                    {/* =============== Password ============= */}
                    <View style={styles.passwordBox}>
                        <TextInput
                            autoCapitalize='none'
                            placeholder={"Password"}
                            placeholderTextColor={Colors.PRIMARY_COLOR}
                            // ref={(input) => { secondTextInput = input }}
                            returnKeyType='done'
                            value={password}
                            onChangeText={(text) => { setPassword(text) }}
                            secureTextEntry={showPassword}
                            style={styles.passwordInput}>
                        </TextInput>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => { togglePasswordVisibility() }}
                            style={styles.passwordIcon}>
                            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={Colors.PRIMARY_COLOR} />
                        </TouchableOpacity>
                    </View>

                    {/* =========== Button =========== */}
                    {isLoading ?
                        <ActivityIndicator size="small" color={Colors.PRIMARY_COLOR}
                            style={styles.buttonLoader}
                        />
                        :
                        <TouchableOpacity
                            onPress={() => { RegistrationController() }}
                            activeOpacity={0.5}
                            style={styles.button}>
                            <Text style={styles.buttonTitle}>Register</Text>
                        </TouchableOpacity>
                    }

                    {/* =========== Move to Screen =========== */}
                    <View style={styles.moveBox}>
                        <Text style={styles.moveText}>Already have an account</Text>

                        <Text onPress={() => navigation.navigate('LoginScreen')}
                            style={styles.navigateText}>Login</Text>
                    </View>

                </KeyboardAwareScrollView>
            </View>
        </View>
    )
}

export default RegisterScreen

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
        backgroundColor: Colors.PRIMARY_COLOR,
        top: hp(-10),
        left: wp(-10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenTitle: {
        fontSize: hp(5),
        color: Colors.SECONDARY_COLOR,
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
        backgroundColor: Colors.SECONDARY_COLOR,
        borderTopLeftRadius: 100,
        paddingHorizontal: wp(10),
        paddingTop: hp(2)
    },
    emailInput: {
        borderColor: Colors.PRIMARY_COLOR,
        borderBottomWidth: 2,
        width: wp(80),
        fontSize: hp(2),
        color: Colors.PRIMARY_COLOR,
        marginTop: hp(2),
        fontFamily: NewFonts.font2,
    },
    passwordBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.PRIMARY_COLOR,
        borderBottomWidth: 2,
        marginTop: hp(3),
        height: hp(6),
    },
    passwordInput: {
        flex: 1,
        fontSize: hp(2),
        color: Colors.PRIMARY_COLOR,
        fontFamily: NewFonts.font2,
    },
    passwordIcon: {
        padding: hp(1),
    },
    buttonLoader: {
        marginTop: hp(7),
        alignSelf: 'center',
    },
    button: {
        height: hp(7),
        // width: wp(80),
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: hp(10),
        marginTop: hp(6),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        fontSize: hp(2.7),
        color: Colors.SECONDARY_COLOR,
        fontFamily: NewFonts.font2,
    },
    moveBox: {
        flexDirection: 'row',
        marginTop: hp(3),
        // backgroundColor: 'cyan',
        alignItems: 'center',
        justifyContent: 'center',
    },
    moveText: {
        color: Colors.GRAY,
        fontSize: hp(2),
        fontFamily: NewFonts.font2,
    },
    navigateText: {
        color: Colors.PRIMARY_COLOR,
        fontSize: hp(2),
        marginLeft: wp(2),
        fontFamily: NewFonts.font2,
    },
})