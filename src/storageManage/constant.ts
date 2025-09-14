import { IUserInfo } from ".";

export interface DBStoreManage {
  USER_STORE: string;
  WITHDRAW_STORE: string;
}

// 存储名管理
export const DB_STORE_MANAGE: DBStoreManage = {
  USER_STORE: "payment_user_store",
  WITHDRAW_STORE: "payment_withdraw_store",
}

// 默认信息
export const USER_DETAILS_INFO: IUserInfo = {
  userName: "默认用户",
  // 转账免费限额
  limitFree: 1000,
  // 用户余额
  amount: 3000,
  // 提现手续费
  withdrawTax: 0.001,
}

