/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";

interface APICategory {
  _id: string;
  id?: string;
  nome: string;
  parent: string | null;
}

interface NavCategory {
  id: string;
  name: string;
  slug: string;
  subcategories: NavCategory[];
}

const organizeCategories = (flatCategories: APICategory[]): NavCategory[] => {
  const allNavCategories: NavCategory[] = flatCategories
    .map((cat) => {
      const categoryId = cat._id;
      if (!categoryId) return null;

      return {
        id: categoryId,
        name: cat.nome,
        slug: `/categoria/${categoryId}`,
        subcategories: [] as NavCategory[],
      };
    })
    .filter((cat): cat is NavCategory => cat !== null);

  const categoryMap: Record<string, NavCategory> = {};
  const primaryCategories: NavCategory[] = [];

  allNavCategories.forEach((navCat) => {
    categoryMap[navCat.id] = navCat;
  });

  flatCategories.forEach((cat) => {
    const categoryId = cat._id;
    const navCat = categoryMap[categoryId];

    if (navCat) {
      if (cat.parent === null || cat.parent === "null") {
        if (!primaryCategories.some((p) => p.id === navCat.id)) {
          primaryCategories.push(navCat);
        }
      } else {
        const parentId = cat.parent;
        const parentCategory = categoryMap[parentId];

        if (parentCategory) {
          if (
            !parentCategory.subcategories.some((sub) => sub.id === navCat.id)
          ) {
            parentCategory.subcategories.push(navCat);
          }
        }
      }
    }
  });

  return primaryCategories;
};

