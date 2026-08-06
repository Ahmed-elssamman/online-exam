export interface SidebarItem {
  title: string;
  icon?: string;
  path: string;
  isShow: boolean;
}

export interface UserAccount {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
}
