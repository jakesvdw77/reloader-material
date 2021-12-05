import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { combineReducers } from "redux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    counter: 0,
    token: "",
    expires: 0,
    firstName: "",
    lastName: "",
    firstLetter:""
  },
  reducers: {
    authenticate: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.expires = action.payload.expires;      
      state.firstName = action.payload.firstName;

      if(state.firstName && state.firstName.length >0)
        state.firstLetter = state.firstName.substr(0,1);

      state.lastName = action.payload.lastName;

    },

    logOut: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.firstName = "";
      state.lastName = "";
      state.firstLetter = "";
    },

    profileLoaded: (state, action: PayloadAction<any>) => {      
      state.firstName = action.payload.firstName;

      if(state.firstName && state.firstName.length >0)
        state.firstLetter = state.firstName.substr(0,1);

      state.lastName = action.payload.lastName;
    },
  },
});

export const { authenticate, profileLoaded, logOut } = authSlice.actions;

// const rootReducer = combineReducers({
//   authenticate: authenticate,
// });

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["token", "isAuthenticated","firstName","lastName","firstLetter"], // which reducer want to store
};

const pReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: pReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
