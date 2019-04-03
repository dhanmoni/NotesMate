import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Dimensions,TextInput, FlatList, Alert, BackHandler , Share} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {connect} from 'react-redux'
import {changeThemeToDark, changeThemeToLight} from '../redux/action/mainAction'
import Modal from 'react-native-modal'


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
class Setting extends Component {
    static navigationOptions = {
        header: null, 
      }
      constructor(){
          super();
          this.state={
                themeModalVisible:false,
                theme:''
          }
      }
      componentDidMount(){
          if(this.props.auth.darkTheme){
            this.setState({theme: 'Dark Theme'})
          } else {
              this.setState({theme: 'Light Theme'})
          }
      }
      
      onShare=(url)=> {
        Share.share({
            message: `Hey! I am using Notesmate to organize my notes and documents. I guess it will be helpful for you too. So download the app by clicking on the link and make your life productive!` + url,
            
            title: 'Join Notesmate!'
          })
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

    const url='https://play.google.com/store/apps/details?id=com.mystudynotes'

   
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
           <Text numberOfLines={1} style={{fontSize:24,fontFamily:'Quicksand-Bold', textAlign:'center' ,color:'#fff',}}>Settings</Text>
           </View>
           <View style={{width: 20+'%', alignItems:'center', justifyContent:'center',  }}>
           
          </View>
        
               
           </View>
          
 
         </LinearGradient> 
         </View>
          <View style={{flex:10, backgroundColor:bgColor}}>
                <ScrollView >
                    <View style={{marginTop:20}}>
                    <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:4, paddingHorizontal:20,height:HEIGHT/12, borderBottomWidth:0.5,borderTopWidth:0.5, borderColor:'#888'}} activeOpacity={0.9} onPress={()=> this.setState({themeModalVisible:true})}>

                            <View style={{alignItems:'center', flexDirection:'row'}}>
                                <View style={{width: (HEIGHT/12)/1.6, height:(HEIGHT/12)/1.6, borderRadius:((HEIGHT/12)/1.6)/2, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                                <Icon name="moon" size={20} color='#fff'/>
                                </View>
                                <Text style={{fontFamily:'Quicksand-Medium',marginLeft:10, fontSize:18, color:textColor}}>Theme</Text>
                            </View>
                              

                               
                                <View style={{alignItems:'center', flexDirection:'row'}}>
                                <Text style={{fontFamily:'Quicksand-Light',marginRight:10, fontSize:16, color:textColor, fontStyle:'italic'}}>{this.state.theme}</Text>
                                <FontAwesome name="angle-right" size={22} color={textColor}/>
                                </View>
                               
                        </TouchableOpacity>

                    </View>
                    <View style={{}}>
                    <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:4, paddingHorizontal:20,height:HEIGHT/12, borderBottomWidth:0.5, borderColor:'#888'}} activeOpacity={0.9} 
                    onPress={()=> this.onShare(url)}
                    >

                            <View style={{alignItems:'center', flexDirection:'row'}}>
                                <View style={{width: (HEIGHT/12)/1.6, height:(HEIGHT/12)/1.6, borderRadius:((HEIGHT/12)/1.6)/2, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                                <FontAwesome name="share-alt" size={20} color='#fff'/>
                                </View>
                                <Text style={{fontFamily:'Quicksand-Medium',marginLeft:10, fontSize:18, color:textColor}}>Invite Friends</Text>
                            </View>
                              
                               
                        </TouchableOpacity>
                        
                    </View>
                    <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:4, paddingHorizontal:20,height:HEIGHT/12, borderBottomWidth:0.5, borderColor:'#888'}} activeOpacity={0.9}
                onPress={()=> this.props.navigation.navigate('HelpScreen')}
                    >

                        <View style={{alignItems:'center', flexDirection:'row'}}>
                            <View style={{width: (HEIGHT/12)/1.6, height:(HEIGHT/12)/1.6, borderRadius:((HEIGHT/12)/1.6)/2, elevation:7, backgroundColor:'#0073ff', justifyContent:'center', alignItems:'center',padding:2 }}>
                            <FontAwesome name="question" size={20} color='#fff'/>
                            </View>
                            <Text style={{fontFamily:'Quicksand-Medium',marginLeft:10, fontSize:18, color:textColor}}>Help</Text>
                        </View>
                        
                        
                        </TouchableOpacity>
                       
                </ScrollView>
          </View>
          <Modal isVisible={this.state.themeModalVisible} 
          animationIn='slideInUp'
          animationOut='slideOutDown'
          hideModalContentWhileAnimating ={true}
          animationInTiming={200}
          onBackButtonPress={()=> this.setState({themeModalVisible:false})}
        >
                <View style={{backgroundColor:cardColor, width:WIDTH-50,alignSelf:'center',borderRadius:20, overflow:'hidden'}}>
                <View style={{backgroundColor:'#0073ff', height:50, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontFamily:'Quicksand-Medium', color:'#fff'}} >Select Theme</Text>
                </View>
                    <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={()=> this.setState({theme:'Light Theme'})}
                    style={{flexDirection:'row', marginTop:20, alignItems:'center', justifyContent:'space-between', paddingHorizontal:20}}>
                        <Text style={{fontFamily:'Quicksand-Bold', fontSize:18, color:textColor}}>Light Theme</Text>
                        <View style={{
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: '#0073ff',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {
                            this.state.theme==='Light Theme' ?
                                <View style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#0073ff',
                                }}/>
                                : null
                            }
                         </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={()=> this.setState({theme:'Dark Theme'})}
                    style={{flexDirection:'row', alignItems:'center',marginTop:10, justifyContent:'space-between', paddingHorizontal:20}}>
                        <Text style={{fontFamily:'Quicksand-Bold', fontSize:18, color:textColor}}>Dark Theme</Text>
                        <View style={{
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: '#0073ff',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {
                            this.state.theme==='Dark Theme' ?
                                <View style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#0073ff',
                                }}/>
                                : null
                            }
                         </View>
                    </TouchableOpacity>
                    <View  style={{ flexDirection:'row', marginBottom:20,marginTop:30, justifyContent:'space-around'}}>
                    <TouchableOpacity style={{alignItems:"center",width:30+'%', borderRadius:10, justifyContent:'center',}}>
                 
                     </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={()=> {
                        if(this.state.theme ==='Light Theme'){
                            this.props.changeThemeToLight()
                            this.setState({themeModalVisible:false,})
                        } else {
                            this.props.changeThemeToDark()
                            this.setState({themeModalVisible:false,})
                        }
                        
                        
                        this.setState({themeModalVisible:false,})}}>
                        <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Save</Text>
                    </TouchableOpacity>
                    </View>
                </View>
        </Modal>
 
      </View>
    )
  }
}


const mapStateToProps = (state)=> {
    return {
      auth: state.auth
    }
  }
  


export default connect(mapStateToProps,{changeThemeToDark, changeThemeToLight})(Setting)


