export default function EditRowCard() {
    return(
            <div className="mt-[100px] flex flex-row justify-center w-full gap-2 mb-[100px]">
                <div className="flex flex-col justify-center w-full">
                    <label htmlFor="">Título:</label>
                    <input type="text" className="bg-emerald-200 rounded shadow-xl" />
                    <hr className="mb-[30px] shadow-2xl" />
                    <label htmlFor="">Descrição:</label>
                    <input type="text" className="bg-emerald-200 rounded shadow-xl" />
                    <hr className="mb-[30px] shadow-2xl" />
                </div>
                <div className="flex flex-col items-center w-full">
                    TROCA DE IMAGEM
                </div>
            </div>
    )
}