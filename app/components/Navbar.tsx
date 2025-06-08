'use client'

import { useState } from 'react'
import { Menu, X, ChevronDown, Package, ShoppingCart, ShoppingBag, Pill, Building2, Sparkles, FileText } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState('')

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? '' : dropdown)
  }

  const handleNavigation = (href: string) => {
    window.location.href = href
    setIsOpen(false)
    setActiveDropdown('')
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('/')} 
              className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
            >
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Farmacia Pro
              </span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Almacén Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
                onMouseEnter={() => setActiveDropdown('almacen')}
                onMouseLeave={() => setActiveDropdown('')}
              >
                <Package className="h-4 w-4" />
                <span>Almacén</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div 
                className={`absolute top-full left-0 mt-2 bg-white text-gray-800 shadow-2xl rounded-2xl w-64 transform transition-all duration-200 ${
                  activeDropdown === 'almacen' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                }`}
                onMouseEnter={() => setActiveDropdown('almacen')}
                onMouseLeave={() => setActiveDropdown('')}
              >
                <div className="p-2">
                  <button 
                    onClick={() => handleNavigation('/almacen/medicamentos')}
                    className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-blue-50 rounded-xl transition-colors duration-150"
                  >
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Pill className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Medicamentos</div>
                      <div className="text-sm text-gray-500">Gestionar inventario</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleNavigation('/almacen/laboratorios')}
                    className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-purple-50 rounded-xl transition-colors duration-150"
                  >
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Building2 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Laboratorios</div>
                      <div className="text-sm text-gray-500">Proveedores</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleNavigation('/almacen/especialidades')}
                    className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-green-50 rounded-xl transition-colors duration-150"
                  >
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Sparkles className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Especialidades</div>
                      <div className="text-sm text-gray-500">Categorías médicas</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleNavigation('/almacen/tipos-medicamento')}
                    className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-orange-50 rounded-xl transition-colors duration-150"
                  >
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <FileText className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Tipos de Medicamento</div>
                      <div className="text-sm text-gray-500">Clasificaciones</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Ventas Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
                onMouseEnter={() => setActiveDropdown('ventas')}
                onMouseLeave={() => setActiveDropdown('')}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Ventas</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div 
                className={`absolute top-full left-0 mt-2 bg-white text-gray-800 shadow-2xl rounded-2xl w-64 transform transition-all duration-200 ${
                  activeDropdown === 'ventas' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                }`}
                onMouseEnter={() => setActiveDropdown('ventas')}
                onMouseLeave={() => setActiveDropdown('')}
              >
                <div className="p-2">
                  <button 
                    onClick={() => handleNavigation('/ventas/ordenes-venta')}
                    className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-emerald-50 rounded-xl transition-colors duration-150"
                  >
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <ShoppingBag className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Órdenes de Venta</div>
                      <div className="text-sm text-gray-500">Gestionar ventas</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Compras Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
                onMouseEnter={() => setActiveDropdown('compras')}
                onMouseLeave={() => setActiveDropdown('')}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Compras</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div 
                className={`absolute top-full left-0 mt-2 bg-white text-gray-800 shadow-2xl rounded-2xl w-64 transform transition-all duration-200 ${
                  activeDropdown === 'compras' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                }`}
                onMouseEnter={() => setActiveDropdown('compras')}
                onMouseLeave={() => setActiveDropdown('')}
              >
                <div className="p-2">
                  <button 
                    onClick={() => handleNavigation('/compras/ordenes-compra')}
                    className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-indigo-50 rounded-xl transition-colors duration-150"
                  >
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <ShoppingCart className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Órdenes de Compra</div>
                      <div className="text-sm text-gray-500">Gestionar compras</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-white/10 p-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-4 space-y-2">
            {/* Mobile Almacén Section */}
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-3">
                <Package className="h-4 w-4" />
                <span className="font-semibold">Almacén</span>
              </div>
              <div className="space-y-1 ml-6">
                <button 
                  onClick={() => handleNavigation('/almacen/medicamentos')}
                  className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  Medicamentos
                </button>
                <button 
                  onClick={() => handleNavigation('/almacen/laboratorios')}
                  className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  Laboratorios
                </button>
                <button 
                  onClick={() => handleNavigation('/almacen/especialidades')}
                  className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  Especialidades
                </button>
                <button 
                  onClick={() => handleNavigation('/almacen/tipos-medicamento')}
                  className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  Tipos de Medicamento
                </button>
              </div>
            </div>

            {/* Mobile Ventas Section */}
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-3">
                <ShoppingBag className="h-4 w-4" />
                <span className="font-semibold">Ventas</span>
              </div>
              <div className="ml-6">
                <button 
                  onClick={() => handleNavigation('/ventas/ordenes-venta')}
                  className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  Órdenes de Venta
                </button>
              </div>
            </div>

            {/* Mobile Compras Section */}
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-3">
                <ShoppingCart className="h-4 w-4" />
                <span className="font-semibold">Compras</span>
              </div>
              <div className="ml-6">
                <button 
                  onClick={() => handleNavigation('/compras/ordenes-compra')}
                  className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  Órdenes de Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}