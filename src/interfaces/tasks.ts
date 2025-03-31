import { ICommonInitials } from "./login";

export interface ITasksData{
    name:string,
    title:string    
    number:string,
    uiux:string,
    rating:string,
    ratingColor:string,
    taskColor:string
}
export interface ITaskPayload {
    userId: string | number,
    taskId: string | number,
    priorityNames: string,
    statusNames: string,
    assigneeIds: string,
    searchTask: string,
    tileStatus: number,
    companyId: number,
    workspaceIds: string,
    boardIds: string,
    projectIds: number,
    viewScreen: number,
    taskType: string,
    page: number,
    pageSize: number,
    labelIds: string,
    sortOption: string,
    sortOrder: string,
    showCompleted: boolean,
    isBulkRequest: boolean,
    isProjectsGrouping: boolean,
    statusIds?:string
}

interface ProjectLabel {
    labelId: number;
    projectId: number;
    projectName: string;
    userId: number;
    labelName: string;
    labelColor: string;
    isArchived: boolean;
}
export interface TaskLists{
    statusId: number;
    statusName: string;
    tasks: Task
}
export interface AllTasksList{
    userId: number | null,
    userName: string | null;
    totalTasksOfUser:number|null,
    list:TaskLists[]
}
export interface Task {
    taskId: number;
    taskCode: string;
    taskTitle: string;
    taskDescription: string;
    targetDate: string | null;
    completedDate: string | null;
    activeMeetingId: number | null;
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
    totalTaskTime: string | null;
    estimatedTimeInMinutes: string | null;
    editTaskDetails: boolean;
    deleteTask: boolean;
    isActive: boolean | null;
    createdBy: number;
    taskLabels: string;
    recurringTask: boolean;
    taskTimes: string | null;
    taskListAssignees: TaskAssignee[];
    taskAttachments: string | null;
    subTasks: any[];
    tasksUserDefinedFieldMappings: any | null;
    inlineLists: any;
}

interface TaskAssignee {
    taskAssigneeId: number;
    email: string;
    userId: number;
    userName: string;
    companyId: number;
    isOnline: boolean;
    profileImageUrl: string | null;
    isActive: boolean;
}

interface Member {
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

interface ProjectMember {
    id: number;
    members: Member[];
}

export interface ITaskData {
    tasks: AllTasksList[] | [];
    viewScreen: number;
    projectLabels: ProjectLabel[];
    projectMembers: ProjectMember[];
}

interface IMessage {
    userMessage: string;
    exception: string | null;
}

interface ICommonResponse {
    isSuccess: boolean;
    message: IMessage;
}

export interface ITaskListResponse extends ICommonResponse {
    data: ITaskData | null;
}

export interface IInitialState extends ICommonInitials{
    taskListData:ITaskListResponse| null | undefined,
    projectStatus:StatusResponse|null,
    statusListData:[] | null | undefined |any
}

export interface IStatus{
    id: number,
    text: string,
    bgColor: string,
    count: number,
    isInitial: boolean,
    isFinal: boolean
}

interface IPriority{
    id: number,
    text: string,
    bgColor: string,
    isDefault: boolean
}

interface ILabel{
    id: number,
    text: string,
    bgColor: string,
    userId: number,
    isArchived: boolean
}

export interface IMember{
    id: number,
    text: string,
    lowerText: string,
    email: string,
    isOnline: boolean,
    profileImageUrl: string | null,
    key:number,
    value: string,
    userId: number,
    userName: string,
    isExternalUser: boolean,
    isActiveUser: boolean
}

export interface IStatusList{
    status: IStatus,
    priority: IPriority,
    label:ILabel,
    members:IMember
}

export interface IStatusListResponse extends ICommonResponse{
    data : IStatusList | null
}

export interface Status{
    id: number,
    text: string,
    bgColor: string,
    count: number,
    isInitial: boolean,
    isFinal: boolean
  }
  export interface StatusResponse extends ICommonResponse {
    data: Status | null;
  }