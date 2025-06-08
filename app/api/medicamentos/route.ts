import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const medicamentos = await prisma.medicamento.findMany({
      include: {
        tipoMedicamento: true,
        especialidad: true
      },
      orderBy: { descripcionMed: 'asc' }
    })
    return NextResponse.json(medicamentos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener medicamentos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const medicamento = await prisma.medicamento.create({
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
        tipoMedicamento: true,
        especialidad: true
      }
    })
    return NextResponse.json(medicamento, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear medicamento' },
      { status: 500 }
    )
  }
}