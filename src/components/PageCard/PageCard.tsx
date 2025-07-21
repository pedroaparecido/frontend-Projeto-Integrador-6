
import MiniCard from "@/components/MiniCard/MiniCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react'
import Description from "../Description/Description";

export default function PageCard() {
    return(
        <div className="flex flex-row">
        <Swiper className="w-lg object-cover" slidesPerView={1} pagination={{ clickable: true }} navigation>
          <SwiperSlide>
            <img src="/camera.jpg" alt="1" />
            <Description>Câmera Pro, Valor:R$350,00</Description>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/laptop.png" alt="2" />
            <Description>Laptop 5° Geração 2RAM 500MB-HD, Valor: R$2300,00</Description>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/fenda.png" alt="3" />
            <Description>Chave de Fenda, Valor: R$300,00</Description>
          </SwiperSlide>
        </Swiper>
        <MiniCard bgimage="/tag.png">Quer aproveitar as novidades e saber o que está acontecendo agora? <Link className="text-indigo-600 underline hover:text-indigo-800 font-semibold" href="#">Clique aqui</Link> e aproveite conteúdo exclusivo</MiniCard>
      </div>
    )
}