import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authentationReducer from './authenticationReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['authentationReducer'] // which reducer want to store
};


const pReducer = persistReducer(persistConfig, authentationReducer);
const middleware = applyMiddleware(thunk);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);


export { persistor, store };