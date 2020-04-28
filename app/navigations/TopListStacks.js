import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TopEmpresasScreen from '../screens/TopEmpresas';

const Stack = createStackNavigator();
 const titulo = "Top empresas";

function App() {
  return (
    
      <Stack.Navigator initialRouteName="Top Empresas">
        <Stack.Screen name="Top Empresas" component={TopEmpresasScreen} options={{ title: titulo }} />
      </Stack.Navigator>
    
  );
}

export default App;