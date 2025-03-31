import { ICommonInitials } from "./login"

export interface IStateValues{
    status:string |undefined,
    priority:string |undefined,
    time?:string | undefined,
    assignee:any | undefined,
    labels:string | undefined,
    admin:string | undefined
}

export interface ISetOption{
    estimate:boolean |  null | undefined,
    timeSpent:boolean| null | undefined,
    notes:boolean| null | undefined
}

export interface ISetModal{
    estimate:string,
    timeSpent:string,
}

export interface ISetOpen{
    detail:boolean,
    attachment:boolean
}

export interface IUserTask {
    userId: number | undefined;  // Assuming userInfos?.id could be undefined
    companyId: string;
    taskId: number | undefined;  // Assuming item?.taskId could be undefined
    taskType: string;
}

export interface ICommon {
    isSuccess: boolean;
    message: IMessage;
}
export interface ITaskEditResponse extends ICommon{
    data: ITaskEdit | null;
}

export interface ISaveResponse extends ICommon{
    data: ISaveTaskResponse | null;
}

export interface IInitialState extends ICommonInitials{
    taskEditData:ITaskEditResponse| null,
    editData:any
}

interface IMessage {
    userMessage: string;
    exception: any;
}

export interface ITaskEdit {
    statusName: string
    tasks: ITask;
    statusPriorityList: IStatusPriorityList;
    totalTaskTime: number;
    editTaskDetails: boolean;
    addAttachmentNotes: boolean;
    taskAttachmentsCount: number;
    labels: ILabel[];
    recurringTaskSchedules: any;
    parentTaskDetails: IParentTaskDetails;
    subTaskDetails: any[];
}

export interface ITask {
    taskId: number;
    taskCode: string;
    taskTitle: string;
    taskDescription: string;
    targetDate: string | null;
    completedDate: string | null;
    activeMeetingId: string | null;
    statusId: number;
    priorityId: number;
    projectId: number;
    companyId: number;
    createdDate: string;
    isDeleted: boolean;
    assignedBy: number;
    statusName: string;
    statusColour: string;
    isInitial: boolean;
    isFinal: boolean;
    priorityName: string;
    priorityColour: string;
    projectName: string;
    projectStartDate: string;
    projectEndDate: string;
    taskAssigneeId: number | null;
    email: string | null;
    userId: number | null;
    userName: string | null;
    usersCompanyId: number | null;
    isOnline: boolean | null;
    profileImageUrl: string | null;
    projectMemberId: number | null;
    isOwner: boolean;
    isEditor: boolean;
    isViewer: boolean;
    parentTaskId: number | null;
    subTaskCount: number;
    parentTaskCode: string | null;
    totalTaskTime: number | null;
    estimatedTimeInMinutes: number | null;
    editTaskDetails: boolean;
    deleteTask: boolean;
    isActive: boolean | null;
    createdBy: number;
    taskLabels: string;
    recurringTask: boolean;
    taskTimes: any | null;
    taskListAssignees: ITaskAssignee[];
    taskAttachments: ITaskAttachment[] | null;
    subTasks: any[];
    tasksUserDefinedFieldMappings: any[];
    inlineLists: any;
}

interface ITaskAssignee {
    taskAssigneeId: number;
    email: string;
    userId: number;
    userName: string;
    companyId: number;
    isOnline: boolean;
    profileImageUrl: string | null;
    isActive: boolean;
}

export interface ITaskAttachment {
    attachmentId:number;
    filePath: string;
    title: string;
    mimeType: string;
    dateUploaded: string;
    documentType: string | null;
    uploadedBy:number
}

interface IStatusPriorityList {
    status: IStatus[];
    priority: IPriority[];
    label: ILabel[];
    members: IMember[];
}

interface IStatus {
    id: number;
    text: string;
    bgColor: string;
    count: number;
    isInitial: boolean;
    isFinal: boolean;
}

interface IPriority {
    id: number;
    text: string;
    bgColor: string;
    isDefault: boolean;
}

export interface ILabel {
    id: number;
    text: string;
    bgColor: string;
    userId: number;
    isArchived: boolean;
    selected?:boolean
}

export interface IFilterLabels {
    isArchived: boolean;
    labelColor: string;
    labelId: number;
    labelName: string;
    projectId: number;
    projectName: string;
    userId: number;
}

interface IMember {
    id: number;
    text: string;
    lowerText: string;
    email: string;
    isOnline: boolean;
    profileImageUrl: string | null;
    key: number;
    value: string;
    userId: number;
    userName: string;
    isExternalUser: boolean;
    isActiveUser: boolean;
}

interface IParentTaskDetails {
    id: number;
    code: string;
    projectId: number;
    projectName: string;
}


interface ITaskDetails extends ITask {
    googleDriveFolderPath: string | null;
    jiraImportDateTime: string | null;
    jiraTaskReference: string | null;
    parentTaskId: number;
    priority: any; 
    projects: any; 
    recurringTaskSchedule: any; 
    status: any; 
    systemGenerated: boolean;
    taskAssignees: any[]; 
    taskAttachments: any[] | null; 
    taskLogs: any[] | null; 
    taskTitle: string;
  }
  
  interface IActionDetails {
    inlineTarget: string;
    oldTargetDate: string | null;
    oldValue: string;
    taskId: number;
    updatedTargetDate: string | null;
    updatedValue: string;
  }
  
  export interface ISaveTaskResponse {
    actionDetails: IActionDetails;
    isNewTaskAssignee: boolean;
    taskAssignees: any[]; 
    taskDetails: ITaskDetails;
    taskId: number;
  }
  export interface ISaveRequest{
    taskId: number | undefined, 
    userId?:number,
    estimatedTimeInMinutes?:number,
    timeWorkedInMinutes?:number,
    timeEstimateInMinutes?:number,
    isInline: boolean,
    inlineTarget:string,
    statusId?:number,
    priorityId?:number,
    taskAssignees?:[ITaskAssignees]
  }
  interface ITaskAssignees{
    assigneeRoleId: number,
    email: string,
    isOnline: string,
    name: string,
    profileImageUrl: string,
    reportingManagerId: number,
    taskAssigneeId: number,
    taskId: number,
    userId: number,
    userName: string
  }
  
  export interface ITimeSpent{
    savedItemId:number,
    totalTaskTime:number
  }
  export interface ISaveTimeResponse extends ICommon{
    data: ITimeSpent | number, 
  }

