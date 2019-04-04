import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Dimensions,TextInput, FlatList, Alert, BackHandler, ToastAndroid } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {connect} from 'react-redux'
import {addName, addSubject, deleteSubject, getSingleSubject, setAdTimeForDeleteSubject, setLoading, deletepdfFromUncatagorised, deletepdftoUncatagorisedinChapter} from '../redux/action/mainAction'
import Modal from 'react-native-modal'
import { BannerView, InterstitialAdManager  } from 'react-native-fbads'
import RNFileSelector from 'react-native-file-selector';
import RNFetchBlob from 'rn-fetch-blob'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
class MainScreen extends Component {
    static navigationOptions = {
        header: null, 
      }
      constructor(){
          super();
          this.state={
            subject_name:'',
           
            uncatagorised_note:[],
            isSubjectModalVisible:false,
            showMenu:false
          }
      }
      
    deletebutton(item) {

      Alert.alert(
          'Are you sure?',
          'This will delete this subject',
          [
          
          {text: 'Cancel', onPress: () =>{}},
          {text: 'Delete', onPress: () => {
            this.props.deleteSubject(item)
            let expirationDate = this.props.auth.deleteSubjectAdExpiration;
            let date = new Date(expirationDate)
            if(!expirationDate || new Date() > expirationDate){
        
            myDate = new Date(
                new Date().getTime() + (4*60*1000)
            )

            //324550781538284_324677744858921--BackFromUncatagorisedIntersitial
          this.props.setAdTimeForDeleteSubject(myDate)
            InterstitialAdManager.showAd('324550781538284_324571821536180')
            .then(didClick => {console.log('clicked')})
            .catch(error => {console.log('err', error)});
            
            }
          }},
          ],
          { cancelable: true }
      )
      }
      
  
      _renderItem=(item, index)=> {

        let bgColor;
        let textColor;
        let cardColor;
        let deleteColor;
        if(this.props.auth.darkTheme){
            bgColor='#303030',
            textColor='#fff',
            cardColor='#424242',
            deleteColor='#fff'
        } else {
            bgColor='#fff',
            textColor='#000',
            cardColor='#fff',
            deleteColor='#f70000'
        }
    
        
        //console.log('item is ', item)
        const colors = ['#8e44ad', '#f1c40f','#f368e0', '#3949AB', '#0073ff', '#26de81', '#e74c3c'];
        let string = item.subject_name;

       let First_char= string.trim().charAt(0).toUpperCase(); 
        return (
          <TouchableOpacity  activeOpacity={0.88} onPress={()=> {
           this.props.getSingleSubject(item)


            this.props.navigation.navigate('SubScreen')
            }} style={{marginTop:12, marginHorizontal:10,height:HEIGHT/11, backgroundColor:cardColor,paddingHorizontal:10, padding:4, justifyContent:'space-between', flexDirection:'row',alignItems:'center', borderRadius:10, elevation:4}}>

                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                  <View style={{backgroundColor: colors[Math.floor(Math.random() * colors.length)], borderRadius:((HEIGHT/10)-(HEIGHT/10)/2)/2, alignItems:'center',overflow:'hidden', justifyContent:'center',height: (HEIGHT/10)-(HEIGHT/10)/2, width: (HEIGHT/10)-(HEIGHT/10)/2, borderWidth:2, borderColor:'#fff' }}>
                    <Text style={{fontSize:24, color:'#fff',fontFamily:'Quicksand-Bold',textAlign:'center', }}>{First_char}</Text>
                  </View>
                  <Text numberOfLines={2} style={{fontFamily:'Quicksand-Medium', marginRight:10, width:80+'%', fontSize:16, color:textColor,padding:4, marginLeft:10}}>{item.subject_name}</Text>
                  </View>
                  <TouchableOpacity
                  style={{padding:4,}}
                  onPress={()=> {
                    
                    this.deletebutton(item.subject_name)}}>
                  <Icon name="trash-alt" size={20} color={deleteColor} />
                  </TouchableOpacity>

                      

            </TouchableOpacity>
        )
      }
     
       

