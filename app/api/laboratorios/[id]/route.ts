import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Obtener un laboratorio por ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;

  try {
    const laboratorio = await prisma.laboratorio.findUnique({
      where: {
        codLab: parseInt(params.id)
      },
      include: {
        medicamentos: true,
        ordenesCompra: true
      }
    });

    if (!laboratorio) {
      return NextResponse.json(
        { error: 'Laboratorio no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(laboratorio);
  } catch (error) {
    console.error('Error fetching laboratorio:', error);
    return NextResponse.json(
      { error: 'Error al obtener laboratorio' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un laboratorio
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;

  try {
    const data = await request.json();

    const laboratorioActualizado = await prisma.laboratorio.update({
      where: {
        codLab: parseInt(params.id)
      },
      data: {
        razonSocial: data.razonSocial,
        direccion: data.direccion,
        telefono: data.telefono,
        email: data.email,
        contacto: data.contacto
      }
    });

    return NextResponse.json(laboratorioActualizado);
  } catch (error) {
    console.error('Error updating laboratorio:', error);
    return NextResponse.json(
      { error: 'Error al actualizar laboratorio' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un laboratorio
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;

  try {
    await prisma.laboratorio.delete({
      where: {
        codLab: parseInt(params.id)
      }
    });

    return NextResponse.json({ message: 'Laboratorio eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting laboratorio:', error);
    return NextResponse.json(
      { error: 'Error al eliminar laboratorio' },
      { status: 500 }
    );
  }
}
