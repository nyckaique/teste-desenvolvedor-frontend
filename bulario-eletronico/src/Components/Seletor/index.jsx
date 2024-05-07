import { useContext, useState } from "react";
import { ApiContext } from "../../Context/api";

export default function Seletor() {
  const { setClassification, cleanTable } = useContext(ApiContext);
  const [tab, setTab] = useState(1);
  const toggleTab = (index) => {
    setTab(index);
    switch (index) {
      case 1:
        setClassification("TODOS");
        break;
      case 2:
        setClassification("ANTIBIÓTICO");
        break;
      case 3:
        setClassification("TARJA VERMELHA");
        break;
      case 4:
        setClassification("OUTRO");
        break;
      default:
        setClassification("TODOS");
    }
    cleanTable();
  };
  return (
    <div className="w-fit mx-auto my-4 bg-emerald-500 rounded-3xl flex flex-col sm:flex-row justify-center items-center p-4 gap-4 text-lg">
      <button
        onClick={() => {
          toggleTab(1);
        }}
        className={tab === 1 ? "active-tab tab" : "tab"}
      >
        Todos
      </button>
      <button
        onClick={() => {
          toggleTab(2);
        }}
        className={tab === 2 ? "active-tab tab" : "tab"}
      >
        Antibióticos
      </button>
      <button
        onClick={() => {
          toggleTab(3);
        }}
        className={tab === 3 ? "active-tab tab" : "tab"}
      >
        Tarja Vermelha
      </button>
      <button
        onClick={() => {
          toggleTab(4);
        }}
        className={tab === 4 ? "active-tab tab" : "tab"}
      >
        Outros
      </button>
    </div>
  );
}
