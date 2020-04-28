import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import {Button} from 'react-native-elements';
/**
Para poder navegar en Navigation 5, se debe impotar el useNavigation como se muestra 
en la parte inferior, luego se asigna a una varialbe y funciona con normalidad
 */
import { useNavigation } from "@react-navigation/native";


export default function UserGuest (){
    const navigation = useNavigation();
    

return(
   <ScrollView style = {styles.ViewBody} centerContent= {true}>
    <Image 
    source={require("../../../assets/img/image.jpg")}
    style={styles.image}
    />
    <Text style={styles.title}>
        Consulta tu perfil de Kronox
    </Text>
    <Text style={styles.description}>
        ¿Que servicio necesitas? Busca y reserva servicios en tus lugares favoritos, guarda como favoritos y disfruta de la experiencia de ahorrar tiempo.
    </Text>

    <View style ={styles.Viewbtn}>
        <Button 
        buttonStyle={styles.btnStyle}
        containerStyle = {styles.containerStyle}
        title= "Ver tu perfil"
         onPress={() => {
            navigation.navigate("Login");
          }}

        />
    </View>
   
   </ScrollView>
)

}




const styles = StyleSheet.create({
  ViewBody: {
    marginLeft: 30,
    marginRight: 30
  },
  image: {
      height: 300,
      width: "100%",
      marginBottom: 40,
  }, 
  title: {
      fontWeight: "bold",
      fontSize: 19, 
      marginBottom: 10, 
      textAlign: "center"
  }, 

  description: {
      textAlign: "center",
      marginBottom: 20,
  }, 
  Viewbtn: {
      flex: 1,
      alignItems: "center",
  }, 
  btnStyle: {
      backgroundColor: "tomato"
  }, 
  containerStyle: {
      
      width: "70%"
  }
});