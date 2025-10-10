import React from 'react'

type Category = {
  _id: string
  nome: string
  parent: string | null
}

type CatRowCardProps = {
  newCategoryName: string
  selectedParentCategory: string
  categories: Category[] | null
  onNewCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onParentCategoryChange: (value: string) => void
}

export default function CatRowCard({
  newCategoryName,
  selectedParentCategory,
  categories,
  onNewCategoryChange,
  onParentCategoryChange
}: CatRowCardProps) {
  const parentCategories = categories!.filter(cat => !cat.parent)

  return (
    <div className="mt-[70px] flex flex-row justify-center w-full text-white">
      <div className="flex flex-col justify-center w-full">
          <label htmlFor="categoryName" className="text-white">Nome da Categoria:</label>
          <input
              type="text"
              id="categoryName"
              value={newCategoryName}
              onChange={onNewCategoryChange}
              className="outline-none bg-zinc-900 text-white rounded shadow-xl"
          />
          <hr className="p-[10px] bg-zinc-700" />
      </div>
      <div className="flex flex-col items-center w-full">
          <h4 className="mb-2 text-white">Escolha uma categoria pai (opcional):</h4>
          {parentCategories.map(cat => (
              <div key={cat._id} className="mb-2">
                  <label className="text-white">
                      <input
                          type="radio"
                          name="parentCategory"
                          value={cat._id}
                          checked={selectedParentCategory === cat._id}
                          onChange={(e) => onParentCategoryChange(e.target.value)}
                          className="mr-2"
                      />
                      {cat.nome}
                  </label>
              </div>
          ))}
      </div>
  </div>
  )
}