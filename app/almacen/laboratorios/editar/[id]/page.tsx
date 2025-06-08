'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

type Laboratorio = {
  codLab: number;
  razonSocial: string;
  direccion: string;
  telefono: string;
  email: string;
  contacto: string;
};

export default function EditLaboratorioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [laboratorio, setLaboratorio] = useState<Laboratorio | null>(null);
  const [form, setForm] = useState({
    razonSocial: '',
    direccion: '',
    telefono: '',
    email: '',
    contacto: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fieldLabels = {
    razonSocial: 'Razón Social',
    direccion: 'Dirección',
    telefono: 'Teléfono',
    email: 'Correo Electrónico',
    contacto: 'Persona de Contacto'
  };

  const fieldIcons = {
    razonSocial: (
      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    direccion: (
      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    telefono: (
      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    email: (
      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    contacto: (
      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  };

  useEffect(() => {
    if (!id) return;

    fetch(`/api/laboratorios/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar el laboratorio');
        return res.json();
      })
      .then(data => {
        setLaboratorio(data);
        setForm({
          razonSocial: data.razonSocial || '',
          direccion: data.direccion || '',
          telefono: data.telefono || '',
          email: data.email || '',
          contacto: data.contacto || ''
        });
      })
      .catch(err => {
        console.error('Error:', err);
        // Aquí podrías mostrar un mensaje de error más elegante
      });
  }, [id]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.razonSocial.trim()) {
      newErrors.razonSocial = 'La razón social es requerida';
    }
    
    if (!form.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    }
    
    if (!form.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s\-\(\)]{9,}$/.test(form.telefono)) {
      newErrors.telefono = 'El formato del teléfono no es válido';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'El formato del correo no es válido';
    }
    
    if (!form.contacto.trim()) {
      newErrors.contacto = 'La persona de contacto es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`/api/laboratorios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar laboratorio');
      }

      router.push('/almacen/laboratorios');
    } catch (error: any) {
      console.error('Error:', error);
      // Aquí podrías mostrar un mensaje de error más elegante
    }
    setLoading(false);
  }

  if (!laboratorio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-2xl shadow-blue-500/25">
            <svg className="animate-spin w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-xl text-gray-300">Cargando laboratorio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-2xl shadow-blue-500/25">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Editar Laboratorio
          </h1>
          <p className="text-xl text-gray-300">
            Modifique la información del laboratorio
          </p>
        </div>

        {/* Form Container */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8">
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Información del Laboratorio */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">✏️</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Información del Laboratorio</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.keys(form).map((key) => (
                    <div key={key} className="space-y-2">
                      <label 
                        htmlFor={key}
                        className="block text-sm font-semibold text-gray-200"
                      >
                        {fieldLabels[key as keyof typeof fieldLabels]} *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          {fieldIcons[key as keyof typeof fieldIcons]}
                        </div>
                        <input
                          id={key}
                          type={key === 'email' ? 'email' : key === 'telefono' ? 'tel' : 'text'}
                          name={key}
                          value={(form as any)[key]}
                          onChange={handleChange}
                          placeholder={`Ingrese ${fieldLabels[key as keyof typeof fieldLabels].toLowerCase()}`}
                          className={`
                            block w-full pl-12 pr-4 py-3 
                            border-2 rounded-xl
                            placeholder-gray-500 
                            transition-all duration-300 ease-in-out
                            focus:outline-none focus:ring-0
                            bg-gray-700/50 text-white
                            hover:bg-gray-700/70
                            ${errors[key] 
                              ? 'border-red-500 focus:border-red-400 bg-red-900/20' 
                              : 'border-gray-600 focus:border-blue-500 hover:border-gray-500'
                            }
                          `}
                        />
                      </div>
                      {errors[key] && (
                        <p className="text-sm text-red-400 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors[key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button
                  type="button"
                  onClick={() => router.push('/almacen/laboratorios')}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-gray-600 border border-gray-600 hover:border-gray-500 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Cancelar
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl shadow-2xl shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Actualizando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Actualizar Laboratorio
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Información Adicional */}
        <div className="mt-8 bg-blue-900/30 rounded-xl p-6 border border-blue-800/50 backdrop-blur-sm">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-200 mb-2">Información Importante</h3>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>• Todos los campos marcados con (*) son obligatorios</li>
                <li>• Verifique que el correo electrónico sea válido</li>
                <li>• El teléfono debe incluir código de área si corresponde</li>
                <li>• Los cambios se guardarán inmediatamente al confirmar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}