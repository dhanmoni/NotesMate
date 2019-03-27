import React, { Component } from 'react'
import { Text, View,StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, FlatList,Alert, CameraRoll,ToastAndroid, BackHandler } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from 'react-native-image-crop-picker';
import {addName, addSubject, deleteSubject, addnotestoUncatagorised, addPdftoUncatagorised, deletenotesFromUncatagorised, deletepdfFromUncatagorised, setAdTimeForAddPdftoUncatagorised, setAdTimeForAddNotestoUncatagorised, removeLoading, deleteNoUrlNotesFromUncatagorised} from '../redux/action/mainAction'
import {connect} from 'react-redux'
import {
  DocumentPicker,
  DocumentPickerUtil,
} from 'react-native-document-picker';
import Share, {ShareSheet, Button} from 'react-native-share';
import Pdf from 'react-native-pdf';
import ImageView from 'react-native-image-view';
import RNFetchBlob from 'rn-fetch-blob'
 
import { BannerView, InterstitialAdManager  } from 'react-native-fbads'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
class UnCatagorised extends Component {
    static navigationOptions = {
        header: null, 
      }
      constructor(){
        super();
        this.state={
          showPhotos:true,
          showDocument:true,
          photos:null,
          pdf:null,
          fileUri:'',
          pdfUri:null,
          showPDF:false,
          imageIndex:0,
          isImageViewVisible:false,
          fileToShare:null,
          onLongPressOnPhoto:false,
          selectedPhoto:[],
          selectedPhotoUri:[],
          changeState:0,
         // sharePhotoUrl:[],
         existsPDF: [],
         loading:false,
         NotexistsNotes:[],
        }
      
      }

