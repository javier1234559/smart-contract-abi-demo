import { useState } from "react";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useChainId,
} from "wagmi";
import abi from "./abi";

const CONTRACT_ADDRESS = "0xd994572e892922bc206d33b9be05eaE739a5ee55";

const SimpleAbiViewer = () => {
  const [inputs, setInputs] = useState<{
    [functionName: string]: { [inputIndex: number]: string };
  }>({});
  const [results, setResults] = useState<{ [key: string]: string }>({});
  const [currentFunction, setCurrentFunction] = useState<string>("");

  const chainId = useChainId();
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const { data: readData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: currentFunction,
    args: currentFunction ? inputs[currentFunction]?.split(",") : undefined,
  });

  const { isSuccess } = useWaitForTransactionReceipt({
    hash: readData?.hash,
  });

  const handleInputChange = (
    functionName: string,
    index: number,
    value: string
  ) => {
    setInputs((prev) => ({
      ...prev,
      [functionName]: {
        ...(prev[functionName] || {}),
        [index]: value,
      },
    }));
  };

  const callFunction = async (func: any) => {
    const functionInputs =
      func.inputs?.map((_, index) => inputs[func.name]?.[index] || "") || [];

    console.log("functionInputs", functionInputs, "inputs state:", inputs);

    if (func.stateMutability === "view" || func.stateMutability === "pure") {
      setCurrentFunction(func.name);
      if (readData) {
        console.log("readData", readData);
        setResults((prev) => ({
          ...prev,
          [func.name]: readData.toString(),
        }));
      }
    } else {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: func.name,
        args: functionInputs,
        chainId,
        account: address,
        chain: undefined,
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Smart Contract Interaction</h1>
      <div className="space-y-4">
        {abi.map((func) => (
          <div key={func.name} className="p-4 border rounded">
            <h2 className="text-lg font-semibold">
              {func.name}
              <span className="text-sm text-gray-500 ml-2">
                ({func.stateMutability})
              </span>
            </h2>
            {func.inputs?.map((input, index) => (
              <div key={index} className="mt-2">
                <label className="block">
                  {input.name || `Input ${index + 1}`} ({input.type}):
                  <input
                    type="text"
                    className="border rounded px-2 py-1 mt-1 w-full"
                    placeholder={`Enter ${input.type}`}
                    onChange={(e) =>
                      handleInputChange(func.name, index, e.target.value)
                    }
                    value={inputs[func.name]?.[index] || ""}
                  />
                </label>
              </div>
            ))}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => callFunction(func)}
            >
              Call {func.name}
            </button>
            {results[func.name] && (
              <div className="mt-2 text-green-600">
                Result: {results[func.name]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleAbiViewer;
