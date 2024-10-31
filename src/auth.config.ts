import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import pool from '../database/db'
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: 'auth/new-account'
    },
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);
            if (!parsedCredentials.success) return null
            const { email, password } = parsedCredentials.data;
            const [userquery]: any = await pool.query(`select correo as email, contrasena as password, concat(nombre, ' ', apellido) as name, apellido from usuarios where correo = lower('${email}') and contrasena = '${password}'`)
            
            if (userquery[0] == undefined) {
                return null
            }
            const user = userquery[0]
            return user
        },
    }),]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)