import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { Camera } from 'expo-camera'
import CameraPreview from '../components/CameraPreview'
import {useDispatch} from 'react-redux'
import {postOcr} from '../store/actions'

export default function AddRecord({navigation, route}) {
    const dispatch = useDispatch()
    const [startCamera, setStartCamera] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)

    async function startCameraHandler() {
        const { status } = await Camera.requestPermissionsAsync()
        if (status === 'granted') {
            // start the camera
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }

    const savePhotoHandler = () => {
        const payload = new FormData();
        payload.append("imageUrl", capturedImage);

        dispatch(postOcr(payload))
        // dispatch(postOcr(capturedImage.uri))
    }
    const retakePictureHandler = () => {
      setCapturedImage(null)
      setPreviewVisible(false)
      startCameraHandler()
    }
    function testFetch() {
        console.log('masuk')
        fetch('http://192.168.100.9:3000/transactions/1')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }

    function toAddExpense(e) {
        e.preventDefault()
        console.log('masukkk')
        navigation.navigate('AddExpense')
    }

    async function takePictureHandler() {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)

    }

    return (
        <View style={styles.container}>
            {startCamera ? (
                previewVisible && capturedImage ? (
                    <CameraPreview photo={capturedImage} savePhoto={savePhotoHandler} retakePicture={retakePictureHandler} />
                ) : (
                    <Camera
                        style={{ flex: 1, width:'100%' }}
                        ref={(r) => {
                            camera = r
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                width: '100%',
                                backgroundColor: 'transparent',
                                flexDirection: 'row'
                            }}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    flexDirection: 'row',
                                    flex: 1,
                                    width: '100%',
                                    padding: 20,
                                    justifyContent: 'space-between'
                                }}
                            >
                                <View
                                    style={{
                                        alignSelf: 'center',
                                        flex: 1,
                                        alignItems: 'center'
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={takePictureHandler}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            bottom: 0,
                                            borderRadius: 50,
                                            backgroundColor: '#fff'
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Camera>
                )
            ) : (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        onPress={startCameraHandler}
                        style={{
                            width: 130,
                            borderRadius: 4,
                            backgroundColor: '#14274e',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            Take picture
                        </Text>
                        {/* <Button onPress={testFetch} title='test for post'  style={{marginBottom:5}}/> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toAddExpense}
                        style={{
                            width: 130,
                            borderRadius: 4,
                            backgroundColor: '#14274e',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                            marginTop: 10
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            Input Manually
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>console.log('gottem')}
                        style={{
                            width: 130,
                            borderRadius: 4,
                            backgroundColor: '#14274e',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                            marginTop: 10
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            Upload from phone
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})