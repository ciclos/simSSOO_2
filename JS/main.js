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

            // lo cambiamos a .querySelector .particion para evitar que cuente los tooltip
            if (this.querySelector(".particion")){
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

// Seleccionamos todas las particiones de la memoria
const particionesMemoria = document.querySelectorAll(".panel-memoria .particion");

particionesMemoria.forEach(particion => {
    // Escuchamos cuando el raton entra en la particion con Mouseover
    particion.addEventListener("mouseover", function() {
        
        // Obtenemos el tamaño total de la particion de (data-tam)
        let tamTotal = parseFloat(this.getAttribute("data-tam"));
        
        // buscamos si hay un proceso dentro (usando el selector que arreglamos antes)
        let proceso = this.querySelector(".particion");
        
        let disponible = tamTotal; // si la particion esta vacia el total del tamaño es el disponible que tenga asignada

        // calculo de memoria disponible
        if (proceso) {
            let tamProceso = parseFloat(proceso.getAttribute("data-tam"));
            disponible = tamTotal - tamProceso;
        }

        // escribimos el texto del tooltip con el espacio disponible
        this.querySelector(".tooltiptext").innerText = "Disponible: " + disponible + " MB";
    });
});