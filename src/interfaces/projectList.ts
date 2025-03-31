import { ICommonInitials } from "./login"

export interface IProjectList {
  companyId: number,
  search: string,
  workspaceId?: [number],
  boardId: [],
  archived: boolean,
  projectId: number
}

export interface IProjectRequest{
  UserId: number,
  projectId: number | string,
  action: string
}

export interface IProjects {
  key: number,
  value: string,
  id: number | string,
  text: string,
  isOwner: [boolean],
  isEditor: [boolean],
  isViewer?:[boolean]
}

export interface IBoards {
  key: number,
  value: string,
  id: number,
  text: string,
  workspaceId: number,
  workspaceName: string
}

export interface IProjectListData {
  lists: {
    data: IProjectAllData,
    projects: [IProjects],
    boards: [IBoards],
    createProject: boolean,
    createTask: boolean,
    createProjectboardsList: [IBoards]
  }
}
interface IProjectAllData {
  id: number;
  key: number;
  boardId: number;
  workspaceId: number;
  userId: number;
  projectManager: number;
  name: string;
  value: string;
  description: string;
  fromDate: string;
  dueDate: string;
  budgetFrom: number;
  budget: number;
  createdDateTime: string;
  totalTasks: number;
  completedTasks: number;
  projectWorkspaceId: number | null;
  workspaceUserId: number | null;
  workspaceCompanyId: number | null;
  workspaceName: string | null;
  workspaceDescription: string | null;
  workspaceIsDeleted: boolean | null;
  workspaceCreatedDateTime: string | null;
  projectBoardId: number | null;
  boardUserId: number | null;
  boardWorkspaceId: number | null;
  boardName: string | null;
  boardDescription: string | null;
  boardCreatedDateTime: string | null;
  boardIsDeleted: boolean | null;
  projectMemberId: number | null;
  email: string | null;
  memberUserId: number | null;
  userName: string | null;
  usersCompanyId: number | null;
  isOnline: boolean | null;
  profileImageUrl: string | null;
  isCreator: boolean;
  isOwner: boolean;
  isEditor: boolean;
  isViewer: boolean;
  isActive: boolean | null;
  taskCodePrefix: string;
  isArchived: boolean;
  isFavourite: boolean;
  companyName: string;
  projectStatusId: number;
  board: Board;
  workspace: Workspace;
  members: Member[];
  statusModel: ProjectStatusModel[] | null;
  priorityModel: any | null; 
  tasksUserDefinedFieldMapping: TasksUserDefinedFieldMapping[];
}

interface ProjectStatusModel {
  projectStatusId: number;
  companyId: number;
  projectId: number;
  projectStatusName: string;
  projectStatusColour: string;
  isDeleted: boolean;
  isFinal: boolean;
  isInitial: boolean;
  projectStatusOrder: number;
  projects: any | null; // Replace 'any' with the appropriate type if available
}

interface TasksUserDefinedFieldMapping {
  mappingId: number;
  fieldId: number;
  isVisible: boolean;
  projectId: number;
  projects: any | null; // Replace 'any' with the appropriate type if available
  userDefinedFields: any | null; // Replace 'any' with the appropriate type if available
  tasksUserDefinedFieldValues: any | null; // Replace 'any' with the appropriate type if available
}

interface Member {
  projectMemberId: number;
  email: string;
  projectId: number;
  userId: number;
  userName: string;
  usersCompanyId: number;
  isOnline: boolean;
  profileImageUrl: string | null;
  isCreator: boolean;
  isOwner: boolean;
  isEditor: boolean;
  isViewer: boolean;
  isExternalUser: boolean;
  isActive: boolean;
}


interface BaseEntity {
  isDeleted: boolean;
  isArchived: boolean;
  createdDateTime: string;
}

interface ItemWithMembersAndLogs {
  workspaceMembers: any[] | null; 
  boardMembers: any[] | null;     
  workspaceLogs: any[] | null;   
  boardLogs: any[] | null;      
}

interface ProjectsAndBoards {
  boards: any[] | null;  
  projects: any[] | null;
}

interface Workspace extends BaseEntity, ProjectsAndBoards, ItemWithMembersAndLogs {
  workspaceId: number;
  userId: number;
  companyId: number;
  workspaceName: string;
  workspaceDescription: string | null;
}

interface Board extends BaseEntity, ProjectsAndBoards, ItemWithMembersAndLogs {
  boardId: number;
  userId: number;
  workspaceId: number;
  boardName: string;
  boardDescription: string | null;
  workspace: any | null; 
}

export interface IProjectListResponse {
  isSuccess: boolean,
  message: {
    userMessage: string,
    exception: any
  },
  data: IProjectListData | null
}

export interface IFavProjectListResponse {
  isSuccess: boolean,
  message: {
    userMessage: string,
    exception: any
  },
  data: IFavProjectListData | null
}

export interface IFavProjectListData {
  key: number;
  value: string;
  id: number;
  text: string;
  isOwner: boolean[];
  isEditor: boolean[];
  isViewer: boolean[];
}

export interface IFavProjectResponse {
  isSuccess: boolean,
  message: {
    userMessage: string,
    exception: any
  },
  data: boolean
}

export interface IInitialState extends ICommonInitials {
  projectListData: IProjectListResponse | null | undefined,
  favProjectListData:IFavProjectListResponse|null,
  projectData:IFavProjectResponse | null,
  status:string[]
}

interface UserConfig {
  Meetings: {
    ViewType: string;
  };
  Workhub: {
    Project: {
      ViewType: string;
      ProjectNames: string;
      ProjectIds: number;
    };
    Tasks: {
      ViewType: string;
      ProjectNames: string;
      ProjectIds: string;
      sortOption: string;
      sortOrder: string;
      showCompletedTasks: boolean;
      groupingOrder: string;
      GroupedProjectIds: string;
    };
  };
  RefreshRenderer: boolean;
}

export interface User {
  companyId: string;
  email: string;
  exp: number;
  firstName: string;
  iat: number;
  id: string;
  isGoogle: string;
  lastName: string;
  module: string;
  nbf: number;
  permissions: string;
  roleId: string;
  theme: string;
  timezone: string;
  unique_name: string;
  userconfig: UserConfig;
}