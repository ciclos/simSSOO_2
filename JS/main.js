//Reaprovechamos el codigo del profesor adaptando solo lo necesario a nuestro proyecto.

// Selección de elementos adaptada al proyecto
var particiones = document.querySelectorAll(".panel-memoria .particion");
var procesos = document.querySelectorAll(".panel-procesos .particion");
    
hacerDropable(particiones);
hacerDragable(procesos);

/* * Hace que se pueda soltar encima de un elemento.
 * Al soltar encima un elemento que sea dragable se inserta un hijo haciendo uso del id
 * que se guardó.
 */
function hacerDropable(listaElementos){
    listaElementos.forEach( elemento =>{
        
        // Desactivamos la acción por defecto de dragover
        elemento.ondragover = function (event) {
            event.preventDefault();
        }

        // Recuperamos el elemento mediante su id y los insertamos con appendChild
        elemento.ondrop = function(event) {
            event.preventDefault();

            // añadimos esto para evitar que si la particion esta ocupada salga de la funcion.
            if (this.children.length > 0){
                return;
            }

            this.appendChild(
                document.getElementById(
                    event.dataTransfer.getData("text")
                )
            );
        }
    });
}

/* * Hace arrastrables a todos los elementos de la lista. 
 * Al arrastrar un elemento se guarda su id.
 */
function hacerDragable(listaElementos){

    listaElementos.forEach( elemento =>{
        elemento.setAttribute( 'draggable', true );
        elemento.ondragstart = 
            function (event){
                event.dataTransfer.setData("text", event.target.id);
            };
    });
}