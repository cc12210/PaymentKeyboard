import { useState } from "react";
import { KEYBOARD_LAYOUT } from "./constant";

const PaymentKeyboard = () => {
  const [amountValue, setAmountValue] = useState("");

  const handleKeyClick = (value: string) => {
    console.log(value);
  };
  return (
    <div className="fixed bottom-0 w-full">
      <div className="grid grid-cols-4 gap-2 p-2 bg-white rounded-lg shadow-lg">
        {KEYBOARD_LAYOUT.map((item, index) => {
          // 跳过空按钮（不渲染）
          if (!item.label.trim()) return null;

          const baseStyles =
            "flex items-center justify-center font-medium rounded-lg";
          const bgColor =
            item.label === ""
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800";

          return (
            <button
              key={index}
              onClick={() => handleKeyClick(item.value)}
              className={`${baseStyles} ${bgColor}`}
              style={{
                gridColumn: `span ${item.colSpan}`,
                gridRow: `span ${item.rowSpan}`,
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentKeyboard;
