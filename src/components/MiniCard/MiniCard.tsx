// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MiniCard({ bgimage, children }: any) {
    return(
        <div className="flex flex-col w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={bgimage} className="w-[200px] bg-no-repeat" alt="Image" />
            {children}
        </div>
    )
}