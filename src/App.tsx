import { PadroesProvider } from "@/contexts/padraoContext";
import { AppRoutes } from "@/routes/AppRoutes";

export default function App() {
  return (
    <PadroesProvider>
      <AppRoutes />
    </PadroesProvider>
  );
}