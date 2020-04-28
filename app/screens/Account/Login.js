import React, {useRef}from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import LoginForm from '../../components/Account/LoginForm';
import Toast from 'react-native-easy-toast';
import LoginFacebook from '../../components/Account/LoginFacebook';

export default function Login (props) {
    const navigation = useNavigation();
    const toastRef = useRef();
    
   
    return(
        <ScrollView>
            <Image 
                source={require("../../../assets/img/LogoKronox.png")}
                style={styles.Logo}
                resizeMode="contain"
            />

            <View style={styles.ViewContainer} >
            
                <LoginForm toastRef={toastRef}/>
                <CreateAccount/>
            
            </View>

            <Divider style={styles.DividerStyle}/>
            <View style={styles.ViewContainer}>
                <LoginFacebook toastRef={toastRef} navigation={navigation}/>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.8} />

        </ScrollView>
    )
} 

function CreateAccount (props){
    const navigation = useNavigation();

    return (
        
        <Text style={styles.textRegister}>¿Aún no tienes una cuenta?{" "}
            <Text 
            onPress={()=> navigation.navigate("Register")}
            style={styles.btnRegister}
            >Registrate</Text>
         </Text>
    
            
    )
}

const styles = StyleSheet.create({
    Logo:{
        width: 250,
        marginTop: 20,
        alignSelf: "center",
        tintColor: "tomato"
        
    },
    ViewContainer: {
        marginRight: 40,
        marginLeft: 40,
    },
    textRegister:{
        marginTop: 15,
        marginLeft:10,
        marginRight:15
    },
    btnRegister: {
        color: "tomato",
        fontWeight: "bold"
    },
    DividerStyle: {
        backgroundColor: "black",
        margin: 40
    }
})