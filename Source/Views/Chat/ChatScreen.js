import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import { GiftedChat, Send, SystemMessage, InputToolbar, Bubble } from 'react-native-gifted-chat';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Colors } from '../../Assets/Color/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        loadMessages();

        // setMessages([
        //     {
        //         _id: 1,
        //         text: 'Hello',
        //         createdAt: new Date(),
        //         user: {
        //             _id: 1,
        //         },
        //         sent: true,
        //         received: true,
        //         pending: false,
        //     },
        // ]);
    }, []);

    // const handleSend = (newMessages) => {
    //     setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    // };

    // const handleSend = (newMessages) => {
    //     setMessages((prevMessages) =>
    //         GiftedChat.append(prevMessages, [
    //             {
    //                 ...newMessages[0],
    //                 user: {
    //                     _id: 1,
    //                 },
    //                 sent: true,
    //                 received: true,
    //                 pending: false,
    //             },
    //         ])
    //     );
    // };

    const handleSend = (newMessages) => {
        saveMessages(newMessages);
        setText('');
    };

    const renderBubble = (props) => {
        const { currentMessage } = props;

        const renderTicks = () => {
            if (currentMessage.user._id !== 1) return null;

            return (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 5,
                    backgroundColor: 'plum',
                }}>
                    {currentMessage.sent && (
                        <Ionicons name="checkmark-done" size={15} color={Colors.GRAY} />
                    )}
                    {(currentMessage.sent && currentMessage.received) && (
                        <Ionicons name="checkmark-done" size={15} color={Colors.b} />
                    )}
                </View>
            );
        };

        return (
            <View>
                <Bubble {...props}
                />
                {renderTicks()}
            </View>
        );
    };

    const handleChooseImage = () => {
        ImageCropPicker.openPicker({
            mediaType: 'photo',
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            cropping: true,
        }).then((image) => {
            const imageMessage = {
                _id: Math.round(Math.random() * 1000000),
                text: '',
                createdAt: new Date(),
                user: {
                    _id: 1,
                },
                image: image.path,
            };

            setMessages((prevMessages) => GiftedChat.append(prevMessages, [imageMessage]));
        }).catch((error) => {
            console.log('ImagePicker Error: ', error);
        });
    };

    // const renderSendIcon = (props) => {
    //     const { text, onSend } = props;

    //     if (props.text.trim().length > 0) {
    //         return (
    //             <TouchableOpacity
    //                 onPress={() => onSend({ text })}
    //                 style={{
    //                     backgroundColor: Colors.PRIMARY_COLOR,
    //                     paddingHorizontal: ms(9),
    //                     paddingVertical: ms(8.5),
    //                     borderRadius: hp(50),
    //                     right: s(10),
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                     alignSelf: 'center',
    //                 }}>
    //                 <Ionicons name="send" size={22} color={Colors.SECONDARY_COLOR} />
    //             </TouchableOpacity>
    //         );
    //     }
    //     return null;
    // }

    const renderInputToolbar = (props) => {
        const { text, onTextChanged, onSend } = props;

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                // paddingVertical: vs(5),
                // backgroundColor: 'cyan',
                // paddingBottom:vs(10)
                // marginBottom: hp(3),
                // flex:1
                // bottom:hp(2)
            }}>
                <TextInput
                    placeholder="Type your message..."
                    value={text}
                    onChangeText={onTextChanged}
                    style={{
                        flex: 1,
                        fontSize: 16,
                        paddingHorizontal: s(10),
                        backgroundColor: Colors.WHITE,
                        marginHorizontal: ms(5),
                        borderRadius: hp(10),
                    }}
                />
                {props.text.trim().length > 0 ? (
                    <TouchableOpacity
                        onPress={() => onSend({ text })}
                        style={{
                            backgroundColor: Colors.PRIMARY_COLOR,
                            paddingHorizontal: ms(9),
                            paddingVertical: ms(8.5),
                            borderRadius: hp(50),
                            marginRight: ms(10),
                            marginBottom: vs(5),
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                        }}>
                        <Ionicons name="send" size={22} color={Colors.SECONDARY_COLOR} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleChooseImage}
                        style={{
                            backgroundColor: Colors.PRIMARY_COLOR,
                            paddingHorizontal: ms(9),
                            paddingVertical: ms(8.5),
                            borderRadius: hp(50),
                            marginRight: ms(10),
                            marginBottom: vs(5),
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                        }}>
                        <Ionicons name="attach" size={22} color={Colors.SECONDARY_COLOR} />
                    </TouchableOpacity>
                )}

            </View>
        );
    };

    const loadMessages = async () => {
        try {
            const storedMessages = await AsyncStorage.getItem('chatMessages');
            if (storedMessages !== null) {
                setMessages(JSON.parse(storedMessages));
            }
        } catch (error) {
            console.log('Error loading chat messages:', error);
        }
    };

    const saveMessages = async (newMessages) => {
        try {
            const updatedMessages = GiftedChat.append(messages, newMessages);
            setMessages(updatedMessages);
            await AsyncStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
        } catch (error) {
            console.log('Error saving chat messages:', error);
        }
    };

    return (
        <View style={{
            flex: 1,
            paddingBottom:vs(5)
        }}>
            <GiftedChat
                messages={messages}
                onSend={handleSend}
                user={{ _id: 1, name: 'User', }}
                renderInputToolbar={renderInputToolbar}
                // renderBubble={renderBubble}
                // renderSend={renderSendIcon}

                text={text}
                onInputTextChanged={(newText) => setText(newText)}

            />
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})