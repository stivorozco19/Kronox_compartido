import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/Search';

const Stack = createStackNavigator();
 const titulo = "Busca Servicios";

function App() {
  return (
    
      <Stack.Navigator initialRouteName="Buscar">
        <Stack.Screen name="Buscar" component={SearchScreen} options={{ title: titulo }} />
      </Stack.Navigator>
    
  );
}

export default App;