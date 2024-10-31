import { UsuarioForm } from "../register/ui/UsuarioForm";

export default async function EditarUsuario({ params }: any) {
    const { id } = await params
    return (
        <UsuarioForm id={id} />
    )
}