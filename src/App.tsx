import { PadroesProvider } from "@/contexts/padraoContext";
import { PerfilProvider } from "@/contexts/perfilContext";
import { AppRoutes } from "@/routes/AppRoutes";

export default function App() {
  return (
    <PadroesProvider>
      <PerfilProvider>
        <AppRoutes />
      </PerfilProvider>
    </PadroesProvider>
  );
}