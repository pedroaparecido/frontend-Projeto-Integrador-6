export default function Error404() {
    return(
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
            <div style={{ backgroundImage: `url(/exclamacao.png)` }} className="w-[300px] bg-size-[200px] bg-no-repeat bg-center h-[400px]"></div>
            <h1 className="font-bold text-2xl">Sorry ERROR</h1>
            <h1 className="font-bold text-2xl">page could not be found</h1>
        </div>
    )
}