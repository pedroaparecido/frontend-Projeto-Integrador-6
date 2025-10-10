/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsCartDashFill } from "react-icons/bs"

export default function CartItem({ data }: any) {
    return (
        <div className="flex flex-col items-center bg-yellow-400 rounded-lg w-full h-full">  
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={data.source}
                alt={data.title}
                className="w-full h-full object-cover"
            />
            <button className="text-red-500 border-none bg-none cursor-pointer">
                <BsCartDashFill />
            </button>
            <div className="text-center">
                <h3 className="text-xl font-semibold">{data.title}</h3>
                <p className="mt-2 text-sm ">{data.description}</p>
                <span className="mt-4 text-lg font-bold text-orange-500">{data.price}</span>
            </div>
        </div>
    )
}