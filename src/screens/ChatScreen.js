import { StyleSheet, Text, View,ScrollView } from 'react-native';
import React,{useEffect,useState} from 'react';

import { colors } from '../global/Styles';

import {db,auth} from '../../firebase';
import { collection,where,onSnapshot, query,addDoc, Timestamp, orderBy } from 'firebase/firestore';
import User from '../components/User';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

export default function ChatScreen() {
    const navigation = useNavigation();
    const [users,setUsers] = useState([])
    

    const user1 = auth.currentUser.uid

    useEffect(()=>{
        
        const usersRef= collection(db,'users')
        // const chat= collection(usersRef,'chat')

        // const chat= query(usersRef,where(id,'chat'))
        // console.log(chat);
    //   const q = query(usersRef,where('to',"not-in",[user1]));

        // create query object
        const q = query(usersRef, where("owner_uid","not-in",[user1]));
        // execute query
        const unsub = onSnapshot(q,(querySnapshot)=>{
            let users =[];
            querySnapshot.forEach((doc)=>{
                users.push(doc.data())
        // querySnapshot.docs.map((doc)=>{
            
        //     users.push({...doc.data()})
        //     console.log(users.push({...doc.data()}),'hello')
            
            // console.log('hello');
        // })
    });
    setUsers(users);
        
        });
    
        return ()=> unsub();

    },[]);
    // console.log(users);

    const selectUser= (user)=>{
        console.log(user);
        
    }

    

    return (
        <View style ={{flex:1,marginTop:20}}>
            <View style={{backgroundColor:colors.button,marginBottom:10}}>
                {/* <Text style={styles.headerText}>Chats</Text> */}
                <Header title='Chats' type='arrow-left' navigation={navigation}/>
            </View>
            <ScrollView>
            <View  >
                {users && users.map(user =><User navigation={navigation} key={user.uid} user={user} selectUser={selectUser} />)}
                
            </View>
            </ScrollView>
            {/* <CustomChatItems/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    headerText:{
        textAlign:'center',
        alignItems:'center',
        color:colors.headerText,
        fontSize:30,
        fontWeight:'bold',
        
    },
});