import React, {useState}from 'react';
import { StyleSheet,Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Modal from '../Modal';
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeDisplayEmailForm from "./ChangeDisplayEmailForm";
import ChangeDisplayPasswordForm from "./ChangeDisplayPasswordForm";
import { render } from 'react-dom';

export default function AccountOptions (props){

    const {userInfo, setReloadData, toastRef} = props;

    const [IsVisibleModal, setIsVisibleModal] = useState(false);
    const [renderComponent, setrenderComponent] = useState(null);

    const colorIcons = "gray";
    const menuOptions = [
        {
            title:"Cambiar nombres y apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: colorIcons,
            iconNameRight: "chevron-right",
            iconColorRight:colorIcons,
            onPress: ()=>selectedComponent("displayname")
            
        },
        {
            title:"Cambiar email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: colorIcons,
            iconNameRight: "chevron-right",
            iconColorRight:colorIcons,
            onPress: ()=>selectedComponent("email")
            
        }
        ,
        {
            title:"Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: colorIcons,
            iconNameRight: "chevron-right",
            iconColorRight:colorIcons,
            onPress: ()=>selectedComponent("password")
            
        }
    ]

    const selectedComponent = (key)=>{
       
       switch(key){
           case "displayname":
           setrenderComponent(<ChangeDisplayNameForm 
           userInfo={userInfo.displayName}
           setIsVisibleModal={setIsVisibleModal}
           setReloadData={setReloadData}
           toastRef={toastRef}
           />)
           setIsVisibleModal(true)
           break;
           case "email":
             setrenderComponent(<ChangeDisplayEmailForm
                email={userInfo.email}
                setIsVisibleModal={setIsVisibleModal}
                setReloadData={setReloadData}
                toastRef={toastRef}
             />)
           setIsVisibleModal(true)
           break;
           case "password":
             setrenderComponent(<ChangeDisplayPasswordForm setIsVisibleModal={setIsVisibleModal} toastRef={toastRef}/>)
           setIsVisibleModal(true)
           break;
           default: console.log("Otra vaina en el switch")
           break
           
       }
       setIsVisibleModal(true);
        

    }
    return(
        <View>
        {menuOptions.map((menu, index)=>(
            <ListItem
            key={index}
            title={menu.title}
            leftIcon={{
                type: menu.iconType,
                name: menu.iconNameLeft,
                color: menu.iconColorLeft
            }}
            rightIcon={{
                type: menu.iconType,
                name: menu.iconNameRight,
                color: menu.iconColorRight
            }}
            onPress={menu.onPress}
            containerStyle={styles.menuItem}
            />
        ))}

        {renderComponent&& (

            <Modal
            isVisible={IsVisibleModal}
            setIsVisible = {setIsVisibleModal}
            >
            
        
            {renderComponent}
            </Modal>
        )}
        
            
        </View>
    )
}
const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
    }
})