import { useEffect, useState } from "react";

const PaymentAmount = ({
  setIsShow,
}: {
  setIsShow: (isShow: boolean) => void;
}) => {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("千");

  const handleDocumentClick = (e: MouseEvent) => {
    //  const editableDiv = document.getElementById('editableDiv');
    const keyboardContainer = document.getElementById(
      "payment-keyboard-container"
    );
    const paymentAmountContainer = document.getElementById(
      "payment-amount-caontainer"
    );
    const amountInput = document.getElementById("amount-Input-payment");

    const target = e.target as HTMLElement;
    const isClickKeyboard = keyboardContainer?.contains(target);
    const isClickPaymentAmountContainer =
      paymentAmountContainer?.contains(target);
    // 卡片区域和键盘区域继续保持显示
    if (isClickKeyboard || isClickPaymentAmountContainer) {
      e.stopPropagation();
      console.log(amountInput);
      amountInput?.focus();
      return;
    }
    setIsShow(false);
  };

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
        <div className="mt-[5px] text-[16px] text-[#ccc]  pl-[35px]">{unit ? `| ${unit}` : ''}</div>
        <div className="flex mb-[5px]">
          <div className="text-[36px]">￥</div>
          {/* 中间金额显示 */}
          <div className="flex-1">
            <input
              id="amount-Input-payment"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={() => setIsShow(true)}
              // onBlur={() => setIsShow(false)}
              className="h-full w-full text-[32px]  outline-0 caret-[#1779fd] caret-[2px] font-500"
            />
          </div>
          {/* 右侧提现按钮和清空金额 */}
          <div className="flex flex-col justify-end items-end">
            <div className="text-[16px] text-[#1579FE]">全部提现</div>
            <div className="text-[14px] text-[#ccc]">￥30000</div>
          </div>
        </div>
        <div className="text-[15px] text-[#999] ">
          免费额度还剩0元，超出部分收取0.1%的手续费
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
