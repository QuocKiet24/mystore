import { useParams } from "react-router-dom";

const ProductListPage = () => {
  const params = useParams();
  console.log(params);
  return (
    <section className="sticky top-24 lg:h-20">
      <div className="container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        {/* subcategory */}
        <div className="min-h-[77vh]"></div>
        {/* product */}
        <div className="bg-blue-900">product</div>
      </div>
    </section>
  );
};

export default ProductListPage;
