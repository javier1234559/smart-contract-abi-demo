import { WagmiConfig } from "wagmi";
import { config } from "./wagmi";
import SimpleAbiViewer from "./SimpleAbiViewer";

function App() {
  return (
    <WagmiConfig config={config}>
      <SimpleAbiViewer />
    </WagmiConfig>
  );
}

export default App;
