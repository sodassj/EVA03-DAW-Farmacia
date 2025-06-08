'use client';
import { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Building2, Phone, Mail, User, MapPin, Search, Filter } from 'lucide-react';

type Laboratorio = {
  codLab: number;
  razonSocial: string;
  direccion: string;
  telefono: string;
  email: string;
  contacto: string;
};

export default function LaboratoriosPage() {
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/laboratorios')
      .then(res => res.json())
      .then(data => {
        setLaboratorios(data);
        setIsLoading(false);
      })
      .catch(() => {
        alert('Error al cargar laboratorios');
        setIsLoading(false);
      });
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este laboratorio?')) return;
    try {
      const res = await fetch(`/api/laboratorios/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');
      setLaboratorios(laboratorios.filter(lab => lab.codLab !== id));
    } catch (error) {
      alert(error);
    }
  }

  const filteredLaboratorios = laboratorios.filter(lab =>
    lab.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando laboratorios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Laboratorios</h1>
                <p className="text-gray-600 mt-1">Administra proveedores y laboratorios</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/almacen/laboratorios/nuevo'}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5 mr-2" />
              Agregar Laboratorio
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por razón social, contacto o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Laboratorios</p>
              <p className="text-3xl font-bold text-gray-900">{laboratorios.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Laboratorios Grid */}
        {filteredLaboratorios.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron laboratorios</h3>
            <p className="text-gray-500">Intenta ajustar los términos de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLaboratorios.map(lab => (
              <div
                key={lab.codLab}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:scale-[1.02]"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-center mb-3">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg mr-3">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                        {lab.razonSocial}
                      </h3>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-sm text-gray-600">Dirección:</span>
                        <p className="text-sm font-medium text-gray-900 mt-1">{lab.direccion}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <div>
                        <span className="text-sm text-gray-600">Teléfono:</span>
                        <p className="text-sm font-medium text-gray-900">{lab.telefono}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <div>
                        <span className="text-sm text-gray-600">Email:</span>
                        <p className="text-sm font-medium text-gray-900 break-all">{lab.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <div>
                        <span className="text-sm text-gray-600">Contacto:</span>
                        <p className="text-sm font-medium text-gray-900">{lab.contacto}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => window.location.href = `/almacen/laboratorios/editar/${lab.codLab}`}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition-colors group-hover:scale-105 duration-200"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(lab.codLab)}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-50 text-red-700 font-medium rounded-xl hover:bg-red-100 transition-colors group-hover:scale-105 duration-200"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}