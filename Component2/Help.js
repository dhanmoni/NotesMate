import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Dimensions,TextInput, Image, Alert, BackHandler , Share} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {connect} from 'react-redux'
import {changeThemeToDark, changeThemeToLight} from '../redux/action/mainAction'
import Modal from 'react-native-modal'


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
class HelpScreen extends Component {
    static navigationOptions = {
        header: null, 
      }
      constructor(){
          super();
          this.state={
              
          }
      }
     
    


  render() {

    let bgColor;
    let textColor;
    let cardColor;
    if(this.props.auth.darkTheme){
        bgColor='#303030',
        textColor='#fff',
        cardColor='#424242'
    } else {
        bgColor='#fff',
        textColor='#000',
        cardColor='#fff'
    }

    return (
      <View style={{flex:1, backgroundColor:bgColor}}> 
      
        <View style={{backgroundColor:'transparent',flexDirection: 'row', borderBottomLeftRadius:15, borderBottomRightRadius:15,overflow:'hidden', flex:1}}>
         <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{width: 100 + '%', height: 100 +'%',}}  start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
           <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',justifyContent:'space-evenly', paddingHorizontal:20}}>
          

           <View style={{width: 20+'%', alignItems:'flex-start', justifyContent:'center',  }}>
           <TouchableOpacity activeOpacity={0.9} onPress={()=> this.props.navigation.goBack()}>
             <FontAwesome name="chevron-left" size={23} color="#fff" />
          </TouchableOpacity>
            </View>     

           <View style={{width: 60+'%', alignItems:'center', justifyContent:'center',}}> 
           <Text numberOfLines={1} style={{fontSize:24,fontFamily:'Quicksand-Bold', textAlign:'center' ,color:'#fff',}}>Help</Text>
           </View>
           <View style={{width: 20+'%', alignItems:'center', justifyContent:'center',  }}>
           
          </View>
        
               
           </View>
          
 
         </LinearGradient> 
         </View>
          <View style={{flex:10, backgroundColor:bgColor}}>
                <ScrollView >
                    <View style={{paddingHorizontal:20, marginTop:20}}>
                      <Text style={{fontSize:18,fontFamily:'Quicksand-Bold',color:textColor,}}>Q. What is the use of NotesMate?</Text>
                      <Text style={{fontSize:14,fontFamily:'Quicksand-Medium',color:textColor,}}>With the help of NotesMate, you easily store your important notes/images or PDF files through creating subject / category.You just need to add a subject name and import your notes/images from gallery to subject. You can add more chapters inside one subject and import files to that chapter as well. This way you don't have to waste time searching for important files and notes in your gallery. You will be able to find them easily with NotesMate.</Text>
                      <Text style={{fontSize:18,fontFamily:'Quicksand-Bold',color:textColor,marginTop:10}}>Q. Can I share files and images to friends directly from NotesMate?</Text>
                      <Text style={{fontSize:14,fontFamily:'Quicksand-Medium',color:textColor,}}>Of course, You can easily share image/PDF from NotesMate to your friends.</Text>
                      <Text style={{fontSize:18,fontFamily:'Quicksand-Bold',color:textColor,marginTop:10}}>The following images illustrate how and what you can do with NotesMate.</Text>
                    </View>
                   
                    <View style={{marginTop:20, alignItems:'center', justifyContent:'center'}}>
                          <Image style={{borderWidth:1, borderColor:'#888'}} resizeMode='contain' source={require('./Photos/NotesMateAssets1.jpg')}/>
                    </View>
                  
                    <View style={{marginTop:20, alignItems:'center', justifyContent:'center'}}>
                          <Image  style={{borderWidth:1, borderColor:'#888'}} resizeMode='contain' source={require('./Photos/NotesMateAssets2.jpg')}/>
                    </View>
                    <View style={{marginTop:20, alignItems:'center', justifyContent:'center'}}>
                          <Image  style={{borderWidth:1, borderColor:'#888'}} resizeMode='contain' source={require('./Photos/NotesMateAssets3.jpg')}/>
                    </View>
                    <View   style={{marginTop:20, alignItems:'center', justifyContent:'center'}}>
                          <Image style={{borderWidth:1, borderColor:'#888'}} resizeMode='contain' source={require('./Photos/NotesMateAssets4.jpg')}/>
                    </View>
                   <View style={{marginBottom:40}}>

                   </View>
                       
                </ScrollView>
          </View>
         
      </View>
    )
  }
}


const mapStateToProps = (state)=> {
    return {
      auth: state.auth
    }
  }
  


export default connect(mapStateToProps,{changeThemeToDark, changeThemeToLight})(HelpScreen)


