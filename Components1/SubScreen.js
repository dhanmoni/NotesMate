import React, { Component } from 'react'
import {Text, View,StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, FlatList,Alert, CameraRoll,ToastAndroid, BackHandler , TextInput} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {addName, addChapter, deleteChapter, addnotestoUncatagorisedinChapter, addpdftoUncatagorisedinChapter, deletenotestoUncatagorisedinChapter, deletepdftoUncatagorisedinChapter, editSubject, getSingleChapter, setAdTimeForAddNotestoUncatagorisedInSubject, setAdTimeForDeleteNotestoUncatagorisedInSubject} from '../redux/action/mainAction'

import {connect} from 'react-redux'
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-crop-picker';

import {
  DocumentPicker,
  DocumentPickerUtil,
} from 'react-native-document-picker';
import Share, {ShareSheet, Button} from 'react-native-share';
import Pdf from 'react-native-pdf';
import ImageView from 'react-native-image-view';
 
import { BannerView, InterstitialAdManager  } from 'react-native-fbads'



const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
class SubScreen extends Component {
    static navigationOptions = {
        header: null, 
      }

      constructor(){
        super()
        this.state={
          chapter_name:'',
          subject_name:'',
          prev_subject_name:'',
          isChapterModalVisible:false,
          isEditSubjectModalVisible:false,
          uncatagorised_photos_in_chapter: null,
          uncatagorised_documents_in_chapter: null,
          showPhotos:true,
          showDocument:true,
          fileUri:'',
          pdfUri:null,
          showPDF:false,
          imageIndex:0,
          isImageViewVisible:false,
          fileToShare:null,
          onLongPressOnPhoto:false,
          selectedPhotoUri:[],
          changeState:null
        }
      }
      componentDidMount(){
        this.setState({subject_name: this.props.auth.singleSubject.subject_name,
          prev_subject_name: this.props.auth.singleSubject.subject_name,
        })
       // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }



      selectphoto(){
        ImagePicker.openPicker({
          multiple: true
        }).then(images => {
          this.setState({uncatagorised_photos_in_chapter: images}, ()=> {
            this.props.addnotestoUncatagorisedinChapter(this.state.uncatagorised_photos_in_chapter, this.state.subject_name)
            let expirationDate = this.props.auth.AddNotestoUncatagorisedInSubjectAdExpiraion;
            let date = new Date(expirationDate)
            if(!date || new Date() > date){
        //324550781538284_324678218192207
            myDate = new Date(
                new Date().getTime() + (5*60*1000)
            )
            //324550781538284_324678218192207===AddNotesinSubjectInterstitial
              this.props.setAdTimeForAddNotestoUncatagorisedInSubject(myDate)
            InterstitialAdManager.showAd('324550781538284_324678218192207')
            .then(didClick => {console.log('clicked')})
            .catch(error => {console.log('err', error)});
          
            } 
            
           
          })
        });
      }
      // launchCamera(){
      //   ImagePicker.openCamera({
      //     width: 300,
      //     height: 400,
       
      //   }).then(images => {
      //     this.setState({uncatagorised_photos_in_chapter: images}, ()=> {
      //       this.props.addnotestoUncatagorisedinChapter(this.state.uncatagorised_photos_in_chapter, this.state.subject_name)
      //       let expirationDate = this.props.auth.AddNotestoUncatagorisedInSubjectAdExpiraion;
      //       let date = new Date(expirationDate)
      //       if(!date || new Date() > date){
        
      //       myDate = new Date(
      //           new Date().getTime() + (5*60*1000)
      //       )
      //         this.props.setAdTimeForAddNotestoUncatagorisedInSubject(myDate)
      //       InterstitialAdManager.showAd('324550781538284_324678218192207')
      //       .then(didClick => {console.log('clicked')})
      //       .catch(error => {console.log('err', error)});
          
      //       } 
            
           
      //     })
      //   });
      // }
      selectpdf() {
        //Opening Document Picker
        DocumentPicker.show(
          {
            filetype: [DocumentPickerUtil.pdf()],
          },
          (error, res) => {
            try {
              this.setState({
                uncatagorised_documents_in_chapter:{
                  fileUri: res.uri,
                  fileType: res.type,
                  fileName: res.fileName,
                  fileSize: res.fileSize 
                },
                },()=> {
                  this.props.addpdftoUncatagorisedinChapter(this.state.uncatagorised_documents_in_chapter, this.state.subject_name)
                //  console.log('state pdf=', this.state.uncatagorised_documents_in_chapter)
              });
              this.setState({fileUri:res.uri})
       
            } catch (error) {
              ToastAndroid.show('Nothing imported!', ToastAndroid.SHORT)
              console.log(error)
            }
            
            
          }
          
        );
      }

      deleteChapter(item) {

        Alert.alert(
            'Are you sure?',
            'This will delete this chapter',
            [
            
            {text: 'Cancel', onPress: () =>{}},
            {text: 'Delete', onPress: () => this.props.deleteChapter(item, this.state.subject_name)},
            ],
            { cancelable: true }
        )
        }
        
      
      _renderItem=(item, index)=> {
       // console.log('item is ', item)
        const colors = ['#8e44ad', '#fff200', '#2c3e50', '#6c5ce7', '#0073ff', '#26de81'];
        let string = item.chapter_name;

       let First_char= string.charAt(0).toUpperCase();     
        return (
          <TouchableOpacity
          activeOpacity={0.88}
          onPress={()=> {
           
           this.props.getSingleChapter(item)
            this.props.navigation.navigate('ChapterScreen')
            }} style={{marginTop:12, marginHorizontal:10,height:HEIGHT/11, backgroundColor:'#fff',paddingHorizontal:10, padding:4, justifyContent:'space-between', flexDirection:'row',alignItems:'center', borderRadius:10, elevation:4}}>
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                  <View style={{backgroundColor: colors[Math.floor(Math.random() * colors.length)], borderRadius:((HEIGHT/11)-(HEIGHT/11)/2)/2, alignItems:'center',overflow:'hidden', justifyContent:'center',height: (HEIGHT/11)-(HEIGHT/11)/2,
                   width: (HEIGHT/11)-(HEIGHT/11)/2 }}>
                    <Text style={{fontSize:22,textAlign:'center', color:'#fff',fontFamily:'Quicksand-Bold',}}>{First_char}</Text>
                  </View>
                  <Text numberOfLines={2}  style={{fontFamily:'Quicksand-Medium',marginRight:10,width:80+'%', fontSize:16, color:'#000',padding:4, marginLeft:10}}>{item.chapter_name}</Text>
                  </View>
                <TouchableOpacity
                 onPress={()=> this.deleteChapter(item)}
                 style={{padding:4,}}
                >
                <Icon name="trash-alt" size={20} color="#f70000"/>
                </TouchableOpacity>

                   

            </TouchableOpacity>
        )
      }
      
      deletepdf(item) {

        Alert.alert(
            'Are you sure?',
            'This will remove this file!',
            [
            
            {text: 'Cancel', onPress: () =>{}},
            {text: 'Remove', onPress: () => this.props.deletepdftoUncatagorisedinChapter(item, this.state.subject_name)},
            ],
            { cancelable: true }
        )
        }
      
        deletenotes(item) {

          Alert.alert(
              'Are you sure?',
              'This will remove these photos!',
              [
              
              {text: 'Cancel', onPress: () =>{}},
              {text: 'Remove', onPress: () => {
                this.setState({onLongPressOnPhoto:false, })
                this.props.deletenotestoUncatagorisedinChapter(this.state.selectedPhotoUri, this.state.subject_name)
                //this.setState({selectedPhotoUri:false, })
                let expirationDate = this.props.auth.DeleteNotesfromUncatagorisedinSubjectAdExpiraion;
                let date = new Date(expirationDate)
                if(!date || new Date() > date){
            
                myDate = new Date(
                    new Date().getTime() + (5*60*1000)
                )
                //324550781538284_324677744858921===DeletepdfinChapterInterstitial
                  this.props.setAdTimeForDeleteNotestoUncatagorisedInSubject(myDate)
                InterstitialAdManager.showAd('324550781538284_324677744858921')
                .then(didClick => {console.log('clicked')})
                .catch(error => {console.log('err', error)});
               
                }
              }},
              ],
              { cancelable: true }
          )
          }

      _renderPDF=(item, index)=> {
        
        //console.log('item is ', item)
        return (
          <TouchableOpacity activeOpacity={0.9}  onPress={()=> {this.setState({showPDF:true, pdfUri:{uri: item.fileUri}}) }} style={{marginTop:10, marginHorizontal:10, backgroundColor:'#fff', padding:6, flexDirection:'row',justifyContent:'space-between', alignItems:'center', width:WIDTH-20, borderRadius:8,marginBottom:4, elevation:4}}>
                     <View style={{alignItems:'center', flexDirection:'row',}}>
                     <Icon name="file-pdf" style={{padding:7}} size={26} color="#ff0000"/>
                      <View style={{marginLeft:10, marginRight:5}}>
                      <Text numberOfLines={1} style={{fontFamily:'Quicksand-Medium',padding:7, fontSize:14, color:'#000',}}>{item.fileName}</Text>
                      
                      </View>
                     </View>
                     <View style={{alignItems:'center', justifyContent:'space-around', flexDirection:'row'}}>
                     <TouchableOpacity
                     activeOpacity={0.9}
                      onPress={()=>{
                        this.setState({fileToShare:item.fileUri}, ()=> {
                          Share.open({
                            url: this.state.fileToShare,
                            subject: "Share Link" //  for email
                          });
                        })
                       
                      }}
                     style={{backgroundColor:'#fff', elevation:5, borderRadius:100, alignItems:'center', justifyContent:'center', marginRight:5}}>
                     <FontAwesome name="share-alt" color="#0073ff" style={{padding:7}} size={22}/>
                     </TouchableOpacity>
                       <TouchableOpacity
                       onPress={()=> this.deletepdf(item.fileUri)}
                       style={{backgroundColor:'#fff', elevation:5, borderRadius:100, alignItems:'center', justifyContent:'center'}}>
                       <Icon name="trash-alt" color="#ff0000" style={{padding:7}} size={20}/>

                       </TouchableOpacity>
                     </View>
                      

                      
            </TouchableOpacity>
        )
      }

  render() {

    
    if(this.state.showPDF){
      console.log(this.state.showPDF)
      BackHandler.addEventListener('hardwareBackPress', ()=> {
       // console.log('0000000000000000')
        this.setState({showPDF: false})
        //console.log('back')
       // console.log(this.state.showPDF)
        return true
      })  
    }
    else if(this.state.showPDF==false){
      BackHandler.addEventListener('hardwareBackPress', ()=> {
        //console.log('fffffffffffffffff')
        //this.setState({showPDF: false})
        //console.log('back')
        this.props.navigation.pop()
        //console.log(this.state.showPDF)
        return true
      })
    }
    
    const images = [];
    const imageURLs=[]
    this.props.auth.singleSubject.uncatagorised_note.photos.map(image=> {
       if(image.length >=1){
         //console.log(image)
        return image.map(image=> {
         // console.log(image)
          images.push(image)
        imageURLs.push({
           source:{
             uri:image.path
           },
         })
        })
       }
      //  else {
      //    //console.log(image)
      //    images.push(image)
      //    imageURLs.push({
      //     source:{
      //       uri:image.path
      //     },
           
      //    })
         
      //  }
      
    })

    
    const chapters = this.props.auth.singleSubject.chapter.map(chapter=> {
      return chapter
    })
    

    return (
      <View style={{flex:1}}> 

      {/*********************************HEADER*********************************** */}
        <View style={{backgroundColor:'transparent',flexDirection: 'row', borderBottomLeftRadius:15, borderBottomRightRadius:15,overflow:'hidden', flex:1}}>
         <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{width: 100 + '%', height: 100 +'%',}}  start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
         <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',justifyContent:'center', paddingHorizontal:20}}>
             {/* <FontAwesome style={{position:"absolute",marginTop:20, left:20, zIndex:100000}} name="chevron-circle-left" size={26} color="#fff" onPress={()=> this.props.navigation.goBack()}/> */}
             <View> 
             <Text numberOfLines={1} style={{fontSize:24, fontFamily:'Quicksand-Bold',textAlign:'center' ,color:'#fff',}}>NotesMate</Text>
             </View>
             </View>
          </LinearGradient> 
         </View>
         {
                   this.props.auth.singleSubject.uncatagorised_note.photos.length <= 0 ? (
                     null 
                   ) :(
                    
                      this.state.onLongPressOnPhoto ? (
                        <View style={{alignItems:'center',backgroundColor:'#424242', justifyContent:'space-between', elevation:6,width:WIDTH, flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#424242',  zIndex:4040000, paddingHorizontal:20}}>
                      <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
      
                      <View style={{alignItems:'center', justifyContent:'center', padding:5,}}>
                      <FontAwesome style={{}} name="times" size={26} color="#fff" onPress={()=> {this.setState({onLongPressOnPhoto:false, selectedPhotoUri:[]})}}/>
                      </View>
                      <View style={{alignItems:'flex-start',justifyContent:'flex-start', padding:10, width:WIDTH/2,}}>
                        <Text numberOfLines={1} style={{fontSize:16,marginLeft:5, fontFamily:'Quicksand-Medium',textAlign:'center' ,color:'#fff',}}>{this.state.selectedPhotoUri.length} item selected</Text>
                      </View>
                      </View>
      
                      <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row',}}>
                      <TouchableOpacity activeOpacity={0.8} 
                      onPress={()=>{  
                         Share.open({
                          urls: this.state.selectedPhotoUri,
                          subject: "Share Link" //  for email
                         });
                        // console.log('sharing...')
                         }} 
                      style={{alignItems:'center', justifyContent:'center', padding:10,marginLeft:5}}>
                      <FontAwesome style={{}} name="share-alt" size={26} color="#fff"  />
                      </TouchableOpacity>
                      <View style={{alignItems:'center', justifyContent:'center', padding:10,marginLeft:5}}>
                      <Icon style={{}} name="trash-alt" size={26} color="#fff" onPress={()=> {this.deletenotes() }  }/>
                      </View>
                      </View>
                      
                      
                    </View>
                      ) :(
                        null
                      )
                    
                   )
              }

      {/********************************MAIN BODY************************************* */}

          <View style={{flex:10, backgroundColor:'#fff'}}>
                <ScrollView >
                <View style={{alignItems:'center', justifyContent:'space-between', elevation:6,width:WIDTH, flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#f2f2f2', backgroundColor:'#fff'}}>
                <View style={{alignItems:'center', justifyContent:'flex-start',flexDirection:'row', width:77+'%',}}>

                <TouchableOpacity activeOpacity={0.99} 
                onPress={()=>  this.props.navigation.goBack() } 
                style={{alignItems:'center', justifyContent:'center', padding:10,marginLeft:10,}}>
                <FontAwesome style={{}} name="angle-left" size={26} color="#000" />
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center', padding:10,}}>
                  <Text numberOfLines={1} style={{fontSize:18,marginLeft:5, fontFamily:'Quicksand-Medium',textAlign:'center' ,color:'#000',}}>{this.props.auth.singleSubject.subject_name}</Text>
                </View>

                </View>

                <TouchableOpacity activeOpacity={0.99} onPress={()=> {this.setState({isEditSubjectModalVisible:true})}}
                 style={{alignItems:'center', justifyContent:'center', padding:10,marginLeft:20,}}>
                <FontAwesome style={{}} name="edit" size={26} color="#0073ff" />
                </TouchableOpacity>
               
                
              </View>
              <View style={{marginTop:20}}>
              <View style={{ paddingHorizontal:20, backgroundColor:'#f5f5f5', padding:4}}>
                            <Text style={{fontFamily:'Quicksand-Bold', fontSize:16, color:'#000',}}>Chapter/Catagory :</Text>
                        </View>

              {
                          this.props.auth.singleSubject.chapter <=0  ? (
                            <View style={{alignItems:'center',marginTop:10, justifyContent:'center'}}>
                            <Text style={{fontFamily:'Quicksand-Regular', fontSize:14, color:'#333',}}>No chapter added yet!</Text>
                            
                            <TouchableOpacity activeOpacity={0.8} 
                            onPress={()=> this.setState({isChapterModalVisible:true})}
                             style={{marginTop:10, marginBottom:10,margin:'auto',alignItems:'center', justifyContent:'center',padding:3, alignSelf:'center', width:30+'%'}}>
                            <LinearGradient colors={['#00aaff', '#0073ff']} style={{borderRadius:11, width:100+'%'}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}} >
                            <Text style={{color:'#fff', padding:6,fontSize:14,textAlign:'center', fontFamily:'Quicksand-Medium'}}>Add now</Text>
                            </LinearGradient>
                            
                        </TouchableOpacity>
                        </View>
                          ): (
                            <View>
                               <FlatList
                                  data={chapters}
                                  
                                  renderItem={({item, index}) => this._renderItem(item, index)}
                                  keyExtractor={(item, index)=> index.toString()}
                                  ListFooterComponent={()=> {
                                      return (
                                        <TouchableOpacity activeOpacity={0.8} 
                                          onPress={()=> this.setState({isChapterModalVisible:true})}
                                          style={{marginTop:10, marginBottom:10,margin:'auto',alignItems:'center', justifyContent:'center',padding:3, alignSelf:'center', width:30+'%'}}>
                                          <LinearGradient colors={['#00aaff', '#0073ff']} style={{borderRadius:11, width:100+'%'}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}} >
                                          <Text style={{color:'#fff', padding:6,fontSize:14,textAlign:'center', fontFamily:'Quicksand-Medium'}}>Add more</Text>
                                          </LinearGradient>
                                          
                                      </TouchableOpacity>
                                      )
                                  }}
                              />
                            </View>
                          )
                        }
                  <View style={{marginTop:10, }}>
                       <View style={{ paddingHorizontal:20,backgroundColor:'#f5f5f5', padding:4}}>
                            <Text style={{fontFamily:'Quicksand-Bold', fontSize:16, color:'#000',}}>Uncatagorised :</Text>
                      </View>
                     
                     
                      {/*************************************************************************************************************************************************************************************************************************************************photos*******************************************************************************************************************************************/}
              <View style={{marginTop:10}}>
              <TouchableOpacity
              
              activeOpacity={0.85} onPress={this.state.showPhotos ? ()=> {
                this.setState({showPhotos: false})
              } : ()=> {
               
                this.setState({showPhotos:true})
              }} 
              style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20, backgroundColor:'#f5f5f5', padding:4, alignItems:'center'}}
              >
              <Text style={{fontFamily:'Quicksand-Bold', fontSize:14, color:'#000',}}>Photos</Text>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity  onPress={()=> this.selectphoto()} style={{borderRadius:20, borderColor:'#0073ff', borderWidth:2, marginRight:10}}>
                <Text style={{fontFamily:'Quicksand-Medium', fontSize:12, color:'#0073ff',paddingHorizontal:5}}>Import</Text>

                </TouchableOpacity>
              <FontAwesome name={this.state.showPhotos? "angle-down" : "angle-right"} size={22} color="#000" />

              </View>
              </TouchableOpacity>
              {
                this.state.showPhotos == true ? (
                  <View>
                      {
                this.props.auth.singleSubject.uncatagorised_note.photos.length <= 0 ? (
                  <View>

                  </View>
                ) :( 
                  <View style={{margin:'auto',alignItems:'center', justifyContent:'center',
                  marginHorizontal:(WIDTH-((WIDTH/3.1)*3))/2, width:WIDTH }}>
                 
                   <View style={{alignItems:'center', justifyContent:'flex-start',margin:'auto', flexDirection:'row', flexWrap:'wrap', width:WIDTH,}}>
                    {imageURLs.map((image, index) =>{
                    const randomNum = (Math.floor(Math.random() * 1000) + index).toString()
                    if(this.state.selectedPhotoUri.includes(image.source.uri)){

                        return (
                          <TouchableOpacity
                          activeOpacity={0.9}
                          key={image.source.uri+randomNum}
                          onPress={()=> {
                          if(this.state.onLongPressOnPhoto){
                           let index = this.state.selectedPhotoUri.indexOf(image.source.uri);
                           if(index > -1){
                            this.state.selectedPhotoUri.splice(index, 1);
                            this.setState({changeState:100})
                           // console.log('deleted uri==', this.state.selectedPhotoUri)
                            if(this.state.selectedPhotoUri.length <=0){
                               this.setState({onLongPressOnPhoto:false})
                              this.setState({changeState:120})
                            }
                           }
                           if(this.state.selectedPhotoUri.length <=0){
                              this.setState({onLongPressOnPhoto:false})
                            this.setState({changeState:120})
                          }
                         
                          }
                          }} >
                           <View style={{backgroundColor:'rgba(255, 255, 255,0.3)', position:'absolute', top:0, left:0, right:0, bottom:0, alignItems:'center',zIndex:1000000, justifyContent:'center', borderColor:'#0073ff', borderWidth:3}}>
                            <View style={{height:( WIDTH/3.1)/2.5, width: ( WIDTH/3.1)/2.5, borderRadius:(( WIDTH/3.1)/2.5)/2, backgroundColor:'#0073ff', borderColor:'#fff',borderWidth:2,zIndex:10000001, alignItems:'center', justifyContent:'center'}}>
                            <FontAwesome name="check" size={24} color="#fff" />
                            </View>
                            </View>
                          <Image 
                          style={{width:WIDTH/3.1, height: WIDTH/3.1, borderWidth:3, borderColor:'#0073ff'}}
                           source={image.source}
                           resizeMode="cover"
                          />
                        </TouchableOpacity>
                        )
                       
                    } else {
                    
                      return (
                        <TouchableOpacity
                        activeOpacity={0.9}
                        key={image.source.uri+randomNum}
                        onPress={() => {
                          if(this.state.onLongPressOnPhoto){
                           let index = this.state.selectedPhotoUri.indexOf(image.source.uri);
                           if(index > -1){
                            this.state.selectedPhotoUri.splice(index, 1);
                            this.setState({changeState:100})
                          
                           }
                           if(this.state.selectedPhotoUri.length <=0){
                              
                            this.setState({onLongPressOnPhoto:false})
                            this.setState({changeState:120})
                          }
                          else {
                                this.state.selectedPhotoUri.push(image.source.uri)
                                this.setState({changeState:15})   
                              }  
                          } 
                         else {
                           this.setState({
                              imageIndex: index,
                              isImageViewVisible: true,
                              changeState:4
                          })}
                            }}
                         //delayLongPress={100}
                        onLongPress={()=> 
                        {
                          this.setState({onLongPressOnPhoto:true})
                          this.state.selectedPhotoUri.push(image.source.uri)
                          this.setState({changeState:3})
                        
                        }}
                        >
                          <Image 
                          style={{width:WIDTH/3.1, height: WIDTH/3.1, borderWidth:2, borderColor:'#fff'}}
                           source={image.source}
                           resizeMode="cover"
                          />
                        </TouchableOpacity>
                      )
                    }
                  
                  }
                    )}
                </View>
                <ImageView
                    glideAlways
                    images={imageURLs}
                    imageIndex={this.state.imageIndex}
                    animationType="fade"
                    isVisible={this.state.isImageViewVisible}
                   // renderFooter={this.renderFooter}
                    onClose={() => this.setState({isImageViewVisible: false})}
                />
               </View>
                  
                  
                )
              }
                     <TouchableOpacity activeOpacity={0.8} 
                          onPress={()=> this.selectphoto()}
                          style={{marginTop:20,margin:'auto',alignItems:'center', justifyContent:'center',padding:3, alignSelf:'center',marginBottom:20}}>
                          <LinearGradient colors={['#00aaff', '#0073ff']} style={{borderRadius:11, width:100+'%'}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}} >
                          <Text style={{color:'#fff',paddingHorizontal:20, padding:6,fontSize:14,textAlign:'center', fontFamily:'Quicksand-Medium'}}>Import photos from gallary</Text>
                          </LinearGradient>
                                          
                      </TouchableOpacity>
                      {/* <TouchableOpacity activeOpacity={0.8} 
                        onPress={()=> this.launchCamera()}
                        style={{marginTop:10, marginBottom:10,margin:'auto',alignItems:'center', justifyContent:'center',padding:3, alignSelf:'center',paddingHorizontal:20}}>
                        <LinearGradient colors={['#00aaff', '#0073ff']} style={{borderRadius:11, width:100+'%'}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}} >
                        <Text style={{color:'#fff',paddingHorizontal:20, padding:6,fontSize:14,textAlign:'center', fontFamily:'Quicksand-Medium'}}>Launch Camera</Text>
                        </LinearGradient>
                                        
                    </TouchableOpacity> */}

                  </View>
                  
                ):(
                 null
                )
              }
              </View>
              <View style={{ alignItems:'center', width:WIDTH,}}>
                <Text  style={{color:'#000',marginHorizontal:10, padding:2,fontSize:12,fontFamily:'Quicksand-Bold'}}>NOTE: NotesMate only stores the location of the files or images, so if you delete the files or images from your device, these will be deleted from here too!</Text>
              </View>
               {/*************************************************************************************************************************************************************************************************************************************************document*******************************************************************************************************************************************/}
               <View style={{marginTop:20}}>
              <TouchableOpacity activeOpacity={0.85} onPress={this.state.showDocument ? ()=> {
                this.setState({showDocument: false})
              } : ()=> {
                this.setState({showDocument:true})
              }} 
              style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20, backgroundColor:'#f5f5f5', padding:4}}
              >
              <Text style={{fontFamily:'Quicksand-Bold', fontSize:14, color:'#000',}}>Documents</Text>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity
                onPress={()=> this.selectpdf()}
                style={{borderRadius:20, borderColor:'#0073ff', borderWidth:2, marginRight:10}}>
                <Text style={{fontFamily:'Quicksand-Medium', fontSize:12, color:'#0073ff',paddingHorizontal:5}}>Import</Text>

                </TouchableOpacity>
              <FontAwesome name={this.state.showDocument? "angle-down" : "angle-right"} size={22} color="#000" />

              </View>

              </TouchableOpacity>
              {
                this.state.showDocument == true ? (

                  <View>
                     {
                this.props.auth.singleSubject.uncatagorised_note.documents.length <= 0 ? (
                  <View>

                  </View>
                ) :( 
                  <View style={{margin:'auto',alignItems:'center', justifyContent:'center' }}>
                    <FlatList
                          data={this.props.auth.singleSubject.uncatagorised_note.documents}
                          renderItem={({item, index}) => this._renderPDF(item, index)}
                          keyExtractor={(item, index)=> index.toString()}
                         
                      />
                      
                 </View>
                  
                  
                )
              }

              <TouchableOpacity activeOpacity={0.8} 
                  onPress={()=> this.selectpdf()}
                  style={{marginTop:10, marginBottom:10,margin:'auto',alignItems:'center', justifyContent:'center',padding:3, alignSelf:'center',}}>
                  <LinearGradient colors={['#00aaff', '#0073ff']} style={{borderRadius:11, width:100+'%'}}  start={{x: 0.2, y: 0.2}} end={{x: 0.6, y: 0.6}} >
                  <Text style={{color:'#fff',paddingHorizontal:20, padding:6,fontSize:14,textAlign:'center', fontFamily:'Quicksand-Medium'}}>Import a PDF file</Text>
                  </LinearGradient>
                                  
              </TouchableOpacity>
              

                  </View>

                 
                ):(
                 null
                )
              }
              </View>
             <View style={{marginBottom:50}}>

             </View>

                  </View>
                  
                     
              </View>
              
                </ScrollView>

               
{/*                   
                  <View style={{marginTop:10,}}>
            <BannerView
                placementId="324550781538284_324678978192131"
                type="standard"
               onPress={() => console.log('click')}
                onError={err => console.log('error', err)}
              />
            </View> */}
               
                <Modal isVisible={this.state.isChapterModalVisible} 
          animationIn='slideInUp'
          animationOut='slideOutDown'
          hideModalContentWhileAnimating ={true}
          animationInTiming={200}
          onBackButtonPress={()=> this.setState({isChapterModalVisible:false})}
        >
        <View style={{backgroundColor:'#fff', width:WIDTH-50,alignSelf:'center',borderRadius:20, overflow:'hidden'}}>
                <View style={{backgroundColor:'#0073ff', height:50, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontFamily:'Quicksand-Medium', color:'#fff'}} >Add Chapter/Catagory</Text>
                </View>
                <View style={{marginTop:30, paddingHorizontal:10}}>
                <TextInput 
                        selectionColor="#0073ff"
                        numberOfLines={1}
                        underlineColorAndroid="#0073ff"
                        value={this.state.chapter_name}
                        editable={true}
                        onChangeText={(text)=> this.setState({chapter_name:text})}
                        style={{fontFamily:'Quicksand-Medium', fontSize:14, color:'#333'}}
                         />
                </View>
                <View style={{ flexDirection:'row', marginBottom:20,marginTop:30, justifyContent:'space-around'}}>
                <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#bdc3c7'}} onPress={()=> {
                 
                  this.setState({isChapterModalVisible:false})}}>
                  <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Cancel</Text>
                </TouchableOpacity>
              <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={()=> {
               this.props.addChapter(this.state)
                
                 this.setState({isChapterModalVisible:false})}}>
                <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Save</Text>
              </TouchableOpacity>
            </View>
        </View>
        </Modal>

        {/******************************Modal for subject editing************************* */}
        <Modal isVisible={this.state.isEditSubjectModalVisible} 
          animationIn='slideInUp'
          animationOut='slideOutDown'
          hideModalContentWhileAnimating ={true}
          animationInTiming={200}
          onBackButtonPress={()=> this.setState({isEditSubjectModalVisible:false})}
        >
        <View style={{backgroundColor:'#fff', width:WIDTH-50,alignSelf:'center',borderRadius:20, overflow:'hidden'}}>
                <View style={{backgroundColor:'#0073ff', height:50, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, fontFamily:'Quicksand-Medium',color:'#fff'}} >Edit Subject/Catagory name</Text>
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
                 
                  this.setState({isEditSubjectModalVisible:false})}}>
                  <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Cancel</Text>
                </TouchableOpacity>
              <TouchableOpacity style={{alignItems:"center",padding:5,width:30+'%', borderRadius:10, justifyContent:'center', backgroundColor:'#0073ff'}} onPress={()=> {
               this.props.editSubject(this.state.subject_name, this.state.prev_subject_name)
                
                 this.setState({isEditSubjectModalVisible:false})}}>
                <Text style={{fontFamily:'Quicksand-Medium', fontSize:18, color:'#fff'}}>Save</Text>
              </TouchableOpacity>
            </View>
        </View>
        </Modal>
          </View>
                  
        {
          this.state.showPDF ? (
            <View style={styles.container}>
              <Pdf
                    source={this.state.pdfUri}
                    
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>
            </View>
          ):(
            null
          )
        }
 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      position:'absolute',
      top:0,
      left:0,
      bottom:0,
      right:0,
      
      alignItems: 'center',
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
  }
});


const mapStateToProps = (state)=> {
    return {
      auth: state.auth
    }
  }
  


export default connect(mapStateToProps,{addChapter,deleteChapter, addnotestoUncatagorisedinChapter, addpdftoUncatagorisedinChapter, deletenotestoUncatagorisedinChapter, deletepdftoUncatagorisedinChapter, editSubject , getSingleChapter, setAdTimeForAddNotestoUncatagorisedInSubject, setAdTimeForDeleteNotestoUncatagorisedInSubject})(SubScreen)

