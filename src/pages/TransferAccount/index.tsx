import PaymentKeyboard from "../../components/PaymentKeyboard";
import PaymentAmount from "../../components/PaymentAmount";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import {
  addWithdraw,
  clearStorage,
  getUserDetails,
  IUserInfo,
  updateUser,
  WithDrawInfo,
} from "../../storageManage";
import dayjs from "dayjs";
import WithdrawList from "./components/WithdrawList";

const TransferAccount = () => {
  const [amount, setAmount] = useState("");
  const [showPayKeybord, setShowPayKeyboard] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isShowWithdrawList, setIsShowWithdrawList] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  const initGetUserInfo = () => {
    setAmount("");
    const userInfo = getUserDetails();
    setUserInfo(userInfo);
  };

  // 提现
  const withDrawAmount = () => {
    setShowModal(true);
  };

  const cancelWithDraw = () => {
    setShowModal(false);
  };

  const confirmWithDraw = () => {
    let whithDraw: IUserInfo = getUserDetails();
    let calcAmount = Number(amount);
    whithDraw.amount -= calcAmount;

    if (whithDraw.limitFree > calcAmount) {
      whithDraw.limitFree -= calcAmount;
    } else {
      whithDraw.limitFree = 0;
    }
    updateUser(whithDraw);
    initGetUserInfo();
    setShowModal(false);
    setAmount("");

    // 记录提现信息
    const withdrawRecord: WithDrawInfo = {
      amount: calcAmount,
      time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      status: 1, // 提现状态
      userName: userInfo?.userName || "",
    };
    addWithdraw(withdrawRecord);
  };

  const clearData = () => {
    clearStorage();
    initGetUserInfo();
  }

  useEffect(() => {
    initGetUserInfo();
  }, []);

  return (
    <div>
      {/* 金额显示&操作 */}
      <PaymentAmount
        setIsShow={setShowPayKeyboard}
        amount={amount}
        setAmount={setAmount}
        userInfo={userInfo}
      />

      {/* 显示转账记录 */}
      <div>
        <button className="text-[#1579fe] px-4 py-2 rounded-md" onClick={() => setIsShowWithdrawList(true)}>
          显示转账记录
        </button>
      </div>
      <div>
        <button className="text-[#1579fe] px-4 py-2 rounded-md" onClick={clearData}>
          清空数据,重新进行初始化操作
        </button>
      </div>

      {/* 自定义键盘 */}
      <PaymentKeyboard
        disabled={Boolean(
          userInfo?.amount && Number(amount) > userInfo?.amount
        )}
        isShow={showPayKeybord}
        amount={amount}
        setAmount={setAmount}
        setIsShow={setShowPayKeyboard}
        withDrawAmount={withDrawAmount}
      />

      {/* 弹层信息 */}
      <Modal isShow={showModal} setIsShow={setShowModal}>
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">提现确认</h2>
          <p className="mb-4">您确定要提现 {Number(amount)} 元吗？</p>
          <div className="flex justify-end">
            <button
              onClick={cancelWithDraw}
              className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
            >
              取消
            </button>
            <button
              onClick={confirmWithDraw}
              className="px-4 py-2 bg-[#1579FE] text-white rounded-md"
            >
              确认
            </button>
          </div>
        </div>
      </Modal>

      {/* 提现详情 */}
      <WithdrawList
        isShow={isShowWithdrawList}
        setIsShow={setIsShowWithdrawList}
      />
    </div>
  );
};

export default TransferAccount;
