export default function Medicamento({ medicamento }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-full flex-shrink justify-between bg-slate-50 p-4 rounded-3xl">
      <div className="sm:w-1/2">
        <p>
          <span className="font-semibold">Nome:</span> {medicamento.name}
        </p>
        <p>
          <span className="font-semibold">Laboratório:</span>{" "}
          {medicamento.company}
        </p>
      </div>
      <div className="sm:w-1/6">
        <p className="font-semibold">Data de publicação</p>
        <p>{medicamento.published_at}</p>
      </div>

      {medicamento.documents.map((pdf, index) => (
        <div key={index} className="sm:w-1/6">
          <p className="font-semibold">
            Bula do {pdf.type === "PATIENT" ? "Paciente" : "Profissional"}
          </p>
          <p className="text-sky-700">
            <a
              href={pdf.url}
              target="_blank"
              rel="noreferrer"
              className="capitalize"
            >
              <i className="fas fa-solid fa-file-pdf text-2xl" /> download
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}
