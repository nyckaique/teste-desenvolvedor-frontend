import Busca from "../../Components/Busca";
import Header from "../../Components/Header";
import Tabela from "../../Components/Tabela";
import { ApiContext } from "../../Context/api";
import { useContext } from "react";
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
    <div>
      <Header />
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
  );
}
