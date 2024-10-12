
const SelectFormRegistro = ({ title, data, callback, type }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={title}>{title}</label>
      <div className="input-group">

        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
        <select className="form-control form-control-lg" id={title} onChange={callback}
        >
          {type === "departmen" ? <option selected>Seleccione...</option> : ""}

          {Array.isArray(data) && data.length > 0 ? (

            data.map((d) => (
              <option value={d.id} key={d.id}>{d.nombre}</option> // Añadir una clave única para cada opción
            ))

          ) : (
            <option selected>No data available</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default SelectFormRegistro;