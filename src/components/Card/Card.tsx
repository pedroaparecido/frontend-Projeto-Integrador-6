// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Card({ children }: any) {
    return(
        <div className="m-[10px] p-[290px] w-[1000px] flex flex-col justify-center items-center">
            {children}
        </div>
    )
}