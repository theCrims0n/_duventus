'use client'
import { DataGrid } from '@/components/ui/datagrid/DataGrid';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner/Spinner';
import { useEmpleadosStore } from '@/app/store/empleado/empleado-store';

export default function List() {

    const { empleados, isLoading, getEmpleados } = useEmpleadosStore()

    useEffect(() => {
        getEmpleados()
    }, [])

    const columns = ['Nombre', 'Apellido Paterno', 'Apellido Materno', 'RFC', 'Fecha de nacimiento', 'Tipo de empleado', 'Salar por hora', 'Horas trabajadas', 'Salario']

    return (
        <div className='m-8 ... fade-in'>
            {
                isLoading
                    ?
                    <Spinner />
                    :
                    <DataGrid empleados={empleados} titulo={'Crear Empleado'} columns={columns} usuarios={[]}  href='/empleado/register'/>
            }
        </div>
    )
}