// ==================================================
// 1. LOGIN (Nombre: validarAcceso para coincidir con tu HTML)
// ==================================================
function validarAcceso(event) {
    event.preventDefault(); // Evita que la página se recargue

    const correo = document.getElementById('usuario').value;
    const contrasena = document.getElementById('password').value;
    const cajaError = document.getElementById('mensajeError');

    // Validación de credenciales
    if (correo === "@admin" && contrasena === "admin1234") {
        cajaError.style.display = "none";
        window.location.href = "default.html";
    } else {
        // Muestra el mensaje de error
        cajaError.style.display = "block";
        // Limpia el campo de contraseña
        document.getElementById('password').value = "";
    }
}

// ==================================================
// 2. RECUPERACIÓN DE CONTRASEÑA
// ==================================================
function abrirModal(event) {
    event.preventDefault();
    document.getElementById('modalRecuperar').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalRecuperar').style.display = 'none';
    document.getElementById('correoRecuperar').value = '';
}

function enviarRecuperacion(event) {
    event.preventDefault();
    const correo = document.getElementById('correoRecuperar').value;
    alert("Se ha enviado un enlace de recuperación al correo: " + correo);
    cerrarModal();
}

// ==================================================
// 3. CERRAR SESIÓN
// ==================================================
function cerrarSesion(event) {
    event.preventDefault();
    window.location.href = "login.html";
}
// ==================================================
// 2. GESTIÓN DE COORDINADORES
// ==================================================
let filaSeleccionada = null;

function abrirModalRegistro() { document.getElementById("modalRegistro").style.display = "flex"; }
function cerrarModalRegistro() { document.getElementById("modalRegistro").style.display = "none"; document.getElementById("formRegistroCoordinador").reset(); }

function guardarCoordinador(event) {
    event.preventDefault();
    const tablaBody = document.querySelector(".custom-table tbody");
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
        <td class="text-bold">${document.getElementById("regIdentificacion").value}</td>
        <td>${document.getElementById("regNombre").value}</td>
        <td><span class="badge ${document.getElementById("regPrograma").value.toLowerCase().includes("auditor") ? "badge-auditoria" : "badge-sistemas"}">${document.getElementById("regPrograma").value}</span></td>
        <td>${document.getElementById("regCorreo").value}</td>
        <td class="action-buttons">
            <button class="btn-edit" onclick="prepararEdicion(this)"><i class="fa-solid fa-user-pen"></i></button>
            <button class="btn-delete" onclick="eliminarFila(this)"><i class="fa-solid fa-user-minus"></i></button>
        </td>`;
    tablaBody.appendChild(nuevaFila);
    reorganizarEstilosFilas();
    cerrarModalRegistro();
}

function eliminarFila(boton) {
    if (confirm("¿Eliminar coordinador?")) { boton.closest("tr").remove(); reorganizarEstilosFilas(); }
}

function prepararEdicion(boton) {
    filaSeleccionada = boton.closest("tr");
    document.getElementById("editIdentificacion").value = filaSeleccionada.cells[0].innerText;
    document.getElementById("editNombre").value = filaSeleccionada.cells[1].innerText;
    document.getElementById("editPrograma").value = filaSeleccionada.cells[2].innerText;
    document.getElementById("editCorreo").value = filaSeleccionada.cells[3].innerText;
    document.getElementById("modalEdicion").style.display = "flex";
}

function actualizarCoordinador(event) {
    event.preventDefault();
    filaSeleccionada.cells[0].innerText = document.getElementById("editIdentificacion").value;
    filaSeleccionada.cells[1].innerText = document.getElementById("editNombre").value;
    filaSeleccionada.cells[2].innerHTML = `<span class="badge">${document.getElementById("editPrograma").value}</span>`;
    filaSeleccionada.cells[3].innerText = document.getElementById("editCorreo").value;
    document.getElementById("modalEdicion").style.display = "none";
}

// ==================================================
// 3. GESTIÓN DE DOCENTES
// ==================================================
let filaDocenteSeleccionada = null;

function abrirModalRegistroDocente() { document.getElementById("modalRegistroDocente").style.display = "flex"; }
function cerrarModalRegistroDocente() { document.getElementById("modalRegistroDocente").style.display = "none"; document.getElementById("formRegistroDocente").reset(); }

function guardarDocente(event) {
    event.preventDefault();
    const tablaBody = document.querySelector(".custom-table tbody");
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
        <td>${document.getElementById("docIdentificacion").value}</td>
        <td>${document.getElementById("docNombre").value}</td>
        <td><span class="badge">${document.getElementById("docFacultad").value}</span></td>
        <td>${document.getElementById("docCorreo").value}</td>
        <td class="action-buttons">
            <button class="btn-edit" onclick="prepararEdicionDocente(this)"><i class="fa-solid fa-user-pen"></i></button>
            <button class="btn-delete" onclick="eliminarFilaDocente(this)"><i class="fa-solid fa-user-minus"></i></button>
        </td>`;
    tablaBody.appendChild(nuevaFila);
    reorganizarEstilosFilas();
    cerrarModalRegistroDocente();
}

