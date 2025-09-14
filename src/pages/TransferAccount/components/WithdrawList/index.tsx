import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import { getWithdrawList, WithDrawInfo } from "../../../../storageManage";

interface IWithdrawProps {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

const WithdrawList = ({ isShow, setIsShow }: IWithdrawProps) => {
  const [withdrawListData, setWithdrawListData] = useState<WithDrawInfo[]>([]);
  useEffect(() => {
    if (isShow) {
      const withdrawData = getWithdrawList();
      setWithdrawListData(withdrawData);
    } else {
      setWithdrawListData([]);
    }
  }, [isShow]);
  return (
    <Modal isShow={isShow} setIsShow={setIsShow}>
      <div className="w-full h-[600px] bg-white border-box p-4 flex flex-col">
        <div className="text-[16px] font-bold py-2">提现记录</div>
        <div className="flex-1 border-box py-2 overflow-y-auto">
          {
            !withdrawListData.length && <div>暂无提现记录</div>
          }
          {withdrawListData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#eee] p-2 rounded-md mb-[10px]"
            >
              <div>
                <div className="text-[16px]">提现金额：￥{item.amount}</div>
                <div className="text-[14px] text-[#999]">
                  提现时间：{item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center py-2" onClick={() => setIsShow(false)}>
          关闭
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawList;
