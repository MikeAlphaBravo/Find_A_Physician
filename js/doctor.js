export class Doctor {

  apiCall(name, query, apiKey) {
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${query}&location=45.523%2C-122.676%2C100&user_location=45.523%2C-122.676&skip=0&limit=10&user_key=${apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
          let errorText = JSON.parse(this.responseText);
          $("#output").text(`There was an error processing your request: ${errorText.meta.message}`);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
// readable.data[0].profile.first_name;
    promise.then(function(response) {
      let readable = JSON.parse(response);
      if(readable.data.length != 0) {
        (readable.data).forEach(function(doctor) {
          $("#output").append(`<div class="card"><h3>${doctor.profile.last_name}, ${doctor.profile.first_name}</h3>
          <img src="${doctor.profile.image_url}" /></a></div>`);
          (doctor.practices).forEach(function(childrenEntry) {
            $("#output").append(`<div><h5>Locations in Portland:${childrenEntry.parse(visit_address)}</h5></div>`);
            // debugger;
          });
          // let readableInfo = JSON.parse(readable.data);
          // (readableInfo.practices).forEach(function(info) {
          //   debugger;
          //   $("#output").append(`<h5>${info.website}</h5>`)
          // });
        });
      } else {
        $("#output").append("Your search did not return any Doctors, please try again");
      }
    });
  }
}
