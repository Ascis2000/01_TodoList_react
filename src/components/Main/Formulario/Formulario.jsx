
import React, { useState, useEffect } from "react";
import FormItems from "./FormItems";
import FormEdit from "./FormEdit";
import { v4 as uuidv4 } from "uuid";
import arr_data from "./data.js"
import './Formulario.css'

const Formulario = () => {

	//const [items, setItems] = useState(arr_data); // si queremos cargar los datos de un archivo .js
	const [items, setItems] = useState([]);

	// ESTADO
	// variable/estado 'values' con el valor {title: ''}
	// Funcion asociada del Estado: setValues()
	const [values, setValues] = useState({
		title: '',
		descripcion: ''
	});

	const [message, setMessage] = useState('');


	// ESTADO
	// variable/estado 'error' con el valor ''
	// Funcion asociada del Estado: setError()
	const [error, setError] = useState('');

	// ESTADO
	// variable/estado 'selectedItem' con el valor 'null'
	// Funcion asociada del Estado: setSelectedItem()
	const [selectedItem, setSelectedItem] = useState(false);

	const handleChange_pepito = (event) => {

		//console.log(values.title + " y " + values.title.length)
		setValues({
			...values,
			[event.target.name]: event.target.value
		})

		if (values.title.length < 6) {
            setError('La tarea debe tener al menos 6 caracteres');
        } else {
            setError('');
        }
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (values.title.length > 6) {
            addItem(values);
			setMessage("Tarea añadida");
            setValues({ title: "" }); // vaciamos el input
        }

		// Limpiar el mensaje después de 5 segundos
		setTimeout(() => {
			setMessage(""); // vaciamos el mensaje después de 5 segundos
		}, 5000);
	}

	const addItem = (new_item) => {
		setItems([new_item, ...items]);
	};

	const editItem = (index) => {
		setSelectedItem({ ...items[index], "index":index }); // Guardamos el ítem y su índice
	};

	const updateItem = (objetoItem) => {
		// 1. Crear una copia del array de items
		const dataOriginal = [...items];
	
		console.log("objetoItem.index===", objetoItem.index)
		// 2. Seleccionar el elemento que se quiere actualizar usando su índice
		const indexToUpdate = objetoItem.index;
	
		/* dataOriginal
		[
			{ "title": "CList Item 1", "description": "Descripción del item 1"},
			{ "title": "CList Item 2", "description": "Descripción del item 2"},
			{ "title": "CList Item 3", "description": "Descripción del item 3"}
		]

		objetoItem
		[
			{ "title": "CList Item 1aaa", "description": "Descripción del item 1", "index":0},
			{ "title": "CList Item 2", "description": "Descripción del item 2", "index":1},
			{ "title": "CList Item 3", "description": "Descripción del item 3", "index":2}
		] */
	
		// 3. Combinar el ítem actual con los nuevos valores
		dataOriginal[indexToUpdate] = {
			...dataOriginal[indexToUpdate], // Mantener los valores originales del ítem
			...objetoItem,                // Sobrescribir con los valores actualizados
		};
	
		// 4. Actualizar el estado con el array modificado
		setItems(dataOriginal);
	
		// 5. Limpiar el ítem seleccionado (finalizar edición)
		setSelectedItem(false);
	};

	const removeAllItems = () => {
		setItems([]); //actualiza estado Items
	};

	const resetItems = () => {
		setItems(arr_data); //cargar con datos iniciales de nuevo
	}
	const removeItem = (i) => {
		const remainingItems = items.filter((item, index) => index !== i);
		setItems(remainingItems);
		alert(`Item borrado: ${items[i].title}`)
	}

	const renderItems = () => {
		return items.map(
			(item, i) => 
			<FormItems 
				data={item} key={uuidv4()} 
				edit={() => editItem(i)} 
				remove={() => removeItem(i)} 
			/>
		)
	}

	// precargar datos con fetch
	useEffect(() => {
		const fetchTasks = async () => {

			try {
				const response = await fetch("/data_00.json"); // archivo JSON en la carpeta public
				if (!response.ok) {
					throw new Error("Error al cargar el archivo JSON");
				}
				const items_data = await response.json();
				setItems(items_data);
			} catch (error) {
				setError("Error al cargar las tareas:" + error);
			}
		};
		fetchTasks();
	}, []); // se actualiza cada vez que renderizas el componente Formulario

	useEffect(() => {
		if (values.title) {
			const timeoutId = setTimeout(() => setValues({ title: "" }), 5000);
			return () => clearTimeout(timeoutId);
		}
	}, [values.title]);

	return (
		<div>
		{
			selectedItem 
			? 
			<>
				<h3>Modo: Edicción</h3>
				<FormEdit item={selectedItem} onSubmittt={updateItem} /> 
			</>
			: 
			<>
				<form onSubmit={handleSubmit}>
					<label htmlFor="title">Listado</label><br />
					<input type="text" name="title" value={values.title} onChange={handleChange_pepito} /><br></br>
					{
					/* <label htmlFor="name">Description</label><br/>
					<input type="text" name="description" onChange={handleChange} /><br/>
			
					<label htmlFor="price">Precio</label><br/>
					<input type="number" name="price" onChange={handleChange} /><br/>
			
					<label htmlFor="url">URL imagen</label><br/>
					<input type="url" name="img_url" onChange={handleChange} /><br/> */
					}

					{error && <p className="error">{error}</p>}
					{message && <p className="success">{message}</p>}

					{values.title ? (
						<button type="submit">ADD Item</button>
					) : (
						<p className="error">Rellena todos los campos</p>
					)}
				</form>

				<button onClick={removeAllItems}>Borrar todo</button>
				<button onClick={resetItems}>RESET</button>
				<button onClick={() => removeItem(0)}>Borrar primero</button>
				{ renderItems() }
			</>
			
		}
		</div>
	);
};
export default Formulario;
