import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const laboratorios = await prisma.laboratorio.findMany({
      orderBy: { razonSocial: 'asc' }
    });
    return NextResponse.json(laboratorios);
  } catch (error) {
    console.error('Error fetching laboratorios:', error);
    return NextResponse.json(
      { error: 'Error al obtener laboratorios' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const nuevoLaboratorio = await prisma.laboratorio.create({
      data: {
        razonSocial: data.razonSocial,
        direccion: data.direccion,
        telefono: data.telefono,
        email: data.email,
        contacto: data.contacto
      }
    });
    
    return NextResponse.json(nuevoLaboratorio, { status: 201 });
  } catch (error) {
    console.error('Error creating laboratorio:', error);
    return NextResponse.json(
      { error: 'Error al crear laboratorio' },
      { status: 500 }
    );
  }
}