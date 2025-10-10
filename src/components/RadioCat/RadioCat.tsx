/* eslint-disable @typescript-eslint/no-explicit-any */
export default function RadioCat({ children }: any) {
    return(
        <div className="flex flex-col">
            <div>
                <input type="radio" name="radio" id="rad1" className="mr-[10px]" />
                <label htmlFor="rad1">Bebidas</label>
                <div className="flex flex-col">
                    <div className="flex flex-row ml-[100px]">
                        <input type="radio" name="radio" id="rad1" className="mr-[10px]" />
                        <label htmlFor="rad1">Drinks</label>
                    </div>
                    <div className="flex flex-row ml-[100px]">
                        <input type="radio" name="radio" id="rad1" className="mr-[10px]" />
                        <label htmlFor="rad1">Destilados</label>
                    </div>
                    <div className="flex flex-row ml-[100px]">
                        <input type="radio" name="radio" id="rad1" className="mr-[10px]" />
                        <label htmlFor="rad1">Sem Álcool</label>
                    </div>
                    <div className="flex flex-row ml-[100px]">
                        <input type="radio" name="radio" id="rad1" className="mr-[10px]" />
                        <label htmlFor="rad1">Cerveja</label>
                    </div>
                </div>
            </div>
            <div>
                <input type="radio" name="radio" id="rad2" className="mr-[10px]" />
                <label htmlFor="rad2">ServFesta</label>
                <div className="flex flex-col">
                    <div className="flex flex-row ml-[100px]">
                        <input type="radio" name="radio" id="rad1" className="mr-[10px]" />
                        <label htmlFor="rad1">Caixa Térmica</label>
                    </div>
                    <div className="flex flex-row ml-[100px]">
                        <input type="radio" name="radio" id="rad1" className="mr-[10px]" />
                        <label htmlFor="rad1">Mesa/Cadeira</label>
                    </div>
                </div>
            </div>
        </div>
    )
}