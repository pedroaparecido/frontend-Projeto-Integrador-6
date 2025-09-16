import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


export default function CardCarousel() {
    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl tracking-tight leading-tight text-center pb-[30px]">Categorias</h1>
            <Swiper className="w-full h-full object-cover" slidesPerView={6}spaceBetween={10} autoplay={{ delay: 2500, disableOnInteraction: false }} pagination={{ clickable: true }} navigation modules={[Navigation, Pagination, Autoplay]}>
            <SwiperSlide>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/camera.jpg" alt="1" />
            </SwiperSlide>
            <SwiperSlide>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/laptop.png" alt="2" />
            </SwiperSlide>
            <SwiperSlide>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/fenda.png" alt="3" />
            </SwiperSlide>
            <SwiperSlide>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/carrinho.png" alt="4" />
            </SwiperSlide>
            <SwiperSlide>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/propaganda.webp" alt="5" />
            </SwiperSlide>
            <SwiperSlide>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/propaganda.webp" alt="6" />
            </SwiperSlide>
            <SwiperSlide>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/propaganda.webp" alt="7" />
            </SwiperSlide>
            <SwiperSlide>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/propaganda.webp" alt="8" />
            </SwiperSlide>
            </Swiper>
        </div>
    )
}