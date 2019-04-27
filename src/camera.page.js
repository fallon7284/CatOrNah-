import React from 'react';
import { View, Text, Button } from 'react-native';
import { Camera, Permissions, TouchableOpacity } from 'expo';
import styles from './styles';
import Clarifai from 'clarifai'
import secrets from '../secrets'
import axios from 'axios'
import CatOrNah from './catornah'


const clarifaiApp = new Clarifai.App({
    apiKey: secrets.clarifaiKey
})


export default class CameraPage extends React.Component {
    camera = null;

    state = {
        clarifyData: null,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    };


    // handleCaptureIn = () => this.setState({ capturing: true });

    handleCapture = async () => { 
        try{
            const photoData = await this.camera.takePictureAsync({base64: true})
            const clarifaiResponse = await clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, photoData.base64);
            catData = clarifaiResponse
            this.setState({ clarifyData: catData })
            console.log(this.state.clarifyData.outputs[0].data.concepts.map(thing => thing.name))
        } catch(error){
            console.log(error)
        }

    };


    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = (camera.status === 'granted');
        this.setState({ hasCameraPermission });
    };

    render() {
        const { hasCameraPermission, type } = this.state;


        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            // this.state.clarifyData ? this.state.clarifyData.map(data => <Text>{data.data}</Text>) : 
            <View >
                    <Camera 
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                        type={type}
                    />
                    <Button 
                    title="DataCat??"
                    onPress={() => {
                        this.handleCapture()
                        }}/>
                </View>
            
        );
    };
};




