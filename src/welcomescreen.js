import React from 'react'
import { Text, Button } from 'react-native'
import styles from './styles';
import { NavigationEvents } from 'react-navigation';



export default class WelcomeScreen extends React.Component {
    render(){
        const { navigate } = this.props.navigation
        return (
            <React.Fragment>
                <Button
                title="camera"
                onPress={() => {navigate("HomeOrCatOrNah")}}
                >Take me home</Button>
                <Text>This is the welcome screen</Text>
            </React.Fragment>
        )
    }
}

