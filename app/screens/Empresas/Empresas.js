import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ActionButton from 'react-native-action-button';
import AddEmpresa from './AddEmpresa';
import { useNavigation } from "@react-navigation/native";
import * as firebase from 'firebase';

export default function Empresas (){
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(userInfo=>{
      setUser(userInfo)
    })
  },[])

  
    return(
        <View style={styles.container}>
            <Text>
                Estamos en empresas
            </Text>

            {user&& <AddEmpresaButton  navigation={navigation}/>}
            
            
        </View>
    )
}

function AddEmpresaButton(props){

  const {navigation}=props;
  return(
    <ActionButton
      buttonColor="tomato"
      onPress={()=>navigation.navigate("AddEmpresa")}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});