import { Doctor } from './../js/doctor.js';
const apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $("#form").submit(function() {
    event.preventDefault();
    $('#output').text('');
    let ingredient = $('#ingredient').val();
    let doctor = new Doctor();
    let userin = `&q=${ingredient}`;
    doctor.search2(userin, apiKey);
  });
});
