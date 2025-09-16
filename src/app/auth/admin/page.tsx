'use client'
import Navbar from "@/components/Navbar/Navbar";
import PainelCard from "@/components/PainelCard/PainelCard";

export default function PainelAdmin() {
    return(
        <div className="w-screen min-h-[630px] bg-emerald-200 flex flex-col items-center">
            <Navbar />
            <div className="pt-[85px]" />
            <PainelCard />
        </div>
    )
}