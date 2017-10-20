import { Doctor } from './../js/doctor.js';
const apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $("#form").submit(function() {
    event.preventDefault();
    $('#output').text('');
    let nameInput = $('#name').val();
    let queryInput = $('#query').val();
    let doctor = new Doctor();
    // debugger;
    doctor.apiCall(nameInput, queryInput, apiKey);
  });
});
