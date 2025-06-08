export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative flex items-center justify-center min-h-[50vh] px-4 py-20">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl mb-8 shadow-2xl ring-1 ring-gray-100">
              <span className="text-4xl">⚕️</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
              Sistema de Gestión
              <br />
              <span className="text-5xl md:text-6xl">de Farmacia</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-light">
              Plataforma integral para la gestión eficiente de inventario, ventas y compras farmacéuticas
            </p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex justify-center px-4 pb-20">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 place-items-center">
            
            {/* Almacén Card */}
            <div className="group relative w-full max-w-sm">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-10 h-full border border-gray-50 hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-3">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-8 text-4xl shadow-xl">
                    📦
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-6 tracking-tight">Almacén</h2>
                  <p className="text-slate-600 mb-10 text-lg leading-relaxed font-light">
                    Control completo de medicamentos y laboratorios
                  </p>
                  
                  <div className="space-y-4">
                    <a
                      href="/almacen/medicamentos"
                      className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-8 rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl"
                    >
                      Gestionar Medicamentos
                    </a>
                    <a
                      href="/almacen/laboratorios"
                      className="block w-full bg-blue-50 text-blue-700 py-4 px-8 rounded-2xl font-semibold hover:bg-blue-100 transition-all duration-300 border border-blue-100 hover:border-blue-200"
                    >
                      Administrar Laboratorios
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Ventas Card */}
            <div className="group relative w-full max-w-sm">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-10 h-full border border-gray-50 hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-3">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-8 text-4xl shadow-xl">
                    💰
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-6 tracking-tight">Ventas</h2>
                  <p className="text-slate-600 mb-10 text-lg leading-relaxed font-light">
                    Procesamiento de órdenes y gestión integral de clientes
                  </p>
                  
                  <div className="space-y-4">
                    <a
                      href="/ventas/ordenes-venta"
                      className="block w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-8 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl"
                    >
                      Procesar Órdenes
                    </a>
                    <a
                      href="/ventas/clientes"
                      className="block w-full bg-emerald-50 text-emerald-700 py-4 px-8 rounded-2xl font-semibold hover:bg-emerald-100 transition-all duration-300 border border-emerald-100 hover:border-emerald-200"
                    >
                      Administrar Clientes
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Compras Card */}
            <div className="group relative w-full max-w-sm">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-10 h-full border border-gray-50 hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-3">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl mb-8 text-4xl shadow-xl">
                    🛒
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-6 tracking-tight">Compras</h2>
                  <p className="text-slate-600 mb-10 text-lg leading-relaxed font-light">
                    Gestión de órdenes de compra y seguimiento de proveedores
                  </p>
                  
                  <div className="space-y-4">
                    <a
                      href="/compras/ordenes-compra"
                      className="block w-full bg-gradient-to-r from-violet-500 to-purple-500 text-white py-4 px-8 rounded-2xl font-semibold hover:from-violet-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl"
                    >
                      Gestionar Órdenes
                    </a>
                    <a
                      href="/compras/proveedores"
                      className="block w-full bg-violet-50 text-violet-700 py-4 px-8 rounded-2xl font-semibold hover:bg-violet-100 transition-all duration-300 border border-violet-100 hover:border-violet-200"
                    >
                      Administrar Proveedores
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center px-4 pb-20">
        <div className="w-full max-w-5xl">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-gray-100 ring-1 ring-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="group">
                <div className="text-5xl font-bold text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300 tracking-tight">1,234</div>
                <div className="text-slate-600 font-medium text-lg">Medicamentos Registrados</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300 tracking-tight">5,678</div>
                <div className="text-slate-600 font-medium text-lg">Ventas Este Mes</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-violet-600 mb-4 group-hover:scale-110 transition-transform duration-300 tracking-tight">89</div>
                <div className="text-slate-600 font-medium text-lg">Proveedores Activos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}