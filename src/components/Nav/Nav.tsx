// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Nav(props: any) {
    const {visivel} = props

    return(
        <nav className={`
            ${visivel ? "w-[700px]" : "w-0"}
            absolute left-0 z-10
            h-[567px] bg-gray-800 transition-all duration-500
        `}></nav>
    )
}