import React, {useState} from 'react';
import {SocialIcon} from 'react-native-elements';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import {FacebookApi} from '../../utils/Social';
import Loading from '../Loading';

export default function LoginFacebook (props){
    const {toastRef, navigation} = props;

    const [isLoading, setLoading] = useState(false);
    
    Facebook.initializeAsync(FacebookApi.aplication_id);

const login = async () => {
    
    const {type, token} = await Facebook.logInWithReadPermissionsAsync(
        FacebookApi.aplication_id,
        {permissions: FacebookApi.permissions}
    );
    
    if(type==="success"){
        //TO DO: Arreglar el ingreso por Facebook
        
        setLoading(true);
        //const credentials = firebase.auth.FacebookAuthProvider.credential(token);
        const credentials = await firebase.auth.FacebookAuthProvider.credential(token);
        

        await firebase
            .auth()
            .signInWithCredential(credentials)
            .then(()=>{
            console.log("login correcto...")
            navigation.navigate("MyAccount")
        })
        .catch(e=>{
            if(String(e).indexOf("An account already exists with the same email address but different sign-in credentials")>0){
                toastRef.current.show("Tu correo de Facebook ya está registrado con otra cuenta, intenta ingresar con correo y contraseña",4500)
            }else {
                toastRef.current.show("Error al intentar loguarnos, por favor intente más tarde", 1500)
            }
           
            
        })
        
    }else if(type==="cancel"){
        
        toastRef.current.show("Inicio de sesión cancelado", 1500)

    }else {
        
        toastRef.current.show("Error desconocido, intentelo más tarde", 1500)
    }

    setLoading(false);

}
    return(
        <>
            <SocialIcon
            title = "Iniciar sesión con Facebook"
            button
            type="facebook"
            onPress={login}
            />
            <Loading isVisible={isLoading} text="Iniciando sesión"/>
        </>
    )
}