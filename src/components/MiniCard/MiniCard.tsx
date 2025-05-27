// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MiniCard({ bgimage, children }: any) {
    return(
        <div style={{ backgroundImage: `url(${bgimage})` }} className="w-[300px] flex flex-col justify-end items-center bg-size-[200px] bg-no-repeat bg-top h-[400px]">
            {children}
        </div>
    )
}