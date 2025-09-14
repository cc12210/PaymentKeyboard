import { useEffect, useState } from "react";
import { formatCurrencyWithUnit } from "../../utils";
import { getUserDetails, IUserInfo } from "../../storageManage";

interface IAmountProps {
  userInfo: IUserInfo | null;
  amount: string;
}

const AmountTips = ({ userInfo, amount }: IAmountProps) => {
  if (!userInfo) {
    return null;
  }
  if (Number(amount) > userInfo?.amount) {
    return (
      <div className="text-[15px] text-[red]">
        超过可用余额(¥{userInfo?.amount})
      </div>
    );
  }
  if (Number(amount)) {
    return (
      <div className="text-[15px]">
        预计收取服务费
        <span className="text-[#FF4D4F] ml-[5px]">
          ¥
          {
            Number(amount) > userInfo?.limitFree ? 
            Number(
              (Number(amount) - userInfo?.limitFree) * userInfo?.withdrawTax
            ).toFixed(2) : 
            "0"
          }
        </span>
      </div>
    );
  } else {
    return (
      <div className="text-[15px]">
        免费额度还剩{userInfo?.limitFree}元，超出部分收取0.1%的手续费
      </div>
    );
  }
};

const PaymentAmount = ({
  setIsShow,
  amount,
  setAmount,
  userInfo,
}: {
  setIsShow: (isShow: boolean) => void;
  amount: string;
  setAmount: (amount: string) => void;
  userInfo: IUserInfo | null;
}) => {
  const [unit, setUnit] = useState("");

  const handleDocumentClick = (e: MouseEvent) => {
    //  const editableDiv = document.getElementById('editableDiv');
    const keyboardContainer = document.getElementById(
      "payment-keyboard-container"
    );
    const paymentAmountContainer = document.getElementById(
      "payment-amount-caontainer"
    );
    const modalContainer = document.getElementById(
      "modal-container"
    );

    const target = e.target as HTMLElement;
    const isClickKeyboard = keyboardContainer?.contains(target);
    const isClickModalContainer = modalContainer?.contains(target);
    const isClickPaymentAmountContainer =
      paymentAmountContainer?.contains(target);
    // 卡片区域和键盘区域继续保持显示
    if (isClickKeyboard || isClickPaymentAmountContainer || isClickModalContainer) {
      e.stopPropagation();
      // amountInput?.focus();
      return;
    }
    setIsShow(false);
  };

  const withDrawAll = () => {
    if (userInfo?.amount) {
      setAmount(String(userInfo?.amount));
    }
  };

  const clearAmount = () => {
    setAmount("");
    const amountInput = document.getElementById("amount-Input-payment");
    amountInput?.focus();
  };

  useEffect(() => {
    setUnit(formatCurrencyWithUnit(amount));
  }, [amount]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="box-border p-4">
      {/* <button onClick={() => setIsShow(pre => !pre)}>PaymentAmount</button> */}
      <div id="payment-amount-caontainer" className="bg-white p-4">
        <div className="text-[16px] ">提现金额</div>
        <div className="mt-[5px] text-[16px] text-[#ccc]  pl-[35px] min-h-[24px]">
          {unit ? `| ${unit}` : ""}
        </div>
        <div className="flex mb-[5px]">
          <div className="text-[36px]">￥</div>
          {/* 中间金额显示 */}
          <div className="flex-1">
            <input
              id="amount-Input-payment"
              maxLength={8}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={() => setIsShow(true)}
              // onBlur={() => setIsShow(false)}
              className="h-full w-full text-[32px]  outline-0 caret-[#1779fd] caret-[2px] font-500"
            />
          </div>
          {/* 右侧提现按钮和清空金额 */}
          <div className="flex flex-col justify-end items-end">
            {!amount ? (
              <>
                <div
                  onClick={withDrawAll}
                  className="text-[16px] text-[#1579FE]"
                >
                  全部提现
                </div>
                <div className="text-[14px] text-[#ccc]">
                  ￥{userInfo?.amount}
                </div>
              </>
            ) : (
              <div
                className="text-[16px] text-[#1579FE] relative top-[-20px]"
                onClick={clearAmount}
              >
                清空
              </div>
            )}
          </div>
        </div>
        <div className="text-[15px]">
          <AmountTips userInfo={userInfo} amount={amount} />
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
