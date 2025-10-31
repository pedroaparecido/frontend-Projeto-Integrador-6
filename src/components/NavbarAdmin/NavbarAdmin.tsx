/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"client component";

import { FaTrash } from "react-icons/fa";
import moment from "moment";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
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
            !parentCategory.subcategories.some(
              (items) => items.id === navCat.id
            )
          ) {
            parentCategory.subcategories.push(navCat);
          }
        }
      }
    }
  });

  return primaryCategories;
};

export default function NavbarAdmin() {
  const { loggedIn, user, loading, logout } = useAuth();
  const [categories, setCategories] = useState<NavCategory[]>([]);
  const [order, setOrder] = useState([]);
  const [visivel, setVisivel] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/orders`);

        const data = await response.json();

        setOrder(data);
      } catch (err) {
        toast.error(`${err}`);
      }
    };

    fetchOrder();
  }, []);

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

  async function handleDelete(body: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/del`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) toast.success("Pedido excluido com sucesso!");
  }

if (loading) {
    return (
      <div className="flex justify-center items-center gap-5 font-bold bg-white text-black p-5 w-full max-w-lg mt-5 mx-auto text-center rounded-xl shadow-lg">
        Carregando...
      </div>
    );
  }

  return (
    // Container principal: fixo, largura total e alto z-index
    // p-4: padding para não colar nas bordas em mobile
    <nav className="fixed z-50 w-full p-2 sm:p-4 bg-zinc-900 shadow-xl">
      <Toaster />
      <div className="flex flex-row h-[48px] justify-between items-center max-w-7xl mx-auto">
        
        {/* Lado Esquerdo/Principal - Itens de Navegação */}
        <div className="w-full h-full flex items-center gap-2 sm:gap-4 md:gap-6 bg-white p-2 rounded-l-xl">
          
          {/* Botão Home - sempre visível */}
          <Link
            className="text-black hover:bg-black hover:text-white rounded-lg p-2 transition-colors duration-200 text-sm font-semibold whitespace-nowrap"
            href="/"
          >
            Home
          </Link>
          
          {/* Botão de Menu Hambúrguer (Mobile) */}
          <button
            className="md:hidden text-black p-2 rounded-lg hover:bg-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {/* Ícone Hambúrguer/Fechar */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Itens de Usuário (Desktop/Tablet) */}
          <div className="hidden md:flex items-center gap-4">
            {loggedIn ? (
              <>
                {user && (
                  <span className="text-black text-sm font-semibold whitespace-nowrap">
                    Olá, {user.email || user.id}
                  </span>
                )}
                <button
                  onClick={logout}
                  className="text-black hover:underline cursor-pointer text-sm font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="text-black hover:bg-black hover:text-white rounded-lg p-2 transition-colors duration-200 text-sm font-semibold"
                  href="http://localhost:3000/auth/login"
                >
                  Sign in
                </Link>
                <Link
                  className="text-black hover:bg-black hover:text-white rounded-lg p-2 transition-colors duration-200 text-sm font-semibold"
                  href="http://localhost:3000/auth/register"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Lado Direito - Dropdown de Pedidos */}
        {/* mx-2: Pequena margem para não colar na borda do container principal */}
        <div className="w-full flex justify-end items-center bg-white rounded-r-xl text-gray-800 h-10 sm:h-12 mr-2 sm:mr-0">
          <div className="group flex flex-row h-full items-center text-sm sm:text-base px-3 sm:px-6 hover:bg-black hover:text-white relative transition-colors duration-200 rounded-xl">
            Pedidos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
            
            {/* Menu Dropdown - Não Responsivo por padrão, mas com max-h e overflow */}
            <div className="absolute hidden group-hover:block z-20 top-full w-48 sm:w-60 right-0 left-auto mt-1">
              <div className="flex flex-col bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto border border-gray-100">
                {order.map((items: any) => (
                  <div key={items._id}>
                    <div className="flex text-black justify-between items-center p-3 hover:bg-indigo-600 hover:text-white transition-colors duration-150">
                      <div className="flex flex-col text-sm">
                        <span className="font-medium truncate max-w-[100px] sm:max-w-full">{items.title}</span>
                        <span className="text-xs mt-1 opacity-80">
                          {moment(items.date).format("LT")}
                        </span>
                      </div>
                      <button
                        className="p-1 text-red-500 hover:text-red-700 group-hover:hover:text-red-300 transition-colors cursor-pointer"
                        onClick={() => handleDelete(items)}
                        aria-label={`Excluir pedido ${items.title}`}
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                    <hr className="border-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Mobile/Tablet (Abre e Fecha) */}
      <div id="mobile-menu" className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white mt-2 p-4 rounded-xl shadow-lg`}>
        <div className="flex flex-col gap-3">
          {loggedIn ? (
            <>
              {user && (
                <span className="text-black text-sm font-semibold">
                  Olá, {user.email || user.id}
                </span>
              )}
              <button
                onClick={logout}
                className="text-black text-left hover:text-indigo-600 cursor-pointer text-sm font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="text-black text-left hover:text-indigo-600 transition-colors duration-200 text-sm font-semibold"
                href="http://localhost:3000/auth/login"
              >
                Sign in
              </Link>
              <Link
                className="text-black text-left hover:text-indigo-600 transition-colors duration-200 text-sm font-semibold"
                href="http://localhost:3000/auth/register"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
