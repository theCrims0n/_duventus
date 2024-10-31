import { create } from 'zustand'
import axios from 'axios';
import { Usuario } from '@/interfaces/usuario/usuario';

interface State {
    usuarios: Array<Usuario>;
    usuario: Array<Usuario>;
    isLoading: Boolean;
    error: '',
    getUsuarios: () => void;
    getUsuarioById: (id: number) => void;
    saveUsuario: (data: Usuario) => void
    updateUsuario: (data: Usuario) => void;
    deleteUsuario: (id: number) => void;
    reset: () => void;
}

export const useUsuariosStore = create<State>((set, get) => ({
    usuarios: [],
    usuario: [],
    isLoading: true,
    error: '',
    getUsuarios: async () => {
        set({ isLoading: true })
        try {

            const result = await axios.get('/api/usuarios')
            return set(state => ({ ...state, usuarios: result.data, isLoading: false }))
        }
        catch (error) {
            set({ isLoading: false })
            console.log(error)
        }
    },
    saveUsuario: async (data) => {
        set({ isLoading: true })
        try {
            const result = await axios.post('/api/usuarios', data)
            if (result.status != 200) {
                set({ isLoading: false, error: result.request })
            }
            set({ isLoading: false })
        }
        catch (error) {
            set({ isLoading: false })
        }
    },
    updateUsuario: async (data) => {
        set({ isLoading: true })
        try {
            const result = await axios.put('/api/usuarios', data)
            if (result.status != 200) {
                set({ isLoading: false, error: result.request })
            }
            set({ isLoading: false })
        }
        catch (error) {
            set({ isLoading: false })
        }
    },
    getUsuarioById: async (id) => {
        set({ isLoading: true })
        try {
            const result = await axios.get(`/api/usuarios?id=${id}`)
            if (result.status != 200) {
                set({ isLoading: false, error: result.request })
            }
            return set(state => ({ ...state, usuario: result.data, isLoading: false }))
        }
        catch (error) {
            set({ isLoading: false })
        }
    },
    deleteUsuario: async (id) => {
        set({ isLoading: true })
        try {
            const result = await axios.delete('/api/usuarios', { data: id })
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
            usuarios: [],
            usuario: [],
            error: '',
        });
    },
}))