import { createContext, useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const ApiContext = createContext({});

export default function ApiProvider({ children }) {
  const [medicamentos, setMedicamentos] = useState([{}]);
  const [filtro, setFiltro] = useState("");
  const [medicamentosFiltrados, setMedicamentosFiltrados] = useState([{}]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    async function carregarMedicamentos() {
      try {
        const resposta = await axios.get("http://localhost:3000/data");
        setMedicamentos(resposta.data);
        console.log(resposta.data);
      } catch (error) {
        toast.error("Não foi possível carregar os medicamentos do servidor.");
      }
    }
    carregarMedicamentos();
  }, []);

  function normalizarString(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function handleFiltro() {
    if (filtro !== "") {
      const busca = normalizarString(filtro);
      const listaFiltrada = medicamentos.filter((medicamento) => {
        let medicamentoName = normalizarString(medicamento.name);
        let medicamentoCompany = normalizarString(medicamento.company);

        if (
          medicamentoName.includes(busca) ||
          medicamentoCompany.includes(busca)
        ) {
          return medicamento;
        }
      });

      //Ordenação
      const listaOrdenada = listaFiltrada.sort((a, b) => {
        return new Date(b.published_at) - new Date(a.published_at);
      });

      //Formatação
      const medicamentosFormatados = listaOrdenada.map((medicamento) => {
        return {
          ...medicamento,
          published_at: `${dayjs(medicamento.published_at).format(
            "DD/MM/YYYY HH:mm"
          )}h`,
        };
      });

      //Paginação
      const paginas = [];
      for (let i = 0; i < medicamentosFormatados.length; i += 10) {
        paginas.push(medicamentosFormatados.slice(i, i + 10));
      }

      setMedicamentosFiltrados(paginas);
      setFiltro("");
      setPaginaAtual(1);
    } else {
      toast.info("Preencha o campo para realizar uma busca.");
    }
  }

  return (
    <ApiContext.Provider
      value={{
        medicamentos,
        paginaAtual,
        setPaginaAtual,
        medicamentosFiltrados,
        setFiltro,
        handleFiltro,
        filtro,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
