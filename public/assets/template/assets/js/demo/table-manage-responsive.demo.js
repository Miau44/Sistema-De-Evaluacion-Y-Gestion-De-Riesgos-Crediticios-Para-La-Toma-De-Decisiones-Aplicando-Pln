/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 5
Version: 5.3.3
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/
*/

var handleDataTableResponsive = function () {
  "use strict";

  if ($("#data-table-responsive").length !== 0) {
    $("#data-table-responsive").DataTable({
      responsive: true,
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
    });
  }
};

var TableManageResponsive = (function () {
  "use strict";
  return {
    //main function
    init: function () {
      handleDataTableResponsive();
    },
  };
})();

$(document).ready(function () {
  TableManageResponsive.init();
});
