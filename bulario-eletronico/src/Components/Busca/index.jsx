export default function Busca({ handleFiltro, setFiltro, filtro }) {
  return (
    <div className="w-fit mx-auto my-4 bg-emerald-500 rounded-3xl flex flex-col justify-center items-center p-4 gap-4 text-lg">
      <label className="text-center">
        Busque pelo medicamento ou laboratório
      </label>
      <div className="flex gap-4 items-center justify-center flex-wrap">
        <input
          type="text"
          name=""
          id=""
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="rounded-xl p-2 bg-slate-50 block"
        />
        <button onClick={handleFiltro} className="btn">
          buscar
        </button>
      </div>
    </div>
  );
}
