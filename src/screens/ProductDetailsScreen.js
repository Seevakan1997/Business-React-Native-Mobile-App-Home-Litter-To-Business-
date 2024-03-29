import { useRoute } from '@react-navigation/native';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import {View, Text, StyleSheet, Button, Image, ScrollView,TouchableOpacity} from 'react-native';
import { colors } from '../global/Styles';
import { Icon,withBadge } from 'react-native-elements';
import Header from '../components/Header';

export default function ProductDetailsScreen({navigation}){
     const route = useRoute();
     const {ProductUid,productsId,productsImg,productsName,productsWeight,phoneNumber,productsDesc,productsLatitude,productsLongitude}= route.params;
     const BedeIcon =(Icon)
    // console.log(ProductUid);

    return(
        <View style ={{flex:1}}>
        {/* <Header type='arrow-left' navigation={navigation} style={{paddingTop:10}}/> */}

        <View style={{paddingTop:5}} >

            <ScrollView nestedScrollEnabled={true} vertical={true} showsVerticalScrollIndicator={false}>
                <Image style={styles.image} source={{uri:productsImg}}/>
                <View style={styles.actions}>
                <Text style={{fontSize:15,color:colors.button,fontWeight:'bold'}}>{productsName}</Text>
                </View>
                <Text style={styles.price}>~ {productsWeight}</Text>
                <Text style={styles.description}>{productsDesc}</Text>
                
                <View style={{paddingTop:30,paddingLeft:30}}>
                    <Text style={{color:colors.button}}>Contact Details</Text>
                </View>

                <View style={styles.phoneNo}>
                    <Ionicons name="call" size={30} color="#12AD2B" />
                    <Text style={{paddingLeft:20,paddingTop:5}}>{phoneNumber}</Text>
                </View>
                <TouchableOpacity  style={styles.phoneNo} onPress={()=>{navigation.navigate('Message',{selectUserId:ProductUid})}} >
                    
                    
                        <BedeIcon
                            type='material-community'
                            name='chat'
                            size={35}
                            color='#12AD2B'
                            
                        />
                       
                        <Text style={{paddingLeft:20,paddingTop:5}}>Chat</Text>  
               
                </TouchableOpacity>

                <View style={styles.phoneNo} >
                <Ionicons name="location"  size={30} color="#12AD2B" />
                    <TouchableOpacity onPress={()=>{navigation.navigate('ShowMapScreen',{
                         productsLatitude:productsLatitude,
                         productsLongitude:productsLongitude
                     })
                           
                        }}>
                       
                       <Text style={{paddingTop:5,paddingLeft:20}}>Location</Text> 
                    </TouchableOpacity>
                

                </View>
            </ScrollView>
        </View>
        </View>
    )
}
const styles= StyleSheet.create({
    image:{
        
        width:'100%',
        height:300
    },
    actions:{
        marginTop:10,
        alignItems:'center',
    },
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:10
    },
    description:{
        fontSize:15,
        textAlign:'center',
        marginHorizontal:20
    },
    phoneNo:{
        paddingTop:20,
        flexDirection:'row',
        paddingHorizontal:30
    }
});