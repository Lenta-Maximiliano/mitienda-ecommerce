export default function Footer() {
  return (
     /**
     * Footer principal de la aplicación
     *
     * Contiene:
     * - Identidad de la marca
     * - Links a redes sociales
     * - Copyright dinámico
     */
    <footer className="bg-[var(--color-soft)] border-t border-gray-200 text-[var(--color-text)] mt-10">

      {/* Contenedor principal con layout responsive */}
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Sección: Marca / descripción */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-semibold text-[var(--color-primary)]">
            MiTienda
          </h2>
          
          <p className="mt-2 text-sm text-gray-600 text-center md:text-left">
            Productos seleccionados para vos. Calidad y atención personalizada.
          </p>
        </div>

         {/* Sección: Redes sociales */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="font-semibold mb-2">Seguinos</h3>

          {/* Contenedor de íconos */}
          <div className="flex gap-3 md:justify-end">

            {/* Facebook (SVG de SimpleIcons) */}
            <a href="#" aria-label="Facebook" className="hover:text-[var(--color-primary)]">
              <svg role="img" viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <title>Facebook</title>
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692V11.02h3.128V8.412c0-3.1 1.893-4.788 4.66-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.686h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z"/>
              </svg>
            </a>

            {/* Instagram (SVG SimpleIcons) */}
            <a href="#" aria-label="Instagram" className="hover:text-[var(--color-primary)]">
              <svg role="img" viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <title>Instagram</title>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.056 1.945.246 2.405.412.597.218 1.023.48 1.47.929.447.447.71.873.928 1.47.166.46.356 1.2.412 2.405.058 1.265.069 1.645.069 4.85 0 3.205-.012 3.585-.07 4.85-.056 1.206-.246 1.945-.412 2.405-.218.597-.48 1.023-.929 1.47-.447.447-.873.71-1.47.928-.46.166-1.2.356-2.405.412-1.265.058-1.645.069-4.85.069-3.205 0-3.585-.012-4.85-.07-1.206-.056-1.945-.246-2.405-.412-.597-.218-1.023-.48-1.47-.929-.447-.447-.71-.873-.928-1.47-.166-.46-.356-1.2-.412-2.405C2.175 15.748 2.163 15.368 2.163 12c0-3.205.012-3.585.07-4.85.056-1.206.246-1.945.412-2.405.218-.597.48-1.023.929-1.47.447-.447.873-.71 1.47-.928.46-.166 1.2-.356 2.405-.412C8.415 2.175 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.78.128 4.73.314 3.85.645 2.92 1 2.087 1.533 1.333 2.286c-.754.754-1.286 1.587-1.642 2.516-.331.88-.517 1.93-.575 3.202C-.012 8.332 0 8.741 0 12s.012 3.668.07 4.948c.058 1.272.244 2.323.575 3.202.356.929.888 1.762 1.642 2.516.754.754 1.587 1.286 2.516 1.642.88.331 1.93.517 3.202.575C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.272-.058 2.323-.244 3.202-.575.929-.356 1.762-.888 2.516-1.642.754-.754 1.286-1.587 1.642-2.516.331-.88.517-1.93.575-3.202.058-1.28.07-1.689.07-4.948s-.012-3.668-.07-4.948c-.058-1.272-.244-2.323-.575-3.202C22.92 3.85 22.388 3.017 21.634 2.263 20.88 1.509 20.047.977 19.118.621 18.238.29 17.188.104 15.916.046 14.636-.012 14.227 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>

            {/* Twitter (SVG SimpleIcons) */}
            <a href="#" aria-label="Twitter" className="hover:text-[var(--color-primary)]">
              <svg role="img" viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <title>Twitter</title>
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.607 1.794-1.569 2.163-2.723-.95.564-2.005.974-3.127 1.195-.897-.959-2.178-1.558-3.594-1.558-2.72 0-4.924 2.206-4.924 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.697 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.417-1.68 1.318-3.809 2.105-6.102 2.105-.395 0-.779-.023-1.17-.067 2.189 1.397 4.768 2.212 7.557 2.212 9.054 0 14.00-7.496 14.00-13.986 0-.21 0-.423-.015-.637.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright dinámico */}
      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} MiTienda. Todos los derechos reservados.
      </div>
    </footer>
  );
}