import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Listar todas las especialidades
export async function GET() {
  try {
    const especialidades = await prisma.especialidad.findMany({
      include: {
        medicamentos: false // o true si quieres incluir medicamentos
      }
    })
    return NextResponse.json(especialidades)
  } catch (error) {
    console.error('Error fetching especialidades:', error)
    return NextResponse.json(
      { error: 'Error al obtener especialidades' },
      { status: 500 }
    )
  }
}

// POST - Crear una nueva especialidad
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const nuevaEspecialidad = await prisma.especialidad.create({
      data: {
        descripcionEsp: data.descripcionEsp
        // otros campos si tienes
      }
    })

    return NextResponse.json(nuevaEspecialidad, { status: 201 })
  } catch (error) {
    console.error('Error creating especialidad:', error)
    return NextResponse.json(
      { error: 'Error al crear especialidad' },
      { status: 500 }
    )
  }
}
