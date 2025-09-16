'use client'
import Navbar from "@/components/Navbar/Navbar"
import PageCard from "@/components/PageCard/PageCard"
import CardCarousel from "@/components/CardCarousel/CardCarousel"

export default function Home() {
    /*
    const { loggedIn, loading } = useAuth()
    if (loading) {
        return <p>Verificando sessão...</p>;
    }

    if (!loggedIn) {
        redirect('/auth/login');
    }
*/
    return (
        <div>
            <div className="flex flex-col items-center bg-gradient-to-b from-orange-400 via-orange-50 to-orange-200 w-full">
                <div className="w-full">
                    <Navbar />
                    <div className="p-[43px]"></div>
                </div>
                <div className="w-full h-screen">
                    <PageCard />
                </div>
            </div>
            <div>
                <div className="p-4 bg-gradient-to-b from-orange-200 via-yellow-400 to-yellow-400 pt-[40px]">
                    <CardCarousel />
                    <div className="border-solid border-2 m-[20px]"/>
                </div>
            </div>
        </div>
    );
}