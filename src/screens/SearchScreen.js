import React,{useState,useEffect} from 'react';
import {View, Text,StyleSheet,ScrollView,TouchableOpacity,Image,Button,TextInput} from 'react-native';
import { colors } from '../global/Styles';
import { auth,db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { Icon,withBadge } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';



export default function SearchScreen({navigation}){
    const [products,setProducts] = useState()
    const BedeIcon =(Icon)

// Search
const [enter, setEnter] = useState(false);
const [masterArray, setMasterArrary] = useState(null)
const [filterArray, setFilterArray] = useState(null)
const [search,setSearch] = useState()

   // get products
   useEffect(() => {
    try {
        const ref = collection(db, 'products')
        onSnapshot(ref, (snapshots) =>
        {
            setProducts((snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
            if (!masterArray)
            {
                setMasterArrary((snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
            }
            if (!filterArray)
            {
                setFilterArray((snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
               
                }
      
        })
        // console.log(masterArray)

    
    }
    catch (error)
    {

        console.log("user not fetched")
    }
   
})
 // search filter
 const SearchFilter = (text) => {
    if (text)
    {
        setEnter(true)
        const newData = masterArray.filter((item) => {
            const itemData = item.name ? item.name.toUpperCase()
                : "".toUpperCase();
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        });
        setFilterArray(newData)
        setSearch(text)
    }
    else {
        setEnter(false)
        setFilterArray(masterArray)
        setSearch(text)
    }
}
     // display list
     const ItemView = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                    navigation.navigate('ProductDetailsScreen', {
                        productsId:item.id,
                         })   
                }}>
                <Text>{item.name}</Text>
                
            </TouchableOpacity>
            
        )
        
    
    }
  //get products list  
    // useEffect(() => {
    //     try {
    //         const ref = collection(db, 'products')
    //         onSnapshot(ref,(snapshots)=>{
    //             let productsARR = [];
    //             snapshots.docs.map((doc)=>{

    //                 productsARR.push({...doc.data(),id:doc.id})
    //             })
    //           setProducts(productsARR)
            
    //         })

             
    //     } catch (error) {

    //         let productsARR = [];
    //         setProducts(productsARR)

    //     }
        

    // }, []);
    

    return(
        <View style ={{flex:1,marginTop:20}}>
        <View style={{marginTop:10}}>
            {/* search */}
          <View>
                    
                    <View >
        
                        <TextInput pointerEvents="none"
                             placeholder='   Search Products'
                            value={search}
                          //   onTouchStart={() => setEnter("hi")}
                            onChangeText={(value) => SearchFilter(value)}
                          //   onEndEditing={() => setEnter(null)}
                        >
                            </TextInput>
                         
                    </View>
                    
                    {enter ? <View>
                      <FlatList
                          data={filterArray}
                          keyExtractor={(products,index) => index.toString()}
                          renderItem={ItemView}
                          // ItemSeparatorComponent={ItemSpearatorView}
                      />
                  </View> : null}
                    
                </View>
          </View>
          {/* <ScrollView vertical={true} showsVerticalScrollIndicator={false}>

            {products && products.map((products) => (
            <TouchableOpacity>
            <View key={products.id} style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image style={styles.suggestImg} 
                        source={{uri:products.titleImage}}
                             />
                </View>   

                <View style={styles.details}>
                     <Text style={styles.title}>{products.name}</Text>
                     <Text style={styles.weight}>{products.weight}</Text>
                </View>
                <View style={styles.actions}>
                     <TouchableOpacity onPress={()=>{
                           
                        }}>
                       <Ionicons name="list" size={30} color="#12AD2B" />
                    </TouchableOpacity>

                     <TouchableOpacity onPress={()=>{
                           
                        }}>
                       <Ionicons name="location" size={30} color="#12AD2B" />
                    </TouchableOpacity>

                      <TouchableOpacity onPress={()=>{
                            navigation.navigate('ChatScreen')
                        }}>
                        <BedeIcon
                            type='material-community'
                            name='chat'
                            size={35}
                            color='#12AD2B'
                            
                        />
                    </TouchableOpacity>
                </View>
                        
                 
                </View>
                </TouchableOpacity>
            ))}

            </ScrollView>
             */}
            
        </View>
    )
}

const styles= StyleSheet.create({
    headerText:{
        textAlign:'center',
        alignItems:'center',
        color:colors.headerText,
        fontSize:22,
        fontWeight:'bold',
        marginTop:10
    },
    suggestImg: {
        width:'100%',
        height:'100%',
    },
   
    product:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height:300,
        margin:20
    },
    details:{
        alignItems:'center',
        height:'15%',
        
    },
    title:{
        fontSize:18,
        marginVertical:1
    },
    weight:{
        fontSize:14,
        color:'#888'
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        height:'25%',
        paddingHorizontal:20,

    },
    imageContainer:{
        width:'100%',
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },
})