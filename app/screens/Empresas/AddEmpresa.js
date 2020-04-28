import React, {useRef, useState} from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import AddEmpresasForm from '../../components/Empresas/AddEmpresasForm';


export default function AddEmpresa(props){
    const navigation = useNavigation();
    console.log(props);
    
    const [isLoading, setisLoading] = useState(false)
    const toastRef= useRef();
    return(
        <View>
            <AddEmpresasForm setisLoading={setisLoading} toastRef={toastRef} navigation={navigation}/>
            <Toast ref={toastRef} position="center" opacity={0.8}/>
            <Loading isVisible={isLoading} text="Creando Empresa"/>
        </View>
    )
}