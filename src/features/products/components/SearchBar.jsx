import { useState, useEffect, useRef, useMemo, useId } from "react";
import { useGetProductsQuery } from "../productsApi";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

/** SearchBar
 *
 * Barra de búsqueda con:
 * - debounce
 * - filtrado local de productos
 * - dropdown de resultados
 * - navegación a detalle o listado
 *
 * @param {boolean} isMobile - adapta estilos/comportamiento para mobile
 * @param {Function} closeMenu - callback para cerrar menú mobile
 */
export default function SearchBar({ isMobile = false, closeMenu }) {
  // Datos desde RTK Query
  const { data: products = [], isLoading } = useGetProductsQuery();

  // Estado local
  const [q, setQ] = useState(""); // texto ingresado

  // const [results, setResults] = useState([]); // resultados filtrados
  const [open, setOpen] = useState(false); // estado del dropdown

  const navigate = useNavigate();

  const inputId = useId();

  // Referencias
  const inputRef = useRef(null); // contenedor (para detectar click afuera)
  const debounceRef = useRef(null); // timeout del debounce

  // FILTRADO (memoizado)
  const filtered = useMemo(() => {
    const term = (q || "").trim().toLowerCase();
    if (!term) return [];

    return products.filter((p) => {
      return (
        p.title?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      );
    });
  }, [q, products]);

  // Resultados visibles (top 6)
  const results = filtered.slice(0, 6);

  // Efecto: debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (!q.trim()) {
        setOpen(false);
        return;
      }

      setOpen(filtered.length > 0);
    }, 200);

    return () => clearTimeout(debounceRef.current);
  }, [q, filtered]);

  // Efecto: cerrar dropdown al hacer click fuera
  useEffect(() => {
    function onDocClick(e) {
      if (!inputRef.current) return;

      if (!inputRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", onDocClick);

    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Selección de producto
  const handleSelect = (id) => {
    setQ("");
    setOpen(false);

    if (isMobile) closeMenu?.();
    
    navigate(`/products/${id}`);
  };

  // Ver todos los resultados
  const handleViewAll = () => {
    const term = q.trim();
    if (!term) return;

    setQ("");
    setOpen(false);

    if (isMobile) closeMenu?.();

    navigate(`/products?search=${encodeURIComponent(term)}`);
  };

  return (
    <div 
      className={`relative w-full ${isMobile ? "" : "max-w-xs"}`} 
      ref={inputRef}
    >
      {/* Input */}
      <div 
        className={`flex items-center bg-white border rounded-lg px-2 py-1 shadow-sm ${
          isMobile ? "w-[70%] mx-auto" : ""
        }`}
      >
        <Search className="w-4 h-4 text-[var(--color-muted)] mr-2" />

        <label htmlFor={inputId} className="sr-only">
          Buscar productos
        </label>

        <input
          type="text"
          name="search"
          id={inputId}
          className="w-full text-sm outline-none"
          placeholder={isLoading ? "Cargando..." : "Buscar productos..."}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => q && results.length && setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleViewAll();
            }
          }}
          autoComplete="off"
        />
      </div>

      {/* Dropdown de resultados */}
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg divide-y overflow-hidden">

          {/* Resultados */}
          {results.map((r) => (
            <li
              key={r.id}
              onClick={() => handleSelect(r.id)}
              className="px-3 py-2 hover:bg-[var(--color-soft)] cursor-pointer flex items-center gap-3"
            >
              <img 
                src={r.image} 
                alt={r.title} 
                className="w-8 h-8 object-contain" 
              />
              
              <div className="flex-1">
                <div className="text-sm font-medium text-[var(--color-primary)] line-clamp-1">
                  {r.title}
                </div>

                <div className="text-xs text-[var(--color-muted)]">
                  ${Number(r.price).toFixed(2)} • {r.category}
                </div>
              </div>
            </li>
          ))}

          {/* "Ver todos" */}
          <li>
            <button
              onClick={handleViewAll}
              className="w-full px-3 py-2 hover:bg-[var(--color-soft)] text-sm text-[var(--color-primary)] font-medium text-center"
            >
              Ver todos los resultados ({filtered.length})
            </button>
          </li>

          {/* Info */}
          <li className="text-center text-xs text-[var(--color-muted)] py-2">
            {results.length === 6
              ? "Mostrando los 6 primeros resultados" 
              : `Mostrando ${results.length}`}
          </li>
        </ul>
      )}

      {/* mensaje cuando no hay resultados */}
      {open && q && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg p-3 text-sm text-[var(--color-muted)]">
          No se encontraron productos.
        </div>
      )}
    </div>
  );
}