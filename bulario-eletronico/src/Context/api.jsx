import { createContext, useState, useEffect } from "react";

import dayjs from "dayjs";
import { toast } from "react-toastify";
import data from "../dotlib.json"; // Importa o arquivo JSON
//console.log(data); // Verifique se os dados estão sendo carregados corretamente

export const ApiContext = createContext({});

// Use a variável 'documentos' em seu aplicativo

export default function ApiProvider({ children }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [medicamentosFiltrados, setMedicamentosFiltrados] = useState([{}]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [classification, setClassification] = useState("TODOS");
  const [medicamentosClassificados, setMedicamentosClassificados] = useState(
    []
  );

  useEffect(() => {
    // Verifica se 'data' é um array
    if (Array.isArray(data)) {
      // Mapeia sobre cada objeto no array 'data'
      const documentosArray = data.map((objeto) => ({
        ...objeto,
        // Mapeia sobre cada documento dentro do objeto
        documents: objeto.documents.map((documento) => ({
          ...documento,
          // Substitui a URL utilizando o valor de 'process.env.PUBLIC_URL'
          url: documento.url.replace("%PUBLIC_URL%", process.env.PUBLIC_URL),
        })),
      }));

      // Define o estado 'documentos' como o array de documentos
      setMedicamentos(documentosArray);
    } else {
      console.error("Formato de dados inválido");
    }
  }, [data]);
  useEffect(() => {
    // Executa classificationFilter somente quando 'medicamentos' for atualizado
    if (medicamentos.length > 0) {
      classificationFilter();
    }
  }, [medicamentos]); // Adiciona 'medicamentos' como dependência para o useEffect
  useEffect(() => {
    // Executa classificationFilter somente quando 'medicamentos' for atualizado
    classificationFilter();
  }, [classification]); // Adiciona 'medicamentos' como dependência para o useEffect

  function normalizarString(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function handleFiltro() {
    //console.log("classificacao na busca", classification);
    classificationFilter();
    //console.log("medicamentos", medicamentos);
    //console.log("medicamentos classificados", medicamentosClassificados);
    if (filtro !== "") {
      const busca = normalizarString(filtro);
      const listaFiltrada = medicamentosClassificados.filter((medicamento) => {
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

  function classificationFilter() {
    const listaFiltrada = medicamentos.filter((medicamento) => {
      if (classification === "TODOS") {
        return medicamento;
      } else if (medicamento.classification === classification) {
        return medicamento;
      }
    });
    //console.log("medicamentos classificados: ", listaFiltrada);
    setMedicamentosClassificados(listaFiltrada);
  }
  function cleanTable() {
    setMedicamentosFiltrados([{}]);
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
        setClassification,
        cleanTable,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
