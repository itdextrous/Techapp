import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "@redux/authSlice";
import profileImageReducer from "@redux/profileImageSlice";
import projectListReducer from "@redux/projectListSlice";
import taskListReducer from "@redux/taskListSclice";
import taskEditReducer from "@redux/taskEditSlice";
import userLocationReducer from "@redux/locationSlice";
import forgotPasswordReducer from "@redux/forgotSlice";
import sendEmailReducer from "@redux/sendEmailSlice";
import userInformationReducer from "@redux/userSlice";
import attachmentReducer from "@redux/attachmentSlice";
import checkinReducer from "@redux/checkinListSlice";
import notesReducer from "@redux/notesSlice";
import notificationsReducer from "@redux/notificationSlice";
import assetReducer from "@redux/assetsSlice";
import audioReducer from "@redux/audioSlice";
import audioSaveReducer from "@redux/audioSaveSlice";
import userPermissionReducer from "@redux/permissionSlice";

export type RootReducer = ReturnType<typeof rootReducer>;
// Selective state persistence
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "userInformation", "userLocation"],
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  profileImage: profileImageReducer,
  projectList: projectListReducer,
  taskList: taskListReducer,
  taskEdit: taskEditReducer,
  userLocation: userLocationReducer,
  forgotPassword: forgotPasswordReducer,
  sendEmail: sendEmailReducer,
  userInformation: userInformationReducer,
  attachment: attachmentReducer,
  checkin: checkinReducer,
  notesList: notesReducer,
  notificationsList: notificationsReducer,
  assets: assetReducer,
  audio: audioReducer,
  audioSaveSlice:audioSaveReducer,
  permissionSlice:userPermissionReducer,
});

// Apply persistence only to selected reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer and middleware options.
const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});

// Define the root state and dispatch types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
