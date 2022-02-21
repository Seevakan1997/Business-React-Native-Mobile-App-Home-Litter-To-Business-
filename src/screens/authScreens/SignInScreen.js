import React, {useState,useRef} from 'react';
import {View, Text, StyleSheet, Dimentions, TextInput, Alert} from 'react-native';
import {colors, parameters,title} from '../../global/Styles';
import { Icon, Button,SocialIcon } from 'react-native-elements';
import Header from '../../components/Header';
import * as Animatable from 'react-native-animatable';
import { Formik } from 'formik';
import firebase,{ auth } from '../../../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth'


export default function SignInScreen({navigation}){

        const [textInput2focussed,setTextInput2focussed]=useState(false)
        const textInput1=useRef(1)
        const textInput2=useRef(2)

        const onLogin=async(email,password)=>{
            signInWithEmailAndPassword(auth, email, password)
           .then((re) => {
               console.log("Sucessfully log in ");
               navigation.push("RootClientTabs");
           })
           .catch((re) => {
               console.log(re.message);
               Alert.alert(
                   "You entered the email or password wrongly",
                   "If you not registered, click SignUp",
               [{ text: "SignUp", onPress: () => navigation.navigate("SignUpScreen") },
                   {text: "Try again" }
               ])
        })
    }    


    return(
        
        <View style={styles.container}>

            <Header title='My Account' type='arrow-left' navigation={navigation}/>
            <View>
                <Text style={title}>Sign In</Text>
            </View>
            <View style={{alignItems:'center'}}>
                <Text style={styles.text1}>Please Enter the Email and Password</Text>
                <Text style={styles.text1}>Registered With Your Account</Text>
            </View>
            
            <Formik
            initialValues={{email:'',password:''}}
            onSubmit ={(values)=>{
                onLogin(values.email,values.password)
            }}
        >
        { ({handleChange,
             handleBlur, 
             handleSubmit, 
             values,
             isValid})=>
            <View>
                <View style={{marginTop:20}}>
                <View>
                    <TextInput style={styles.textInput1}
                    placeholder='Email'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    
                    />
                
                </View>
                    <View style={styles.textInput2}>
                    <Animatable.View animation={textInput2focussed?"":"fadeInLeft" } duration={400}>
                        <Icon
                            name='lock'
                            iconStyle={{color:colors.grey3}}
                            type='material'
                           
                        />
                    </Animatable.View>
                        <TextInput
                        style={{width:'80%'}} 
                            placeholder='Password'
                            ref={textInput2}
                            ref={textInput1}
                            secureTextEntry={true}
                            onFocus={()=>{
                        setTextInput2focussed(false)
                    }}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                        />
                    <Animatable.View animation={textInput2focussed?"":"fadeInLeft" } duration={400}>
                        <Icon
                            name='visibility-off'
                            iconStyle={{color:colors.grey3}}
                            type='material'
                            style={{marginRight:10}}
                        />
                    </Animatable.View>
                    </View>
            </View>
            <View style={{marginHorizontal:20, marginTop:20}}>
                <Button
                    title='SIGN IN'
                    buttonStyle={parameters.styledButton}
                    titleStyle={parameters.buttonTitle}
                    onPress={handleSubmit}
                />
            </View>
        </View>
        }
        </Formik>

            

            <View style={{alignItems:'center',marginTop:15}}>
                <Text style={{...styles.text1,textDecorationLine:'underline'}}>forgot password ?</Text>
            </View>

            <View style={{alignItems:'center',marginTop:10}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>OR</Text>
            </View>
            <View style={{marginHorizontal:10,marginTop:10}}>
                <SocialIcon
                    title='Sign in with Facebook'
                    button
                    type='facebook'
                    style={styles.SocialIcon}
                    onPress={()=>{}}
                />
            </View>
            <View style={{marginHorizontal:10,marginTop:10}}>
                <SocialIcon
                    title='Sign in with Google'
                    button
                    type='google'
                    style={styles.SocialIcon}
                    onPress={()=>{}}
                />
            </View>
            <View style={{marginLeft:20,marginTop:15}}>
                <Text style={{...styles.text1}}>New User ?</Text>
            </View>

            <View style={{alignItems:'flex-end',marginHorizontal:20}}>
                <Button
                    title='Create an account'
                    buttonStyle={styles.createdButton}
                    titleStyle={styles.createButtonTitle}
                    onPress={()=>{navigation.navigate('SignUpScreen')}}
                />
            </View>

        </View>
    );
};

const styles=StyleSheet.create({
    container:{
        marginTop:15,
        flex:1
    },
    text1:{
        color:colors.grey3,
        fontSize:16
    },
    textInput1:{
        
        borderWidth:1,
        borderColor:'#86939e',
        marginHorizontal:20,
        borderRadius:10,
        marginBottom:20,
        paddingLeft:15,
        height:40,
    },
    textInput2:{
        borderWidth:1,
        borderRadius:12,
        marginHorizontal:20,
        borderColor:'#86939e',
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center',
        paddingLeft:15,
        height:40
    },
    SocialIcon:{
        borderRadius:10,
        height:50
    },
    createdButton:{
        backgroundColor:'white',
        alignContent:'center',
        justifyContent:'center',
        borderRadius:12,
        borderWidth:1,
        borderColor:'#12AD2B',
        height:40,
        paddingHorizontal:20,
        
    },
    createButtonTitle:{
        color:'#12AD2B',
        fontSize:16,
        fontWeight:'bold',
        alignItems:'center',
        justifyContent:'center',
        marginTop:0
    }
});