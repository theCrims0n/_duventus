import { type NextRequest, NextResponse } from 'next/server'
import pool from '../../../../database/db';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        if (id) {
            const [rows] = await pool.query("select *, date_format(FechaDeNacimiento, '%Y/%m/%d') as FechaDeNacimiento from empleados where id = ?", [id])
            return NextResponse.json(rows)
        }
        const [rows] = await pool.query('select * from empleados')
        return NextResponse.json(rows)
    }
    catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}


export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const [rows] = await pool.query(`INSERT INTO empleados SET ? `, [body])
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
        console.log(body)
        const { Id } = await body
        const [rows] = await pool.query(`UPDATE empleados SET ? WHERE id = ?`, [body, Id])
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
        const [rows] = await pool.query(`DELETE FROM empleados WHERE id = ?`, [body])
        return NextResponse.json(rows)
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}