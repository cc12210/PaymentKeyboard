import { useEffect, useState } from "react";
import TransferAccount from "./pages/TransferAccount";
import "./storageManage";

const str = "hello world";
const strList = str.split("");
console.log(strList);

function App() {
  const [spliceLen, setSpliceLen] = useState<number>(0);
  const [showWord, setShowWord] = useState<string>("");

  useEffect(() => {
    if (spliceLen >= str.length) return;
    const timer = setTimeout(() => {
      setShowWord((pre) => pre + strList[spliceLen]);
      console.log(spliceLen)
      setSpliceLen((pre) => pre + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [spliceLen]);
  // return <TransferAccount />;
  return <>{showWord}</>;
}

export default App;
