export default function ImageCard() {
    return(
        <div className="flex flex-col justify-end ml-[3px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-[95px] object-cover rounded-t-lg cursor-pointer" src="/mais.png" alt="mais" style={{ backgroundColor: 'green' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-[95px] object-cover cursor-pointer" src="/carrinho2.png" alt="carrinho" style={{ backgroundColor: 'orange' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-[95px] object-cover rounded-b-lg cursor-pointer" src="/menos.png" alt="menos" style={{ backgroundColor: 'red' }} />
        </div>
    )
}