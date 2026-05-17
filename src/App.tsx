import { PadroesProvider } from "@/contexts/padraoContext";
import { PerfilProvider } from "@/contexts/perfilContext";
import { FornecedoresProvider } from "./contexts/fornecedorContext";
import { AppRoutes } from "@/routes/AppRoutes";

export default function App() {
  return (
    <PadroesProvider>
      <PerfilProvider>
        <FornecedoresProvider>
          <AppRoutes />
        </FornecedoresProvider>
      </PerfilProvider>
    </PadroesProvider>
  );
}