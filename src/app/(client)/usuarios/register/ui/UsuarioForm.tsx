'use client'
import { useUsuariosStore } from '@/app/store/usuario/usuario-store';
import { Spinner } from '@/components/ui/spinner/Spinner';
import { Usuario } from '@/interfaces/usuario/usuario';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
    id: number
}

export const UsuarioForm = ({ id }: Props) => {

    const { register, handleSubmit, formState: { isLoading, isSubmitted, errors }, setError, getValues, setValue } = useForm<Usuario>()

    const { saveUsuario, updateUsuario, getUsuarioById, usuario, isLoading: isLoadingStore, reset } = useUsuariosStore()

    useEffect(() => {
        if (id > 0) {
            getUsuarioById(id)
        }
    }, [])

    const router = useRouter()

    const onSubmit = async (data: Usuario) => {

        if (id > 0) {
            data.Id = id
            await updateUsuario(data)
        }
        else {
            await saveUsuario(data)
        }
        await reset()
        await router.push('/usuarios/list')
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


    return (
        <div className='m-12'>
            <div className='m-4'>
                <Link className="btn-primary w-full" onClick={() => reset()} href={'/usuarios/list'} >Volver</Link>

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
                                        <input defaultValue={usuario.length > 0 ? usuario[0].Nombre : ''} maxLength={50} type="text" {...register('Nombre', { required: 'El campo es requerido' })}
                                            className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" />
                                        <p hidden={!errors.Nombre} className="h-2 mt- text-sm text-red-600 dark:text-red-500">El Nombre es requerido</p>
                                    </div>
                                    <div>
                                        <label htmlFor="Apellido" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Apellido*</label>
                                        <input defaultValue={usuario.length > 0 ? usuario[0].Apellido : ''} maxLength={50} type="text" {...register('Apellido', { required: 'El campo es requerido' })}
                                            className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" />
                                        <p hidden={!errors.Apellido} className="h-2 mt- text-sm text-red-600 dark:text-red-500">El Apellido es requerido</p>
                                    </div>
                                    <div>
                                        <label htmlFor="Correo" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Correo*</label>
                                        <input type='email' defaultValue={usuario.length > 0 ? usuario[0].Correo : ''} maxLength={50} {...register('Correo', { required: 'El campo es requerido' })}
                                            className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" />
                                        <p hidden={!errors.Correo} className="h-2 mt- text-sm text-red-600 dark:text-red-500">El Correo es requerido</p>
                                    </div>
                                    <div>
                                        <label htmlFor="Contrasena" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Contrasena*</label>
                                        <input defaultValue={usuario.length > 0 ? usuario[0].Contrasena : ''} maxLength={50} type="text" {...register('Contrasena', { required: 'El campo es requerido' })}
                                            className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" />
                                        <p hidden={!errors.Contrasena} className="h-2 mt- text-sm text-red-600 dark:text-red-500">La Contrasena es requerido</p>
                                    </div>

                                    <div>
                                        <label htmlFor="TipoDeEmpleado" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Tipo de Empleado*</label>
                                        <select defaultValue={usuario.length > 0 ? usuario[0].Tipo : ''} {...register('Tipo', { required: 'Este campo es requerido' })} className="px-5 py-2 border text-sm rounded-lg block w-full p-2.5 bg-gray-200 rounded mb-5" >
                                            <option value={''}></option>
                                            <option value={1}>Limitado</option>
                                            <option value={2}>Administrador</option>
                                        </select>
                                        <p hidden={!errors.Tipo} className="h-2 mt- text-sm text-red-600 dark:text-red-500">El Tipo es requerido</p>
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
