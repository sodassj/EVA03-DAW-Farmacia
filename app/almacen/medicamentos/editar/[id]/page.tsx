'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

type Medicamento = {
  codMedicamento: number;
  descripcionMed: string;
  fechaFabricacion: string;
  fechaVencimiento: string;
  presentacion: string;
  stock: number;
  precioVentaUni: number;
  precioVentaPres: number;
  marca: string;
  codTipoMed: number;
  codEspec: number;
  codLab: number;
};

export default function EditMedicamentoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [medicamento, setMedicamento] = useState<Medicamento | null>(null);
  const [form, setForm] = useState({
    descripcionMed: '',
    fechaFabricacion: '',
    fechaVencimiento: '',
    presentacion: '',
    stock: '',
    precioVentaUni: '',
    precioVentaPres: '',
    marca: '',
    codTipoMed: '',
    codEspec: '',
    codLab: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    if (!id) return;

    fetch(`/api/medicamentos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar el medicamento');
        return res.json();
      })
      .then(data => {
        setMedicamento(data);
        setForm({
          descripcionMed: data.descripcionMed || '',
          fechaFabricacion: data.fechaFabricacion?.substring(0, 10) || '',
          fechaVencimiento: data.fechaVencimiento?.substring(0, 10) || '',
          presentacion: data.presentacion || '',
          stock: String(data.stock || ''),
          precioVentaUni: String(data.precioVentaUni || ''),
          precioVentaPres: String(data.precioVentaPres || ''),
          marca: data.marca || '',
          codTipoMed: String(data.codTipoMed || ''),
          codEspec: String(data.codEspec || ''),
          codLab: String(data.codLab || '')
        });
      })
      .catch(err => {
        alert(err.message);
      });
  }, [id]);

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'descripcionMed':
        if (!value.trim()) newErrors[name] = 'La descripción es requerida';
        else if (value.length < 3) newErrors[name] = 'Mínimo 3 caracteres';
        else delete newErrors[name];
        break;
      case 'stock':
        if (!value || parseInt(value) < 0) newErrors[name] = 'Stock debe ser mayor o igual a 0';
        else delete newErrors[name];
        break;
      case 'precioVentaUni':
      case 'precioVentaPres':
        if (!value || parseFloat(value) <= 0) newErrors[name] = 'El precio debe ser mayor a 0';
        else delete newErrors[name];
        break;
      case 'fechaVencimiento':
        if (value && form.fechaFabricacion && new Date(value) <= new Date(form.fechaFabricacion)) {
          newErrors[name] = 'Debe ser posterior a la fecha de fabricación';
        } else delete newErrors[name];
        break;
      default:
        if (!value.trim()) newErrors[name] = 'Este campo es requerido';
        else delete newErrors[name];
    }
    
    setErrors(newErrors);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (touched[name]) {
      validateField(name, value);
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validate all fields
    Object.entries(form).forEach(([key, value]) => {
      validateField(key, value);
      setTouched(prev => ({ ...prev, [key]: true }));
    });

    if (Object.keys(errors).length > 0) return;
    
    setLoading(true);

    try {
      const res = await fetch(`/api/medicamentos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          stock: parseInt(form.stock),
          precioVentaUni: parseFloat(form.precioVentaUni),
          precioVentaPres: parseFloat(form.precioVentaPres),
          codTipoMed: parseInt(form.codTipoMed),
          codEspec: parseInt(form.codEspec),
          codLab: parseInt(form.codLab)
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar medicamento');
      }

      // Success notification
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
      successDiv.textContent = '✓ Medicamento actualizado exitosamente';
      document.body.appendChild(successDiv);
      
      setTimeout(() => {
        successDiv.remove();
        router.push('/almacen/medicamentos');
      }, 2000);
      
    } catch (error: any) {
      alert(error.message || 'Error desconocido');
    }

    setLoading(false);
  }

  if (!medicamento) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 flex items-center justify-center">
        <div className="bg-gray-800/90 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-gray-700/50">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-blue-500 mx-auto"></div>
          </div>
          <p className="text-gray-300 mt-6 text-center font-medium">Cargando información del medicamento...</p>
        </div>
      </div>
    );
  }

  const InputField = ({ 
    name, 
    label, 
    type = 'text', 
    placeholder, 
    icon, 
    ...props 
  }: {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    [key: string]: any;
  }) => (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-300 mb-2 transition-colors group-focus-within:text-blue-400">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors">
            {icon}
          </div>
        )}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={form[name as keyof typeof form]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border-2 rounded-2xl 
            transition-all duration-300 focus:outline-none focus:ring-0 hover:bg-gray-700/50
            ${errors[name] && touched[name] 
              ? 'border-red-500 focus:border-red-400 bg-red-900/20' 
              : 'border-gray-600 focus:border-blue-500 focus:bg-gray-700/50'
            } 
            text-gray-100 placeholder-gray-400 shadow-sm hover:shadow-md focus:shadow-xl`}
          {...props}
        />
        {errors[name] && touched[name] && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {errors[name] && touched[name] && (
        <p className="mt-2 text-sm text-red-400 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 py-8 px-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-3">
            Edición de Medicamento
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sistema de gestión farmacéutica - Actualización de registro medicinal
          </p>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto"></div>
        </div>

        {/* Main Form Container */}
        <div className="bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Información del Medicamento</h2>
                <p className="text-blue-100">ID: {medicamento.codMedicamento}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-gray-100">Información Básica</h3>
                </div>
                
                <InputField
                  name="descripcionMed"
                  label="Descripción del Medicamento"
                  placeholder="Ej: Paracetamol 500mg Tabletas"
                  required
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                />

                <InputField
                  name="presentacion"
                  label="Presentación"
                  placeholder="Ej: Caja x 20 tabletas, Frasco x 100ml"
                  required
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  }
                />

                <InputField
                  name="marca"
                  label="Marca del Laboratorio"
                  placeholder="Ej: Bayer, Pfizer, Genfar"
                  required
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  }
                />

                <InputField
                  name="stock"
                  label="Stock Disponible"
                  type="number"
                  placeholder="Cantidad en inventario"
                  required
                  min={0}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m3 0v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4h16zM9 9h6M9 13h6m-3 4h.01" />
                    </svg>
                  }
                />
              </div>

              {/* Dates and Pricing Section */}
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-gray-100">Fechas y Precios</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    name="fechaFabricacion"
                    label="Fecha de Fabricación"
                    type="date"
                    required
                  />

                  <InputField
                    name="fechaVencimiento"
                    label="Fecha de Vencimiento"
                    type="date"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    name="precioVentaUni"
                    label="Precio Unitario"
                    type="number"
                    step="0.01"
                    placeholder="S/. 0.00"
                    required
                    min={0}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    }
                  />

                  <InputField
                    name="precioVentaPres"
                    label="Precio por Presentación"
                    type="number"
                    step="0.01"
                    placeholder="S/. 0.00"
                    required
                    min={0}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 00-2 2z" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Classification Codes Section */}
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-2xl p-6 border border-gray-600/50">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-gray-100">Códigos de Clasificación</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  name="codTipoMed"
                  label="Código Tipo"
                  type="number"
                  placeholder="Tipo de medicamento"
                  required
                  min={1}
                />

                <InputField
                  name="codEspec"
                  label="Código Especialidad"
                  type="number"
                  placeholder="Especialidad médica"
                  required
                  min={1}
                />

                <InputField
                  name="codLab"
                  label="Código Laboratorio"
                  type="number"
                  placeholder="Laboratorio fabricante"
                  required
                  min={1}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-700">
              <button
                type="button"
                onClick={() => router.push('/almacen/medicamentos')}
                className="flex-1 py-4 px-8 bg-gray-700 text-gray-300 rounded-2xl font-semibold 
                  hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 
                  border border-gray-600 hover:border-gray-500 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancelar
                </div>
              </button>
              
              <button
                type="submit"
                disabled={loading || Object.keys(errors).length > 0}
                className={`flex-1 py-4 px-8 rounded-2xl text-white font-semibold transition-all duration-300 
                  transform hover:scale-105 shadow-lg hover:shadow-2xl ${
                  loading || Object.keys(errors).length > 0
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                    Procesando actualización...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Actualizar Medicamento
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Sistema de Gestión Farmacéutica v2.0 | Todos los campos son obligatorios</p>
        </div>
      </div>
    </div>
  );
}