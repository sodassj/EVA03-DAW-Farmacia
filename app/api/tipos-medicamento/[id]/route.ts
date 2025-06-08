import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Obtener un tipo de medicamento por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tipoMedicamento = await prisma.tipoMedicamento.findUnique({
      where: {
        codTipoMed: parseInt(params.id)
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
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    
    const tipoMedicamentoActualizado = await prisma.tipoMedicamento.update({
      where: {
        codTipoMed: parseInt(params.id)
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
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar si hay medicamentos asociados
    const medicamentosAsociados = await prisma.medicamento.findMany({
      where: { codTipoMed: parseInt(params.id) }
    })

    if (medicamentosAsociados.length > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar el tipo de medicamento porque tiene medicamentos asociados' },
        { status: 400 }
      )
    }

    await prisma.tipoMedicamento.delete({
      where: {
        codTipoMed: parseInt(params.id)
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