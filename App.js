import { RootSiblingParent } from "react-native-root-siblings";
import { AuthProvider } from "./src/Providers/AuthProvider";

export default function App() {
  return (
    <RootSiblingParent>
    <AuthProvider />
  </RootSiblingParent>
  );
}
