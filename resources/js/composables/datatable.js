export function initDataTable(
    selector,
    columns,
    ajaxUrl = null,
    additionalOptions = {}
) {
    const element = $(selector);

    // Verificar si el elemento ya está inicializado como DataTable
    if (element.length !== 0 && !$.fn.dataTable.isDataTable(element)) {
        const options = {
            responsive: true,
            serverSide: true, // Habilitar procesamiento en el lado del servidor
            columns: columns,
            language: {
                decimal: ",",
                emptyTable: "No hay datos disponibles en la tabla",
                info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                infoEmpty: "Mostrando 0 a 0 de 0 registros",
                infoFiltered: "(filtrado de _MAX_ registros totales)",
                infoPostFix: "",
                thousands: ".",
                lengthMenu: "Mostrar _MENU_ registros",
                loadingRecords: "Cargando...",
                processing: "Procesando...",
                search: "Buscar:",
                zeroRecords: "No se encontraron resultados",
                paginate: {
                    first: "Primera",
                    last: "Última",
                    next: "Siguiente",
                    previous: "Anterior",
                },
                aria: {
                    sortAscending:
                        ": Activar para ordenar la columna de manera ascendente",
                    sortDescending:
                        ": Activar para ordenar la columna de manera descendente",
                },
            },
        };

        if (ajaxUrl) {
            options.ajax = {
                url: ajaxUrl,
                type: "GET",
                data: function (d) {
                    // Mapear los parámetros de paginación para Laravel
                    return {
                        draw: d.draw,
                        start: d.start,
                        length: d.length,
                        search: d.search.value,
                        order: d.order,
                        columns: d.columns,
                    };
                },
                dataSrc: function (json) {
                    // Mapea el JSON recibido desde Laravel para DataTable
                    json.recordsTotal = json.recordsTotal;
                    json.recordsFiltered = json.recordsFiltered;
                    return json.data; // Regresa solo los datos de los registros
                },
                error: function (xhr, error, thrown) {
                    console.error("Error al cargar los datos: ", thrown);
                    console.log("Detalles del error: ", xhr.responseText);
                },
            };
        }

        const finalOptions = { ...options, ...additionalOptions };

        return element.DataTable(finalOptions);
    }
    // Si ya está inicializado, podrías devolver el DataTable existente o null
    return element.DataTable();
}
