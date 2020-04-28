import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import MapView from 'react-native-maps';
import * as Location from "expo-location";
import Modal from '../Modal';
import uuid from 'random-uuid-v4';

/**
*Conexión a firebase para almacenar en storage
 */
import {firebaseApp} from '../../utils/FireBase';
import firebase from 'firebase/app'
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);


const WidthScreen= Dimensions.get("window").width;

export default function AddEmpresasForm(props){
    const {toastRef, setisLoading, navigation} = props
    const [imageSelected, setImageSelected] = useState([]);

    const [empresaName, setEmpresaName] = useState("");
    const [empresaAddress, setEmpresaAddress] = useState("");
    const [empresaDescription, setEmpresaDescription] = useState("");

    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationEmpresa, setLocationEmpresa] = useState(null)
    
    const addEmpresa = () =>{
        if(!empresaName || !empresaAddress || !empresaDescription){
            toastRef.current.show("Todos los campos del formulario son obligatorios", 2500)
        }else if(imageSelected.length===0){
            toastRef.current.show("La empresa debe tener almenos una foto",2500)
        }else if(!locationEmpresa){
            toastRef.current.show("Debes localizar la empresa en el mapa", 2500)
        }else{
            setisLoading(true)
            upLoadImageStorage(imageSelected).then(arrayImages=>{
                db.collection("empresas").add({
                    name: empresaName,
                    address: empresaAddress,
                    description: empresaDescription,
                    location: locationEmpresa,
                    images: arrayImages,
                    rating: 0,
                    ratingTotal:0,
                    quantityVoting: 0,
                    createAt: new Date(),
                    createBy: firebase.auth().currentUser.uid
                }).then(()=>{
                    setisLoading(false);
                    navigation.navigate("Empresas")
                }).catch(e=>{
                    toastRef.current.show("Error al crear la empresa, por favor intenta más tarde",3000)
                    setisLoading(false);
                    console.log(String(e));
                    
                })
                
                
            })
            
            
        }
    }

    const upLoadImageStorage= async imageArray => {
        const imagesBlob = [];
        await Promise.all (
            imageArray.map(async image =>{
                const response = await fetch(image);
                const blob= await response.blob();
                const ref = firebase
                .storage()
                .ref("empresas-images")
                .child(uuid());

                await ref.put(blob).then(result=>{
                    imagesBlob.push(result.metadata.name);
                    
                });
            })
        );

        return imagesBlob;
    }
    
    return(
        <ScrollView>
        <ImagenEmpresa imageEmpresa={imageSelected[0]}/>
        <FormAdd 
            setEmpresaName={setEmpresaName} 
            setEmpresaAddress={setEmpresaAddress}
            setEmpresaDescription={setEmpresaDescription}
            setIsVisibleMap={setIsVisibleMap}
            locationEmpresa={locationEmpresa}
            />

            <UploadImage toastRef={toastRef} imageSelected={imageSelected} 
            setImageSelected={setImageSelected} />

             <Button
                title="Crear empresa"
                onPress={addEmpresa}
                buttonStyle={styles.btnAddEmpresa}
            />
            <Map isVisibleMap={isVisibleMap} 
                setIsVisibleMap={setIsVisibleMap} 
                setLocationEmpresa={setLocationEmpresa}
                toastRef={toastRef}
                />
        </ScrollView>
    )
}

function ImagenEmpresa(props){
    const {imageEmpresa} = props;

    return(
        <View style={styles.viewPhoto}>
            {imageEmpresa? (
                <Image 
                    source={{uri: imageEmpresa}}
                    style={{width:WidthScreen, height: 200 }}
                />
            ):(
                <Image
                    source={ require("../../../assets/img/original.png")}
                    style={{width:WidthScreen, height: 200 }}
                />
            )}        
        </View>
    )
}

