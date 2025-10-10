import { NextRequest, NextResponse } from 'next/server'

// **ATENÇÃO: Essas constantes DEVEM ser as mesmas do Backend!**
// No Next.js, use variáveis de ambiente (.env.local) para o valor real.
const ADMIN_COOKIE_NAME = 'admin_acesso_master'
const ADMIN_COOKIE_VALUE = 'ACESSO_LIBERADO_456' 

// A lista de caminhos que apenas administradores podem ver.
const rotasRestritas = ['/auth/check', '/auth/login'] 

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    
    if (rotasRestritas.includes(pathname)) {
        const cookieDeAcesso = request.cookies.get(ADMIN_COOKIE_NAME)

        // 1. Se o cookie NÃO estiver presente ou for inválido, redireciona para o Check
        if (!cookieDeAcesso || cookieDeAcesso.value !== ADMIN_COOKIE_VALUE) {
            // Salva o destino original na query string 'next'
            const url = request.nextUrl.clone()
            url.pathname = '/error/404'
            url.searchParams.set('next', pathname) // Passa a rota original para que o admin possa voltar
            
            return NextResponse.redirect(url)
        }
    }

    // Se o usuário já está no /auth/check, não faça nada.
    if (pathname === '/auth/check') {
        return NextResponse.next()
    }
    
    return NextResponse.next()
}

export const config = {
  matcher: [
    '/auth/register',
    '/auth/login',
    '/auth/check'
  ],
}