// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Button({ children }: any) {
    return(
        <button className="bg-gray-300 hover:bg-gray-400 cursor-pointer p-[20px] rounded-xl w-full">{children}</button>
    )
}