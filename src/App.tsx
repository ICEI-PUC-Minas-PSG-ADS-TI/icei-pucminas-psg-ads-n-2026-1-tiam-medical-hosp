import { PadroesProvider } from "@/contexts/padraoContext";
import { PerfilProvider } from "@/contexts/perfilContext";
import { FornecedoresProvider } from "./contexts/fornecedorContext";
import { AppRoutes } from "@/routes/AppRoutes";
import { CalibracoesProvider } from "./contexts/calibracoesContext";

export default function App() {
  return (
    <CalibracoesProvider>
      <PadroesProvider>
        <PerfilProvider>
          <FornecedoresProvider>
            <AppRoutes />
          </FornecedoresProvider>
        </PerfilProvider>
      </PadroesProvider>
    </CalibracoesProvider>
  );
}