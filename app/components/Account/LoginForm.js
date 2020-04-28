import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import {validateEmail} from '../../utils/Validations';
import Loading from '../Loading';
import * as firebase from 'firebase';
import { useNavigation } from "@react-navigation/native";

export default function LoginForm(props){
    const [passVisible, setPassVisible]= useState(true);
    const [isVisibleLoading, setisVisibleLoading]= useState(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {toastRef} = props;

    const navigation = useNavigation();

    const doLogin =  async() =>{
        setisVisibleLoading(true);
        if(!email || !password){
            toastRef.current.show("Todos los campos son obligatorios",1500);
        }else{
            if(!validateEmail(email)){
                toastRef.current.show("Introduzca un email valido")
            }
            else{
                
                await firebase
                .auth()
                .signInWithEmailAndPassword(email,password)
                .then(()=>{
                    navigation.navigate("MyAccount");
                })
                .catch(()=>{
                    toastRef.current.show("Email o contraseña incorrectos")
                })


            }
        }
        setisVisibleLoading(false);
    }
    

    return(
    <View style={styles.formContainer}>
        <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
            <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
            />
        }
        />

        <Input
        password={true}
        secureTextEntry={passVisible}
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
            <Icon
            type="material-community"
            name={passVisible? "eye-outline":"eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress ={()=> setPassVisible(!passVisible)}
            />
        }

        />
        <Button 
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        title="Iniciar sesión"
        onPress={doLogin}
        />

        <Loading isVisible={isVisibleLoading} text="iniciando sesion"/>
    </View>
    )
}
const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
        
    },
    inputForm:{
        width: "100%",
        marginTop: 20,

    },
    iconRight: {
        color: "gray"
    },
    btnContainerLogin:{
        marginTop: 20,
        width: "95%",
        
    },
    btnLogin:{
        backgroundColor: "tomato"
    }
})