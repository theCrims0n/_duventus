'use client'
import { DataGrid } from '@/components/ui/datagrid/DataGrid';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner/Spinner';
import { useEmpleadosStore } from '@/app/store/empleado/empleado-store';
import { useUsuariosStore } from '@/app/store/usuario/usuario-store';

export default function List() {

    const { usuarios, isLoading, getUsuarios } = useUsuariosStore()
    const columns = ['Nombre', 'Apellido', 'Correo', 'Tipo']
    useEffect(() => {
        getUsuarios()
    }, [])

    return (
        <div className='m-8 ... fade-in'>
            {
                isLoading
                    ?
                    <Spinner />
                    :
                    <DataGrid empleados={[]} titulo={'Crear Usuario'} columns={columns} usuarios={usuarios} href='/usuarios/register'/>
            }
        </div>
    )
}