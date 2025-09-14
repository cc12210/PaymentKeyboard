import PaymentKeyboard from "../../components/PaymentKeyboard";
import PaymentAmount from "../../components/PaymentAmount";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { getUserDetails, IUserInfo } from "../../storageManage";
const TransferAccount = () => {
  const [amount, setAmount] = useState("");
  const [showPayKeybord, setShowPayKeyboard] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  const initGetUserInfo = () => {
    const userInfo = getUserDetails();
    setUserInfo(userInfo);
  };

  // 提现
  const withDrawAmount = () => {
    setShowModal(true);
  };

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
      {/* 自定义键盘 */}
      <PaymentKeyboard
        disabled={Boolean(userInfo?.amount && Number(amount) > userInfo?.amount)}
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
              onClick={() => setShowModal(false)}
              className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
            >
              取消
            </button>
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="px-4 py-2 bg-[#1579FE] text-white rounded-md"
            >
              确认
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TransferAccount;
