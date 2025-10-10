This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Novo commit que o commit atras foi errado..

As formas de como executar o aplicativo esta descrito atraves do react.
Finalização do projeto com confirmação tanto ao fazer pedido ou ao fazer login e registro (CSRF Token), na parte de produtos com categorias com o carrinho só armazena o pedido após o pagamento ter sido efetuado. Antes de pagar abre um novo panel para armazenar o endereço da usuario e enfim a parte administrativa, lá tem o crud tanto o create o update e o delete dos produtos e das categorias.. mas também tem o read dos pedidos com opção de delete.
As categorias estão ligadas aos produtos e como a rota dentro do react é "/categoria/[id]" se o id não existir como uma categoria que linka os produtos dessa categoria, não vai ser exibido nenhum produto.
Todos os links internos do site são links do "next/navigation" que usa a virtual dom do navegador, a atualização constante de deletar ou editar se da ao "useEffect" feito atraves do get de cada rota, foi usado também o useCallback e o useContext também como provider para encapsular os contexto e importalos de uma vez como um componente só dentro do layout(esqueleto de todas as páginas ou fragmentos do html dentro do javascript(react)). UseCallback foi usado para manter os dados do usuario quando logar, o useContext foi usado para passar os dados do carrinho de componente para componente e de autenticação(tudo issofaz parte do react-hooks).