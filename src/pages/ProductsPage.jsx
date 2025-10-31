import { useGetProductsQuery } from "../services/productsApi";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos</p>;

  return (
    <div>
      <div className="max-w-7xl mx-auto grid [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] gap-5 p-5">
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
