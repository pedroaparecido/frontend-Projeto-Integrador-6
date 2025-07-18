// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Input({ tipo, holder, change }: any) {
    return(
        <input type={tipo} placeholder={holder} onChange={change} className="p-[20px] rounded-xl bg-gray-200 w-full" />
    )
}