function eliminarFilaDocente(boton) {
    if (confirm("¿Eliminar docente?")) { boton.closest("tr").remove(); reorganizarEstilosFilas(); }
}

function prepararEdicionDocente(boton) {
    filaDocenteSeleccionada = boton.closest("tr");
    document.getElementById("editDocIdentificacion").value = filaDocenteSeleccionada.cells[0].innerText;
    document.getElementById("editDocNombre").value = filaDocenteSeleccionada.cells[1].innerText;
    document.getElementById("editDocFacultad").value = filaDocenteSeleccionada.cells[2].innerText;
    document.getElementById("editDocCorreo").value = filaDocenteSeleccionada.cells[3].innerText;
    document.getElementById("modalEdicionDocente").style.display = "flex";
}

function actualizarDocente(event) {
    event.preventDefault();
    filaDocenteSeleccionada.cells[0].innerText = document.getElementById("editDocIdentificacion").value;
    filaDocenteSeleccionada.cells[1].innerText = document.getElementById("editDocNombre").value;
    filaDocenteSeleccionada.cells[2].innerText = document.getElementById("editDocFacultad").value;
    filaDocenteSeleccionada.cells[3].innerText = document.getElementById("editDocCorreo").value;
    document.getElementById("modalEdicionDocente").style.display = "none";
}

