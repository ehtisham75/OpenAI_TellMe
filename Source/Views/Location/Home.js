// import React, { useEffect, useState, useRef } from 'react';
// import {
//     View, Text, StatusBar, Button, StyleSheet,
//     TouchableOpacity, Image, PermissionsAndroid, Switch
// } from 'react-native'
// import changeNavigationBarColor, { hideNavigationBar, showNavigationBar, } from 'react-native-navigation-bar-color';
// import { Colors } from '../../Assets/Color/Colors'
// import { SetStatusBar } from '../ReusableComponents/SetStatusBar';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { CameraKitCamera, CameraScreen } from 'react-native-camera-kit';
// import { faceapi } from 'face-api.js';

// const Home = () => {
//     const cameraRef = useRef(null);
//     const [storedImage, setStoredImage] = useState(null);
//     const [currentLocation, setCurrentLocation] = useState(null);

//     useEffect(() => {
//         // changeNavigationBarColor(Colors.TRANSPARENT);
//         initializeFaceAPI()
//     }, []);

//     const initializeFaceAPI = async () => {
//         await Promise.all([
//             faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//             faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//             faceapi.nets.faceLandmark68Net.loadFromUri('/models')
//         ]);
//     };

//     const handleCapture = async () => {
//         // console.log("==== CameraRef == >> ", cameraRef)
//         if (cameraRef.current) {
//             const image = await this.camera.capture(true);
//             setStoredImage(image.uri);
//         }
//     };

//     const handleCompare = async () => {
//         if (storedImage) {
//             const image = await faceapi.fetchImage(storedImage);
//             const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
//             if (detection) {
//                 // Store the face descriptor for future comparisons
//                 const storedDescriptor = detection.descriptor;

//                 // Capture a new image for comparison
//                 const image = await this.camera.capture(true);
//                 const newImage = await faceapi.fetchImage(image.uri);

//                 // Detect the face and compute the descriptor for the new image
//                 const newDetection = await faceapi.detectSingleFace(newImage).withFaceLandmarks().withFaceDescriptor();
//                 if (newDetection) {
//                     const newDescriptor = newDetection.descriptor;

//                     // Compare the stored descriptor with the new descriptor
//                     const distance = faceapi.euclideanDistance(storedDescriptor, newDescriptor);
//                     console.log('Face distance:', distance);
//                     // You can define a threshold to determine whether the faces match or not
//                     // For example, if distance < threshold, faces match

//                     // Display the new image with a bounding box
//                     const canvas = faceapi.createCanvasFromMedia(newImage);
//                     const displaySize = { width: newImage.width, height: newImage.height };
//                     faceapi.matchDimensions(canvas, displaySize);
//                     const detectionsForSize = faceapi.resizeResults(newDetection, displaySize);
//                     faceapi.draw.drawDetections(canvas, detectionsForSize);
//                     const imageWithBoundingBox = canvas.toDataURL();
//                     setStoredImage(imageWithBoundingBox);
//                 }
//             }
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {/* <SetStatusBar /> */}

//             <CameraScreen
//                 ref={cameraRef}
//                 style={styles.preview}
//                 cameraOptions={{
//                     flashMode: 'off',
//                     focusMode: 'on',
//                     zoomMode: 'off',
//                     // ratioOverlay: '1:1',
//                 }}
//             />

//             <Image style={styles.image} source={{
//                 uri: storedImage ? storedImage
//                     : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR37I-7QqZsvDUu97GHNf3ZcfXRkG6rwuQMDgJA22jZqo_VXlhkH5tn6jKfaau4voqtATA&usqp=CAU"
//             }} />

//             <TouchableOpacity
//                 onPress={handleCapture}
//                 style={{
//                     width: "80%",
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     paddingVertical: "3.5%",
//                     marginTop: "5%",
//                     backgroundColor: Colors.SECONDARY_COLOR,
//                     borderRadius: 10,
//                 }}>
//                 <Text
//                     style={{
//                         fontSize: 16,
//                         color: Colors.WHITE_TEXT_COLOR,
//                         fontWeight: '600',
//                         textAlign: 'center',
//                     }}>Capture</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 onPress={handleCompare}
//                 style={{
//                     width: "80%",
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     paddingVertical: "3.5%",
//                     marginTop: "5%",
//                     backgroundColor: Colors.SECONDARY_COLOR,
//                     borderRadius: 10,
//                 }}>
//                 <Text
//                     style={{
//                         fontSize: 16,
//                         color: Colors.WHITE_TEXT_COLOR,
//                         fontWeight: '600',
//                         textAlign: 'center',
//                     }}>Compare</Text>
//             </TouchableOpacity>

//             {/* <Button title="Capture" onPress={ } /> */}
//             {/* <Button title="" onPress={} /> */}
//         </View>
//     )
// }

// export default Home

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // backgroundColor: 'white',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     preview: {
//         flex: 1,
//         // justifyContent: 'flex-end',
//         // alignItems: 'center',
//     },
//     image: {
//         width: wp(80),
//         height: hp(50),
//         resizeMode: 'cover',
//         borderRadius: 10
//         // backgroundColor: 'plum',
//     },
// });

















