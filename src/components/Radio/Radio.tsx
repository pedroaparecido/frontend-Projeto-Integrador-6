/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Radio({ children }: any) {
    return(
        <div className="">
            <form action="" className="flex flex-col">
                <div>
                    <input type="radio" name="radio" id="rad1" className="mr-[10px]" />
                    <label htmlFor="rad1">Drinks</label>
                </div>
                <div>
                    <input type="radio" name="radio" id="rad2" className="mr-[10px]" />
                    <label htmlFor="rad2">Destilados</label>
                </div>
                <div>
                    <input type="radio" name="radio" id="rad3" className="mr-[10px]" />
                    <label htmlFor="rad3">Sem Álcool</label>
                </div>
                <div>
                    <input type="radio" name="radio" id="rad4" className="mr-[10px]" />
                    <label htmlFor="rad4">Cerveja</label>
                </div>
            </form>
        </div>
    )
}