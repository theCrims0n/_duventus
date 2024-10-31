import { EmpleadoForm } from "../registrar/ui/EmpleadoForm";

export default async function EditarEmpleado({ params }: any) {
    const { id } = await params
    return (
        <EmpleadoForm id={id} />
    )
}