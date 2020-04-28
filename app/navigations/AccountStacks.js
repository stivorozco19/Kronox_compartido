import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyAccountStacks from '../screens/Account/MyAccount';
import Login from '../screens/Account/Login';
import UserGuest from '../screens/Account/UserGuest';
import Register from '../screens/Account/Register';

const Stack = createStackNavigator();
 const titulo = "Mi cuenta";

function AccountStacks(props) {
  
  return (
    
      <Stack.Navigator initialRouteName="MyAccount">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Inicio de sesión' }} />
        <Stack.Screen name="MyAccount" component={MyAccountStacks} options={{ title: titulo }} />
        <Stack.Screen name="UserGuest" component={UserGuest} options={{ title: 'Visitante' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Registrate' }} />
      </Stack.Navigator>
    
  );
}

export default AccountStacks;