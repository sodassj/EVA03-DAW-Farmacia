import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Función auxiliar para extraer el ID desde la URL
function getIdFromUrl(request: NextRequest): number {
  const url = new URL(request.url)
  const idStr = url.pathname.split('/').pop() || ''
  const id = parseInt(idStr)
  if (isNaN(id)) throw new Error('ID inválido')
  return id
}

// GET - Obtener un tipo de medicamento por ID
export async function GET(request: NextRequest) {
  try {
    const id = getIdFromUrl(request)

    const tipoMedicamento = await prisma.tipoMedicamento.findUnique({
      where: {
        codTipoMed: id
      },
      include: {
        medicamentos: {
          include: {
            laboratorio: true,
            especialidad: true
          }
        }
      }
    })

    if (!tipoMedicamento) {
      return NextResponse.json(
        { error: 'Tipo de medicamento no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(tipoMedicamento)
  } catch (error) {
    console.error('Error fetching tipo medicamento:', error)
    return NextResponse.json(
      { error: 'Error al obtener tipo de medicamento' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar un tipo de medicamento
export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromUrl(request)
    const data = await request.json()

    const tipoMedicamentoActualizado = await prisma.tipoMedicamento.update({
      where: {
        codTipoMed: id
      },
      data: {
        descripcion: data.descripcion
      }
    })

    return NextResponse.json(tipoMedicamentoActualizado)
  } catch (error) {
    console.error('Error updating tipo medicamento:', error)
    return NextResponse.json(
      { error: 'Error al actualizar tipo de medicamento' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar un tipo de medicamento
export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromUrl(request)

    // Verificar si hay medicamentos asociados
    const medicamentosAsociados = await prisma.medicamento.findMany({
      where: { codTipoMed: id }
    })

    if (medicamentosAsociados.length > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar el tipo de medicamento porque tiene medicamentos asociados' },
        { status: 400 }
      )
    }

    await prisma.tipoMedicamento.delete({
      where: {
        codTipoMed: id
      }
    })

    return NextResponse.json({ message: 'Tipo de medicamento eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting tipo medicamento:', error)
    return NextResponse.json(
      { error: 'Error al eliminar tipo de medicamento' },
      { status: 500 }
    )
  }
}
