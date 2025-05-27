import Link from "next/link";

export default function Navbar() {
    return(
        <div className="flex justify-end items-center gap-[20px] font-bold bg-blue-500 p-[20px]">
            <Link href="/">Home</Link>
            <Link href="#">Olá</Link>
            <Link href="#">Olá</Link>
            <Link href="auth/login">Sign in</Link>
            <Link href="auth/register">Sign up</Link>
        </div>
    )
}