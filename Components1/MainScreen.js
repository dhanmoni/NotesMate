import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Dimensions,TextInput, FlatList, Alert, BackHandler } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {connect} from 'react-redux'
import {addName, addSubject, deleteSubject, getSingleSubject, setAdTimeForDeleteSubject} from '../redux/action/mainAction'
import Modal from 'react-native-modal'
import { BannerView, InterstitialAdManager  } from 'react-native-fbads'



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
        //console.log('item is ', item)
        const colors = ['#8e44ad', '#3498db','#fff200', '#2c3e50', '#6c5ce7', '#0073ff', '#26de81'];
        let string = item.subject_name;

       let First_char= string.charAt(0).toUpperCase(); 
        return (
          <TouchableOpacity  activeOpacity={0.88} onPress={()=> {
           this.props.getSingleSubject(item)
            this.props.navigation.navigate('SubScreen')
            }} style={{marginTop:20, marginHorizontal:10,height:HEIGHT/11, backgroundColor:'#fff',paddingHorizontal:10, padding:4, justifyContent:'space-between', flexDirection:'row',alignItems:'center', borderRadius:10, elevation:4}}>

                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                  <View style={{backgroundColor: colors[Math.floor(Math.random() * colors.length)], borderRadius:((HEIGHT/11)-(HEIGHT/11)/2)/2, alignItems:'center',overflow:'hidden', justifyContent:'center',height: (HEIGHT/11)-(HEIGHT/11)/2,
                   width: (HEIGHT/11)-(HEIGHT/11)/2 }}>
                    <Text style={{fontSize:22, color:'#fff',fontFamily:'Quicksand-Bold', }}>{First_char}</Text>
                  </View>
                  <Text numberOfLines={2} style={{fontFamily:'Quicksand-Medium', marginRight:10, width:80+'%', fontSize:16, color:'#000',padding:4, marginLeft:10}}>{item.subject_name}</Text>
                  </View>
                  <TouchableOpacity
                  style={{padding:4,marginRight:5}}
                  onPress={()=> {
                    
                    this.deletebutton(item.subject_name)}}>
                  <Icon name="trash-alt" size={20} color="#f70000" />
                  </TouchableOpacity>

                      

            </TouchableOpacity>
        )
      }

      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
    }

    onBackPress(){
      this.props.navigation.pop();
      return false; 
  }

  render() {

    const subjects = this.props.auth.subjects.map(item=> {
      return item
    })
    const subjectNames = subjects.map(subject=> {
      return subject.subject_name
    })
    // console.log(subjects)
    // console.log(subjectNames)
   


    return (
      <View style={{flex:1}}> 
      
        <View style={{backgroundColor:'transparent',flexDirection: 'row', borderBottomLeftRadius:15, borderBottomRightRadius:15,overflow:'hidden', flex:1}}>
         <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{width: 100 + '%', height: 100 +'%',}}  start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
           <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',justifyContent:'center', paddingHorizontal:20}}>
          
           <View> 
           <Text numberOfLines={1} style={{fontSize:24,fontFamily:'Quicksand-Bold', textAlign:'center' ,color:'#fff',}}>NotesMate</Text>
           </View>
         
               
           </View>
          
 
         </LinearGradient> 
         </View>
          <View style={{flex:10, backgroundColor:'#fff'}}>
                <ScrollView >
                    <View style={{marginTop:20}}>
                        <View style={{ paddingHorizontal:20, backgroundColor:'#f5f5f5', padding:4}}>
                            <Text style={{fontFamily:'Quicksand-Bold', fontSize:18, color:'#000',}}>Subjects/Catagory :</Text>
                        </View>
                        {
                          this.props.auth.subjects.length <=0  ? (
                            <View style={{alignItems:'center',marginTop:10, justifyContent:'center'}}>
                            <Text style={{fontFamily:'Quicksand-Regular', fontSize:14, color:'#333',}}>No subject added yet!</Text>
                            
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
                   
                    <TouchableOpacity activeOpacity={0.88} onPress={()=> this.props.navigation.navigate('UnCatagorised')} style={{marginTop:20, paddingHorizontal:20, backgroundColor:'#f5f5f5', padding:4, justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'Quicksand-Bold', fontSize:18, color:'#000',}}>Uncatagorised </Text>
                        <FontAwesome name="angle-right" size={23} color="#000"/>
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
        <View style={{backgroundColor:'#fff', width:WIDTH-50,alignSelf:'center',borderRadius:20, overflow:'hidden'}}>
                <View style={{backgroundColor:'#0073ff', height:50, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontFamily:'Quicksand-Medium', color:'#fff'}} >Add Subject/Catagory</Text>
                </View>
                <View style={{marginTop:30, paddingHorizontal:10}}>
                <TextInput 
                        selectionColor="#0073ff"
                        numberOfLines={1}
                        underlineColorAndroid="#0073ff"
                        value={this.state.subject_name}
                        editable={true}
                        onChangeText={(text)=> this.setState({subject_name:text})}
                        style={{fontFamily:'Quicksand-Medium', fontSize:14, color:'#333'}}
                         />
                </View>
                <View style={{ flexDirection:'row', marginBottom:20,marginTop:30, justifyContent:'space-around'}}>
                <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#bdc3c7'}} onPress={()=> {
                 
                  this.setState({isSubjectModalVisible:false})}}>
                  <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Cancel</Text>
                </TouchableOpacity>
              <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={()=> {
                this.props.addSubject(this.state)
                
                 this.setState({isSubjectModalVisible:false})}}>
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
  


export default connect(mapStateToProps,{addName, addSubject, deleteSubject, getSingleSubject, setAdTimeForDeleteSubject})(MainScreen)
