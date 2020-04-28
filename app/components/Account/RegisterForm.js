import React , {useState}from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import {validateEmail} from '../../utils/Validations';
import * as firebase from 'firebase';
import Loading from '../../components/Loading';
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm (props) {
    const navigation = useNavigation();
    const {toastRef} = props;
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

    const [email, setEmail] =useState("");
    const [password, setPassword] =useState("");
    const [repeatPassword, setRepeatPassword] =useState("");
    const [isVisibleLoading, setIsVisibleLoading] = useState (false);


    const Register = async ()=>{
    setIsVisibleLoading(true);
        
        if(!email|| !password || !repeatPassword) {
            console.log("Todos los campos son obligatorios")
            toastRef.current.show("Todos los campos son obligatorios")
        }else {
            if(!validateEmail(email)){
                console.log("correo incorrecto")
                toastRef.current.show("correo incorrecto")
            }else{
                if(password !== repeatPassword){
                    console.log("Las contraseñas no coinciden")
                    toastRef.current.show("Las contraseñas no coinciden")
                }else{
                    await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(()=> {
                        navigation.navigate("MyAccount");
                        
                    })
                    .catch(()=>{
                        toastRef.current.show("Error al crear la cuenta, por favor intentelo más tarde")
                        console.log("Error al crear la cuenta, por favor intentelo más tarde")
                    })
                    
                    
                }
            }
        }

        setIsVisibleLoading(false);
    }
    return (
        <View style={styles.fromContainer}>
        <Input 
        placeholder="correo electrónico" 
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
            <Icon
            type= "material-community"
            name="at"
            iconStyle={styles.iconRight}
            />
        }
        />
        <Input
        placeholder="Contraseña"
        password={true}
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
             <Icon
            type= "material-community"
            name={hidePassword? "eye-outline": "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={()=>setHidePassword(!hidePassword)}
            />
        }
        />
        <Input
        placeholder="Repetir contraseña"
        password={true}
        secureTextEntry={hidePasswordConfirm}
        containerStyle={styles.inputForm}
        onChange={e => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
             <Icon
            type= "material-community"
            name={hidePasswordConfirm? "eye-outline": "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={()=>setHidePasswordConfirm(!hidePasswordConfirm)}
            />
        }
        />

        <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={Register}
        />
        <Loading text="creando cuenta" isVisible={isVisibleLoading}/>
        </View>
    )

}
const styles = StyleSheet.create({
    fromContainer: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    iconRight: {
        color: "gray"
    },
    btnContainerRegister:{
        marginTop: 20, 
        width: "95%",
    },
    btnRegister: {
        backgroundColor: "tomato"
    }
})