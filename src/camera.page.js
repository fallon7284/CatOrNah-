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
        clarifyData: undefined,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    };

    

    // handleCaptureIn = () => this.setState({ capturing: true });

    handleCapture = async () => { 
        try{
            const photoData = await this.camera.takePictureAsync({base64: true, quality: 4})
            const clarifaiResponse = await clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, photoData.base64);
            catData = clarifaiResponse
            this.setState({ clarifyData: catData.outputs[0].data.concepts.map(thing => thing.name).includes('cat') })
            this.forceUpdate()
            console.log(this.state.clarifyData)
            console.log(this.whatToRender())

        } catch(error){
            console.log(error)
        }

    };


    whatToRender(){
    if (this.state.clarifyData === undefined){
        return ('')
    }
    else if (this.state.clarifyData === false){
        return (
                'NAH.'
        )
    } else if (this.state.clarifyData === true){
        return (
                'CAT!'
        )
    }
}





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
                <Text>{this.whatToRender()}</Text>
                    <Camera 
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                        type={type}
                    />
                    <Button 
                    title="DataCat??"
                    onPress={() => {
                        this.handleCapture()
                        this.props.navigation.navigate("HomeOrCatOrNah")
                        }}/>
                </View>
            
        );
    };
};




