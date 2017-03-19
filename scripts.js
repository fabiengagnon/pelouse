$(document).ready(function() {
  
  //Steps navigation
  $('#select-unite').change(function() {
    
    $('.step-1').hide();
    
    $('.step-2').show();
    
    $('.step-3').show();
    
    if ($(this).val() == 'metrique') {
      var unite = 'Mètres';
      var unite2 = 'Mètres carrés';
      var unite3 = 'Mètres cubes';
      var uniteTerre = 'Centimètres';
    }
    else {
      var unite = 'Pieds';
      var unite2 = 'Pieds carrés';
      var unite3 = 'Verges cubes';
      var uniteTerre = 'Pouces';
    }
    unites(unite, unite2, unite3, uniteTerre);
    
  });
  
  $('#terre-toggle').click(function() {
    
    $('.step-3').hide();
    
    $('.step-4').show();
    
  });
  
  //Select forme
  $('.parcelles').on('change', '.select-forme', function(){
    
    var parcelle = $(this).parent().parent('.parcelle');
    var selectedForme = $(this).val();
    
    $(parcelle).find('.parcelle-forme').hide();
    
    $(parcelle).find('.parcelle-' + selectedForme + '').show();
    
    $(parcelle).find('.parcelle-total-value').text('');
    
  });
  
  //Add parcelle
  $('#add-parcelle').click(function() {
    
    $('.parcelle.first').clone().appendTo('.parcelles').ready(function(){
      
      var newParcelle = 'div[id^="parcelle-"]:last';
      
      $(newParcelle).removeClass('first');
      
      $(newParcelle).attr('id', 'parcelle-'+ $('.parcelle').length +'');
      
      $(newParcelle).find('input').val(0);
      
      $(newParcelle).find('.parcelle-total-value').text('');
      
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
  
  $('.parcelles').on('change', '.parcelle-input', function() {
    
    parcellesTotal();
    
    terresTotal();
    
  });
  
  $('.terre').on('change', '.terre-input', function() {
    
    terresTotal();
    
  });
  
});

function unites(unite, unite2, unite3, uniteTerre) {
  
  $('.unite').text(unite);
  $('.unite2').text(unite2);
  $('.unite3').text(unite3);
  $('.unite-terre').text(uniteTerre);
  
}

function parcelleRectangle(parcelle) {
  
  var height = $(parcelle).find('.parcelle-rectangle-height').val();
  var width = $(parcelle).find('.parcelle-rectangle-width').val();
  var total = calcRectangle(height, width);
  
  if(isNaN(total)) {
    total = 0;
  }
  
  $(parcelle).find('.parcelle-total').data('total', total);
  $(parcelle).find('.parcelle-total-value').text(total);
  
}

function parcelleCercle(parcelle) {
  
  var diam = $(parcelle).find('.parcelle-cercle-diam').val();
  var total = calcCercle(diam);
  
  if(isNaN(total)) {
    total = 0;
  }
  
  $(parcelle).find('.parcelle-total').data('total', total);
  $(parcelle).find('.parcelle-total-value').text(total);
  
}

function parcelleTriangle(parcelle) {
  
  var base = $(parcelle).find('.parcelle-triangle-base').val();
  var height = $(parcelle).find('.parcelle-triangle-height').val();
  var total = calcTriangle(base, height);
  
  if(isNaN(total)) {
    total = 0;
  }
  
  $(parcelle).find('.parcelle-total').data('total', total);
  $(parcelle).find('.parcelle-total-value').text(total);
  
}

function parcellesTotal() {
  
  var total = 0;
  
  $('.parcelle').each(function() {
  
    total = total + $(this).find('.parcelle-total').data('total');
  
  });
  
  $('.parcelles-total').data('total', total);
  $('.parcelles-total-value').text(total);
  
}

function terresTotal() {
  
  var total = calcTerre();
    
  if(isNaN(total)) {
    total = 0;
  }
  
  $('.terre-total').data('total', total);
  $('.terre-total').text(total);
  
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
function calcTerre() {
  
  var parcellesTotal = $('.parcelles-total').data('total');
  var terreHeight = $('.terre-input').val();
  var terre = parseInt(parcellesTotal*terreHeight);
  
  console.log(parcellesTotal, terreHeight);
  
	if ($('#select-unite').val() == 'metrique') {
		terreTotal = terre/100;
		terreTotal = terreTotal.toFixed(2);
	} else {
		terreTotal = terre/324;
		terreTotal = terreTotal.toFixed(2)
	}
	
	return terreTotal;
	
}