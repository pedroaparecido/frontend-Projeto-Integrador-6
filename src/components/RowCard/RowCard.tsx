import Radio from "../Radio/Radio";

export default function RowCard() {
    return(
        <div className="mt-[70px] flex flex-row justify-center w-full">
            <div className="flex flex-col justify-center w-full">
                <label htmlFor="">Título:</label>
                <input type="text" className="bg-emerald-200 rounded shadow-xl" />
                <hr  className="p-[10px]" />
                <label htmlFor="">Descrição:</label>
                <input type="text" className="bg-emerald-200 shadow-xl" />
                <hr  className="p-[10px]" />
            </div>
            <div className="flex flex-col items-center w-full">
                <Radio />
            </div>
        </div>
    )
}