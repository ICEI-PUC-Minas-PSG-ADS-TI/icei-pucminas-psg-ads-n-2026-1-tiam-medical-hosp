import { FirebaseError } from "firebase/app";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { Perfil, PerfilDTO } from "@/types/perfil";

const AUTH_REQUIRED_ERROR = "auth-required";
const collectionName = "users";

export async function getPerfil(): Promise<Perfil | null> {
    ensureAuthenticated();

    const user = auth.currentUser!;
    const perfilRef = doc(db, collectionName, user.uid);
    const snapshot = await getDoc(perfilRef);

    if (!snapshot.exists()) {
        return {
            uid: user.uid,
            nome: user.displayName ?? "",
            email: user.email ?? "",
            empresa: "",
            cargo: "",
            telefone: "",
            photoURL: user.photoURL ?? undefined,
        };
    }

    return {
        uid: user.uid,
        email: user.email ?? "",
        photoURL: user.photoURL ?? undefined,
        ...(snapshot.data() as Omit<Perfil, "uid" | "email" | "photoURL">),
    };
}

export async function savePerfil(dto: PerfilDTO): Promise<PerfilDTO> {
    ensureAuthenticated();

    const user = auth.currentUser!;
    const perfilRef = doc(db, collectionName, user.uid);

    await updateProfile(user, { displayName: dto.nome });

    await setDoc(
        perfilRef,
        {
            nome: dto.nome,
            empresa: dto.empresa,
            cargo: dto.cargo,
            telefone: dto.telefone,
        },
        { merge: true }
    );

    return dto;
}

export function getPerfilErrorMessage(error: unknown): string {
    if (isAuthRequiredError(error)) {
        return "Entre novamente para acessar o perfil.";
    }

    if (isPerfilPermissionError(error)) {
        return "Não foi possível acessar o perfil. Verifique se sua conta está autorizada e se as regras do Firebase foram publicadas.";
    }

    return "Não foi possível concluir a operação. Tente novamente em instantes.";
}

export function isPerfilPermissionError(error: unknown): boolean {
    return error instanceof FirebaseError && error.code === "permission-denied";
}

function ensureAuthenticated(): void {
    if (!auth.currentUser) {
        throw new Error(AUTH_REQUIRED_ERROR);
    }
}

function isAuthRequiredError(error: unknown): boolean {
    return error instanceof Error && error.message === AUTH_REQUIRED_ERROR;
}