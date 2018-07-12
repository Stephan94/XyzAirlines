$( document ).ready(function() {

   var path = String(window.location.pathname);
   var api;
   var columns;

   navbarHighlight(path);

   // switch used, expanding later on is easier.
   switch(path) {
       case "/airplanes":
           api = 'http://localhost:8080/api/airplanes';
           columns = [
               { "data": "id" },
               { "data": "name" },
               { "data": "fuel" },
               { "data": "airport" },
               {  "render": function(data, type, full){
                   return '<a title="view this airplane" class="btn btn-default btn-sm "> <i class="fa fa-search"></i> </a><a title="edit this airplane" class="btn btn-default btn-sm "> <i class="fa fa-edit"></i> </a><a title="delete this airplane" class="btn btn-default btn-sm "> <i class="fa fa-trash-alt"></i> </a>';
               } },
           ];
           break;
}

   $('#dataTable').DataTable( {
       "order": [[ 0, "asc" ]],
       "ajax": {
           url: api,
           dataSrc: ''
       },
       "columns": columns
   } );

   $('#dataTable tbody').on( 'click', 'tr', function () {
       if ( $(this).hasClass('selected') ) {
           $(this).removeClass('selected');
       }
       else {
           deselect();
           $(this).addClass('selected');
           var table = $('#dataTable').DataTable();
           var data = table.row(this).data();
           getSingleRecord(data.id, api);
           $('#modal').modal('toggle');
       }
   });


   $("#addBtn").on( 'click', function (){
        $("#btnsubmit").attr('onclick', 'submitNew("' + api +'");');
        $('#modal').modal('toggle');
        document.getElementById("modalForm").reset();
  });

});
