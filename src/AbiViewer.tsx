import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useWriteContract, useReadContract, useSimulateContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { getAddress } from "viem"; // Dùng để chuẩn hóa địa chỉ
import abi from "./abi";

const contractAddress = "0xd994572e892922bc206d33b9be05eaE739a5ee55";

const AbiViewer = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const [output, setOutput] = useState<string>("");
  const [functionInputs, setFunctionInputs] = useState<{
    [key: string]: string;
  }>({});

  // Lọc các functions từ ABI
  const contractFunctions = abi.filter((item) => item.type === "function");

  const { data: simulateData, refetch: simulateRefetch } = useSimulateContract({
    address: getAddress(contractAddress),
    abi,
    functionName: "",
    args: [],
    chainId: 1,
  });

  const { writeContractAsync } = useWriteContract();

  // Hàm xử lý đọc giá trị
  const handleReadFunction = async (functionName: string, inputs: any[]) => {
    console.log("Calling function:", functionName, "with inputs:", inputs);
    try {
      const result = await useReadContract.execute({
        address: getAddress(contractAddress),
        abi,
        functionName,
        args: inputs,
      });

      console.log("Read result:", result);
      setOutput(`Read Result: ${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      console.error("Read error:", error);
      setOutput(
        `Read Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  console.log("Read data:", readData);

  // Hàm xử lý thực thi
  const handleExecuteFunction = async (functionName: string, inputs: any[]) => {
    try {
      await simulateRefetch({
        address: getAddress(contractAddress),
        abi,
        functionName,
        args: inputs,
        chainId: 1,
      });
      if (!simulateData?.request) {
        setOutput("Simulation failed. Cannot execute function.");
        return;
      }
      const txHash = await writeContractAsync(simulateData.request);
      setOutput(`Transaction sent: ${txHash}`);
    } catch (error) {
      setOutput(
        `Execution Error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ethereum Contract Interaction</h1>

      <div className="mb-4">
        {isConnected ? (
          <div>
            <p className="mb-2">Connected as {address}</p>
            <button
              onClick={() => disconnect()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnect}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Connect Wallet
          </button>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold">Contract Functions</h2>
        <div className="grid gap-4">
          {contractFunctions.map((func) => (
            <div key={func.name} className="border p-4 rounded">
              <h3 className="font-bold">{func.name}</h3>

              {/* Input fields cho các hàm */}
              {func.inputs?.map((input) => (
                <div key={input.name} className="mt-2">
                  <label className="block text-sm">
                    {input.name} ({input.type}):
                    <input
                      type="text"
                      className="border rounded px-2 py-1 mt-1 w-full"
                      onChange={(e) =>
                        setFunctionInputs({
                          ...functionInputs,
                          [`${func.name}_${input.name}`]: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
              ))}

              {/* Nút thực thi */}
              <button
                onClick={() => {
                  const inputs =
                    func.inputs?.map(
                      (input) => functionInputs[`${func.name}_${input.name}`]
                    ) || [];
                  if (
                    func.stateMutability === "view" ||
                    func.stateMutability === "pure"
                  ) {
                    handleReadFunction(func.name, inputs);
                  } else {
                    handleExecuteFunction(func.name, inputs);
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                disabled={!isConnected}
              >
                {func.stateMutability === "view" ? "Read" : "Execute"}{" "}
                {func.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {output && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default AbiViewer;