import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CameraScreen, CameraType, Camera } from 'react-native-camera-kit';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import { SetStatusBar } from '../ReusableComponents/SetStatusBar';
import { Colors } from '../../Assets/Color/Colors';
import { NewFonts } from '../../Assets/Fonts/NewFonts';

const Home = () => {
    // const cameraRef = useRef(null);
    // const [faces, setFaces] = useState([]);

    // useEffect(() => {
    //     const runModel = async () => {
    //         await tf.ready();
    //         const model = await blazeface.load();
    //         const interval = setInterval(async () => {
    //             if (cameraRef.current) {
    //                 const { uri } = await cameraRef.current.capture(false);
    //                 const image = tf.browser.fromPixels({ uri });
    //                 const predictions = await model.estimateFaces(image);
    //                 setFaces(predictions);
    //                 tf.dispose(image);
    //             }
    //         }, 100);

    //         return () => clearInterval(interval);
    //     };

    //     runModel();
    // }, []);

    const cameraRef = useRef(null);
    const [faces, setFaces] = useState([]);
    const [capturedImage, setCapturedImage] = useState(null);
    const [oldImage, setOldImage] = useState(null);
    const [comparisonResult, setComparisonResult] = useState(null);
    const [showCamera, setShowCamera] = useState(false);

    const captureImage = async () => {
        if (cameraRef.current) {
            const { uri } = await cameraRef.current.capture(true);
            setCapturedImage(uri);
            setFaces([]);
            setShowCamera(false);
        }
    };

    const openCamera = () => {
        setOldImage(null);
        setCapturedImage(null);
        setShowCamera(true);
    };

    const compareImages = async () => {
        if (capturedImage && oldImage) {
            const captured = tf.browser.fromPixels({ uri: capturedImage });
            const old = tf.browser.fromPixels({ uri: oldImage });
            const result = capturedImage === oldImage;
            setComparisonResult(result);
            tf.dispose([captured, old]);
        }
    };

    return (
        <View style={styles.container}>
            <SetStatusBar />

            {!showCamera ? (
                <View style={styles.cameraBox}>
                    <TouchableOpacity onPress={openCamera}
                        style={styles.cameraButton}>
                        <Image
                            source={require('../../Assets/Images/camera.png')}
                            style={styles.camIcon}
                        />
                        <Text style={{
                            fontSize: 18,
                            color: Colors.BLACK_TEXT_COLOR,
                            fontFamily:NewFonts.font2
                        }}>Camera</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <Camera
                        ref={cameraRef}
                        cameraType={CameraType.Front}
                        style={{ flex: 1 }}
                        cameraOptions={{
                            flashMode: 'off',
                            focusMode: 'on',
                            zoomMode: 'on',
                        }}
                        onReadCode={() => { }}
                    />

                    <TouchableOpacity
                        onPress={() => { setShowCamera(false) }}
                        style={{
                            position: 'absolute',
                            top: 10,
                            left: 20,
                        }}>
                        <Ionicons name="close" size={30} color={'white'} />
                    </TouchableOpacity>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: ms(10),
                        alignSelf: 'center',
                    }}>
                        <View style={{
                            width: 60,
                            height: 60,
                            borderRadius: 50,
                            borderColor: Colors.WHITE,
                            borderWidth: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <TouchableOpacity onPress={captureImage}
                                style={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: Colors.WHITE,
                                    borderRadius: 50
                                }}>

                            </TouchableOpacity>
                        </View>

                        {/* <TouchableOpacity onPress={compareImages} style={{ padding: 10, backgroundColor: 'green' }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Compare</Text>
                        </TouchableOpacity> */}
                    </View>

                    {capturedImage && (
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 18 }}>Captured Image</Text>
                            <Image source={{ uri: capturedImage }} style={{ width: 200, height: 200, marginTop: 10 }} />
                        </View>
                    )}

                    {oldImage && (
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 18 }}>Old Image</Text>
                            <Image source={{ uri: oldImage }} style={{ width: 200, height: 200, marginTop: 10 }} />
                        </View>
                    )}
                    {comparisonResult !== null && (
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 18 }}>Comparison Result: {comparisonResult.toString()}</Text>
                        </View>
                    )}
                </>
            )}

            {/* {faces.map((face, index) => (
                <View
                    key={index}
                    style={{
                        position: 'absolute',
                        top: face.topLeft[0],
                        left: face.topLeft[1],
                        width: face.bottomRight[1] - face.topLeft[1],
                        height: face.bottomRight[0] - face.topLeft[0],
                        borderWidth: 2,
                        borderColor: 'red',
                    }}
                />
            ))} */}
        </View>
    );
};

export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: ms(10)
    },
    cameraButton: {
        alignItems: 'center',
        backgroundColor: Colors.SECONDARY_COLOR,
        paddingHorizontal: ms(20),
        paddingVertical: ms(10),
        borderRadius: ms(10)
    },
    camIcon: {
        width: s(50),
        height: vs(50),
        tintColor: Colors.PRIMARY_COLOR
    },
})
