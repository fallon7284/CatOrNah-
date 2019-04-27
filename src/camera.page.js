import React from 'react';
import { View, Text, Button } from 'react-native';
import { Camera, Permissions } from 'expo';
import styles from './styles';
import Clarifai from 'clarifai'
import secrets from '../secrets'


const clarifaiApp = new Clarifai.App({
    apiKey: secrets.clarifaiKey
})


export default class CameraPage extends React.Component {
    camera = null;

    state = {

        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    };


    // handleCaptureIn = () => this.setState({ capturing: true });

    handleCapture = async () => {
        const photoData = await this.camera.takePictureAsync({base64: true, skipProcessing: true});
        const isDisCat = await clarifaiApp(photoData)
        console.log(isDisCat)
        this.setState({ capturing: false, capture: photoData })
    };


    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = (camera.status === 'granted');
        this.setState({ hasCameraPermission });
    };

    render() {
        const { capturing, capture, hasCameraPermission, type } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <View onPress={() => this.handleCapture}>
                <Camera 
                    
                    style={styles.preview}
                    ref={camera => this.camera = camera}
                    type={type}
                />
                <Button 
                title="DataCat??"
                onPress={() => {
                    this.handleCapture()
                    console.log("PUSH THAT FUCKING BUTTON")
                    }}/>
                
            </View>
        );
    };
};




