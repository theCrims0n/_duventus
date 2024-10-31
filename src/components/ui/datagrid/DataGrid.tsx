import { useEmpleadosStore } from "@/app/store/empleado/empleado-store";
import { useUsuariosStore } from "@/app/store/usuario/usuario-store";
import { Empleado } from "@/interfaces/empleado/empleado"
import { Usuario } from "@/interfaces/usuario/usuario";
import Link from "next/link";

interface Props {
    empleados: Empleado[];
    titulo: string;
    columns: string[];
    usuarios: Usuario[]
    href: string;
}


export const DataGrid = ({ empleados, titulo, columns, usuarios, href }: Props) => {
    const { deleteEmpleado, getEmpleados } = useEmpleadosStore()
    const { deleteUsuario, getUsuarios } = useUsuariosStore()

    return (
        <>
            <div className="flex items-center flex justify-between grid grid-rows-1 grid-flow-col gap-4">
                <div className="row-start-1 row-end-6">
                    <Link href={href} className="block w-full btn-primary">{titulo}</Link>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 bg-slate-800 text-slate-200">
                        <tr>
                            {
                                columns?.map((column, index) => {
                                    return (
                                        <th key={index} scope="col" className="px-6 py-3">
                                            {column}
                                        </th>
                                    )
                                })
                            }
                            <th scope="col" className="px-6 py-3">
                                Editar
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Eliminar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {empleados.length > 0 && (
                                empleados.map((empleado, index) => {
                                    return (
                                        <tr key={index} className=" dark:bg-gray-100 hover:bg-gray-50 dark:hover:bg-slate-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap ">
                                                {empleado.Nombre}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {empleado.ApellidoPaterno}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {empleado.ApellidoMaterno}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {empleado.RFC}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {new Date(empleado.FechaDeNacimiento).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {empleado.TipoDeEmpleado}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {empleado.SalarioPorHora}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {empleado.HorasTrabajadas}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {empleado.Salario}
                                            </th>
                                            <td className="px-6 py-4 text-slate-800 text-right">
                                                <a x-data="{ tooltip: 'Editar' }" href={`/empleado/${empleado.Id}`}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="h-6 w-6"
                                                        x-tooltip="tooltip"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                        />
                                                    </svg>
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-slate-800 text-right">
                                                <a x-data="{ tooltip: 'Eliminar' }" onClick={() => { deleteEmpleado(empleado.Id), getEmpleados() }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="h-6 w-6"
                                                        x-tooltip="tooltip"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>)
                                })
                            )}

                            {usuarios.length > 0 && (
                                usuarios.map((usuario, index) => {
                                    return (
                                        <tr key={index} className=" dark:bg-gray-100 hover:bg-gray-50 dark:hover:bg-slate-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap ">
                                                {usuario.Nombre}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {usuario.Apellido}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {usuario.Correo}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {usuario.TipoDesc}
                                            </th>
                                            <td className="px-6 py-4 text-slate-800 text-right">
                                                <a x-data="{ tooltip: 'Editar' }" href={`/usuarios/${usuario.Id}`}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="h-6 w-6"
                                                        x-tooltip="tooltip"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                        />
                                                    </svg>
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-slate-800 text-right">
                                                <a x-data="{ tooltip: 'Eliminar' }" onClick={() => { deleteUsuario(usuario.Id), getUsuarios() }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="h-6 w-6"
                                                        x-tooltip="tooltip"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>)
                                })
                            )}
                        </>
                    </tbody>
                </table>
            </div>
        </>
    )
}
