import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import Description from "../Description/Description"

export default function PageCard() {
    return(
        <Swiper className="w-full h-full" slidesPerView={1} pagination={{ clickable: true }} navigation modules={[Autoplay, Navigation, Pagination]} autoplay={{ delay: 3500, disableOnInteraction: false }}>
          <SwiperSlide>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="brahma-chopp.png" alt="Promoção Chopp Brahma" className="w-full h-full object-cover" />
            <Description>Chopp BRAHMA, Valor:R$500,00</Description>
          </SwiperSlide>
          <SwiperSlide>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="gemini1.png" alt="Bebidas Especiais" className="w-full h-full object-cover" />
            <Description>Descubra nossa seleção de bebidas especiais!</Description>
          </SwiperSlide>
          <SwiperSlide>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gemini2.png" alt="Kits para sua festa" className="w-full h-full object-cover" />
            <Description>Kits completos para sua festa, a partir de R$300,00</Description>
          </SwiperSlide>
          <SwiperSlide>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gemini4.png" alt="Kits para sua festa" className="w-full h-full object-cover" />
            <Description>Kits completos para sua festa, a partir de R$300,00</Description>
          </SwiperSlide>
          <SwiperSlide>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gemini5.png" alt="Kits para sua festa" className="w-full h-full object-cover" />
            <Description>Kits completos para sua festa, a partir de R$300,00</Description>
          </SwiperSlide>
        </Swiper>
    )
}