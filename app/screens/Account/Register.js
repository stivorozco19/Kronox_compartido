import React, {useRef} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RegisterForm from '../../components/Account/RegisterForm' ;
import Toast from 'react-native-easy-toast';


export default function Register (){
    const toastRef=useRef();
    return(
        <KeyboardAwareScrollView>
            <Image 
            source={require("../../../assets/img/LogoKronox.png")}
            style={styles.logo}
            resizeMode="contain"
             />
             <View style={styles.ViewForm}>
                <RegisterForm toastRef={toastRef}/>
             </View>
             <Toast ref={toastRef} position="center" opacity={0.5} />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    logo: {
         width: 250,
        marginTop: 0,
        alignSelf: "center",
        tintColor: "tomato"

    },
    ViewForm: {
        marginRight: 40,
        marginLeft: 40
    }
})