import React, {useState} from 'react'
import { View, Text, StyleSheet} from 'react-native';
import { Input, Button} from 'react-native-elements';
import * as firebase from 'firebase';
import {reauthenticate} from '../../utils/Api';



export default function ChangeDisplayPasswordForm(props){

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [hidePassword, sethidePassword] = useState(true);
    const [hideNewPassword, sethideNewPassword] = useState(true)
    const [hideNewPasswordRepeat, sethideNewPasswordRepeat] = useState(true)

    const {setIsVisibleModal, toastRef}= props

    const updatePassword =()=>{
        
        setError({})

        if( !password || !newPassword || !newPasswordRepeat){
            //TODO: Pendiente arreglar logica para que muestre error en el campo correcto
            let objError = {};

            !password && (objError.password ="Este campo es obligatorio")
            !newPassword && (objError.newPassword ="Este campo es obligatorio")
            !newPasswordRepeat && (objError.newPasswordRepeat ="Este campo es obligatorio")
            
            setError(objError);
          
     
     }else{
         setIsLoading(true)
           if( newPassword===newPasswordRepeat){
           reauthenticate(password).then(()=>{
               firebase.auth().currentUser.updatePassword(newPassword).then(()=>{
                   setIsLoading(false)
                   setIsVisibleModal(false);
                   toastRef.current.show("Contraseña cambiada exitosamente")
                   //firebase.auth().signOut(); //Cerrar la sesión cuando se haga el cambio.
                   
               }).catch(()=>{
                   setIsLoading(false)
                   setError({
                       general:"Error en el servidor, por favor intente más tarde"
                       
                   });
               })
           }).catch(()=>{
               setIsLoading(false)
               setError({
                   password: "Contraseña incorrecta"
                   
               })
           })
           
       }else{
           setIsLoading(false)
           setError({
               newPasswordRepeat: "No coinciden las contraseñas"
           })
       }
         
     }

        
    }

    
    return (
        <View style={styles.view}>
           <Input
            placeholder="Contraseña actual"
            containerStyle={styles.input}
            password={true}
            secureTextEntry={hidePassword}
            onChange={e=>setPassword(e.nativeEvent.text)}
            rightIcon={{
                type: "material-community",
                name: hidePassword? "eye-outline": "eye-off-outline",
                color: "#c2c2c2",
                onPress: ()=>sethidePassword(!hidePassword)
            }}
            errorMessage={error.password}
           />

           <Input
            placeholder="Nueva contraseña"
            containerStyle={styles.input}
            password={true}
            secureTextEntry={hideNewPassword}
            onChange={e=>{setNewPassword(e.nativeEvent.text)}}
            rightIcon={{
                type: "material-community",
                name: hideNewPassword? "eye-outline":"eye-off-outline",
                color: "#c2c2c2",
                onPress: ()=>{sethideNewPassword(!hideNewPassword)}
            }}
            errorMessage={error.newPassword}
           />
           <Input
            placeholder="Repita la nueva contraseña"
            containerStyle={styles.input}
            password={true}
            secureTextEntry={hideNewPasswordRepeat}
            onChange={e=>{setNewPasswordRepeat(e.nativeEvent.text)}}
            rightIcon={{
                type: "material-community",
                name: hideNewPasswordRepeat? "eye-outline":"eye-off-outline",
                color: "#c2c2c2",
                onPress: ()=>{sethideNewPasswordRepeat(!hideNewPasswordRepeat)}
            }}
            errorMessage={error.newPasswordRepeat}
           />
           <Button
            title="Cambiar contraseña"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={updatePassword}
            loading={isLoading}
           />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input:{
        marginBottom: 10, 

    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
    },
    btn: {
        backgroundColor: "#00a680"
    },
     btnContainer:{
        marginTop: 20, 
        width: "95%"
    },
    btn:{
        backgroundColor:"tomato"
    }
})