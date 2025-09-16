export default function DelRowCard() {
    return(
        <div className="mt-[70px] flex flex-row justify-center w-full">
            <div className="flex flex-col justify-center items-center w-full">
                <label htmlFor="">Nome do produto:</label>
                <input type="text" className="bg-emerald-200 w-[80%] rounded shadow-xl" />
                <hr  className="p-[10px] w-[80%] shadow-2xl" />
                <button className="p-[20px] bg-emerald-200 mt-[40px] rounded-xl shadow-2xl w-[90%]">Editar</button>
            </div>
        </div>
    )
}