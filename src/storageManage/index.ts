import { DB_STORE_MANAGE, USER_DETAILS_INFO } from "./constant";

export interface WithDrawInfo {
  amount: number;
  time: string;
  status: number;
  userName: string;
  userId: Number;
}

export interface IUserInfo {
  userName: string;
  limitFree: number;
  amount: number;
  withdrawTax: number;
}

const initStorage = localStorage.getItem(DB_STORE_MANAGE.USER_STORE);
const initStorageUser = () => {
  localStorage.setItem(DB_STORE_MANAGE.USER_STORE, JSON.stringify(USER_DETAILS_INFO));
}


// 初始化参数
if (!initStorage) {
  initStorageUser();
}

export function getUserDetails() {
  const userDetails = localStorage.getItem(DB_STORE_MANAGE.USER_STORE);
  if (userDetails) {
    try {
      return JSON.parse(userDetails);
    } catch (error) {
      // 异常数据
      initStorageUser();
    }
  }
  return null;
}

export const addWithdraw = (withdrawItem: WithDrawInfo) => {
  const withdrawStore = localStorage.getItem(DB_STORE_MANAGE.WITHDRAW_STORE);
  if (withdrawStore) {
    try {
      const withdrawList = JSON.parse(withdrawStore);
      withdrawList.push(withdrawItem);
      localStorage.setItem(DB_STORE_MANAGE.WITHDRAW_STORE, JSON.stringify(withdrawList));
    } catch (error) {
      // 异常数据
      addWithdraw(withdrawItem);
    }
  } else {
    localStorage.setItem(DB_STORE_MANAGE.WITHDRAW_STORE, JSON.stringify([withdrawItem]));
  }
}

export const getWithdrawList = () => {
  const withdrawStore = localStorage.getItem(DB_STORE_MANAGE.WITHDRAW_STORE);
  if (withdrawStore) {
    try {
      return JSON.parse(withdrawStore) as WithDrawInfo[];
    } catch (error) {
      // 异常数据
      return [];
    }
  }
  return [];
}

export const updateUser = (userItem: WithDrawInfo) => {
  const userStore = localStorage.getItem(DB_STORE_MANAGE.USER_STORE);
  if (userStore) {
    try {
      const userList = JSON.parse(userStore);
      userList.push(userItem);
      localStorage.setItem(DB_STORE_MANAGE.USER_STORE, JSON.stringify(userList));
    } catch (error) {
    }
  } else {
    localStorage.setItem(DB_STORE_MANAGE.USER_STORE, JSON.stringify([userItem]));
  }
}