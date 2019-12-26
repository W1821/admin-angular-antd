export {
  Role,
};

/**
 * 用户
 */
class Role {

  id: number;
  roleName: string;
  roleStatus: string;
  description: string;
  createTime: string;
  menuIds: number[] = [];
  buttonIds: number[] = [];

  setDataValue(data: any) {
    this.id = data.id;
    this.roleName = data.roleName;
    this.roleStatus = data.roleStatus;
    this.description = data.description;
    this.createTime = data.createTime;
    this.menuIds = data.menuIds;
    this.buttonIds = data.buttonIds;
  }

}
