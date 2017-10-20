import { Doctor } from './../js/doctor.js';
const apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $("#form").submit(function() {
    event.preventDefault();
    $('#output').text('');
    let query = $('#query').val();
    let doctor = new Doctor();
    let userin = `&query=${query}`;
    // debugger;
    doctor.apiCall(userin, apiKey);
  });
});
