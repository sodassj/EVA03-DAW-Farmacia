import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Función auxiliar para extraer el ID de la URL
function getIdFromUrl(request: NextRequest): number {
  const url = new URL(request.url)
  const idStr = url.pathname.split('/').pop() || ''
  const id = parseInt(idStr)
  if (isNaN(id)) throw new Error('ID inválido')
  return id
}

// GET - Obtener un medicamento por ID
export async function GET(request: NextRequest) {
  try {
    const id = getIdFromUrl(request)

    const medicamento = await prisma.medicamento.findUnique({
      where: {
        codMedicamento: id
      },
      include: {
        laboratorio: true,
        tipoMedicamento: true,
        especialidad: true,
        detallesOrdenVenta: true,
        detallesOrdenCompra: true
      }
    })

    if (!medicamento) {
      return NextResponse.json(
        { error: 'Medicamento no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(medicamento)
  } catch (error) {
    console.error('Error fetching medicamento:', error)
    return NextResponse.json(
      { error: 'Error al obtener medicamento' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar un medicamento
export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromUrl(request)
    const data = await request.json()

    const medicamentoActualizado = await prisma.medicamento.update({
      where: {
        codMedicamento: id
      },
      data: {
        descripcionMed: data.descripcionMed,
        fechaFabricacion: new Date(data.fechaFabricacion),
        fechaVencimiento: new Date(data.fechaVencimiento),
        presentacion: data.presentacion,
        stock: parseInt(data.stock),
        precioVentaUni: parseFloat(data.precioVentaUni),
        precioVentaPres: parseFloat(data.precioVentaPres),
        marca: data.marca,
        codTipoMed: parseInt(data.codTipoMed),
        codEspec: parseInt(data.codEspec),
        codLab: parseInt(data.codLab)
      },
      include: {
        laboratorio: true,
        tipoMedicamento: true,
        especialidad: true
      }
    })

    return NextResponse.json(medicamentoActualizado)
  } catch (error) {
    console.error('Error updating medicamento:', error)
    return NextResponse.json(
      { error: 'Error al actualizar medicamento' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar un medicamento
export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromUrl(request)

    await prisma.medicamento.delete({
      where: {
        codMedicamento: id
      }
    })

    return NextResponse.json({ message: 'Medicamento eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting medicamento:', error)
    return NextResponse.json(
      { error: 'Error al eliminar medicamento' },
      { status: 500 }
    )
  }
}
