// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function CardProduct({ source, alter, title, description, price }) {
  return (
    <div className="flex flex-col items-center bg-yellow-400 rounded-lg w-[200px] h-[200px]">  
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={source}
          alt={alter}
          className="w-full h-full object-cover"
        />
      <div className="text-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm ">{description}</p>
        <span className="mt-4 text-lg font-bold text-orange-500">{price}</span>
      </div>
    </div>
  );
}