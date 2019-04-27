import { createStackNavigator, createAppContainer } from 'react-navigation'
import Welcome from './src/welcomescreen'
import CameraPage from './src/camera.page'
import CatOrNah from './src/catornah'

const MainNavigator = createStackNavigator({
  CatOrNah,
  CameraPage,
  Welcome,
})


export default createAppContainer(MainNavigator)



