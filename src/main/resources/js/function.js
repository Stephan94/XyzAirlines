function getData(api) {
   api = String(api);
   $.get(api, function(data){
       if (data){
            $("#dataTable").DataTable().clear();
            $("#dataTable").DataTable().rows.add(data);
            $("#dataTable").DataTable().columns.adjust().draw();
            window.location.reload(); // TODO clean up
       }
   });
}


function getSingleRecord(id, api){

   apiPath = String(api +"/"+ id);
   $.get(apiPath, function(data){
       if (data){
           fillUpdateDiv(data, api);
       }
   });
}


function fillUpdateDiv(record, api){

   console.log(record);
   console.log(api);

   $("#btndelete").attr('onclick', 'submitDelete(' + record.id +', "' + api +'");');
   $("#btnsubmit").attr('onclick', 'submitEdit(' + record.id +', "' + api +'");');

   document.getElementById("modal-title").innerHTML="Edit";
   fillModal(record);
   $("#confirmbutton").css('display', 'inline-block');
   deleteID = record.id;
   var elem = '<button type="button" class="btn btn-danger" onclick="submitDelete('+record.id+', \'' +api+'\');">Confirm delete</button>';
   $('#confirmbutton').popover({
       animation:true,
       content:elem,
       html:true,
       container: modal
   });
}

// Switch is used so expanding later on is easier.
function fillModal(record){
   var path = String(window.location.pathname);
   switch(path) {
       case "/airplanes":
           $("#id").val(record.id);
           $("#name").val(record.name);
           $("#fuel").val(record.fuel);
           $("#airport").val(record.airport);
           break;
   }
}

function deselect(){
   $('#dataTable tr.selected').removeClass('selected');
   document.getElementById("modalForm").reset();
}

function submitEdit(id, api){
// shortcut for filling the formData as a JavaScript object with the fields in the form

   console.log("Formdata");
   var formData = $("#modalForm").serializeArray().reduce(function(result, object){ result[object.name] = object.value; return result}, {});
   console.log(formData);
   var id = formData.id;
   for(var key in formData){
       if(formData[key] == "" || formData == null) delete formData[key];
   }


    var path = window.location.pathname;
    var JSONObjectInString;

// Switch is used so expanding later on is easier.
    switch(path){
        case "/airplanes":
             JSONObjectInString =
            {
             "id": id,
             "name": name,
             "fuel": fuel,
             "airport": airport
            }
        break;
    }


   $.ajax({
       url: api + "/" + id,
       type:"put",
       data: JSON.stringify(JSONObjectInString),
       contentType: "application/json; charset=utf-8",
       success: getData(api),
       error: function(error){
           console.log(error);
       }
   });

   deselect();
   $('#modal').modal('toggle');
}


function submitDelete(id, api){
   console.log("Deleting");
   var formData = $("#modalForm").serializeArray().reduce(function(result, object){ result[object.name] = object.value; return result}, {});
   $.ajax({
       url:api + "/" + id,
       type:"delete",
       data: JSON.stringify(formData),
       success: getData(api),
       contentType: "application/json; charset=utf-8"
   });

   $('#myModal').modal('toggle');
   deselect();
}

// Switch is used so expanding later on is easier.
function navbarHighlight(path){
   switch(path) {
       case "/airplanes":
         $("#navAirplane").addClass("active");
           break;
   }
}

function submitNew(api){
   console.log("Formdata");
   var formData = $("#modalForm").serializeArray().reduce(function(result, object){ result[object.name] = object.value; return result}, {});
   console.log(formData);
   //var id = formData.id;
   for(var key in formData){
       if(formData[key] == "" || formData == null) delete formData[key];
   }

   console.log(JSON.stringify(formData));

   $.ajax({
       url: api,
       type:"post",
       data: JSON.stringify(formData),
       contentType: "application/json; charset=utf-8",
       success: getData(api),
       error: function(error){
           console.log(error);
       }
   });

   deselect();
   $('#modal').modal('toggle');
}