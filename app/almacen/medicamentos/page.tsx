'use client';
import { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Package, Calendar, DollarSign, Building2, Search, Filter } from 'lucide-react';

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

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/medicamentos')
      .then(res => res.json())
      .then(data => {
        setMedicamentos(data);
        setIsLoading(false);
      })
      .catch(() => {
        alert('Error al cargar medicamentos');
        setIsLoading(false);
      });
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este medicamento?')) return;
    try {
      const res = await fetch(`/api/medicamentos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');
      setMedicamentos(medicamentos.filter(med => med.codMedicamento !== id));
    } catch (error) {
      alert(error);
    }
  }

  const filteredMedicamentos = medicamentos.filter(med => {
    const matchesSearch = med.descripcionMed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.marca.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'low-stock') return matchesSearch && med.stock < 10;
    if (filterBy === 'expired') {
      const today = new Date();
      const expDate = new Date(med.fechaVencimiento);
      return matchesSearch && expDate < today;
    }
    return matchesSearch;
  });

  const isExpired = (fecha: string) => {
    const today = new Date();
    const expDate = new Date(fecha);
    return expDate < today;
  };

  const isLowStock = (stock: number) => stock < 10;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando medicamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Medicamentos</h1>
                <p className="text-gray-600 mt-1">Administra tu inventario farmacéutico</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/almacen/medicamentos/nuevo'}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5 mr-2" />
              Agregar Medicamento
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o marca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white min-w-[200px]"
              >
                <option value="all">Todos los medicamentos</option>
                <option value="low-stock">Stock bajo (&lt;10)</option>
                <option value="expired">Vencidos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Medicamentos</p>
                <p className="text-3xl font-bold text-gray-900">{medicamentos.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stock Bajo</p>
                <p className="text-3xl font-bold text-amber-600">
                  {medicamentos.filter(med => isLowStock(med.stock)).length}
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vencidos</p>
                <p className="text-3xl font-bold text-red-600">
                  {medicamentos.filter(med => isExpired(med.fechaVencimiento)).length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-xl">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Medicamentos Grid */}
        {filteredMedicamentos.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron medicamentos</h3>
            <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMedicamentos.map(med => (
              <div
                key={med.codMedicamento}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:scale-[1.02]"
              >
                {/* Status Indicators */}
                <div className="flex justify-between p-4 pb-0">
                  {isExpired(med.fechaVencimiento) && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                      Vencido
                    </span>
                  )}
                  {isLowStock(med.stock) && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                      Stock Bajo
                    </span>
                  )}
                </div>

                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {med.descripcionMed}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{med.marca}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Presentación:</span>
                      <span className="text-sm font-medium text-gray-900">{med.presentacion}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Stock:</span>
                      <span className={`text-sm font-bold ${isLowStock(med.stock) ? 'text-amber-600' : 'text-green-600'}`}>
                        {med.stock} unidades
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Precio:</span>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">
                          S/ {typeof med.precioVentaUni === 'number' ? med.precioVentaUni.toFixed(2) : med.precioVentaUni}
                        </div>
                        <div className="text-xs text-gray-500">por unidad</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Vencimiento:</span>
                      <span className={`text-sm font-medium ${isExpired(med.fechaVencimiento) ? 'text-red-600' : 'text-gray-900'}`}>
                        {new Date(med.fechaVencimiento).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => window.location.href = `/almacen/medicamentos/editar/${med.codMedicamento}`}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition-colors group-hover:scale-105 duration-200"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(med.codMedicamento)}
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