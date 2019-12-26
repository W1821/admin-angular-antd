export {
  Menu,
  Button,
};

/**
 * 菜单
 */
class Menu {
  id: number;
  pid: number;
  pids: string;
  routePath: string;
  menuName: string;
  showName: string;
  icon: string;
  rank: number;
  actions: string;
  buttons: Button[];

  isChecked = false;      // 选中状态，false，没有选中，true：选中

  children: Menu[] = [];

  setDataValue(data: any) {
    this.id = data.id;
    this.pid = data.pid;
    this.pids = data.pids;
    this.routePath = data.routePath;
    this.menuName = data.menuName;
    this.showName = data.showName;
    this.icon = data.icon;
    this.rank = data.rank;
    this.actions = data.actions;
    this.buttons = data.buttons.map(e => new Button(e));
  }

}

class Button {

  id: number;
  buttonName: string;
  code: string;
  actions: string;
  routePath: string;

  constructor(button: any) {
    this.id = button.id;
    this.buttonName = button.buttonName;
    this.code = button.code;
    this.actions = button.actions;
    this.routePath = button.routePath;
  }

}

