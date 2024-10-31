import { type NextRequest, NextResponse } from 'next/server'
import pool from '../../../../database/db';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        if (id) {
            const [rows] = await pool.query("select *, (case when usuarios.tipo = 1 then 'Limitado' else 'Administrador' end) as TipoDesc from usuarios where id = ?", [id])
            return NextResponse.json(rows)
        }
        const [rows] = await pool.query("select *, (case when usuarios.tipo = 1 then 'Limitado' else 'Administrador' end) as TipoDesc from usuarios")
        return NextResponse.json(rows)
    }
    catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}


export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const [rows] = await pool.query(`INSERT INTO usuarios SET ? `, [body])
        return NextResponse.json(rows)
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const { Id } = await body
        const [rows] = await pool.query(`UPDATE usuarios SET ? WHERE id = ?`, [body, Id])
        return NextResponse.json(rows)
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json()
        const id = body
        const [rows] = await pool.query(`DELETE FROM usuarios WHERE id = ?`, [body])
        return NextResponse.json(rows)
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}