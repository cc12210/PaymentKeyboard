import { useState } from "react";
import { KEYBOARD_LAYOUT, KeyboardItem } from "./constant";

interface IPaymentKeyboardProps {
  isShow: boolean;
  amount: string;
  setAmount: (amount: string) => void;
  setIsShow: (isShow: boolean) => void;
  withDrawAmount: () => void;
  disabled?: boolean;
}

const PaymentKeyboard = ({
  isShow,
  setIsShow,
  amount,
  setAmount,
  withDrawAmount,
  disabled = false,
}: IPaymentKeyboardProps) => {
  // 定位光标
  const setInputRange = (inputField: HTMLInputElement, cursorPos: number) => {
    inputField?.focus();
    setTimeout(() => {
      inputField.setSelectionRange(cursorPos, cursorPos);
    }, 10);
  };
  // 处理键盘输入
  const processDelete = () => {
    const inputField = document.getElementById(
      "amount-Input-payment"
    ) as HTMLInputElement;
    // 获取当前光标位置
    const cursorPos = inputField.selectionStart;
    if (!cursorPos || cursorPos === 0) {
      return;
    }
    const newValue =
      amount.substring(0, cursorPos - 1) + amount.substring(cursorPos);
    setAmount(newValue);
    const newCaretPos = cursorPos - 1;
    setInputRange(inputField, newCaretPos);
  };

  const checkInputAmount = (value: string) => {
    const validReg = /^(0|[1-9]\d{0,7})(\.\d{0,2})?$/;

    return validReg.test(value) ? value : "";
  };
  // 处理输入
  const processAmountInput = (value: string) => {
    const amountInput = document.getElementById(
      "amount-Input-payment"
    ) as HTMLInputElement;
    const cursorPos: any = amountInput?.selectionStart;
    const newValue: string = checkInputAmount(
      amount.substring(0, cursorPos) + value + amount.substring(cursorPos)
    );
    if (newValue) {
      setAmount(newValue);
      setInputRange(amountInput, cursorPos + 1);
    } else {
      setInputRange(amountInput, cursorPos);
    }
    // const
  };
  const handleKeyClick = (value: string) => {
    // 未输入金额和disable判读成立则禁止提交
    if (value === "transfer" && (!Number(amount) || disabled)) {
      return;
    }
    // 处理键盘输入
    if (value === "delete") {
      processDelete();
    } else if (value === "transfer") {
      withDrawAmount();
    } else {
      processAmountInput(value);
    }
  };
  return (
    <div
      id="payment-keyboard-container"
      className={`fixed bottom-0 w-full transform transition-transform duration-300 ease-in-out ${
        isShow ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-4 bg-white border-t-[1px] border-color-[#eee]">
        {KEYBOARD_LAYOUT.map((item: KeyboardItem, index: number) => {
          // 跳过空按钮
          if (!item.label.trim()) return null;
          // 转账按钮需要特殊处理
          const isTransfer = item.value === "transfer";
          const baseStyles =
            "flex items-center justify-center grid-cols-1 font-medium p-[20px] text-[20px] font-bold";
          const borderColor = "border border-color-[#eee]";
          let canTransfer = Number(amount) > 0 && !disabled;
          const bgColor = isTransfer
            ? canTransfer
              ? "bg-[#1579FE]"
              : "bg-[#eee]"
            : "bg-white";

          const borderActive = isTransfer
            ? canTransfer && "active:bg-[#1579fee0]"
            : "active:bg-[#eee]";

          const textColor = isTransfer
            ? canTransfer
              ? "text-white"
              : "text-[#ccc]"
            : "text-black";

          return (
            <div
              key={index}
              onClick={() => handleKeyClick(item.value)}
              className={`${baseStyles} ${borderColor} ${borderActive} ${bgColor} ${textColor}`}
              style={{
                gridColumn: `span ${item.colSpan}`,
                gridRow: `span ${item.rowSpan}`,
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentKeyboard;
