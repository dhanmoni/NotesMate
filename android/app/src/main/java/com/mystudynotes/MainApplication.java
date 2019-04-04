package com.mystudynotes;

import android.app.Application;


import com.facebook.react.ReactApplication;
import ui.fileselector.RNFileSelectorPackage;
import suraj.tiwari.reactnativefbads.FBAdsPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import org.wonday.pdf.RCTPdfView;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.BV.LinearGradient.LinearGradientPackage; 
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.ads.AudienceNetworkAds; 

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements  ShareApplication, ReactApplication  {
   @Override
     public String getFileProviderAuthority() {
            return "com.mystudynotes.provider";
     }
      private static CallbackManager mCallbackManager = CallbackManager.Factory.create();



      protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFileSelectorPackage(),
            new FBAdsPackage(),
          new FBSDKPackage(mCallbackManager),
            new RNSharePackage(),
            new RNFetchBlobPackage(),
            new RCTPdfView(),
            new ReactNativeDocumentPicker(),
            new PickerPackage(),
           
            new RNGestureHandlerPackage(),
          new LinearGradientPackage() ,
          new VectorIconsPackage()
          //new MainReactPackage(), // <---- add comma
       // new RNFSPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    AppEventsLogger.activateApp(this);
    AudienceNetworkAds.initialize(this);
    //...
  }
}
