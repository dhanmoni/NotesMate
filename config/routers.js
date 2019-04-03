import React from 'react'
import { Text, View, Image } from 'react-native'
import { createStackNavigator} from 'react-navigation'

import MainScreen from '../Components1/MainScreen'
import UnCatagorised from '../Components1/UnCatagorised'
import ChapterScreen from '../Components1/ChapterScreen'
import SubScreen from '../Components1/SubScreen'

import Setting from '../Component2/Setting'
import HelpScreen from '../Component2/Help'





export const MainStack = createStackNavigator(
  {
  MainScreen:{
    screen:MainScreen
  },
  UnCatagorised:{
    screen: UnCatagorised
    
  },
 ChapterScreen:{
  screen: ChapterScreen
 },
  SubScreen:{
    screen:SubScreen
  },
  Setting:{
    screen: Setting
  }, 
  HelpScreen:{
    screen: HelpScreen
  }

  
  
}
)






 