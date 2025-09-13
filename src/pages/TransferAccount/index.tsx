import PaymentKeyboard from "../../components/PaymentKeyboard";
import PaymentAmount from "../../components/PaymentAmount";
import { useState } from "react";

const TransferAccount = () => {
  const [showPayKeybord, setShowPayKeyboard] = useState(true);
  return (
    <div>
      <PaymentAmount setIsShow={setShowPayKeyboard} />
      <PaymentKeyboard isShow={showPayKeybord} setIsShow={setShowPayKeyboard} />
    </div>
  );
};

export default TransferAccount;
