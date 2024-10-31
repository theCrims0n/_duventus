'use client'
import { useEmpleadosStore } from '@/app/store/empleado/empleado-store';
import { Spinner } from '@/components/ui/spinner/Spinner';
import { Empleado } from '@/interfaces/empleado/empleado';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import validateRfc from 'validate-rfc';

interface Props {
    id: number
}

export const EmpleadoForm = ({ id }: Props) => {

    const { register, handleSubmit, formState: { isLoading, isSubmitted, errors }, setError, getValues, setValue } = useForm<Empleado>()

    const { saveEmpleado, updateEmpleado, getEmpleadoById, empleado, isLoading: isLoadingStore, reset } = useEmpleadosStore()

    useEffect(() => {
        if (id > 0) {
            getEmpleadoById(id)
        }
    }, [])

    const router = useRouter()

    const onSubmit = async (data: Empleado) => {

        const { isValid } = validateRfc(data.RFC)

        if (!isValid) {
            setError('RFC', { type: 'value', message: 'El RFC no es valido' })
            return
        }

        if (id > 0) {
            data.Id = id
            await updateEmpleado(data)
        }
        else {
            await saveEmpleado(data)
        }
        await reset()
        await router.push('/empleado/list')
    }
    const SaveButton = () => {

        return (
            <>
                {
                    isLoading ?
                        <button disabled type="button" className="block w-full py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ">
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                            Loading...
                        </button>
                        :
                        <button type='submit' className="block w-full btn-primary">{id > 0 ? 'Actualizar' : 'Guardar'}</button>
                }
            </>
        )
    }

    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    var date = curr.toISOString().substring(0, 10);

    const salarioFunction = (salarioPorHora: number = 0, horaTrabajada: number = 0, tipoEmpleado: string = '') => {

        if (tipoEmpleado == '') { return }
        else if (tipoEmpleado == 'Local') {
            const resta = horaTrabajada > 48 ? 48 : 0
            const horasExtra = horaTrabajada > 48 ? (horaTrabajada - resta) : 0
            const pagoExtra = horaTrabajada > 48 ? ((horasExtra * salarioPorHora) * (horasExtra > 0 && horasExtra < 13 ? .30 : .50)) : 0
            const salario = (salarioPorHora * (horaTrabajada - horasExtra) + pagoExtra)
            setValue('Salario', salario)
        }
        else if (tipoEmpleado == 'Externo') {
            const resta = horaTrabajada > 40 ? 40 : 0
            const horasExtra = horaTrabajada > 40 ? (horaTrabajada - resta) : 0
            const pagoExtra = horaTrabajada > 40 ? (horasExtra * salarioPorHora) * .50 : 0
            const salario = (salarioPorHora * (horaTrabajada - horasExtra) + pagoExtra)
            setValue('Salario', salario)
        }
    }

    return (
        <div className='m-12'>
            <div className='m-4'>
                <Link className="btn-primary w-full" onClick={() => reset()} href={'/empleado/list'} >Volver</Link>

            </div>
            <div className='p-6 bg-white border border-gray-100 rounded-lg shadow'>
                <form onSubmit={handleSubmit(onSubmit)} >
                    {
                        isLoadingStore && id > 0
                            ?
                            <Spinner />
                            :
                            <>
                                <div className='grid gap-6 mb-6 md:grid-cols-2 '>
                                    <div>
                                        <label htmlFor="Nombre" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Nombre*</label>
                                        <input defaultValue={empleado.length > 0 ? empleado[0].Nombre : ''} maxLength={50} type="text" {...register('Nombre', { required: 'El campo es requerido' })}
                                            className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" />
                                        <p hidden={!errors.Nombre} className="h-2 mt- text-sm text-red-600 dark:text-red-500">El Nombre es requerido</p>
                                    </div>
                                    <div>
                                        <label htmlFor="ApellidoPaterno" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Apellido Paterno</label>
                                        <input defaultValue={empleado.length > 0 ? empleado[0].ApellidoPaterno : ''} maxLength={50} type="text" {...register('ApellidoPaterno')} className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" />
                                    </div>
                                    <div>
                                        <label htmlFor="ApellidoMaterno" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Apellido Materno</label>
                                        <input defaultValue={empleado.length > 0 ? empleado[0].ApellidoMaterno : ''} maxLength={50} type="text" {...register('ApellidoMaterno')} className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" />
                                    </div>
                                    <div>
                                        <label htmlFor="RFC" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>RFC*</label>
                                        <input defaultValue={empleado.length > 0 ? empleado[0].RFC : ''} maxLength={50} type="text" {...register('RFC', { required: 'El RFC es requerido' })} className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" />
                                        <p hidden={!errors.RFC} className="h-2 mt- text-sm text-red-600 dark:text-red-500">{errors.RFC?.message}</p>

                                    </div>
                                    <div>
                                        <label htmlFor="FechaDeNacimiento" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Fecha de nacimiento</label>
                                        <input defaultValue={empleado.length > 0 ? date : date} type="date" {...register('FechaDeNacimiento')} className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" />
                                    </div>
                                    <div>
                                        <label htmlFor="TipoDeEmpleado" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Tipo de Empleado*</label>
                                        <select defaultValue={empleado.length > 0 ? empleado[0].TipoDeEmpleado : ''} {...register('TipoDeEmpleado', { required: 'Este campo es requerido', onChange: () => { setValue('Salario', 0), setValue('SalarioPorHora', 0), setValue('HorasTrabajadas', 0) } })} className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" >
                                            <option value={''}></option>
                                            <option value="Local">Local</option>
                                            <option value="Externo">Externo</option>
                                        </select>
                                        <p hidden={!errors.TipoDeEmpleado} className="h-2 mt- text-sm text-red-600 dark:text-red-500">El Tipo de Empleado es requerido</p>

                                    </div>
                                    <div>
                                        <label htmlFor="SalarioPorHora" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Salario Por Hora*</label>
                                        <input defaultValue={empleado.length > 0 ? empleado[0].SalarioPorHora : ''} maxLength={50} type="number" {...register('SalarioPorHora', { required: 'Este campo es requerido', onChange: ({ target }) => { salarioFunction(target.value, getValues('HorasTrabajadas'), getValues('TipoDeEmpleado')) } })} className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" />
                                        <p hidden={!errors.SalarioPorHora} className="h-2 mt- text-sm text-red-600 dark:text-red-500">El Salario Por Hora es requerido</p>
                                    </div>
                                    <div>
                                        <label htmlFor="HorasTrabajadas" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Horas Trabajadas*</label>
                                        <input defaultValue={empleado.length > 0 ? empleado[0].HorasTrabajadas : ''} maxLength={50} type="number" {...register('HorasTrabajadas', { required: 'Este campo es requerido', onChange: ({ target }) => { salarioFunction(getValues('SalarioPorHora'), target.value, getValues('TipoDeEmpleado')) } })} className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" />
                                        <p hidden={!errors.HorasTrabajadas} className="h-2 mt- text-sm text-red-600 dark:text-red-500">Las Horas Trabajadas son requeridas</p>
                                    </div>
                                    <div>
                                        <label htmlFor="Salario" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Salario</label>
                                        <input defaultValue={empleado.length > 0 ? empleado[0].Salario : ''} maxLength={50} type="number" {...register('Salario')} className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" />
                                    </div>
                                </div>

                                <div className='mb-12'>
                                    <SaveButton />
                                </div>
                            </>
                    }
                </form>
            </div>
        </div>
    )
}
