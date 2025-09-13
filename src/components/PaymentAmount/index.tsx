const PaymentAmount = ({ setIsShow }: { setIsShow: (isShow: boolean) => void }) => {
  return <div className="text-[16px]">
    <button onClick={() => setIsShow(pre => !pre)}>PaymentAmount</button>
  </div>;
};

export default PaymentAmount;
