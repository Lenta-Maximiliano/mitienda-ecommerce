import { useState, useEffect, useRef } from "react";
import { useGetProductsQuery } from "../services/productsApi";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBar({ isMobile = false, closeMenu }) {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const term = q.trim().toLowerCase();
      if (!term) {
        setResults([]);
        setOpen(false);
        return;
      }

      const filtered = products.filter((p) => {
        return (
          p.title?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term) ||
          (p.description && p.description.toLowerCase().includes(term))
        );
      });

      setResults(filtered.slice(0, 6)); // mostramos top 6 en dropdown
      setOpen(true);
    }, 200);

    return () => clearTimeout(debounceRef.current);
  }, [q, products]);

  // cerrar dropdown cuando clic afuera
  useEffect(() => {
    function onDocClick(e) {
      if (!inputRef.current) return;
      if (!inputRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleSelect = (id) => {
    setQ("");
    setOpen(false);
    if (isMobile) closeMenu?.();
    navigate(`/products/${id}`);
  };

  const handleViewAll = () => {
    const term = q.trim();
    if (!term) return;
    setQ("");
    setOpen(false);
    if (isMobile) closeMenu?.();
    navigate(`/products?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className={`relative w-full ${isMobile ? "" : "max-w-xs"}`} ref={inputRef}>
      <div className={`flex items-center bg-white border rounded-lg px-2 py-1 shadow-sm ${isMobile ? "w-[70%] mx-auto" : ""}`}>
        <Search className="w-4 h-4 text-[var(--color-muted)] mr-2" />
        <input
          className="w-full text-sm outline-none"
          placeholder={isLoading ? "Cargando..." : "Buscar productos..."}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => q && results.length && setOpen(true)}
          aria-label="Buscar productos"
        />
      </div>

      {/* dropdown */}
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg divide-y overflow-hidden">
          {results.map((r) => (
            <li
              key={r.id}
              onClick={() => handleSelect(r.id)}
              className="px-3 py-2 hover:bg-[var(--color-soft)] cursor-pointer flex items-center gap-3"
            >
              <img src={r.image} alt={r.title} className="w-8 h-8 object-contain" />
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
          <li
            onClick={handleViewAll}
            className="px-3 py-2 hover:bg-[var(--color-soft)] cursor-pointer text-sm text-[var(--color-primary)] font-medium text-center"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") handleViewAll(); }}
          >
            Ver todos los resultados ({/* total encontrados */ calculateTotalFound(products, q) })
          </li>

          <li className="text-center text-xs text-[var(--color-muted)] py-2">
            {results.length === 6 ? "Mostrando los 6 primeros resultados" : `Mostrando ${results.length}`}
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

// helper para contar totales (separa para mantener JSX más limpio)
function calculateTotalFound(products, q) {
  const term = (q || "").trim().toLowerCase();
  if (!term) return 0;
  return products.filter((p) => {
    return (
      p.title?.toLowerCase().includes(term) ||
      p.category?.toLowerCase().includes(term) ||
      (p.description && p.description.toLowerCase().includes(term))
    );
  }).length;
}