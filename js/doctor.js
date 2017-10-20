export class Doctor {

  apiCall(userin, apiKey) {
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=45.523%2C-122.676%2C100&user_location=45.523%2C-122.676&skip=0&limit=10&user_key=${apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

// readable.data[0].profile.first_name;

    promise.then(function(response) {
      let readable = JSON.parse(response);
      debugger;
      (readable.data).forEach(function(doctor) {
        $("#output").append(`<div class="card"><h3>${doctor.profile.last_name}, ${doctor.profile.first_name}</h3>
          <img src="${doctor.profile.image_url}" /></a></div>`);
      });
    }, function(error) {
      $("#output").text(`There was an error processing your request: ${error.message}`);
    });
  }
}
