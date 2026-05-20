import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from '../store/userSlice';
import browseReducer from '../store/browseSlice';
import jobDetailReducer from '../store/jobDetailSlice';
import profileReducer from '../store/profileSlice';
import activityReducer from '../store/activitySlice';
import notificationsReducer from '../store/notificationsSlice';
import settingsReducer from '../store/settingsSlice';
import applicationsReducer from '../store/applicationsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  browse: browseReducer,
  jobDetail: jobDetailReducer,
  profile: profileReducer,
  activity: activityReducer,
  notifications: notificationsReducer,
  settings: settingsReducer,
  applications: applicationsReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['user', 'browse', 'jobDetail', 'profile', 'activity', 'notifications', 'settings', 'applications'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);