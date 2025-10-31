"client component";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

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
  const primaryCategories: NavCategory[] = []; // 1. Popula o mapa para acesso rápido

  allNavCategories.forEach((navCat) => {
    categoryMap[navCat.id] = navCat;
  }); // 2. Constrói a hierarquia

  flatCategories.forEach((cat) => {
    const categoryId = cat._id;
    const navCat = categoryMap[categoryId];

    if (navCat) {
      // Se parent é null ou 'null', é uma categoria principal
      if (cat.parent === null || cat.parent === "null") {
        if (!primaryCategories.some((p) => p.id === navCat.id)) {
          primaryCategories.push(navCat);
        }
      } else {
        // Se tem um pai, tenta anexar
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

export default function Navbar() {
  const { loggedIn, user, loading: authLoading, logout } = useAuth();
  const [categories, setCategories] = useState<NavCategory[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const fetchAndOrganizeCategories = async () => {
      try {
        const response = await fetch("http://localhost:3003/categories");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: APICategory[] = await response.json();
        const organizedCategories = organizeCategories(data);
        setCategories(organizedCategories);
      } catch (err) {
        toast.error(`Erro ao carregar categorias:", ${err}`)
      } finally {
        setDataLoading(false);
      }
    };

    fetchAndOrganizeCategories();
  }, []);

  const isLoading = authLoading || dataLoading;

const navLinkClasses =
    "text-gray-800 hover:text-white hover:bg-orange-500 rounded-lg transition-colors duration-200 p-2 text-sm font-semibold";
  const dropdownItemClasses =
    "text-sm p-3 text-white hover:bg-orange-500 hover:text-white transition-colors duration-200 whitespace-nowrap";

  if (isLoading) {
    return (
      // Loading adaptado para ser responsivo (full width, padding menor)
      <div className="flex justify-start items-center font-bold bg-amber-400 text-gray-800 fixed z-50 w-full px-4 py-3 shadow-md">
        Carregando...
      </div>
    );
  }

  return (
    // Container principal: fixo, largura total
    <nav className="fixed z-50 w-full shadow-lg">
      <Toaster />
      <div className="flex justify-between items-center max-w-7xl mx-auto bg-amber-400 p-2 sm:p-3 rounded-b-xl">
        
        {/* --- Lado Esquerdo: Home e Auth (Sempre visível ou no menu mobile) --- */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link 
            className={`${navLinkClasses} hidden sm:block`} // Oculta em mobile, visível a partir de sm
            href="/"
          >
            Home
          </Link>
          
          {/* Menu Hambúrguer (Mobile) */}
          <button
            className="sm:hidden p-2 text-gray-800 hover:bg-orange-500 hover:text-white rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Links de Auth (Visíveis apenas em desktop/tablet) */}
          <div className="hidden sm:flex items-center gap-4">
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

        {/* --- Lado Direito: Categorias (Dropdowns - Oculta em mobile) --- */}
        <div className="hidden md:flex justify-end items-center gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group flex flex-row items-center text-sm px-3 py-2 hover:bg-orange-500 hover:text-white cursor-pointer relative transition-colors duration-200 rounded-lg"
            >
              <Link href={category.slug} className="font-semibold text-gray-800 group-hover:text-white">
                {category.name}
              </Link>
              
              {/* Ícone de seta para dropdown */}
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
      </div>
      
      {/* --- Menu Mobile (Abre e Fecha) --- */}
      <div id="mobile-menu" className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-amber-500 shadow-xl pb-2`}>
        <div className="flex flex-col p-4 gap-2">
          <Link className={`${navLinkClasses} w-full`} href="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>

          {/* Links de Auth no Mobile */}
          {loggedIn ? (
              <>
                {user && (
                  <span className={`${navLinkClasses} w-full cursor-default text-gray-800`}>
                    Olá, {user.email || user.id}
                  </span>
                )}
                <button
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="text-gray-800 hover:text-white hover:bg-orange-500 w-full text-left p-2 rounded-lg font-semibold text-sm transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                    className={`${navLinkClasses} w-full`} 
                    href="http://localhost:3000/auth/login" 
                    onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link 
                    className={`${navLinkClasses} w-full`} 
                    href="http://localhost:3000/auth/register" 
                    onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}

          <hr className="my-2 border-gray-600" />
          
          {/* Categorias no Mobile (Sem Dropdown, Lista Simples) */}
          <p className="font-bold text-gray-800 mt-2">Categorias</p>
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col">
              <Link 
                href={category.slug} 
                className={`${navLinkClasses} w-full pl-4 bg-amber-400 text-black`}
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={sub.slug}
                  className={`${dropdownItemClasses} bg-amber-500 w-full pl-8 text-black hover:text-white`}
                  onClick={() => setIsMenuOpen(false)}
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
