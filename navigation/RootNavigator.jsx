import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from '../navigation/AuthStack';
import AppStack from '../navigation/AppStack';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';
import LoadingScreen from '../screens/LoadingScreen';

export default function App() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(auth, (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setIsLoading(false);
    });

    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>;
}
