import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TextInput, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MedicalButton } from "@/components/medical/MedicalButton";
import { usePadroes } from "@/contexts/padraoContext";
import { usePerfil } from "@/contexts/perfilContext";
import { MedicalColors, MedicalSpacing } from "@/constants/medical-ui";
import { Padrao, PadraoDTO } from "@/types/padrao";
import { BottomTab } from "@/components/dashboard/BottomTab";
import { RootStackParamList } from "@/routes/AppRoutes";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PadraoFormField = "nome" | "fabricante" | "modelo" | "tag" | "numSerie" | "patrimonio" | "setor";

const initialPadraoForm: PadraoDTO = {
  nome: "",
  fabricante: "",
  modelo: "",
  tag: "",
  numSerie: "",
  patrimonio: "",
  setor: "",
};

const formFields: { key: PadraoFormField; placeholder: string }[] = [
  { key: "nome", placeholder: "Nome" },
  { key: "fabricante", placeholder: "Fabricante" },
  { key: "modelo", placeholder: "Modelo" },
  { key: "tag", placeholder: "TAG" },
  { key: "numSerie", placeholder: "Número de série" },
  { key: "patrimonio", placeholder: "Patrimônio" },
  { key: "setor", placeholder: "Setor" },
];

interface PadroesHeaderProps {
  form: PadraoDTO;
  isFormOpen: boolean;
  isEditing: boolean;
  loading: boolean;
  isGestor: boolean;
  busca: string;
  onBuscaChange: (value: string) => void;
  onChange: (field: keyof PadraoDTO, value: string) => void;
  onSubmit: () => void;
  onCancelEdit: () => void;
  onToggleForm: () => void;
}

interface PadraoFormProps {
  form: PadraoDTO;
  loading: boolean;
  submitTitle: string;
  showCancel: boolean;
  onChange: (field: keyof PadraoDTO, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

interface PadraoCardProps {
  item: Padrao;
  onEdit: (padrao: Padrao) => void;
  onDelete: (id: string) => void;
  onOpenCalibracoes: (padrao: Padrao) => void;
  isGestor: boolean;
}

export default function PadroesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { perfil } = usePerfil();
  const isGestor = perfil?.isGestor ?? false;

  const { padroes, loading, loadPadroes: loadPadroes, addPadrao, editPadrao, removePadrao } = usePadroes();
  const [form, setForm] = useState<PadraoDTO>(initialPadraoForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPadraoId, setEditingPadraoId] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const isEditing = editingPadraoId !== null;

  const padroesFiltrados = padroes.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.tag.toLowerCase().includes(busca.toLowerCase()) ||
    p.patrimonio.toLowerCase().includes(busca.toLowerCase())
  );

  useEffect(() => {
    loadPadroes();
  }, []);

  function handleChange(field: keyof PadraoDTO, value: string) {
    setForm((currentForm: PadraoDTO) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function resetFormState() {
    setForm(initialPadraoForm);
    setEditingPadraoId(null);
    setIsFormOpen(false);
  }

  function handleStartEdit(padrao: Padrao) {
    setForm(getPadraoFormFromItem(padrao));
    setEditingPadraoId(padrao.id);
    setIsFormOpen(true);
  }

  function handleCancelEdit() {
    resetFormState();
  }

  function handleToggleForm() {
    if (isFormOpen) {
      if (isEditing) {
        handleCancelEdit();
        return;
      }

      setIsFormOpen(false);
      return;
    }

    setIsFormOpen(true);
  }

  async function handleSubmitForm() {
    if (loading) {
      return;
    }

    const trimmedForm = trimPadraoForm(form);

    if (!isPadraoFormValid(trimmedForm)) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    const saved = editingPadraoId
      ? await editPadrao(editingPadraoId, trimmedForm)
      : await addPadrao(trimmedForm);

    if (saved) {
      resetFormState();
    }
  }

  async function handleDeletePadrao(id: string) {
    Alert.alert("Excluir", "Deseja excluir este padrão?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await removePadrao(id);
        },
      },
    ]);
  }

  function handleOpenCalibracoes(padrao: Padrao) {
    navigation.navigate("Calibracoes", { padraoId: padrao.id });
  }

  return (
    <>
      <FlatList
        style={styles.container}
        data={padroesFiltrados}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <PadroesHeader
            form={form}
            isFormOpen={isFormOpen}
            isEditing={isEditing}
            loading={loading}
            isGestor={isGestor}
            busca={busca}
            onBuscaChange={setBusca}
            onChange={handleChange}
            onSubmit={handleSubmitForm}
            onCancelEdit={handleCancelEdit}
            onToggleForm={handleToggleForm}
          />
        }
        ListEmptyComponent={!loading ? <EmptyState /> : null}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <PadraoCard
            item={item}
            onEdit={handleStartEdit}
            onDelete={handleDeletePadrao}
            onOpenCalibracoes={handleOpenCalibracoes}
            isGestor={isGestor}
          />
        )}
      />
      <BottomTab activeKey="padroes" />
    </>
  );
}

