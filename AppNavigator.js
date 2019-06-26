import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import Signin from './Signin';
import Content from './Content';
import Register from './Register';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Signin: { screen: Signin },
  Content: { screen: Content },
  Register: { screen: Register },
},
{
  initialRouteName: "Home"
},
);

export default AppNavigator;