      selectphoto(){
        ImagePicker.openPicker({
          multiple: true,
          //includeBase64: true,
          mediaType:'photo',
          avoidEmptySpaceAroundImage:false
         // includeBase64:true
        }).then(images => {
          // console.log('========++++++++++++++++++++++++++++++++=======')
          // console.log(images)
          // console.log('5555555555555555555555555555555555')
          // const localImageUrl =  URL.createObjectURL(images[0].data);
          // console.log(localImageUrl)
          this.setState({photos: images}, ()=> {
            this.props.addnotestoUncatagorised(this.state.photos)
            let expirationDate = this.props.auth.AddNotestoUncatagorisedAdExpiraion;
            let date = new Date(expirationDate)
            if(!date || new Date() > date){

            myDate = new Date(
                new Date().getTime() + (4*60*1000)
            )
            //BackFromSubScreenInterstitial ==324550781538284_324673918192637
              this.props.setAdTimeForAddNotestoUncatagorised(myDate)
            InterstitialAdManager.showAd('324550781538284_324673918192637')
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
      //     this.setState({photos: images}, ()=> {
      //      // console.log('image===', images)
      //       this.props.addnotestoUncatagorised(this.state.photos)
      //       let expirationDate = this.props.auth.AddNotestoUncatagorisedAdExpiraion;
      //       //console.log('exp===', expirationDate)
      //       //console.log(new Date())
      //       let date = new Date(expirationDate)
      //       //console.log('date==', date)
      //       if(!date || new Date() > date){
      //        // console.log('setting time', expirationDate)
      //       date = new Date(
      //           new Date().getTime() + (4*60*1000)
      //       )
      //         this.props.setAdTimeForAddNotestoUncatagorised(date)
      //       InterstitialAdManager.showAd('324550781538284_324673918192637')
      //       .then(didClick => {console.log('clicked')})
      //       .catch(error => {console.log('err', error)});
      //       // console.log(date)
      //       // console.log('=======')
            
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
              RNFetchBlob.fs.stat(res.uri)
              .then((stats) => {
               
              this.setState({
                pdf:{
                  fileUri: 'file://'+ stats.path,
                  fileType: stats.type,
                  fileName: stats.filename,
                  fileSize: stats.size ,
                  fileKey: stats.path+'DATE:'+ Date.now()
                },
                },()=> {
                  this.props.addPdftoUncatagorised(this.state.pdf)
                
                 
                  let expirationDate = this.props.auth.AddPdftoUncatagorisedAdExpiraion;
                  let date = new Date(expirationDate)
                  if(!date || new Date() > date){

                  myDate = new Date(
                      new Date().getTime() + (3*60*1000)
                  )
                  this.props.setAdTimeForAddPdftoUncatagorised(myDate)
                //324550781538284_324676158192413==InterstitialAfterImportPDFinUncatagoried
                  InterstitialAdManager.showAd('324550781538284_324676158192413')
                  .then(didClick => {console.log('clicked')})
                  .catch(error => {console.log('err', error)});
                
                  }
                 // console.log('state pdf=', this.state.pdf)
                });
                this.setState({fileUri:'file://'+stats.path})
              })
              .catch((err) => {console.log(err)})
              
             
       
              // console.log('res : ' + JSON.stringify(res));
              // console.log('URI : ' + res.uri);
              // console.log('Type : ' + res.type);
              // console.log('File Name : ' + res.fileName);
              // console.log('File Size : ' + res.fileSize);
            } catch (error) {
              ToastAndroid.show('Nothing imported!', ToastAndroid.SHORT)
              console.log(error)
            }
            
            
          }
          
        );
      }

      deletepdf(item) {

        Alert.alert(
            'Are you sure?',
            'This will remove this file!',
            [
            
            {text: 'Cancel', onPress: () =>{}},
            {text: 'Remove', onPress: () => this.props.deletepdfFromUncatagorised(item)},
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
                this.setState({onLongPressOnPhoto:false}, ()=> {
                  this.props.deletenotesFromUncatagorised(this.state.selectedPhotoUri)
                  this.setState({selectedPhotoUri:[]})
                })
               
              }},
              ],
              { cancelable: true }
          )
          }
       
         
          componentWillMount(){

            let imageTobeDeleted=[]

            this.props.auth.uncatagorised_photos.map(image=> {
              if(image.length >=1){
        
      
                return image.map(image=> {
                  RNFetchBlob.fs.exists(image.path)
                  .then((data) => {
                   
                    if(data === false){
                      imageTobeDeleted.push({
                        uri:image.path,
                        key:image.path +'DATE:'+ image.modificationDate
                      })
                      this.props.deletenotesFromUncatagorised(imageTobeDeleted)
                     
                    } else {
                      console.log('image exists')
                   
                     
                    }
                  }) 
                }
                )
               }
               else {
        
                RNFetchBlob.fs.exists(image.path)
                  .then((data) => {
                   
                    if(data === false){
                      imageTobeDeleted.push({
                        uri:image.path,
                        key:image.path +'DATE:'+ image.modificationDate
                      })
                      this.props.deletenotesFromUncatagorised(imageTobeDeleted)
                     
                    } else {
                      console.log('image exists here too')
                   
                     
                    }
                  }) 
                  
                }
            })

            this.props.auth.uncatagorised_documents.map(item=> {
          
             
              if(item !== null){
                RNFetchBlob.fs.exists(item.fileUri)
                .then((data) => {
                 
                  if(data === false){
                    this.props.deletepdfFromUncatagorised(item.fileKey)
                   
                  } else {
                    console.log('file exists')
                 
                   
                  }
                })  
              }
             
            })
    
            
          }
      