  render() {




    const subjects = this.props.auth.subjects.map(item=> {
      return item
    })
    const subjectNames = subjects.map(subject=> {
      return subject.subject_name
    })
    let bgColor;
        let textColor;
        let cardColor;
        let deleteColor;
        let importColor;
        let light_cardColor
        if(this.props.auth.darkTheme){
            bgColor='#303030',
            textColor='#fff',
            cardColor='#424242',
            deleteColor='#fff',
            importColor='#fff',
            light_cardColor='#424242'
        } else {
            bgColor='#fff',
            textColor='#000',
            cardColor='#fff',
            deleteColor='#f70000',
            importColor='#0073ff',
            light_cardColor='#f5f5f5'
        }

    return (
      <View style={{flex:1, backgroundColor:bgColor}}> 
      
        <View style={{backgroundColor:'transparent',flexDirection: 'row', borderBottomLeftRadius:15, borderBottomRightRadius:15,overflow:'hidden', flex:1}}>
         <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{width: 100 + '%', height: 100 +'%',}}  start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
           <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',justifyContent:'space-evenly', paddingHorizontal:20}}>
          <View style={{width: 20+'%', alignItems:'center', justifyContent:'center',  }}>

          </View>
           <View style={{width: 60+'%', alignItems:'center', justifyContent:'center',}}> 
           <Text numberOfLines={1} style={{fontSize:24,fontFamily:'Quicksand-Bold', textAlign:'center' ,color:'#fff',}}>NotesMate</Text>
           </View>
         <View style={{width: 20+'%', alignItems:'flex-end',justifyContent:'center'}}>
          <TouchableOpacity activeOpacity={0.9} onPress={()=> this.props.navigation.navigate('Setting')}>
             <FontAwesome name="cog" size={26} color="#fff" />
          </TouchableOpacity>
             
         </View>
               
           </View>
          
 
         </LinearGradient> 
         </View>
          <View style={{flex:10, backgroundColor:bgColor}}>
                <ScrollView >
                    <View style={{marginTop:20}}>
                        <View style={{ paddingHorizontal:20, backgroundColor:light_cardColor, padding:4}}>
                            <Text style={{fontFamily:'Quicksand-Bold', fontSize:18, color:textColor,}}>Subjects/Category :</Text>
                        </View>
                        {
                          this.props.auth.subjects.length <=0  ? (
                            <View style={{alignItems:'center',marginTop:10, justifyContent:'center'}}>
                            <Text style={{fontFamily:'Quicksand-Regular', fontSize:14, color:textColor,}}>No subject added yet!</Text>
                            
                            <TouchableOpacity activeOpacity={0.8} 
                            onPress={()=> this.setState({isSubjectModalVisible:true})}
                             style={{marginTop:10, marginBottom:10,margin:'auto',alignItems:'center', justifyContent:'center',padding:3, alignSelf:'center', width:30+'%'}}>
                            <LinearGradient colors={['#00aaff', '#0073ff']} style={{borderRadius:11, width:100+'%'}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}} >
                            <Text style={{color:'#fff', padding:6,fontSize:14,textAlign:'center', fontFamily:'Quicksand-Bold'}}>Add now</Text>
                            </LinearGradient>
                            
                        </TouchableOpacity>
                        </View>
                          ): (
                            <View>
                               <FlatList
                                  data={subjects}
                                  
                                  renderItem={({item, index}) => this._renderItem(item, index)}
                                  keyExtractor={(item, index)=> index.toString()}
                                  ListFooterComponent={()=> {
                                      return (
                                        <TouchableOpacity activeOpacity={0.8} 
                                          onPress={()=> this.setState({isSubjectModalVisible:true})}
                                          style={{marginTop:10, marginBottom:10,margin:'auto',alignItems:'center', justifyContent:'center',padding:3, alignSelf:'center', width:30+'%'}}>
                                          <LinearGradient colors={['#00aaff', '#0073ff']} style={{borderRadius:11, width:100+'%'}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}} >
                                          <Text style={{color:'#fff', padding:6,fontSize:14,textAlign:'center', fontFamily:'Quicksand-Bold'}}>Add more</Text>
                                          </LinearGradient>
                                          
                                      </TouchableOpacity>
                                      )
                                  }}
                              />
                            </View>
                          )
                        }
                       
                    </View>
                   
                    <TouchableOpacity activeOpacity={0.88} onPress={()=> {
                     // this.props.setLoading()
                      this.props.navigation.navigate('UnCatagorised')}} style={{marginTop:20, paddingHorizontal:20, backgroundColor:light_cardColor, padding:4, justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'Quicksand-Bold', fontSize:18, color:textColor,}}>Uncategorized </Text>
                        <FontAwesome name="angle-right" size={23} color={textColor}/>
                    </TouchableOpacity>
                   
                    
                </ScrollView>
          </View>
          <Modal isVisible={this.state.isSubjectModalVisible} 
          animationIn='slideInUp'
          animationOut='slideOutDown'
          hideModalContentWhileAnimating ={true}
          animationInTiming={200}
          onBackButtonPress={()=> this.setState({isSubjectModalVisible:false})}
        >
        <View style={{backgroundColor:cardColor, width:WIDTH-50,alignSelf:'center',borderRadius:20, overflow:'hidden'}}>
                <View style={{backgroundColor:'#0073ff', height:50, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontFamily:'Quicksand-Medium', color:'#fff'}} >Add Subject/Category</Text>
                </View>
                <View style={{marginTop:30, paddingHorizontal:10}}>
                <TextInput 
                        selectionColor="#0073ff"
                        numberOfLines={1}
                        underlineColorAndroid="#0073ff"
                        value={this.state.subject_name}
                        editable={true}
                        onChangeText={(text)=> this.setState({subject_name:text})}
                        style={{fontFamily:'Quicksand-Medium', fontSize:14, color:textColor}}
                         />
                </View>
                <View style={{ flexDirection:'row', marginBottom:20,marginTop:30, justifyContent:'space-around'}}>
                <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#bdc3c7'}} onPress={()=> {
                 
                  this.setState({isSubjectModalVisible:false, subject_name:''})}}>
                  <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Cancel</Text>
                </TouchableOpacity>
              <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={()=> {
                if(this.state.subject_name === '' || this.state.subject_name == null){
                  ToastAndroid.show('Name cannot be empty!', ToastAndroid.SHORT)
                } else {
                  this.props.addSubject(this.state)
                
                  this.setState({isSubjectModalVisible:false, subject_name:''})
                }
              }}>
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
  


export default connect(mapStateToProps,{addName, addSubject,setLoading, deleteSubject,deletepdfFromUncatagorised, getSingleSubject, setAdTimeForDeleteSubject, deletepdftoUncatagorisedinChapter})(MainScreen)
