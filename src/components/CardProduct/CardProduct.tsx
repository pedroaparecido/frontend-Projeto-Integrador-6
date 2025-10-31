/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CardProduct({ product, onSelectProduct, addToCart }: any) {
    return (
        <div
            className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center cursor-pointer 
                       hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100"
        >
            <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-lg mb-3">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/150x150/ffc107/000000?text=Sem+Imagem')}
                />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center truncate w-full">{product.title}</h3>
            <span className="text-xl font-extrabold text-amber-600 mb-3">R$ {product.price?.toFixed(2) || '0.00'}</span> 
            
            <div className="flex justify-between w-full mt-2 space-x-2">
                <button
                    onClick={() => onSelectProduct(product)}
                    className="flex-1 bg-amber-500 text-white px-3 py-2 rounded-lg text-sm font-semibold 
                               hover:bg-amber-600 transition-colors duration-200"
                >
                    Detalhes
                </button>
                <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-semibold 
                               hover:bg-green-600 transition-colors duration-200"
                >
                    + Carrinho
                </button>
            </div>
        </div>
    )
}