      _renderPDF=(item, index)=> {
        
        

        console.log('the pdf exists')
        
        return (
          <TouchableOpacity activeOpacity={0.9}  onPress={()=> {this.setState({showPDF:true, pdfUri:{uri: item.fileUri}}) }} style={{marginTop:10, backgroundColor:'#fff', padding:6, flexDirection:'row',justifyContent:'flex-start', alignItems:'center',width:WIDTH-20, borderRadius:8,marginBottom:4, elevation:4}}>
                <View style={{justifyContent:'space-between',flexDirection:'row', alignItems:'center',}}>

                  
                   <View style={{alignItems:'center', flexDirection:'row',padding:0, margin:0,  justifyContent:'flex-start', width:77+'%', overflow:'hidden',}}>
                     <Icon name="file-pdf" style={{padding:7}} size={26} color="#ff0000"/>
                      <View style={{marginLeft:2,justifyContent:'flex-start', width: 85+'%'}}>
                      <Text numberOfLines={1} style={{fontFamily:'Quicksand-Medium',padding:7, fontSize:14, color:'#000'}}>{item.fileName}</Text>
                      
                      </View>
                     </View>
                     <View style={{alignItems:'center', flexDirection:'row',marginRight:5}}>
                     <TouchableOpacity
                     activeOpacity={0.9}
                      onPress={()=>{
                        console.log('file uri==')
                        console.log(item)
                        this.setState({fileToShare:item.fileUri}, ()=> {
                          Share.open({
                            url: this.state.fileToShare,
                            subject: "Share Link" //  for email
                           });
                        })
                       
                      }}
                     style={{backgroundColor:'#fff', elevation:5, borderRadius:100, alignItems:'center', justifyContent:'center',marginRight:5}}>
                     <FontAwesome name="share-alt" color="#0073ff" style={{padding:7}} size={22}/>
                     </TouchableOpacity>
                       <TouchableOpacity
                       onPress={()=> this.deletepdf(item.fileKey)}
                       style={{backgroundColor:'#fff', elevation:5, borderRadius:100, alignItems:'center', justifyContent:'center'}}>
                       <Icon name="trash-alt" color="#ff0000" style={{padding:7}} size={20}/>

                       </TouchableOpacity>
                     </View>

                </View>

                            

                      
            </TouchableOpacity>
        )
      }


  render() {

    
    
    
  
    const images = [];
    const imageURLs=[];
  

   

    this.props.auth.uncatagorised_photos.map(image=> {
      
       
      if(image.length >=1){
        
      
        return image.map(image=> {

            console.log('it exists')
            images.push(image)
            imageURLs.push({
               source:{
                uri:image.path,
                 key:image.path +'DATE:'+ image.modificationDate
               },
               
             })
             
          
        }
        )
       }
       else {
        
       
         console.log('it exists here too')
        images.push(image)
        imageURLs.push({
         source:{
           uri:image.path,
           key:image.path +'DATE:'+ image.modificationDate
         },
          
        })
       
       }
      
    })

    
   

   

let sharePhotoUrl=[]

    this.state.selectedPhotoUri.map(item=> {
      
     
     sharePhotoUrl.push(item.uri)
        
    })



    return (
      <View style={{flex:1}}> 
        <View style={{backgroundColor:'transparent',flexDirection: 'row', borderBottomLeftRadius:15, borderBottomRightRadius:15,overflow:'hidden', flex:1}}>
         <LinearGradient  colors={['#00c6ff', '#0073ff']} style={{width: 100 + '%', height: 100 +'%',}}  start={{x: 0.1, y: 0.1}} end={{x: 0.5, y: 0.5}} >
         <View style={{flexDirection:'row', alignItems:'center',width: 100 + '%', height: 100 +'%',justifyContent:'center', paddingHorizontal:20}}>
             {/*  */}
             <View> 
             <Text numberOfLines={1} style={{fontSize:24, fontFamily:'Quicksand-Bold',textAlign:'center' ,color:'#fff',}}>NotesMate</Text>
             </View>
           
                 
             </View>
          
 
         </LinearGradient> 
         </View>
         {
                   this.state.selectedPhotoUri.length <= 0 ? (
                     null 
                   ) :(
                    
                      this.state.onLongPressOnPhoto ? (
                        <View style={{alignItems:'center',backgroundColor:'#424242', justifyContent:'space-between', elevation:6,width:WIDTH, flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#424242',  zIndex:4040000, paddingHorizontal:10}}>
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
                          urls: sharePhotoUrl,
                          subject: "Share Link" //  for email
                         });
                         console.log('sharing...')
                         console.log(sharePhotoUrl)
                         }} 
                      style={{alignItems:'center', justifyContent:'center', padding:10,marginLeft:5}}>
                      <FontAwesome style={{}} name="share-alt" size={26} color="#fff"  />
                      </TouchableOpacity>
                      <View style={{alignItems:'center', justifyContent:'center', padding:10,marginLeft:5}}>
                      <Icon style={{}} name="trash-alt" size={26} color="#fff" onPress={()=> {
                       this.deletenotes()
                       }}/>
                      </View>
                      </View>
                      
                      
                    </View>
                      ) :(
                        null
                      )
                    
                   )
              }
          <View style={{flex:10, backgroundColor:'#fff'}}>
            <ScrollView >
              <View style={{alignItems:'center', justifyContent:'flex-start', elevation:6,width:WIDTH, flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#f2f2f2', backgroundColor:'#fff'}}>
                <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                  this.props.navigation.goBack()
                  }} style={{alignItems:'center', justifyContent:'center', padding:10,marginLeft:10}}>
                <FontAwesome style={{}} name="angle-left" size={26} color="#000"/>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center', padding:10}}>
                  <Text style={{fontSize:20,marginLeft:10, fontFamily:'Quicksand-Medium',textAlign:'center' ,color:'#000',}}>Uncatagorised</Text>
                </View>
                
