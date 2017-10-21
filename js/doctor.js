export class Doctor {


  formatState() {
    //takes zipcode from user, finds state and city and spits out st-city sytax to push into locationInput

  }

  apiCall(name, query, location, apiKey) {
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${query}&location=${location}&skip=0&limit=10&user_key=${apiKey}`;
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
          let uniqueIndex = `${doctor.profile.slug}`;
          $("#output").append(`<div class="card" id="mainCard-${uniqueIndex}"><h3>${doctor.profile.last_name}, ${doctor.profile.first_name}</h3>
          <img src="${doctor.profile.image_url}" /></a></div>`);
          (doctor.practices).forEach(function(practice) {
            $("#mainCard-" + uniqueIndex).append(`<hr><div>
            <h5>Locations in Portland:</h5> <h6>${practice.visit_address.street}<br>
            ${practice.visit_address.city},
            ${practice.visit_address.state}
            ${practice.visit_address.zip}</h5>
            <h5>Website: <a target="_blank" href="${practice.website}">${practice.website}</a></h6>
            <h5>Phone numbers: </h5>
            </div>`);
            (practice.phones).forEach(function(phone) {
              $("#mainCard-" + uniqueIndex).append(`<h6>${phone.type}: ${phone.number}</h6>`);
            });
            // debugger;
            if(practice.accepts_new_patients === true) {
              $("#mainCard-" + uniqueIndex).append(`<h6>This doctor is currently accepting new patients</h6>`);
              // debugger;
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
