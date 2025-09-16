import DelRowCard from "../DelRowCard/DelRowCard";
import EditRowCard from "../EditRowCard/EditRowCard";
import RowCard from "../RowCard/RowCard";

export default function PainelCard() {
    return(
        <div className="flex flex-col items-center w-[1200px] h-[500px] bg-cyan-100 shadow-2xl rounded-xl overflow-y-scroll">
            <h1 className="text-2xl pt-[15px] p-[5px] bg-yellow-400 w-full text-center shadow-xl rounded-xl">Painel de Administração</h1>
            <h1 className="text-xl mt-[50px]">Adicionar produto</h1>
            <RowCard />
            <button className="p-[20px] bg-emerald-200 rounded-xl shadow-2xl mt-[50px] w-[90%]">Adicionar</button>
            <hr className="w-full mt-[130px] h-1" />
            <h1 className="text-xl mt-[50px]">Edição de produtos</h1>
            <EditRowCard />
            <button className="p-[20px] bg-emerald-200 rounded-xl shadow-2xl w-[90%]">Editar</button>
            <hr className="mt-[70px] w-full"/>
            <h1 className="text-xl mt-[50px]">Exclusão de produtos</h1>
            <DelRowCard />
            <hr className="w-full mt-[100px]" />
        </div>
    )
}