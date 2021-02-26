import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'
export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [telnum,setLnum]= useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [namevalidation, setnamevalidation]=useState({namest:false,message:'Entrer votre correct nom'});
    const [emailvalidation, seteamsilvalidation]=useState({emast:false,message:'ton email est incorrect'});
    const [tlpvalidation, settlpvalidation]=useState({tlst:false,message:'le numero est incorrect'});
    const [passwordvalidation, setpassvalidation]=useState({past:false,message:'le password contient 8 carracters '});
    const [confpasswordvalidation, setconfpassvalidation]=useState({conpasst:false,message:'les passwords ne sont  pas meme'});

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

     // validation for name
  const namehendeendediting=(val)=>{
    if(val.length <=1){
      setnamevalidation({ 
          ...namevalidation,namest:true,
      })
    }
    else{
      setnamevalidation({ 
          ...namevalidation,namest:false,
      })   
    }
} 
//      validation for prenom
const emaihendeendediting=(val)=>{
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(val.length <=1 || reg.test(val) === false){
      seteamsilvalidation({ 
        ...emailvalidation,emast:true,
    })
  }
  else{
      seteamsilvalidation({ 
        ...emailvalidation,emast:false,
    })   
  }
}
// testin phone number
const telhendeendediting=(val)=>{
  if(val.length <8 || isNaN(val) ){
      settlpvalidation({ 
        ...tlpvalidation,tlst:true,
    })
  }
  else{
      settlpvalidation({ 
        ...tlpvalidation,tlst:false,
    })   
  }
}
// tester le password
const passhendeendediting=(val)=>{
  if(val.length <8 ){
      setpassvalidation({ 
        ...passwordvalidation,past:true,
    })
  }
  else{
      setpassvalidation({ 
        ...passwordvalidation,past:false,
    })   
  }
}
// valider confirmer password
const conpasshendeendediting=(val)=>{
  if(val !== password){
      setconfpassvalidation({ 
        ...confpasswordvalidation,conpasst:true,
    })
  }
  else{
      setconfpassvalidation({ 
        ...confpasswordvalidation,conpasst:false,
    })   
  }
}

    const onRegisterPress = () => {
        if(namevalidation.namest !==false  ||emailvalidation.emast !==false || tlpvalidation.tlst !==false ||
            passwordvalidation.past !==false || confpasswordvalidation.conpasst !==false
            || fullName ==="" ||email==="" || telnum==="" || password==="" || confirmPassword===""
            ){
                          return  alert('il ya un problem');
       }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                    telnum,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                              alert("ajouter avec succes")
                              navigation.navigate('Login')
                    })
                    .then(() => {
                        navigation.navigate('Home', {user: data})
              })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });

    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/sssssss.jpg')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Nom'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                     onEndEditing={(e)=>namehendeendediting(e.nativeEvent.text)}
                    autoCapitalize="none"
                />
                 {
                        namevalidation.namest ?  
                            <Text style={styles.errortext}>{namevalidation.message}</Text>
                        :
                        null
                }
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onEndEditing={(e)=>emaihendeendediting(e.nativeEvent.text)}
                />
                 {
                    emailvalidation.emast ?  
                        <Text style={styles.errortext}>{emailvalidation.message}</Text>
                    :
                    null
                }
                <TextInput
                    style={styles.input}
                    placeholder='Numer-telph'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setLnum(text)}
                    value={telnum}
                    underlineColorAndroid="transparent"
                    onEndEditing={(e)=>telhendeendediting(e.nativeEvent.text)}
                    autoCapitalize="none"
                />
                    {
                        tlpvalidation.tlst ?  
                            <Text style={styles.errortext}>{tlpvalidation.message}</Text>
                        :
                        null
                    }
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    onEndEditing={(e)=>passhendeendediting(e.nativeEvent.text)}
                    autoCapitalize="none"
                />
                            {
                    passwordvalidation.past ?  
                        <Text style={styles.errortext}>{passwordvalidation.message}</Text>
                    :
                    null
                            }
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    onEndEditing={(e)=>conpasshendeendediting(e.nativeEvent.text)}
                    autoCapitalize="none"
                />
                 {
                    confpasswordvalidation.conpasst ?  
                        <Text style={styles.errortext}>{confpasswordvalidation.message}</Text>
                    :
                    null
               }
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}