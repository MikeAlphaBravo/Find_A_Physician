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
          //need to figure out how to use index for this
          let uniqueIndex = `${doctor.profile.slug}`
          $("#output").append(`<div class="card" id="mainCard-${uniqueIndex}"><h3>${doctor.profile.last_name}, ${doctor.profile.first_name}</h3>
          <img src="${doctor.profile.image_url}" /></a></div>`);
          (doctor.practices).forEach(function(childrenEntry) {
            $("#mainCard-" + uniqueIndex).append(`<hr><div>
            <h5>Locations in Portland:</h5> <h6>${childrenEntry.visit_address.street}<br>
            ${childrenEntry.visit_address.city},
            ${childrenEntry.visit_address.state}
            ${childrenEntry.visit_address.zip}</h5>
            <h5>Website: ${childrenEntry.website}</h6>
            <h5>Phone numbers: </h5>
            </div>`);
            (childrenEntry.phones).forEach(function(phone) {
              // debugger;
              $("#mainCard-" + uniqueIndex).append(`<h6>${phone.type}: ${phone.number}</h6>`)
            })
            if(doctor.practices.accepts_new_patients === true) {
              $("#mainCard-" + uniqueIndex).append(`<h6>This doctor is currently accepting new patients</h6>`);
            } else {
              $("#mainCard-" + uniqueIndex).append(`<h6>This doctor is NOT currently accepting new patients</h6>`);
            }
          });
        });
      } else {
        $("#output").append("Your search did not return any Doctors, please try again");
      }
    });
  }
}
