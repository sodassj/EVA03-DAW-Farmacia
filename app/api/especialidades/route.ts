import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url)
    // pathname = /api/especialidades/123
    const idStr = pathname.split('/').pop()
    const id = Number(idStr)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    const especialidad = await prisma.especialidad.findUnique({
      where: { codEspec: id },
      include: {
        medicamentos: {
          include: {
            laboratorio: true,
            tipoMedicamento: true,
          },
        },
      },
    })

    if (!especialidad) {
      return NextResponse.json({ error: 'Especialidad no encontrada' }, { status: 404 })
    }

    return NextResponse.json(especialidad)
  } catch (error) {
    console.error('Error fetching especialidad:', error)
    return NextResponse.json({ error: 'Error al obtener especialidad' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url)
    const idStr = pathname.split('/').pop()
    const id = Number(idStr)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    const data = await request.json()

    const especialidadActualizada = await prisma.especialidad.update({
      where: { codEspec: id },
      data: {
        descripcionEsp: data.descripcionEsp,
      },
    })

    return NextResponse.json(especialidadActualizada)
  } catch (error) {
    console.error('Error updating especialidad:', error)
    return NextResponse.json({ error: 'Error al actualizar especialidad' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url)
    const idStr = pathname.split('/').pop()
    const id = Number(idStr)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    const medicamentosAsociados = await prisma.medicamento.findMany({
      where: { codEspec: id },
    })

    if (medicamentosAsociados.length > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar la especialidad porque tiene medicamentos asociados' },
        { status: 400 }
      )
    }

    await prisma.especialidad.delete({ where: { codEspec: id } })

    return NextResponse.json({ message: 'Especialidad eliminada correctamente' })
  } catch (error) {
    console.error('Error deleting especialidad:', error)
    return NextResponse.json({ error: 'Error al eliminar especialidad' }, { status: 500 })
  }
}
