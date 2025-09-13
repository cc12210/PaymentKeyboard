import { useState } from "react";
import { KEYBOARD_LAYOUT, KeyboardItem } from "./constant";

const PaymentKeyboard = () => {
  const [amountValue, setAmountValue] = useState("");

  const handleKeyClick = (value: string) => {
    console.log(value);
  };
  return (
    <div className="fixed bottom-0 w-full">
      <div className="grid grid-cols-4 bg-white border-t-[1px] border-color-[#eee]">
        {KEYBOARD_LAYOUT.map((item: KeyboardItem, index: number) => {
          // 跳过空按钮（不渲染）
          if (!item.label.trim()) return null;

          const baseStyles =
            "flex items-center justify-center grid-cols-1 font-medium p-[20px] text-[20px]";
          const borderColor = "border border-color-[#eee]";
          const borderActive =
            item.value === "transfer"
              ? "active:bg-[#1579fee0]"
              : "active:bg-[#eee]";
          const bgColor =
            item.value === "transfer" ? "bg-[#1579FE]" : "bg-white";
          const textColor =
            item.value === "transfer" ? "text-white" : "text-black";
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
