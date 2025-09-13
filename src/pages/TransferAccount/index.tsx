import PaymentKeyboard from "../../components/PaymentKeyboard";
import PaymentAmount from "../../components/PaymentAmount";
import { useState } from "react";

const TransferAccount = () => {
  const [amount, setAmount] = useState("");
  const [showPayKeybord, setShowPayKeyboard] = useState(true);

  return (
    <div>
      <PaymentAmount setIsShow={setShowPayKeyboard} amount={amount} setAmount={setAmount} />
      <PaymentKeyboard isShow={showPayKeybord} amount={amount} setAmount={setAmount} setIsShow={setShowPayKeyboard} />
    </div>
  );
};

export default TransferAccount;
