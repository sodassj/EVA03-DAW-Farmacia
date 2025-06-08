import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Función para extraer el ID de la URL
function getIdFromUrl(request: NextRequest) {
  const url = new URL(request.url)
  const segments = url.pathname.split('/')
  const idStr = segments[segments.length - 1]
  const id = Number(idStr)
  if (isNaN(id)) {
    throw new Error('ID inválido')
  }
  return id
}

// GET - Obtener una especialidad por ID
export async function GET(request: NextRequest) {
  try {
    const id = getIdFromUrl(request)

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

// PUT - Actualizar una especialidad
export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromUrl(request)
    const data = await request.json()

    const especialidadActualizada = await prisma.especialidad.update({
      where: { codEspec: id },
      data: { descripcionEsp: data.descripcionEsp },
    })

    return NextResponse.json(especialidadActualizada)
  } catch (error) {
    console.error('Error updating especialidad:', error)
    return NextResponse.json({ error: 'Error al actualizar especialidad' }, { status: 500 })
  }
}

// DELETE - Eliminar una especialidad
export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromUrl(request)

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
