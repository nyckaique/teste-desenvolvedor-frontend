import Medicamento from "../Medicamento";

export default function Tabela({
  handlePaginaAnterior,
  handleProximaPagina,
  paginaAtual,
  medicamentosFiltrados,
  medicamentosDaPaginaAtual,
}) {
  return (
    <div className="flex flex-col w-full max-w-full p-8  items-center rounded-3xl gap-4">
      <div className="flex gap-4">
        <button
          onClick={handlePaginaAnterior}
          disabled={paginaAtual === 1}
          className="btn cursor-pointer"
        >
          Página Anterior
        </button>
        <button
          onClick={handleProximaPagina}
          disabled={paginaAtual === medicamentosFiltrados.length}
          className="btn cursor-pointer"
        >
          Próxima Página
        </button>
      </div>

      <div className="flex flex-col gap-4 ">
        {Array.isArray(medicamentosDaPaginaAtual) ? (
          medicamentosDaPaginaAtual.map((medicamento, index) => (
            <Medicamento key={index} medicamento={medicamento} />
          ))
        ) : (
          <p>Digite algo e clique em buscar.</p>
        )}
      </div>
    </div>
  );
}