export default function ProductNavbar({ setVisivel, toggleCart, cartCount }: any) {
  const [categories, setCategories] = useState<NavCategory[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { loggedIn, user, loading, logout } = useAuth();

  const navLinkClasses =
    "text-gray-800 hover:text-white hover:bg-orange-500 rounded-lg p-2 sm:p-3 transition-colors duration-200 font-semibold text-sm sm:text-base"
  const dropdownItemClasses =
    "text-sm p-3 text-white hover:bg-orange-500 whitespace-nowrap transition-colors duration-200"
  useEffect(() => {
    const fetchAndOrganizeCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: APICategory[] = await response.json();
        const organizedCategories = organizeCategories(data);
        setCategories(organizedCategories);
      } catch (err) {
        toast.error(`Erro ao carregar categorias: ${err}`);
      }
    };

    fetchAndOrganizeCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-start items-center gap-[20px] font-bold bg-amber-400 p-[20px] rounded-xl text-gray-800">
        Carregando...
      </div>
    );
  }

  const toggleShowUp = () => {
    setVisivel((prev: any) => !prev);
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Renderização principal
  return (
    // Container principal: Fixo, largura total, centralizado em telas grandes
    <nav className="fixed z-50 w-full top-0">
      <Toaster />
      <div className="flex justify-between items-center max-w-7xl mx-auto bg-amber-400 p-2 sm:p-3 rounded-b-xl">
        
        {/* --- Lado Esquerdo: Ações e Links Primários --- */}
        <div className="flex items-center gap-2 sm:gap-4">
            {/* Botão para abrir o painel de produtos/ShowUp (Sempre visível) */}
            <div
                onClick={toggleShowUp}
                className="hover:text-white hover:bg-orange-500 rounded-lg p-2 sm:p-3 cursor-pointer transition-colors duration-200"
            >
                <FaCartPlus className="w-6 h-6 sm:w-8 sm:h-8" /> {/* Ajuste o tamanho do Icone */}
            </div>

            <Link
                className={navLinkClasses}
                href="/"
                onClick={closeMobileMenu}
            >
                Home
            </Link>

            {/* Links de Auth (Visível em desktop, oculto em mobile) */}
            <div className="hidden md:flex items-center gap-4">
                {loggedIn ? (
                    <>
                        {user && (
                            <span className={`${navLinkClasses} cursor-default`}>
                                Olá, {user.email || user.id}
                            </span>
                        )}
                        <button
                            onClick={logout}
                            className="text-gray-800 hover:text-white hover:underline transition-colors duration-200 font-semibold text-sm p-2"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link className={navLinkClasses} href="http://localhost:3000/auth/login">
                            Sign in
                        </Link>
                        <Link className={navLinkClasses} href="http://localhost:3000/auth/register">
                            Sign up
                        </Link>
                    </>
                )}
            </div>
        </div>

        {/* --- Lado Direito: Categorias e Carrinho --- */}
        <div className="flex items-center gap-2">
            
            {/* Categorias Dropdown (Ocultas em mobile, visível em telas grandes) */}
            <div className="hidden lg:flex justify-end items-center gap-2">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="group flex flex-row items-center text-sm px-3 py-2 hover:bg-orange-500 hover:text-white cursor-pointer relative transition-colors duration-200 rounded-lg h-full"
                    >
                        <Link href={category.slug} className="font-semibold text-gray-800 group-hover:text-white">
                            {category.name}
                        </Link>
                        
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 ml-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </svg>

                        {/* Conteúdo do Dropdown */}
                        <div className="absolute hidden group-hover:block z-20 top-full pt-2 left-0 min-w-[150px]">
                            <div className="flex flex-col bg-amber-500 rounded-b-lg shadow-xl overflow-hidden">
                                {category.subcategories.length > 0 ? (
                                    category.subcategories.map((sub) => (
                                        <Link
                                            key={sub.id}
                                            href={sub.slug}
                                            className={dropdownItemClasses}
                                        >
                                            {sub.name}
                                        </Link>
                                    ))
                                ) : (
                                    <span className="text-sm p-3 text-white">
                                        Sem subcategorias
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Ícone de Carrinho (Apenas em mobile, assumindo que toggleCart vem do componente pai) */}
            {toggleCart && (
                <button
                    onClick={toggleCart}
                    className="md:hidden relative p-2 text-gray-800 hover:bg-orange-500 hover:text-white rounded-lg transition-colors duration-200"
                >
                    {/* Exemplo de Ícone de Carrinho (substitua pelo seu próprio) */}
                    <BsFillCartCheckFill />
                    {cartCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </button>
            )}

            {/* Menu Hambúrguer (Mobile/Tablet) */}
            <button
                className="md:hidden p-2 text-gray-800 hover:bg-orange-500 hover:text-white rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-auth-menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
        </div>
      </div>
      
      {/* --- Menu Mobile (Auth e Categorias Simplificadas) --- */}
      <div 
        id="mobile-auth-menu" 
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-amber-500 shadow-xl pb-2`}
        onClick={closeMobileMenu} // Fechar ao clicar em um link
      >
        <div className="flex flex-col p-4 gap-2">
            {/* Links de Auth no Mobile */}
            {loggedIn ? (
                <>
                    {user && (
                        <span className={`${navLinkClasses} w-full cursor-default text-gray-800`}>
                            Olá, {user.email || user.id}
                        </span>
                    )}
                    <button
                        onClick={() => { logout(); closeMobileMenu(); }}
                        className="text-gray-800 hover:text-white hover:bg-orange-600 w-full text-left p-2 rounded-lg font-semibold text-sm transition-colors duration-200"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link 
                        className={`${navLinkClasses} w-full`} 
                        href="http://localhost:3000/auth/login" 
                    >
                        Sign in
                    </Link>
                    <Link 
                        className={`${navLinkClasses} w-full`} 
                        href="http://localhost:3000/auth/register" 
                    >
                        Sign up
                    </Link>
                </>
            )}

            <hr className="my-2 border-gray-600" />
            
            {/* Categorias no Mobile (Lista Simples) */}
            <p className="font-bold text-gray-800 mt-2">Categorias</p>
            {categories.map((category) => (
                <div key={category.id} className="flex flex-col">
                    <Link 
                        href={category.slug} 
                        className={`${navLinkClasses} w-full pl-4 bg-amber-400 text-black`}
                    >
                        {category.name}
                    </Link>
                    {category.subcategories.map((sub) => (
                        <Link
                            key={sub.id}
                            href={sub.slug}
                            className={`${dropdownItemClasses} bg-amber-500 w-full pl-8 text-black hover:text-white`}
                        >
                            {sub.name}
                        </Link>
                    ))}
                </div>
            ))}
        </div>
      </div>
    </nav>
  )
}