// ==================================================
// 4. UTILIDADES
// ==================================================
function reorganizarEstilosFilas() {
    document.querySelectorAll(".custom-table tbody tr").forEach((fila, i) => {
        fila.className = (i % 2 !== 0) ? "row-striped" : "";
    });
}
//------------------------------------------------------
// --- CARGA INICIAL ---
document.addEventListener("DOMContentLoaded", function() {
    const estudiantes = [
        { id: "1001", nombre: "Sebastian Espinoza", prog: "Ingeniería", correo: "sespinoza@uis.edu.co" },
        { id: "1002", nombre: "Kevin Zafra", prog: "ing Sistemas", correo: "kzafra@uis.edu.co" },
        { id: "1003", nombre: "Julio Gonzalez", prog: "ing Sistemas", correo: "jgonzalez@uis.edu.co" },
        { id: "1004", nombre: "Robinson Hernandez", prog: "Software", correo: "rhernandez@uis.edu.co" }
    ];

    const tablaBody = document.getElementById("tablaEstudiantesBody");
    if (tablaBody) {
        estudiantes.forEach(est => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="text-bold">${est.id}</td>
                <td>${est.nombre}</td>
                <td><span class="badge">${est.prog}</span></td>
                <td>${est.correo}</td>
                <td class="action-buttons">
                    <button class="btn-edit" title="Editar" onclick="prepararEdicionEstudiante(this)"><i class="fa-solid fa-user-pen"></i></button>
                    <button class="btn-delete" title="Eliminar" onclick="eliminarFilaEstudiante(this)"><i class="fa-solid fa-user-minus"></i></button>
                </td>`;
            tablaBody.appendChild(fila);
        });
    }
});

// --- GESTIÓN MODALES ---
function abrirModalRegistroEstudiante() { document.getElementById("modalRegistroEstudiante").style.display = "flex"; }
function cerrarModalRegistroEstudiante() { document.getElementById("modalRegistroEstudiante").style.display = "none"; }
function cerrarModalEdicionEstudiante() { document.getElementById("modalEdicionEstudiante").style.display = "none"; }

// --- ELIMINAR FILA ---
function eliminarFilaEstudiante(boton) {
    if (confirm("¿Está seguro de eliminar a este estudiante?")) {
        boton.closest("tr").remove();
    }
}

// --- PREPARAR EDICIÓN ---
function prepararEdicionEstudiante(boton) {
    const fila = boton.closest("tr");
    document.getElementById("editEstIdentificacion").value = fila.cells[0].innerText;
    document.getElementById("editEstNombre").value = fila.cells[1].innerText;
    document.getElementById("editEstPrograma").value = fila.cells[2].innerText;
    document.getElementById("editEstCorreo").value = fila.cells[3].innerText;
    window.filaSeleccionada = fila; 
    document.getElementById("modalEdicionEstudiante").style.display = "flex";
}

// --- ACTUALIZAR DATOS ---
function actualizarEstudiante(event) {
    event.preventDefault();
    const fila = window.filaSeleccionada;
    fila.cells[0].innerText = document.getElementById("editEstIdentificacion").value;
    fila.cells[1].innerText = document.getElementById("editEstNombre").value;
    fila.cells[2].innerText = document.getElementById("editEstPrograma").value;
    fila.cells[3].innerText = document.getElementById("editEstCorreo").value;
    cerrarModalEdicionEstudiante();
}

// --- GUARDAR NUEVO (Única versión) ---
function guardarEstudiante(event) {
    event.preventDefault();
    const id = document.getElementById("estIdentificacion").value;
    const nombre = document.getElementById("estNombre").value;
    const programa = document.getElementById("estPrograma").value;
    const correo = document.getElementById("estCorreo").value;

    const tablaBody = document.getElementById("tablaEstudiantesBody");
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="text-bold">${id}</td>
        <td>${nombre}</td>
        <td><span class="badge">${programa}</span></td>
        <td>${correo}</td>
        <td class="action-buttons">
            <button class="btn-edit" title="Editar" onclick="prepararEdicionEstudiante(this)"><i class="fa-solid fa-user-pen"></i></button>
            <button class="btn-delete" title="Eliminar" onclick="eliminarFilaEstudiante(this)"><i class="fa-solid fa-user-minus"></i></button>
        </td>`;
    tablaBody.appendChild(fila);
    document.getElementById("formRegistroEstudiante").reset();
    cerrarModalRegistroEstudiante();
}
//programas
// --- Modales ---
function abrirModal(id) { document.getElementById(id).style.display = 'flex'; }
function cerrarModal(id) { document.getElementById(id).style.display = 'none'; }

// --- Registro de Programas ---
const formPrograma = document.getElementById('formRegistroPrograma');
if (formPrograma) {
    formPrograma.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('inpNombre').value;
        const snies = document.getElementById('inpSnies').value;
        const creditos = document.getElementById('inpCreditos').value;
        const facultad = document.getElementById('selFacultad').value;

        const tbody = document.querySelector('#tablaProgramas tbody');
        const fila = document.createElement('tr');
        fila.className = 'row-striped';
        fila.innerHTML = `
            <td>NUEVO</td><td>${nombre}</td><td>${snies}</td><td>${creditos}</td>
            <td><span class="badge-tag">Pregrado</span></td><td>${facultad}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editarFila(this)"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn-delete" onclick="eliminarFila(this)"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(fila);
        this.reset();
        cerrarModal('modalPrograma');
    });
}

// --- Acciones Tabla ---
function eliminarFila(btn) { if(confirm('¿Eliminar?')) btn.closest('tr').remove(); }

function editarFila(btn) {
    const fila = btn.closest('tr');
    const celdas = fila.getElementsByTagName('td');
    const nuevoNombre = prompt("Editar nombre:", celdas[1].innerText);
    if (nuevoNombre) celdas[1].innerText = nuevoNombre;
}
//materias
// --- Lógica para el Módulo de Materias ---
const formMateria = document.getElementById('formRegistroMateria');

if (formMateria) {
    formMateria.addEventListener('submit', function(e) {
        e.preventDefault();

        // 1. Capturar valores
        const nombre = document.getElementById('inpNombreMat').value;
        const docente = document.getElementById('inpDocente').value;
        const aula = document.getElementById('inpAula').value;
        const horario = document.getElementById('inpHorario').value;

        // 2. Referencia al tbody de la tabla
        const tbody = document.querySelector('#tablaMaterias tbody');
        
        // 3. Crear la nueva fila
        const fila = document.createElement('tr');
        fila.className = 'row-striped';

        // 4. Inyectar contenido (incluyendo los botones de acción)
        fila.innerHTML = `
            <td>NUEVO</td>
            <td>${nombre}</td>
            <td>${docente}</td>
            <td><span class="badge-tag">${horario}</span></td>
            <td>${aula}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editarFila(this)" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn-delete" onclick="eliminarFila(this)" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;

        // 5. Añadir a la tabla y limpiar
        tbody.appendChild(fila);
        this.reset();
        cerrarModal('modalMateria');
    });
}
//AulasySalones
// --- Lógica para guardar Aulas en localStorage ---
const formAula = document.getElementById('formRegistroAula');

// Función para cargar datos al abrir la página
document.addEventListener('DOMContentLoaded', cargarAulas);

if (formAula) {
    formAula.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nuevaAula = {
            id: Date.now(), // ID único para gestionar edición/borrado
            nombre: document.getElementById('inpNombre').value,
            ubicacion: document.getElementById('inpUbicacion').value,
            capacidad: document.getElementById('inpCapacidad').value
        };

        // Guardar en array y luego en localStorage
        let aulas = JSON.parse(localStorage.getItem('listaAulas') || '[]');
        aulas.push(nuevaAula);
        localStorage.setItem('listaAulas', JSON.stringify(aulas));

        agregarFilaATabla(nuevaAula);
        this.reset();
        cerrarModal('modalAula');
    });
}

