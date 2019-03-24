import React, { Component } from 'react'
import { Text, View,StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, FlatList,Alert, CameraRoll,ToastAndroid, BackHandler } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from 'react-native-image-crop-picker';
import {addName, addSubject, deleteSubject, addnotestoUncatagorised, addPdftoUncatagorised, deletenotesFromUncatagorised, deletepdfFromUncatagorised, setAdTimeForAddPdftoUncatagorised, setAdTimeForAddNotestoUncatagorised} from '../redux/action/mainAction'
import {connect} from 'react-redux'
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
          changeState:0
        }
      
      }

      selectphoto(){
        ImagePicker.openPicker({
          multiple: true
        }).then(images => {
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
            //All type of Files DocumentPickerUtil.allFiles()
            //Only PDF DocumentPickerUtil.pdf()
            //Audio DocumentPickerUtil.audio()
            //Plain Text DocumentPickerUtil.plainText()
          },
          (error, res) => {
            try {
              this.setState({
                pdf:{
                  fileUri: res.uri,
                  fileType: res.type,
                  fileName: res.fileName,
                  fileSize: res.fileSize 
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
              this.setState({fileUri:res.uri})
       
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
       
     
      
      _renderPDF=(item, index)=> {
        // let shareOptions = {
        
        //   subject: "Share Link" //  for email
        // };
       // console.log('item is ', item)
        return (
          <TouchableOpacity activeOpacity={0.9}  onPress={()=> {this.setState({showPDF:true, pdfUri:{uri: item.fileUri}}) }} style={{marginTop:10, marginHorizontal:10, backgroundColor:'#fff', padding:6, flexDirection:'row',justifyContent:'space-between', alignItems:'center', width:WIDTH-20, borderRadius:8,marginBottom:4, elevation:4}}>
                     <View style={{alignItems:'center', flexDirection:'row',}}>
                     <Icon name="file-pdf" style={{padding:7}} size={26} color="#ff0000"/>
                      <View style={{marginLeft:5, marginRight:5}}>
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
     
  //   componentDidMount(){
  //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  //   }



    
  //   handleBackButton() {
  //     //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
  //     return true;
  // }
      

  render() {

    if(this.state.showPDF){
      console.log(this.state.showPDF)
      BackHandler.addEventListener('hardwareBackPress', ()=> {
        //console.log('0000000000000000')
        this.setState({showPDF: false})
        //console.log('back')
        //console.log(this.state.showPDF)
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
    const imageURLs=[];
    const imagePaths=[]
    this.props.auth.uncatagorised_photos.map(image=> {
      console.log(image)
console.log('gagagaggagggagagagaggagga')
       if(image.length >=1){
        console.log(image)
        return image.map(image=> {
          console.log('=-oaiuaaauauuau')
          console.log(image)
          images.push(image)
        imageURLs.push({
           source:{
             uri:image.path +'DATE:'+ image.modificationDate
           },
           
         })
         imagePaths.push({
          source:{
            uri:image.path
          },
          
        })
        // console.log('image url: ', imageURLs)
        })
       }
       else {
        console.log('sasasassasassa')
        console.log(image)
         images.push(image)
         imageURLs.push({
          source:{
            uri:image.path +'DATE:'+ image.modificationDate
          },
           
         })
         imagePaths.push({
          source:{
            uri:image.path
          },
          
        })
         
       }
      
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
                   this.props.auth.uncatagorised_photos.length <= 0 ? (
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
                          urls: this.state.selectedPhotoUri,
                          subject: "Share Link" //  for email
                         });
                         console.log('sharing...')
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
                this.setState({showPhotos: false})
              } : ()=> {
               
                this.setState({showPhotos:true})
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
                   
                   
                  let imagePath ={uri: image.source.uri.split("DATE:").shift()}
                  console.log(imagePath)
                  console.log('-----------------')
                      console.log('selected',this.state.selectedPhotoUri)

                    if(this.state.selectedPhotoUri.includes(image.source.uri)){
                      console.log('=======================',this.state.selectedPhotoUri)
                        return (
                          <TouchableOpacity
                          activeOpacity={0.9}
                          key={image.source.uri}
                          onPress={()=> {
                          if(this.state.onLongPressOnPhoto){
                           let index = this.state.selectedPhotoUri.indexOf(image.source.uri);
                           if(index > -1){
                            this.state.selectedPhotoUri.splice(index, 1);
                            this.setState({changeState:100})
                            console.log('deleted uri==', this.state.selectedPhotoUri)
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
                           source={imagePath}
                           resizeMode="cover"
                          />
                        </TouchableOpacity>
                        )
                       
                    } else {
                      console.log('state===',this.state.selectedPhotoUri)
                      console.log('3333333333333333')
                      return (
                        <TouchableOpacity
                        activeOpacity={0.9}
                        key={image.source.uri}
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
                                console.log('selected +++++++uris ==', this.state.selectedPhotoUri)
                              }  
                          } 
                         else {
                          
                          
                           this.setState({
                              imageIndex: index,
                              isImageViewVisible: true,
                              changeState:4
                          })}
                            }}
                         delayLongPress={100}
                         
                        onLongPress={()=> 
                        {
                          this.setState({onLongPressOnPhoto:true}, ()=> {
                            this.state.selectedPhotoUri.push(image.source.uri)
                            this.setState({changeState:19870})
                            console.log('state selected uris ==', this.state)
                           
                          })
                          this.setState({changeState:1000})
                        
                        }}
                        >
                          <Image 
                          style={{width:WIDTH/3.1, height: WIDTH/3.1, borderWidth:2, borderColor:'#fff'}}
                           source={imagePath}
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
                    images={imagePaths}
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
                <Text  style={{color:'#000',marginHorizontal:10, padding:2,fontSize:12,fontFamily:'Quicksand-Medium'}}>NOTE: NotesMate only stores the location of the files or images, so if you delete the files or images from your device, these will be deleted from here too!</Text>
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
      
      alignItems: 'center',
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
  }
});


export default connect(mapStateToProps,{addnotestoUncatagorised, addPdftoUncatagorised, deletepdfFromUncatagorised, deletenotesFromUncatagorised, setAdTimeForAddPdftoUncatagorised, setAdTimeForAddNotestoUncatagorised})(UnCatagorised)


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