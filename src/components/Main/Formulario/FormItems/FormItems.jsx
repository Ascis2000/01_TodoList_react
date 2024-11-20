import React from "react";

const FormItems = ({ data, edit, remove }) => {
	
	return <div>
		<article>
			<h3>Titulo:{data.title}</h3>
			<button onClick={() => { alert("producto borrado") }}>Dame Alert</button>
			<button onClick={edit}>Editar</button>
			<button onClick={remove}>Borrar</button>
		</article>
	</div>;
};

export default FormItems;
