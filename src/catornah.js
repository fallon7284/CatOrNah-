import React from 'react'
import { Text, Button, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import Clarifai from 'clarifai'
import { photoData } from './capture'
import secrets from '../secrets'


// const clarifaiApp = new Clarifai.App({
//     apiKey: secrets.clarifaiKey
// })


// export default class resultScreen extends React.Component {
//     constructor(){
//         super()
//         this.state = {
//             photo: {}
//         }
//     }
//     render(){
//         console.log("I CAN LOG")
//         const {navigate} = this.props.navigation
//         return (
//             <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "green"}}>
//                 <Button 
//                 title="CatOrNah??"
//                 onPress={() => navigate("CameraPage")}
//                 >CatOrNah??</Button>
//                 <Text style={{fontSize: 65, color: "white", fontFamily: "Chalkduster"}}>DataCat??</Text>

//             </View>
            
//         )
//     }
// }





export default class HomeOrCatOrNah extends React.Component {

    render(){
        const {navigate} = this.props.navigation
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "green"}}>
                <TouchableOpacity onPress={() => navigate("CameraPage")}>
                    <Text style={{fontSize: 65, color: "white", fontFamily: "Chalkduster"}}>DataCat??</Text>
                </TouchableOpacity> 
            </View>
            
        )
    }
}




