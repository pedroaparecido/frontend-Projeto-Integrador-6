// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Icone(props: any) {
    const {setVisivel, visivel} = props
    return(
        <div
            className="flex flex-col top-0 right-0 z-40"
            onClick={() => setVisivel(!visivel)}
        >
            <div className={`${visivel ? "rotate-45 translate-y-2 bg-white" : "bg-black"} h-1 w-8 mb-1 transition duration-500`} />
            <div className={`${visivel ? "rotate-[-45deg] bg-white" : "bg-black"} h-1 w-8 mb-1 transition duration-500`} />
            <div className={`${visivel ? "hidden" : "flex bg-black"} h-1 w-8 mb-1 transition duration-500`} />
        </div>
    )
}