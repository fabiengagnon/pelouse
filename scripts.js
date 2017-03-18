$(document).ready(function() {
  
  //Steps navigation
  $('#select-unite').change(function() {
    
    $('.step-1').hide();
    
    $('.step-2').show();
    
  });
  
  $('#terre-toggle').click(function() {
    
    $('.step-3').hide();
    
    $('.step-4').show();
    
  });
  
  //Select forme
  $('.parcelles').on('change', '.select-forme', function(){
    
    var parcelle = $(this).parent().parent('.parcelle');
    var selectedForme = $(this).val();
    
    console.log(parcelle);
    
    $(parcelle).find('.parcelle-forme').hide();
    
    $(parcelle).find('.parcelle-' + selectedForme + '').show();
    
    $(parcelle).find('.parcelle-total span').text('');
    
  });
  
  //Add parcelle
  $('#add-parcelle').click(function() {
    
    $('.parcelle.first').clone().appendTo('.parcelles').ready(function(){
      
      var newParcelle = 'div[id^="parcelle-"]:last';
      
      $(newParcelle).removeClass('first');
      
      $(newParcelle).attr('id', 'parcelle-'+ $('.parcelle').length +'');
      
      $(newParcelle).find('input').val(0);
      
      $(newParcelle).find('.parcelle-total span').text('');
      
    });
    
  });
  
  //Calc parcelle
  $('.parcelles').on('change', '.parcelle-rectangle-input', function() {
    
    var parcelle = $(this).closest('.parcelle');
    
    parcelleRectangle(parcelle);
    
  });
  
  $('.parcelles').on('change', '.parcelle-cercle-input', function() {
    
    var parcelle = $(this).closest('.parcelle');
    
    parcelleCercle(parcelle);
    
  });
  
  $('.parcelles').on('change', '.parcelle-triangle-input', function() {
    
    var parcelle = $(this).closest('.parcelle');
    
    parcelleTriangle(parcelle);
    
  });
  
});

function parcelleRectangle(parcelle) {
  
  var height = $(parcelle).find('.parcelle-rectangle-height').val();
  var width = $(parcelle).find('.parcelle-rectangle-width').val();
  var total = calcRectangle(height, width);
  
  $(parcelle).find('.parcelle-total span').text(total);
  
}

function parcelleCercle(parcelle) {
  
  var diam = $(parcelle).find('.parcelle-cercle-diam').val();
  var total = calcCercle(diam);
  
  $(parcelle).find('.parcelle-total span').text(total);
  
}

function parcelleTriangle(parcelle) {
  
  var base = $(parcelle).find('.parcelle-triangle-base').val();
  var height = $(parcelle).find('.parcelle-triangle-height').val();
  var total = calcTriangle(base, height);
  
  $(parcelle).find('.parcelle-total span').text(total);
  
}

function calcRectangle(height, width) {
  
	var h = parseFloat(height);
	var w = parseFloat(width);
	return Math.ceil(h * w);
	
}
function calcCercle(diam) {
  
	var d = parseFloat(diam);
	var r = d * 0.5;
	return Math.ceil((r * r) * 3.1416);
	
}
function calcTriangle(base, height) {
  
	var b = parseFloat(base);
	var h = parseFloat(height);
	return Math.ceil(b * h * 0.5);
	
}