// import { configureStore, } from '@reduxjs/toolkit';
// import {
//   persistStore, persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';

// import rootReducer from './combineReducer';

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage: localStorage,
//   blacklist: ['gernalReducer'],
// };


// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     })
// });

// export default store;

// export const persistor = persistStore(store);


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer,
  FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './combineReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  blacklist: ['gernalReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export const persistor = persistStore(store);