              </View>
              
             
              {/*************************************************************************************************************************************************************************************************************************************************photos*******************************************************************************************************************************************/}
              <View style={{marginTop:20}}>
              <TouchableOpacity
              
              activeOpacity={0.85} onPress={this.state.showPhotos ? ()=> {
                this.setState({showPhotos: false, changeState:876})
              } : ()=> {
               
                this.setState({showPhotos:true, changeState:166})
              }} 
              style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20, backgroundColor:'#f5f5f5', padding:4, alignItems:'center'}}
              >
              <Text style={{fontFamily:'Quicksand-Bold', fontSize:16, color:'#000',}}>Photos</Text>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity  onPress={()=> this.selectphoto()} style={{borderRadius:20, borderColor:'#0073ff', borderWidth:2, marginRight:10}}>
                <Text style={{fontFamily:'Quicksand-Bold', fontSize:13, color:'#0073ff',paddingHorizontal:5}}>Import</Text>

                </TouchableOpacity>
              <FontAwesome name={this.state.showPhotos? "angle-down" : "angle-right"} size={22} color="#000" />

              </View>
              </TouchableOpacity>
              {
                this.state.showPhotos == true ? (
                  <View>
                      {
                this.props.auth.uncatagorised_photos.length <= 0 ? (
                  <View>

                  </View>
                ) :( 
                  <View style={{margin:'auto',alignItems:'center', justifyContent:'center',
                  marginHorizontal:(WIDTH-((WIDTH/3.1)*3))/2, width:WIDTH }}>
                 
                   <View style={{alignItems:'center', justifyContent:'flex-start',margin:'auto', flexDirection:'row', flexWrap:'wrap', width:WIDTH,}}>
                  
                    {imageURLs.map((image, index) =>{
                
                      function objectPropInArray(list, prop, val) {
                        if (list.length > 0 ) {
                          for (i in list) {
                            if (list[i][prop] === val) {
                              return true;
                            }
                          }
                        }
                        return false;  
                      }
                    

                      const randomNum = (Math.floor(Math.random() * 1000) + index).toString()
                    if(objectPropInArray(this.state.selectedPhotoUri, 'key', image.source.key)){
                    
                        return (
                          <TouchableOpacity
                          activeOpacity={0.9}
                          key={image.source.key+ randomNum}
                          onPress={()=> {
                          if(this.state.onLongPressOnPhoto){
                          // let index = this.state.selectedPhotoUri.indexOf(image.source.key);
                           if(objectPropInArray(this.state.selectedPhotoUri, 'key', image.source.key)){
                            let filtered = this.state.selectedPhotoUri.filter(function(el) { return el.key != image.source.key; });
                           // console.log('filtered==', filtered)
                            this.setState({selectedPhotoUri: filtered ,changeState:100})
                            //console.log('deleted uri==', this.state.selectedPhotoUri)
                            if(this.state.selectedPhotoUri.length <=0){
                               this.setState({onLongPressOnPhoto:false})
                              this.setState({changeState:120})
                            }
                           }
                         else  if(this.state.selectedPhotoUri.length <=0){
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
                       
                    } 
                    
                    
                    else {
                   
                      return (
                        <TouchableOpacity
                        activeOpacity={0.9}
                        key={image.source.key + randomNum}
                        onPress={() => {
                          if(this.state.onLongPressOnPhoto){
                            let filtered = this.state.selectedPhotoUri.filter(function(el) { return el.key != image.source.key; });
                            //console.log('filtered==', filtered)
                           //let index = this.state.selectedPhotoUri.indexOf(image.source.key);
                           if(objectPropInArray(this.state.selectedPhotoUri, 'key', image.source)){
                            //this.state.selectedPhotoUri.splice(index, 1);
                            this.setState({selectedPhotoUri: filtered  ,changeState:100})
                          
                           }
                           else if(this.state.selectedPhotoUri.length <=0){
                              
                            this.setState({onLongPressOnPhoto:false})
                            this.setState({changeState:120})
                          }
                          else {
                          
                           
                                this.state.selectedPhotoUri.push(image.source)
                                 this.setState({changeState:15})   
                               // console.log('selected +++++++uris ==', this.state.selectedPhotoUri)
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
                          this.setState({onLongPressOnPhoto:true}, ()=> {
                            this.state.selectedPhotoUri.push(image.source)
                            this.setState({changeState:19870})
                            //console.log('state selected uris ==', this.state)
                           
                          })
                          this.setState({changeState:1000})
                        
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
                          <Text style={{color:'#fff',paddingHorizontal:20, padding:6,fontSize:14,textAlign:'center', fontFamily:'Quicksand-Medium'}}>Import photos from gallery</Text>
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
                <Text  style={{color:'#000',marginHorizontal:10, padding:2,fontSize:12,fontFamily:'Quicksand-Regular'}}>NOTE: NotesMate only stores the location of the files or images, so if you delete the files or images from your device, these will be deleted from here too!</Text>
              </View>
              {/*************************************************************************************************************************************************************************************************************************************************document*******************************************************************************************************************************************/}
              <View style={{marginTop:20}}>
              <TouchableOpacity activeOpacity={0.85} onPress={this.state.showDocument ? ()=> {
                this.setState({showDocument: false, changeState:89})
              } : ()=> {
                this.setState({showDocument:true, changeState:76})
              }} 
              style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20, backgroundColor:'#f5f5f5', padding:4}}
              >
              <Text style={{fontFamily:'Quicksand-Bold', fontSize:16, color:'#000',}}>Documents</Text>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity
                onPress={()=> this.selectpdf()}
                style={{borderRadius:20, borderColor:'#0073ff', borderWidth:2, marginRight:10}}>
                <Text style={{fontFamily:'Quicksand-Bold', fontSize:13, color:'#0073ff',paddingHorizontal:5}}>Import</Text>

                </TouchableOpacity>
              <FontAwesome name={this.state.showDocument? "angle-down" : "angle-right"} size={22} color="#000" />

              </View>

              </TouchableOpacity>
              {
                this.state.showDocument == true ? (

                  <View>
                     {
                this.props.auth.uncatagorised_documents.length <= 0 ? (
                  <View>

                  </View>
                ) :( 
                  <View style={{margin:'auto',alignItems:'center', justifyContent:'center' }}>
                    <FlatList
                          data={this.props.auth.uncatagorised_documents}
                          renderItem={({item, index}) => this._renderPDF(item, index)}
                          keyExtractor={(item, index)=> index.toString()}
                         
                      />
                      
                 </View>
                  
                  
                )
              }

              <TouchableOpacity activeOpacity={0.8} 
                  onPress={()=>{ 
                    this.selectpdf()}}
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
             <View style={{ marginTop:50, marginBottom:50}}>
             
             </View>
             
    

            </ScrollView>
            

          </View>
              
        {
          this.state.showPDF ? (
            <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.9} onPress={()=> {
              this.setState({showPDF:false})
            }} style={{position:'absolute',backgroundColor:'rgba(0,0,0,0.6)', top:10,right:10, alignItems:'center', justifyContent:'center', zIndex:10000, width:40, height:40, borderRadius:20, }}>
              <FontAwesome  name='times' size={20} style={{backgroundColor:'transparent'}} color='#fff'/>
            </TouchableOpacity>
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


const mapStateToProps = (state)=> {
  return {
    auth: state.auth
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
      zIndex:999,
      alignItems: 'center',
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
  }
});


export default connect(mapStateToProps,{addnotestoUncatagorised, addPdftoUncatagorised, deletepdfFromUncatagorised, deletenotesFromUncatagorised, setAdTimeForAddPdftoUncatagorised, setAdTimeForAddNotestoUncatagorised,deleteNoUrlNotesFromUncatagorised, removeLoading})(UnCatagorised)


// return (
//   <TouchableOpacity
//   style={{position:'relative'}}
//   activeOpacity={0.95}
//       key={image.source.uri+randomNum}
//       onPress={() => {
        
//         else {
//           console.log('it is not selecting')
//           this.setState({
//             imageIndex: index,
//             isImageViewVisible: true,
//             changeState:4
//         });
//         }
          
//       }}
       
//   >
   
//    {/* {

     
//  this.state.changeState ==1 || this.state.changeState ==3 &&  this.state.selectedPhoto.map(item=> item.source.uri === image.fileUri) ? (
      
//      ): (
//        null
//      )
//    } */}
 
//       <Image
//           style={{width:WIDTH/3.1,backgroundColor:'rgba(255, 255, 255, 0.3)', height: WIDTH/3.1, borderWidth:3, borderColor:'#0073ff'}}
//           source={image.source}
//           resizeMode="cover"
//       />
//   </TouchableOpacity>
// )





// return (
//   <TouchableOpacity
//   style={{position:'relative'}}
//   activeOpacity={0.95}
//       key={image.source.uri+randomNum}
     
       
//   >
   
//    {/* {

     
//  this.state.changeState ==1 || this.state.changeState ==3 &&  this.state.selectedPhoto.map(item=> item.source.uri === image.fileUri) ? (
//        <View style={{backgroundColor:'rgba(255, 255, 255,0.3)', position:'absolute', top:0, left:0, right:0, bottom:0, alignItems:'center',zIndex:1000000, justifyContent:'center', borderColor:'#0073ff', borderWidth:3}}>
//        <View style={{height:( WIDTH/3.1)/2.5, width: ( WIDTH/3.1)/2.5, borderRadius:(( WIDTH/3.1)/2.5)/2, backgroundColor:'#0073ff', borderColor:'#fff',borderWidth:2, alignItems:'center', justifyContent:'center'}}>
//        <FontAwesome name="check" size={24} color="#fff" />
//        </View>
//        </View>
//      ): (
//        null
//      )
//    } */}
 
//       <Image
//           style={{width:WIDTH/3.1, height: WIDTH/3.1, borderWidth:2, borderColor:'#fff'}}
//           source={image.source}
//           resizeMode="cover"
//       />
//   </TouchableOpacity>
// )