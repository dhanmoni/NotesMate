
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {  createAppContainer } from "react-navigation";
import {MainStack} from './config/routers'

import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

const MainStackScreen = createAppContainer(MainStack);
export default class App extends Component{
  render() {
    return (
      <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <MainStackScreen/> 
          </Provider>
        </PersistGate>
    );
  }
}

