import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCartOwner } from '../redux/cartslice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  );

  useEffect(() => {
    dispatch(setCartOwner(user?._id || user?.id || null));
  }, [dispatch, user?._id, user?.id]);

  const login = (userData) => {
    dispatch(setCartOwner(userData?._id || userData?.id || null));
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const logout = () => {
    dispatch(setCartOwner(null));
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
