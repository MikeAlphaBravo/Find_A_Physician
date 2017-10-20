import { Doctor } from './../js/doctor.js';
const apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $("#form").submit(function() {
    event.preventDefault();
    $('#output').text('');
    let name = $('#name').val();
    let query = $('#query').val();
    let doctor = new Doctor();
    let nameInput = `name=${name}`;
    let queryInput = `&query=${query}`;
    // debugger;
    doctor.apiCall(nameInput, queryInput, apiKey);
  });
});
