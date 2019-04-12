import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import MoviesScreen from '../screens/Movies';
import TVScreen from '../screens/TV';
import SearchScreen from '../screens/Search';
import TabBarIcon from '../components/TabBarIcon'
import { Platform } from 'react-native'
import React from 'react';
import createStack from './config'


const TabNavigation = createBottomTabNavigator(
  {

    Movie: {
      screen: createStack(MoviesScreen, "Movie"),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-film" : "md-film"}
          />
        )
      }
    },
    TV: {
      screen: createStack(TVScreen, "TV"),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-tv" : "md-tv"}
          />
        )
      }
    },
    Search: {
      screen: createStack(SearchScreen, "Search"),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "black"
      }
    }
  }
);


export default createAppContainer(TabNavigation);


