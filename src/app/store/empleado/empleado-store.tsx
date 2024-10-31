import { create } from 'zustand'
import axios from 'axios';
import { persist } from "zustand/middleware";
import { Empleado } from '@/interfaces/empleado/empleado';

interface State {
    empleados: Array<Empleado>;
    empleado: Array<Empleado>;
    isLoading: Boolean;
    error: '',
    getEmpleados: () => void;
    getEmpleadoById: (id: number) => void;
    saveEmpleado: (data: Empleado) => void
    updateEmpleado: (data: Empleado) => void;
    deleteEmpleado: (id: number) => void;
    reset: () => void;
}

export const useEmpleadosStore = create<State>((set, get) => ({
    empleados: [],
    empleado: [],
    isLoading: true,
    error: '',
    getEmpleados: async () => {
        set({ isLoading: true })
        try {

            const result = await axios.get('/api/empleados')
            return set(state => ({ ...state, empleados: result.data, isLoading: false }))
        }
        catch (error) {
            set({ isLoading: false })
            console.log(error)
        }
    },
    saveEmpleado: async (data) => {
        set({ isLoading: true })
        try {
            const result = await axios.post('/api/empleados', data)
            if (result.status != 200) {
                set({ isLoading: false, error: result.request })
            }
            set({ isLoading: false })
        }
        catch (error) {
            set({ isLoading: false })
        }
    },
    updateEmpleado: async (data) => {
        set({ isLoading: true })
        try {
            const result = await axios.put('/api/empleados', data)
            if (result.status != 200) {
                set({ isLoading: false, error: result.request })
            }
            set({ isLoading: false })
        }
        catch (error) {
            set({ isLoading: false })
        }
    },
    getEmpleadoById: async (id) => {
        set({ isLoading: true })
        try {
            const result = await axios.get(`/api/empleados?id=${id}`)
            if (result.status != 200) {
                set({ isLoading: false, error: result.request })
            }
            return set(state => ({ ...state, empleado: result.data, isLoading: false }))
        }
        catch (error) {
            set({ isLoading: false })
        }
    },
    deleteEmpleado: async (id) => {
        set({ isLoading: true })
        try {
            const result = await axios.delete('/api/empleados', { data: id })
            if (result.status != 200) {
                set({ isLoading: false, error: result.request })
            }
            set({ isLoading: false })
        }
        catch (error) {
            set({ isLoading: false })
        }
    },
    reset: () => {
        set({
            empleados: [],
            empleado: [],
            error: '',
        });
    },
}))