import RadioProduct from "../RadioProduct/RadioProduct"

type Category = {
    _id: string
    nome: string
    parent: string | null
}

export default function RowCard({
  title,
  description,
  price,
  selectedCategory,
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onPriceChange,
  categories
}: {
  title: string
  description: string
  price: string
  selectedCategory: string
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCategoryChange: (value: string) => void
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  categories: Category[]
}) {
  return (
    <div className="mt-[70px] flex flex-row justify-center w-full">
      <div className="flex flex-col justify-center w-full">
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={onTitleChange}
          className="outline-none bg-white text-black rounded shadow-xl"
        />
        <hr className="p-[10px]" />
        <label htmlFor="description">Descrição:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={onDescriptionChange}
          className="outline-none bg-white text-black shadow-xl"
        />
        <hr className="p-[10px]" />
        <label htmlFor="description">Preço:</label>
        <input
          type="text"
          id="description"
          value={price}
          onChange={onPriceChange}
          className="outline-none bg-white text-black shadow-xl"
        />
        <hr className="p-[10px]" />
      </div>
      <div className="flex flex-col items-center w-full">
        <RadioProduct
          selectedValue={selectedCategory}
          onChange={onCategoryChange}
          categories={categories}
        />
      </div>
    </div>
  )
}