# React + Vite


### EJERCICIO: TODO LIST

Haciendo uso de **useState**, crea una TODO list que contenga lo siguiente:

- Un formulario con input + botón
- Un componente List que recorra listas de items
- Un componente Item o Card que contenga cada TO-DO
- Botón CLEAR para borrar todas las tareas
- Botón BORRAR, asociado a cada tarea, para poder borrar de manera independiente
- Botón para hacer RESET de las tareas
- Dar estilo CSS a los componentes con lo visto en clase para practicar

Flujo de la aplicación:
- Nada más empezar tendremos un input y un botón. El botón tendrá el texto ADD 
- Si hemos escrito algo en el input y hacemos click sobre el botón ADD, se añadirá un item debajo del input.
- Cuando un item sea añadido, se borrará inmediatamente lo que habíamos escrito en el input.
- Se debe hacer una precarga de tareas de un JSON de datos
- El botón de RESET mostrará de nuevo sólo las tareas obtenidas de la precarga de datos

TIP: usad el paquete de NPM UUID para manejar las keys de los diferentes elementos de la lista.


### EJERCICIO: TODO LIST (FASE 2)

- Hasta que no haya texto no aparecerá el botón ADD
- Si hemos escrito algo en el input y hacemos click sobre el botón ADD, se añadirá un item debajo del input.
- Cuando un item sea añadido, se borrará inmediatamente lo que habíamos escrito en el input y desaparecerá el botón ADD.
- Se debe hacer una precarga de tareas de un JSON de datos
- El botón de RESET mostrará de nuevo sólo las tareas obtenidas de la precarga de datos
- La precarga de datos se debe hacer usando el lifecycle
- Si pasados 20 segundos no envias la tarea que has escrito, se vaciará el input y desaparecerá ADD
- Cuando haya sido añadida una tarea se mostrará durante 5 segundos el mensaje "tarea añadida" y luego desaparecerá
- Validación: La tarea introducida en el input debe tener al menos 6 caracteres. En caso contrario debe aparecer un mensaje de error

### EJERCICIO: TODO LIST (FASE 3)

- Editar tarea. Al hacer clic en el botón de edición de una tarea, se debe abrir un formulario prellenado con el título y el contenido de la tarea seleccionado. El usuario puede editar la tarea y guardar los cambios.

- Tachar o Eliminar tareas. Añade funcionalidades para marcar las tareas como completadas (tachar) o eliminarlas.
