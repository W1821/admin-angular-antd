export {
  User,
};

/**
 * 用户
 */
class User {

  id: number;
  phoneNumber: string;
  userName: string;
  headPictureUrl: string;
  headPictureBase64: string;

  /**
   * 帐号状态，0：可用，1：不可用, 默认可用
   */
  accountStatus = 0;
  createTime: string;
  roles: any[] = [];

  setDataValue(data: any) {
    this.id = data.id;
    this.phoneNumber = data.phoneNumber;
    this.userName = data.userName;
    this.headPictureUrl = data.headPictureUrl;
    this.accountStatus = data.accountStatus;
    this.createTime = data.createTime;
    this.roles = data.roles;
  }

}
