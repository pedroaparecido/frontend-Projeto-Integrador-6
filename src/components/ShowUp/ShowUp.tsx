/* eslint-disable @typescript-eslint/no-explicit-any */
import Icone from "../Icone/Icone";
import CardProduct from "../CardProduct/CardProduct";

export default function ShowUp({ visivel, setVisivel}: any) {

    return(
        <div className="flex flex-row justify-between">
            <Icone visivel={visivel} setVisivel={setVisivel} />
            <div className="absolute z-20 w-full">
                {
                    visivel &&
                    (<div className="grid grid-cols-3 gap-4 w-[700px] items-center text-white gap-[20px] p-[17px] h-[700px] overflow-y-auto bg-black ml-[-30px] mt-[-34px]">
                        <CardProduct source={`/lavapratos.png`} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                        <CardProduct source={undefined} alter={undefined} title={undefined} description={undefined} price={undefined} />
                    </div>)
                }
            </div>
        </div>
    )
}