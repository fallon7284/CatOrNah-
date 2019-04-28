import React from 'react'
import { Text, Button, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import Clarifai from 'clarifai'
import { photoData } from './capture'
import secrets from '../secrets'


export default class HomeOrCatOrNah extends React.Component {

    render(){
        const {navigate} = this.props.navigation
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "green"}}>
                <TouchableOpacity onPress={() => navigate("CameraPage")}>
                    <Text style={{fontSize: 60, color: "white", fontFamily: "Chalkduster"}}>CatOrNah??</Text>
                </TouchableOpacity>
            </View>
            
        )
    }
}