function PadroesHeader({
  form,
  isFormOpen,
  isEditing,
  loading,
  isGestor,
  busca,
  onBuscaChange,
  onChange,
  onSubmit,
  onCancelEdit,
  onToggleForm,
}: PadroesHeaderProps) {
  const formTitle = isEditing ? "Editar padrão" : "Cadastrar padrão";
  const formSubtitle = isEditing
    ? "Atualize os dados do padrão selecionado."
    : "Informe os dados do padrão para adicionar ao estoque.";
  const submitTitle = isEditing ? "Salvar alterações" : "Cadastrar padrão";

  return (
    <View style={styles.header}>
      <View style={styles.heading}>
        <Text style={styles.title}>Padrões</Text>
        <Text style={styles.subtitle}>
          Consulte, cadastre e mantenha os instrumentos de calibração organizados.
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nome, TAG ou patrimônio..."
        placeholderTextColor={MedicalColors.muted}
        value={busca}
        onChangeText={onBuscaChange}
      />

      {loading && <Text style={styles.status}>Carregando...</Text>}

      {isGestor && (
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <View style={styles.formHeaderText}>
              <Text style={styles.formTitle}>{formTitle}</Text>
              <Text style={styles.formSubtitle}>{formSubtitle}</Text>
            </View>
            <MedicalButton
              title={isFormOpen ? "Fechar" : "Abrir"}
              variant="secondary"
              onPress={onToggleForm}
            />
          </View>

          {isFormOpen && (
            <PadraoForm
              form={form}
              loading={loading}
              submitTitle={submitTitle}
              showCancel={isEditing}
              onChange={onChange}
              onSubmit={onSubmit}
              onCancel={onCancelEdit}
            />
          )}
        </View>
      )}
    </View>
  );
}

function PadraoForm({
  form,
  loading,
  submitTitle,
  showCancel,
  onChange,
  onSubmit,
  onCancel,
}: PadraoFormProps) {
  return (
    <View style={styles.form}>
      {formFields.map((field) => (
        <TextInput
          key={field.key}
          placeholder={field.placeholder}
          placeholderTextColor={MedicalColors.muted}
          value={form[field.key]}
          onChangeText={(value) => onChange(field.key, value)}
          onSubmitEditing={Keyboard.dismiss}
          returnKeyType="done"
          submitBehavior="blurAndSubmit"
          style={styles.input}
        />
      ))}

      <MedicalButton
        title={loading ? "Salvando..." : submitTitle}
        onPress={onSubmit}
        disabled={loading}
      />

      {showCancel && (
        <MedicalButton
          title="Cancelar edição"
          variant="secondary"
          onPress={onCancel}
          disabled={loading}
        />
      )}
    </View>
  );
}

function PadraoCard({ item, onEdit, onDelete, onOpenCalibracoes, isGestor }: PadraoCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.tag}>{item.tag}</Text>
      </View>

      <View style={styles.metaGrid}>
        <InfoBlock label="Patrimônio" value={item.patrimonio} />
        <InfoBlock label="Série" value={item.numSerie} />
        <InfoBlock label="Fabricante" value={item.fabricante} />
        <InfoBlock label="Modelo" value={item.modelo} />
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.setor}>Setor: {item.setor}</Text>
        <MedicalButton
          title="Calibrações"
          variant="secondary"
          onPress={() => onOpenCalibracoes(item)}
        />
        {isGestor && (
          <>
            <MedicalButton
              title="Editar"
              variant="secondary"
              onPress={() => onEdit(item)}
            />
            <MedicalButton
              title="Excluir"
              variant="danger"
              onPress={() => onDelete(item.id)}
            />
          </>
        )}
      </View>
    </View>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoBlock}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>Nenhum padrão cadastrado</Text>
      <Text style={styles.emptyText}>
        Abra o formulário acima para adicionar o primeiro padrão ao estoque.
      </Text>
    </View>
  );
}

