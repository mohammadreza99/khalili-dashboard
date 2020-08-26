export class Config {
  public static Title: string = 'سیستم';
  public static ApiUrl: string = 'https://store-api.ttarya.ir/';
  public static MenuApiUrl: string = 'App/MenuSelect';
  public static PermissionApiUrl: string = 'Security/UserPermission';
  public static AssetsUrl: string = 'assets'; // 'app/assets';
  public static ContentsUrl: string = Config.AssetsUrl + '/contents';
  public static LoginPage: string = '/login';
  public static CacheTimeout: number = 10;
}
