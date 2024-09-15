// src/context/UserContext.js
'use client'; // クライアントコンポーネントとしてマーク

import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../app/lib/firebaseConfig'; // パスを修正
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
