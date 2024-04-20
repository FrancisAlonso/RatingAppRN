import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import BandasScreen from './BandasScreen';
import PeliculasScreen from './PeliculasScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Bandas" component={BandasScreen} />
        <Tab.Screen name="Peliculas" component={PeliculasScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;


