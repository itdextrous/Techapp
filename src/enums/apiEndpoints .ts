
const ApiEndpoints  = {
  AUTH: {
    LOGIN: '/Login',
    GOOGLE_LOGIN: '/GoogleSignIn',
    FORGOT_PASSWORD:'/ForgotPassword',
    SEND_EMAIL:'/SendEmailToNewUser',
  },
  PROFILE:{
    SAVE_USER_PROFILE_IMAGE:'/SaveUserProfileImage'
  },
  PROJECTLIST:{
    GET_PROJECT_LIST:"/GetProjectList",
    GET_FAV_PROJECT_LIST:"/GetFavouriteProjects?param=",
    FAV_PROJECT:'/SetProjectAsFavourite',
  },
  TASKLIST:{
    GET_TASK_LIST:"/GetTasksList",
    GET_TASK_BY_ID:"/GetTaskById",
    EDIT_TASK_LIST:"/SaveTasks",
    SAVE_TASK_TIME:"/SaveTaskTime",
    SAVE_ESTIMATE_TIME:"/SaveTaskEstimateTime",
    GET_STATUS_PRIORITY:"GetStatusPriorityForProject?param=",
    TASK_SEARCH:"GetSearchFilterTasks?param=",
    PROJECT_STATUS:'/GetStatusForProject?param='
  },
  LOCATION_NAME:{
    GET_LOCATION_NAME:"latlng="
  },
  ATTACHMENTS:{
    GET_ATTACHMENTS:"/DownloadTaskAttachment?param=",
    GET_ATTACHMENTS_LIST:"/GetTaskAttachments?param=",
    UPLOAD_ATTACHMENTS:"/SaveTaskAttachments",
    DELETE_ATTACHMENT:"/RemoveDriveAttachment"
  },
  CHECKINS:{
    GET_CHECKINLIST:"/listcheckins?param=",
    GET_CHECKINSTATUS:"/checkinstatus?param=",
    CHECKIN:"/UserCheckIn",
  },
  Notes:{
    GET_Notes:"/GetTaskNotes?param=",
    UPDATE_Notes:"/SaveTaskNote",
  },
  ASSETS:{
    GET_ASSETSLIST:"/AssetList?param=",
    GET_ASSETDetails:"/AssetDetails?param=",
  },
  NOTIFICATION:{
    GET_TASK_NOTIFICATIONS:"/GetTaskUserNotifications?param=",
  },
  AUDIO:{
    SAVE_AUDIO:'/SaveAudio',
    AUDIO_DATA:'/GetAudioData?param='
  },
  PERMISSIONS:{
    GET_USER_PERMISSIONS:'/GetUserPermissions'
  }
  };
  
  export default ApiEndpoints;
