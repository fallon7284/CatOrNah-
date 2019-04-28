import { createStackNavigator, createAppContainer } from 'react-navigation'
import Welcome from './src/welcomescreen'
import CameraPage from './src/camera.page'
import HomeOrCatOrNah from './src/catornah'

const MainNavigator = createStackNavigator({
  HomeOrCatOrNah,
  CameraPage,
  Welcome,
})


const CatOrNahApp = createAppContainer(MainNavigator)

export default CatOrNahApp
