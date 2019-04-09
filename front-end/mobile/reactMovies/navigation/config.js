import { createStackNavigator } from 'react-navigation'
import { BG_COLOR, TINT_COLOR } from '../constants/Color';

export default  createStack = (screen, title) => createStackNavigator({
    Screen: {
      screen: screen,
      navigationOptions : {
        title: title,
        ...headerStyles
      }
    }
  });


  
  export const headerStyles = {
      headerStyle: {
          backgroundColor: BG_COLOR,
          borderBottomWith: 0,
      },
      headerTitleStyle: {
          color: "white"
      },
      headerTintColor: TINT_COLOR
  } 