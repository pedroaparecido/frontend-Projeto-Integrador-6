import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Link from "next/link";

export default function Login() {
    return(
        <div className="flex flex-col justify-center items-center min-h-screen">
            <form className="flex flex-col justify-center items-center border-1 border-solid p-[40px] rounded-xl gap-[20px] w-xl">
            <h1 className="font-bold text-xl">Formulário de login</h1>
                <Input tipo="email" holder="Email" />
                <Input tipo="password" holder="Password" />
                <Button>Entrar</Button>
                <span>Não tem uma conta? <Link className="text-indigo-600 underline hover:text-indigo-800 font-semibold" href="/auth/register">Registre-se</Link></span>
                <Link className="text-indigo-600 underline hover:text-indigo-800 font-semibold" href="/">Início</Link>
            </form>
        </div>
    )
}