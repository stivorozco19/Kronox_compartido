import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View } from 'react-native';
import {Button} from 'react-native-elements';
import * as firebase from 'firebase';
import InfoUser from '../../components/Account/InfoUser';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import AccountOptions from '../../components/Account/AccountOptions';

export default function UserLogged (){
    const [userInfo, setuseInfo] = useState({})
    const [reloadData, setReloadData] =useState(false);
    const [isLoading, setIsLoading]=useState(false);
    const [texto, setTextLoading] = useState("");

    const toastRef= useRef();

    useEffect(()=>{
        (async()=>{
            const user = await firebase.auth().currentUser;
            setuseInfo(user.providerData[0]);
        })();
        setReloadData(false)
    },[reloadData])
return(
    <View style={styles.viewUserInfo}>
        <InfoUser userInfo={userInfo} 
        setReloadData={setReloadData} 
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
        toastRef={toastRef}
        />

        <AccountOptions userInfo={userInfo} setReloadData={setReloadData} toastRef={toastRef}/>
        <Button
        buttonStyle={styles.btnCloseSesion}
        titleStyle={styles.btnCloseSesionText}
        title="Cerrar sesión"
        onPress={()=>firebase.auth().signOut()}
        />
        <Toast ref={toastRef} position="center" opacity={0.8}/>
        <Loading 
        text={texto} 
        isVisible={isLoading}/>
    </View>
)

}
const styles = StyleSheet.create({
    viewUserInfo:{
        minHeight: "100%",
        backgroundColor: "#f2f2f2"
    },
    btnCloseSesion:{
        marginTop: 30, 
        borderRadius: 0,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor:"#e3e3e3",
        borderBottomWidth:1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10,
    },
    btnCloseSesionText:{
        color: "tomato"
    },
})