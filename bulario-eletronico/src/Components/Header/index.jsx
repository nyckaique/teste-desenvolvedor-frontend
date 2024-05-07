import bg01 from "../../assets/bg01.png";
import bg02 from "../../assets/bg02.png";

export default function Header() {
  return (
    <div className="w-full flex justify-between items-end px-2 pt-4 bg-header  rounded-b-3xl">
      <span>
        <img
          src={bg01}
          alt="Imagem da esquerda"
          className="w-auto h-auto max-w-full"
        />
      </span>

      <h1 className="text-4xl font-bold my-auto mx-auto pb-4 flex flex-col items-center uppercase gap-4">
        <span className="text-rose-700">bulário</span>
        <span className="text-sky-800">eletrônico</span>
      </h1>
      <span>
        <img
          src={bg02}
          alt="Imagem da direita"
          className="w-auto h-auto max-h-72 max-w-full"
        />
      </span>
    </div>
  );
}
