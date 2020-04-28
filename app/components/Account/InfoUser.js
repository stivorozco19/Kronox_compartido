import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Loading from '../Loading';


export default function InfoUser(props) {
    const {userInfo,
        userInfo: {uid, displayName, email, photoURL, providerId},
        setReloadData,
        toastRef,
        setTextLoading,
        setIsLoading
        } = props;

    console.log(userInfo);


    const changeAvatar = async() =>{
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        const resultPermissionsCamera = resultPermissions.permissions.cameraRoll.status;
        console.log(resultPermissions);

        if(resultPermissionsCamera==="denied"){
            console.log("Es necesario aceptar los permisos de uso de la camara para usarla");
            toastRef.current.show("Es necesario aceptar los permisos de uso de la camara para usarla", 2500)
        }else{
            //Abrir rollo de la camara
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,4] // asigna el tamaño por el que se debe recortar la imagen que se va a seleccionar
            });

            if(result.cancelled){
                console.log("Selección cancelada")
                toastRef.current.show("Selección cancelada", 2500)
            }else{
                upLoadImage(result.uri, uid).then(()=>{
                    console.log("Imagen subida correctamente");
                    updatePhotoURL(uid);
                    
                })
            }
        }
        
    }

    const upLoadImage = async (uri, nameImage) =>{
        setTextLoading("Actualizando foto de perfil")
        setIsLoading(true)
        const response =  await fetch(uri)
        const blob = await response.blob();
        
        const ref = firebase.storage().ref().child(`avatar/${nameImage}`);
        return ref.put(blob);
        
    }

    const updatePhotoURL = uid =>{

        
        firebase.storage().ref(`avatar/${uid}`).getDownloadURL().then(async result => {
            const update = {
                photoURL: result
            }
            await firebase.auth().currentUser.updateProfile(update);
            setReloadData(true);
            setIsLoading(false)
            
        }).catch(()=>{
            console.log("Error al intentar actualziar avatar");
            toastRef.current.show("Error al intentar actualziar avatar", 2500)
            
        });
    }
    
    
    
    return(
        <View style={styles.viewUserInfo}>
        <Avatar
            rounded
            size="large"
            showEditButton
            onEditPress={changeAvatar}
            containerStyle={styles.userInfoAvatar}
            source={{
                uri: photoURL? photoURL : "https://api.adorable.io/avatars/219/abcd@adorable.io.png"
            }}
        />
        <View>
            <Text style={styles.displayName}>{displayName?displayName:"Anónimo"}</Text>
            <Text>{email}</Text>
        </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30,
    },
    userInfoAvatar:{
        marginRight: 20
    },
    displayName: {
        fontWeight: "bold"
    }
})