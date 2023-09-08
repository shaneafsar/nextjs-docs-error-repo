import { useEffect, useState } from "react";

export default function ProductWrapper({
  children,
  searchIndex,
  objectID,
  productComponent: Product,
}) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    searchIndex
      .findObject((hit) => hit.objectID === objectID)
      .then(({ object }) => {
        setProduct(object);
      })
      .catch(() => {
        setProduct(null);
      });
  }, [objectID, searchIndex]);

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex w-64 self-center">
        <Product item={product} className="border-none" />
      </div>
      {children}
    </div>
  );
}