function agregarFilaATabla(aula) {
    const tbody = document.querySelector('#tablaAulas tbody');
    const fila = document.createElement('tr');
    fila.className = 'row-striped';
    fila.dataset.id = aula.id;
    fila.innerHTML = `
        <td>${aula.nombre}</td>
        <td>${aula.ubicacion}</td>
        <td>${aula.capacidad} Est.</td>
        <td><span class="badge-tag" style="background: #2ecc71;">Online</span></td>
        <td><i class="fa-solid fa-wifi"></i></td>
        <td class="action-buttons">
            <button class="btn-delete" onclick="eliminarFila(${aula.id})"><i class="fa-solid fa-trash"></i></button>
        </td>
    `;
    tbody.appendChild(fila);
}

function cargarAulas() {
    const tbody = document.querySelector('#tablaAulas tbody');
    if (!tbody) return;
    tbody.innerHTML = ''; // Limpiar tabla actual
    const aulas = JSON.parse(localStorage.getItem('listaAulas') || '[]');
    aulas.forEach(agregarFilaATabla);
}

function eliminarFila(id) {
    if (confirm('¿Eliminar este registro?')) {
        let aulas = JSON.parse(localStorage.getItem('listaAulas') || '[]');
        aulas = aulas.filter(a => a.id !== id);
        localStorage.setItem('listaAulas', JSON.stringify(aulas));
        cargarAulas(); // Recargar tabla
    }
}