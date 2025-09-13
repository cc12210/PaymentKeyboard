import { ReactNode } from "react";

const Modal = ({
  isShow,
  setIsShow,
  children,
}: {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  children: ReactNode;
}) => {
  return (
    <div className="box-border p-[20px]">
      {/* 遮罩层 */}
      <div
        onClick={() => setIsShow(false)}
        className={`fixed z-[9999] top-0  left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.55)] transition-all duration-300 ${
          isShow ? "opacity-1" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <div
        className={`fixed z-[10000] top-[50%] left-[20px] right-[20px] transform translate-y-[-50%] transition-all duration-300 ${
          isShow ? "scale-1" : "scale-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
