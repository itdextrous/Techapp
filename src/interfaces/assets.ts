
interface IAssetCategory {
    assetCategoryId: number;
    categoryName: string;
    categoryCode: string;
    assetCodePrefix: string;
    companyId: number;
    isDefault: boolean;
    isDeleted: boolean;
    createdDateTime: string;
    createdBy: number | null;
}

interface IAssetBrand {
    assetBrandId: number;
    brandName: string;
    companyId: number;
    isDeleted: boolean;
    createdDateTime: string;
    createdBy: number;
}

interface IAssetModel {
    assetModelId: number;
    modelName: string;
    companyId: number;
    isDeleted: boolean;
    createdDateTime: string;
    createdBy: number;
}
interface IAssetLocation {
    assetLocationId: number;
    locationName: string;
    companyId: number;
    isDeleted: boolean;
    createdDateTime: string;
    createdBy: number;
}
interface IAssetModel {
    assetModelId: number;
    modelName: string;
    companyId: number;
    isDeleted: boolean;
    createdDateTime: string;
    createdBy: number;
}

interface IAssetStatus {
    assetStatusId: number;
    assetStatusName: string;
    assetStatusColour: string;
    statusOrder: number;
    companyId: number;
    isDeleted: boolean;
    createdDateTime: string;
    createdBy: number;
}
interface IAssetDepartment {
    assetDepartmentId:number,
    departmentName:string,
    companyId: number;
    isDeleted: boolean;
    createdDateTime: string;
    createdBy: number;
}
interface IAssetPurchase {
    assetPurchaseFromId:number,
    purchaseFromName:string,
    companyId: number;
    isDeleted: boolean;
    createdDateTime: string;
    createdBy: number;
}

export interface IAsset {
    assetId: number;
    companyId: number;
    userId: number;
    assetCode: string;
    assetCategoryId: number;
    assetBrandId: number;
    assetModelId: number;
    serialNumber: string;
    assetNotes: string;
    assetAddress: string;
    purchaseDate: string;
    lastUpdatedDateTime: string;
    assigneeId: number;
    dateAssigned: string;
    warrantyExpiry: string;
    endOfLife: string;
    purchasedFrom: string;
    assetStatusId: number;
    purchaseAmount: number;
    disposedDate: string;
    assetLocationId: number;
    assetDepartmentId: number;
    disposeNotes: string | null;
    assetDescription: string;
    purchaseOrder: string;
    assetWarrantyType: string;
    processor: string;
    ramCapacity: number;
    storageCapacity: number;
    operatingSystem: string;
    graphicsCard: string;
    battery: string;
    kmhConnectionType: string | null;
    kmhConnectivityType: string | null;
    appName: string | null;
    appVersion: string | null;
    appLicenseType: string | null;
    appLicenseKey: string | null;
    appLicensePurchase: string | null;
    appRenewalDate: string | null;
    appPricePerLicense: string | null;
    appPurchaseCurrency: string | null;
    appSubType: string | null;
    appSubStart: string | null;
    appSubRenewal: string | null;
    phIntType: string | null;
    phIntServiceProvider: string | null;
    phIntPhoneNumber: string | null;
    phIntImei: string | null;
    phIntSimCard: string | null;
    screenSize: string | null;
    monDisplayType: string | null;
    esdCapacity: string | null;
    esdInterfaceType: string | null;
    svrType: string | null;
    svrProcessorType: string | null;
    svrRAMCapacity: string | null;
    svrVirtualization: string | null;
    nwDeviceType: string | null;
    nwFirmwareVersion: string | null;
    nwPortCount: string | null;
    nwBaseIP: string | null;
    prnType: string | null;
    prnSpeed: string | null;
    prnDuplexPrinting: boolean;
    prnConnectivity: string | null;
    prjBrightness: string | null;
    prjLampLife: string | null;
    mmDevicetype: string | null;
    tabCellularConnectivity: boolean;
    secDeviceType: string | null;
    prpDeviceType: string | null;
    prpConnectivityType: string | null;
    accType: string | null;
    accCompatibleDevices: string | null;
    resolution: string | null;
    assetCategory: IAssetCategory;
    assetBrand: IAssetBrand;
    assetModel: IAssetModel;
    assetLocations: IAssetLocation;
    assetDepartments: IAssetDepartment;
    assetStatus: IAssetStatus;
    assetPurchaseFrom:IAssetPurchase
    assigneeName:string|null,
    assetCategoryName:string,
    assetLocationName:null|string;
    assetDepartmentName:string|null,
    assetBrandName:string,
    assetModelName:string|null
    assetStatusName:string|null
}

interface IMessage {
    userMessage: string;
    exception: any;
}

export interface IAssetListResponse  {
    isSuccess:boolean,
    message:IMessage,
    data:IAsset | []

}

export interface IInitialState{
    assetsList:null | IAssetListResponse,
    assetDetails:null | IAssetListResponse,
    isLoading:false,
    isSuccess:false,
    isError:false,
}