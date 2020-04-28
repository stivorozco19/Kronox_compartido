import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmpresasScreenStack from "../navigations/EmpresasStack";
import MyAccountScreenStack from "../navigations/AccountStacks";
import SearchScreenStack from "../navigations/SearchStacks";
import TopEmpresasScreenStack from "../navigations/TopListStacks";
// import Icon from 'react-native-vector-icons/Icon';
import { Icon } from 'react-native-elements';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer >
        <Tab.Navigator
            screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Empresas') {
              iconName = focused? 'store' : 'store';
            } else if (route.name === 'Buscar') {
              iconName = focused ? 'magnify' : 'magnify';
            } else if (route.name === 'Ranking') {
              iconName = focused ? 'crown' : 'crown';
            }else if (route.name === 'Mi cuenta') {
              iconName = focused ? 'account' : 'account-outline';
            }

            // You can return any component that you like here!
            return <Icon  type="material-community" name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
        initialRouteName = "Empresas"
        
        
        >
            <Tab.Screen name="Empresas" component ={EmpresasScreenStack}/>
            <Tab.Screen name="Buscar" component ={SearchScreenStack}/>
            <Tab.Screen name="Ranking" component ={TopEmpresasScreenStack}/>
            <Tab.Screen name="Mi cuenta" component ={MyAccountScreenStack}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}