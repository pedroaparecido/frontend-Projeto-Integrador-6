import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Description from "../Description/Description";

export default function PageCard() {
    return(
        <Swiper className="w-full h-full object-cover" slidesPerView={1} pagination={{ clickable: true }} navigation modules={[Autoplay, Navigation, Pagination]} autoplay={{ delay: 2500, disableOnInteraction: false }}>
          <SwiperSlide>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/propaganda.webp" alt="1" />
            <Description>Chopp BRAHMA, Valor:R$500,00</Description>
          </SwiperSlide>
          <SwiperSlide>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/laptop.png" alt="2" />
            <Description>Laptop 5° Geração 2RAM 500MB-HD, Valor: R$2300,00</Description>
          </SwiperSlide>
          <SwiperSlide>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fenda.png" alt="3" />
            <Description>Chave de Fenda, Valor: R$300,00</Description>
          </SwiperSlide>
        </Swiper>
    )
}