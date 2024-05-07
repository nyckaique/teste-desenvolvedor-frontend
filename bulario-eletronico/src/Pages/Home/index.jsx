import Busca from "../../Components/Busca";
import Header from "../../Components/Header";
import Tabela from "../../Components/Tabela";
import { ApiContext } from "../../Context/api";
import { useContext } from "react";
import "../../index.css";
import Seletor from "../../Components/Seletor";
export default function Home() {
  const {
    paginaAtual,
    setPaginaAtual,
    medicamentosFiltrados,
    setFiltro,
    handleFiltro,
    filtro,
  } = useContext(ApiContext);

  const handleProximaPagina = () => {
    if (paginaAtual < medicamentosFiltrados.length) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  // Exibe os medicamentos da página atual
  const medicamentosDaPaginaAtual =
    medicamentosFiltrados.length > 0
      ? medicamentosFiltrados[paginaAtual - 1]
      : [];

  return (
    <div className="bg flex flex-col min-h-screen">
      {/* conteudo */}
      <div className="flex-1">
        <Header />
        <Seletor />
        <Busca
          setFiltro={setFiltro}
          handleFiltro={handleFiltro}
          filtro={filtro}
        />
        <Tabela
          handlePaginaAnterior={handlePaginaAnterior}
          handleProximaPagina={handleProximaPagina}
          paginaAtual={paginaAtual}
          medicamentosFiltrados={medicamentosFiltrados}
          medicamentosDaPaginaAtual={medicamentosDaPaginaAtual}
        />
      </div>

      <div className="w-full mx-auto flex">
        <span className="w-full text-xs font-bold uppercase text-center bg-emerald-500 p-2 rounded-t-3xl">
          Desenvolvido por{" "}
          <a
            href="https://linkedin.com/in/nycollaskaique"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Nycollas Kaique
          </a>
        </span>
      </div>
    </div>
  );
}
