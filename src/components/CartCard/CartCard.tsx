/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CartCard({ handleOrder, total, cartItems, removeFromCart }: any) {
    return(
        <div className="bg-white h-[78vh] p-4 rounded-xl shadow-2xl w-[300px] mt-[85px] border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-orange-500 border-b pb-2">Seu Pedido</h2>
            <div className="max-h-64 overflow-y-scroll space-y-3 pr-2">
                {cartItems.length === 0 ? (
                    <p className="text-gray-500 italic">O carrinho está vazio.</p>
                ) : (
                    cartItems.map((item: any) => (
                        <div key={item._id} className="flex justify-between items-center text-sm border-b last:border-b-0 pb-1">
                            <div className="flex-1 pr-2">
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-gray-600">Qtd: {item.quantity} x R$ {item.price?.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="text-red-500 hover:text-red-700 text-lg"
                            >
                                &times;
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-300">
                <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total:</span>
                    <span>R$ {total}</span>
                </div>
                <button
                    onClick={handleOrder}
                    disabled={cartItems.length === 0}
                    className={`w-full py-2 rounded-lg font-bold text-white transition duration-200 ${
                        cartItems.length > 0
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Finalizar Pedido
                </button>
            </div>
        </div>
    )
}