function getPadraoFormFromItem(padrao: Padrao): PadraoDTO {
  return {
    nome: padrao.nome,
    fabricante: padrao.fabricante,
    modelo: padrao.modelo,
    tag: padrao.tag,
    numSerie: padrao.numSerie,
    patrimonio: padrao.patrimonio,
    setor: padrao.setor,
  };
}

function trimPadraoForm(form: PadraoDTO): PadraoDTO {
  return {
    nome: form.nome.trim(),
    fabricante: form.fabricante.trim(),
    modelo: form.modelo.trim(),
    tag: form.tag.trim(),
    numSerie: form.numSerie.trim(),
    patrimonio: form.patrimonio.trim(),
    setor: form.setor.trim(),
  };
}

function isPadraoFormValid(form: PadraoDTO) {
  return Object.values(form).every((value) => value.length > 0);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MedicalColors.background,
  },
  content: {
    gap: MedicalSpacing.md,
    padding: MedicalSpacing.xl,
  },
  header: {
    gap: MedicalSpacing.lg,
  },
  heading: {
    gap: MedicalSpacing.xs,
  },
  eyebrow: {
    color: MedicalColors.primaryDark,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    color: MedicalColors.text,
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: MedicalColors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  status: {
    color: MedicalColors.muted,
  },
  formCard: {
    gap: MedicalSpacing.md,
    borderWidth: 1,
    borderColor: MedicalColors.border,
    borderRadius: 8,
    padding: MedicalSpacing.lg,
    backgroundColor: MedicalColors.surface,
  },
  formHeader: {
    gap: MedicalSpacing.md,
  },
  formHeaderText: {
    gap: MedicalSpacing.xs,
  },
  formTitle: {
    color: MedicalColors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  formSubtitle: {
    color: MedicalColors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  form: {
    gap: MedicalSpacing.md,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: MedicalColors.borderStrong,
    borderRadius: 8,
    padding: MedicalSpacing.md,
    backgroundColor: MedicalColors.surface,
    color: MedicalColors.text,
  },
  card: {
    gap: MedicalSpacing.md,
    borderWidth: 1,
    borderColor: MedicalColors.border,
    borderRadius: 8,
    padding: MedicalSpacing.lg,
    backgroundColor: MedicalColors.surface,
  },
  cardHeader: {
    gap: MedicalSpacing.sm,
  },
  name: {
    color: MedicalColors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  tag: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: MedicalSpacing.md,
    paddingVertical: MedicalSpacing.xs,
    backgroundColor: MedicalColors.primarySoft,
    color: MedicalColors.primaryDark,
    fontSize: 12,
    fontWeight: "800",
  },
  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: MedicalSpacing.sm,
  },
  infoBlock: {
    minWidth: "46%",
    flexGrow: 1,
    borderWidth: 1,
    borderColor: MedicalColors.border,
    borderRadius: 8,
    padding: MedicalSpacing.md,
    backgroundColor: MedicalColors.background,
  },
  infoLabel: {
    color: MedicalColors.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  infoValue: {
    marginTop: MedicalSpacing.xs,
    color: MedicalColors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  cardFooter: {
    gap: MedicalSpacing.md,
  },
  setor: {
    color: MedicalColors.muted,
    fontSize: 14,
  },
  emptyState: {
    gap: MedicalSpacing.sm,
    borderWidth: 1,
    borderColor: MedicalColors.border,
    borderRadius: 8,
    padding: MedicalSpacing.lg,
    backgroundColor: MedicalColors.surface,
  },
  emptyTitle: {
    color: MedicalColors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  emptyText: {
    color: MedicalColors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  searchInput: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: MedicalColors.border,
    borderRadius: 8,
    paddingHorizontal: MedicalSpacing.md,
    backgroundColor: MedicalColors.surface,
    color: MedicalColors.text,
  },
});
