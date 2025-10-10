'use client'
import Navbar from "@/components/Navbar/Navbar"
import PageCard from "@/components/PageCard/PageCard"
import CardCarousel from "@/components/CardCarousel/CardCarousel"

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 antialiased">
            <div className="relative w-full overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-cover bg-center opacity-70"
                     style={{ 
                         backgroundImage: `url('/path-to-a-beautiful-food-image.jpg')`,
                         backgroundPosition: 'center top'
                     }}
                >
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50/90 to-transparent"></div>
                <div className="relative z-10"> 
                    <Navbar />
                    <div className="pt-20 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="min-h-[400px] bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                             <PageCard />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12 bg-white"> 
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <CardCarousel />
                </div>
            </div>
            <div className="bg-amber-50 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-solid border-amber-200 mt-5 mb-8"/>
                    
                    <p className="text-center text-lg text-gray-700 font-semibold">
                        Aromas e Sabores Únicos. Explore nossas Categorias completas!
                    </p>
                </div>
            </div>
            
        </div>
    )
}