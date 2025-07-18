'use client'
import Footer from "@/components/Footer/Footer";
import MiniCard from "@/components/MiniCard/MiniCard";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row justify-end">
        <Swiper className="w-lg h-[567px] object-cover" slidesPerView={1} pagination={{ clickable: true }} navigation>
          <SwiperSlide>
            <img src="/circulo-1.png" alt="1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/circulo-2.png" alt="2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/circulo-3.png" alt="3" />
          </SwiperSlide>
        </Swiper>
        <MiniCard bgimage="/tag.png">Quer aproveitar as novidades e saber o que está acontecendo agora? <Link className="text-indigo-600 underline hover:text-indigo-800 font-semibold" href="#">Clique aqui</Link> e aproveite conteúdo exclusivo</MiniCard>
      </div>
      <Footer />
    </div>
  );
}
