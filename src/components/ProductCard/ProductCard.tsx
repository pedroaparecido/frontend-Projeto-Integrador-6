import { useState } from "react";
import Description from "../Description/Description";

export default function ProductCard() {
    const [hover1, setHover1] = useState(false)
    const [hover2, setHover2] = useState(false)
    const [hover3, setHover3] = useState(false)
    const [bool, setBool] = useState(false)

    const handleEnter1 = () => setHover1(true)
    const handleLeave1 = () => setHover1(false)

    const handleEnter2 = () => setHover2(true)
    const handleLeave2 = () => setHover2(false)

    const handleEnter3 = () => setHover3(true)
    const handleLeave3 = () => setHover3(false)

    const imgStyle1 = {
        backgroundColor: hover1 ? 'red' : 'white'
    }

    const imgStyle2 = {
        backgroundColor: hover2 ? 'green' : 'white'
    }

    const imgStyle3 = {
        backgroundColor: hover3 ? 'rgb(250, 204, 21)' : 'white'
    }

    return(
        <div className="flex items-start justify-end pt-[85px] w-screen">
            <div className="flex flex-row items-start ml-auto mr-[20px] bg-yellow-400 p-4 rounded-xl pb-[40px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-[100px] h-[100px] mr-[10px] object-cover cursor-pointer" onClick={() => setBool(!bool)} src={ bool ? "/coracao.png" : "/coracaopreto.png"} alt="Coração" />
                <div className="flex flex-col w-[417px] object-cover">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/camera.jpg" alt="1" />
                    <Description>Câmera Pro, Valor:R$350,00</Description>
                </div>
                <div className="flex flex-col-reverse items-center justify-end divide-y-4 divide-y-reverse divide-black w-[80px] border-solid border-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover cursor-pointer rounded-b-lg" src="/menos.png" alt="menos" style={imgStyle1} onMouseEnter={handleEnter1} onMouseLeave={handleLeave1} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover cursor-pointer" src="/carrinho2.png" alt="carrinho" style={imgStyle3} onMouseEnter={handleEnter3} onMouseLeave={handleLeave3} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover cursor-pointer" src="/mais.png" alt="mais" style={imgStyle2} onMouseEnter={handleEnter2} onMouseLeave={handleLeave2} />
                </div>
            </div>
        </div>
    )
}