function UploadImage(props){
    const {imageSelected, setImageSelected, toastRef} = props;

    const removeImage = (image)=>{
         const ArrayImage = imageSelected;

         Alert.alert(
             "Eliminar Imagen",
             "¿Estás seguro que deseas eliminar la imagen?",
             [
                 {
                     text: "Cancelar",
                     style: "cancel"
                 },
                 {
                     text: "Eliminar",
                     onPress: ()=> setImageSelected(ArrayImage.filter( imageUrl => imageUrl!== image))
                     

                 }
             ],
             { cancelable: false}
         )
    }

    const imageSelect = async()=>{
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionsCamera = resultPermission.permissions.cameraRoll.status;

        if(resultPermissionsCamera==="denied"){
            toastRef.current.show("Es necesario aceptar los permisos de la galería",2500)
        }else{
            const result= await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                    aspect: [4,4]
                
            })
            if(result.cancelled){
                toastRef.current.show("Haz cancelado la selección de la imagen", 2500)
            }else{
                setImageSelected([...imageSelected, result.uri])
                                
            }
            
        }
        
        

    }

    return(
        <View style={styles.viewImage}>
           
           {imageSelected.length < 5&&(
        <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.container}
                onPress={imageSelect}
                
            />
           )}
            

            {imageSelected.map((imageEmpresa)=>(
                <Avatar
                    key={imageEmpresa}
                    onPress={()=> removeImage(imageEmpresa)}
                    style={styles.miniatureStyle}
                    source={{uri: imageEmpresa}}
                 />
            ))}

           
        </View>
    )
}

function FormAdd(props){



    const {setEmpresaName, setEmpresaAddress, setEmpresaDescription, setIsVisibleMap, locationEmpresa} = props
    return(
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre de empresa"
                containerStyle={styles.input}
                onChange= {e => setEmpresaName(e.nativeEvent.text)
                }
            />

            <Input
                placeholder="Dirección de empresa"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationEmpresa? "#00a680": "#c2c2c2", //"tomato" posible en color del icono con contenido
                    onPress: ()=> setIsVisibleMap(true)
                    
                }}
                onChange={e=>setEmpresaAddress(e.nativeEvent.text)
                }
            />
            <Input
                placeholder="Descripción de restaurante"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={e=> setEmpresaDescription(e.nativeEvent.text)
                }
            />

           
        </View>
    )
}

function Map(props){
    const {isVisibleMap, setIsVisibleMap, setLocationEmpresa, toastRef}= props

    const [location, setLocation] = useState(null);
    
    

    useEffect(()=>{
        (async ()=>{
            const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
            const statusPermissions = resultPermissions.permissions.location.status;

            if(statusPermissions!== "granted"){
                toastRef.current.show("Tienes que aceptar los permisos de localización para crear tú empresa", 3500)
            }else{
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                });
                
            }
            
        })();
    },[]);

    const confirmLocation=() => {
        setLocationEmpresa(location);
        toastRef.current.show("Localización guardada correctamente")
        setIsVisibleMap(false)
    }

    return(
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView 
                    style={styles.mapStyle}
                    initialRegion={location}
                    showsUserLocation={true}
                    onRegionChange={region=>setLocation(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            draggable
                        />

                    </MapView>
                )}
                <View style={styles.viewMapButton}>
                    <Button
                        title="Guardar Ubicación"
                        onPress={confirmLocation}
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                    />
                    <Button
                        title="Cancelar"
                        onPress={()=>setIsVisibleMap(false)}
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        type="outline"
                        titleStyle={styles.titleBtn}
                        
                    />
                
                </View>

            </View>
        </Modal>
    )
}



const styles = StyleSheet.create({

    viewPhoto: {
        alignItems: "center",
     height: 200,
     marginBottom: 20   
    },
    viewImage: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20, 
        marginTop: 30
    },
    container:{
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10, 
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle:{
        width:70,
        height:70,
        marginRight: 10

    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
        
    },
    input: {
        marginBottom: 10
    },
    textArea:{
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0
    },
    mapStyle:{
        width: "100%",
        height: "90%"
    },
    viewMapButton:{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10

    },
    viewMapBtnContainerSave:{
        paddingRight: 5
    },
    viewMapBtnSave:{
        backgroundColor: "tomato"
    },
    viewMapBtnContainerCancel:{
        paddingLeft: 5,
    },
    viewMapBtnCancel:{
        borderColor: "tomato",
        borderWidth: 1      
    },
    titleBtn:{
        color: "tomato"
    },
    btnAddEmpresa: {
        backgroundColor: "tomato",
        margin: 20
    }
    
})