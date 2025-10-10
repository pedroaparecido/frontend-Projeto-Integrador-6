/* eslint-disable @typescript-eslint/no-explicit-any */
export default function EditRowCard({ input1, input2, input3 }: any) {
    return(
            <div className="mt-[100px] flex flex-row justify-center w-full gap-2 mb-[100px] text-white">
                <div className="flex flex-col justify-center w-full">
                    <label htmlFor="" className="text-white">Título:</label>
                    <input type="text" onChange={input1} className="outline-none bg-zinc-900 text-white rounded shadow-xl" />
                    <hr className="mb-[30px] shadow-2xl bg-zinc-700" />
                    <label htmlFor="" className="text-white">Descrição:</label>
                    <input type="text" onChange={input2} className="outline-none bg-zinc-900 text-white rounded shadow-xl" />
                    <hr className="mb-[30px] shadow-2xl bg-zinc-700" />
                    <label htmlFor="" className="text-white">Preço:</label>
                    <input type="text" onChange={input3} className="outline-none bg-zinc-900 text-white rounded shadow-xl" />
                    <hr className="mb-[30px] shadow-2xl bg-zinc-700" />
                </div>
                <div className="flex flex-col items-center w-full">
                    <span className="text-white">TROCA DE IMAGEM</span>
                </div>
            </div>
    )
}