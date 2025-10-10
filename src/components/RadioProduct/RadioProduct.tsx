import React from 'react'

type Category = {
    _id: string
    nome: string
    parent: string | null
}

type RadioProductProps = {
    categories: Category[]
    selectedValue: string
    onChange: (value: string) => void
}

export default function RadioProduct({ categories, selectedValue, onChange }: RadioProductProps) {
    const parentCategories = categories.filter(cat => !cat.parent)
    const getSubCategories = (parentId: string) => categories.filter(cat => cat.parent === parentId)

    return (
        <div className="flex flex-col">
            {parentCategories.map(parentCat => (
                <div key={parentCat._id} className="mb-2">
                    <div className="flex flex-row items-center font-bold">
                        <input
                            type="radio"
                            name="productCategory"
                            id={parentCat._id}
                            value={parentCat.nome}
                            checked={selectedValue === parentCat.nome}
                            onChange={() => onChange(parentCat.nome)}
                            className="mr-[10px]"
                        />
                        <label htmlFor={parentCat._id}>{parentCat.nome}</label>
                    </div>
                    <div className="flex flex-col ml-[30px] border-l border-gray-400 pl-4">
                        {getSubCategories(parentCat._id).map(subCat => (
                            <div key={subCat._id} className="flex flex-row">
                                <input
                                    type="radio"
                                    name="productCategory"
                                    id={subCat._id}
                                    value={subCat.nome}
                                    checked={selectedValue === subCat.nome}
                                    onChange={() => onChange(subCat.nome)}
                                    className="mr-[10px]"
                                />
                                <label htmlFor={subCat._id}>{subCat.nome}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}