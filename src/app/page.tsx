import Card from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import MiniCard from "@/components/MiniCard/MiniCard";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row justify-end">
        <Card>sla</Card>
        <MiniCard bgimage="/tag.png">Quer aproveitar as novidades e saber o que está acontecendo agora? <Link className="text-indigo-600 underline hover:text-indigo-800 font-semibold" href="#">Clique aqui</Link> e aproveite conteúdo exclusivo</MiniCard>
      </div>
      <Footer />
    </div>
  );
}
