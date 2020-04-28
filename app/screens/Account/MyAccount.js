import React, {useState, useEffect }from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";




export default function MyAccount (props){
  
  
  const [login,setLogin] = useState(null);

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      !user ? setLogin(false) : setLogin(true);
    })
  }, []);

  if(login=== null){
    return(
     <Loading isVisible={true} text="cargando"/>
    )
  }

  return login? <UserLogged/>:<UserGuest/>;
  


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});