export class Doctor {

  search2(ingredient, apiKey) {
    $.ajax({
      url: `http://food2fork.com/api/search?key=${apiKey}${ingredient}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        let readable = JSON.parse(response);
        (readable.doctors).forEach(function(doctor) {
          $("#output").append(`<div class="card"><h2><a target="_blank"  href="${doctor.source_url}">${doctor.title}</a></h2>
          <a target="_blank" href="${doctor.source_url}"><img src="${doctor.image_url}" /></a></div>`);
        });
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.");
      }
    });
  }


  // search(ingredient) {
  //   $.get(`http://food2fork.com/api/search?key=e9aad402e839456c4a04ef32990d2622${ingredient}`)
  //   .then(function(response) {
  //     result(response.doctors);
  //   })
  //   .fail(function(error) {
  //     throw(error.responseText);
  //   });
  // }

  // apiCall(ingredient) {
  //   let promise = new Promise(function(resolve, reject) {
  //     let request = new XMLHttpRequest();
  //     let url = `http://food2fork.com/api/search?key=e9aad402e839456c4a04ef32990d2622${ingredient}`;
  //     request.onload = function() {
  //       if (this.status === 200) {
  //         resolve(request.response);
  //       } else {
  //         reject(Error(request.statusText));
  //       }
  //     };
  //     request.open("GET", url, true);
  //     request.send();
  //   });
  //
  //   promise.then(function(response) {
  //     let readable = JSON.parse(response);
  //     (readable.doctors).forEach(function(doctor) {
  //       $("#output").append(`<div class="card"><h2><a target="_blank"  href="${doctor.source_url}">${doctor.title}</a></h2>
  //         <a target="_blank" href="${doctor.source_url}"><img src="${doctor.image_url}" /></a></div>`);
  //     });
  //   }, function(error) {
  //     $("#output").text(`There was an error processing your request: ${error.message}`);
  //   });
  // }
}
