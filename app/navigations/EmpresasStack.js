import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmpEmpresasScreen from '../screens/Empresas';
import AddEmpresaScreen from '../screens/Empresas/AddEmpresa';

const Stack = createStackNavigator();
 const titulo = "Empresas";

function EmpresasStack() {
  return (
    // <NavigationContainer>
   
       <Stack.Navigator initialRouteName="Empresas">
        <Stack.Screen name="Empresas" component={EmpEmpresasScreen} options={{ title: titulo }} />
        <Stack.Screen name="AddEmpresa" component={AddEmpresaScreen} options={{ title: "Nueva Empresa" }} />
       </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default EmpresasStack;