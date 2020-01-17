import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main:{
            screen:Main,
            navigationOptions:{
                title:'GiraRadar',
            }
        },
        Profile:{
            screen:Profile,
            navigationOptions:{
                title:'Profissional',
            }
        }
    },
    {
        defaultNavigationOptions:{
            headerTintColor:"#fff",
            headerStyle:{
                backgroundColor:"#005cb2" 
            }
        }
    })
);

export default Routes;