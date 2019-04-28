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
        YorN: null,
        clarifyData: null,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    };

    

    // handleCaptureIn = () => this.setState({ capturing: true });

    handleCapture = async () => { 
        try{
            const photoData = await this.camera.takePictureAsync({base64: true, quality: 4})
            const clarifaiResponse = await clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, photoData.base64);
            catData = clarifaiResponse
            this.setState({ clarifyData: catData.outputs[0].data.concepts,  YorN: catData.outputs[0].data.concepts.map(thing => thing.name).includes('cat') })
            this.forceUpdate()
            console.log(this.state.YorN)
            console.log(this.whatToRender())

        } catch(error){
            console.log(error)
        }

    };


    whatToRender(){
    if (this.state.YorN === null){
        return ('')
    }
    else if (this.state.YorN === false){
        return (
                this.state.clarifyData[0].name !== 'no person' ? `Nah, thats ${this.state.clarifyData[0].name}` : `Nah, thats ${this.state.clarifyData[1].name}`
        )
    } else if (this.state.YorN === true){
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
            <React.Fragment>
                <View >
                {/* <Text>{this.whatToRender()}</Text> */}
                    <Camera 
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                        type={type}
                    />
                    <Button 
                    title="DataCat??"
                    onPress={() => {
                        this.handleCapture()
                        this.camera.pausePreview()
                        }}/>
                </View>
                <Text 
                style={this.state.YorN === true ? {fontSize: 65, color: "green", fontFamily: "Chalkduster"} : {fontSize: 65, color: "red", fontFamily: "Chalkduster"}}
                >{this.whatToRender()}</Text> 
            </React.Fragment>  
        );
    };
};




