var updateSubtotal = function(ele){
  var itemPrice = parseFloat($(ele).find('.item-price').text().trim().slice(1));
  var itemQty = parseFloat($(ele).find('.quantity').val());

  var subtotal = itemPrice * itemQty;
  console.log(itemPrice, itemQty)
  $(ele).children('.item-subtotal').html(subtotal);

  // if subtotal is NaN, return 0
  return subtotal || 0;

};

var sum = function(acc, x) { return acc + x; };

var updateTotal = function(){
  var updatedSum =[];

  $('.item').each(function(i, ele){
    var subtotal = updateSubtotal(ele);
    updatedSum.push(subtotal);
  });

  var totalPrice = updatedSum.reduce(sum);
  $('#total-price').text(totalPrice);

};

$(document).ready(function(){
  updateTotal();

  $(document).on('click', '.remove', function(event){
    $(this).closest('.row').remove();
    updateTotal();
  });

  $('#additem').on('click', function(event){
    event.preventDefault();
    var name = $(this).parent().parent().find('[name=name]').val();
    var cost = Number($(this).parent().parent().find('[name=cost]').val());
    var c = cost.toFixed(2);
    
    if (name.trim() === "" || cost === 0) {
        alert('Please enter food name and quantity.');
        return false;
    }

    $('#item-list').append('<div class="row item">' +
    '<div class="item-name col-3 mb-4">' + name + '</div>' +
    '<div class="item-price col-3">' + '$' + c + '</div>' +
    '<div class="item-qty col-3">' + '<label>QTY</label>' +
    '<input class="quantity" type="number">' + '</div>' +
    '<div class="col-xs-1">' + '<button class="remove">Remove</button></div>' +'<div class="item-subtotal col-2 ml-3">$--.--</div>');


    updateTotal();
    $(this).parent().parent().find('[name=name]').val('');
    $(this).parent().parent().find('[name=cost]').val('');
  });

    var timeout;
    $(document).on('input', '.quantity', function(){
      clearTimeout(timeout);
      timeout = setTimeout(function(){
        console.log('asd')
        updateTotal();
      }, 500)
    })
});
