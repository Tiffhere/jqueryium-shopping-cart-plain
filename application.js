var updateSubtotal = function(ele){
  var itemPrice = parseFloat($(ele).find('.item-price').text());
  var itemQty = parseFloat($(ele).find('.item-qty').val());

  var subtotal = itemPrice * itemQty;
  $(ele).children('.item-subtotal').html(subtotal);

  return subtotal;

}

var sum = function(acc, x) { return acc + x; };

var updateTotal = function(){
  var updatedSum =[];

  $(.item).each(function(i, ele){
    var subtotal = updateSubtotal(ele);
    updatedSum.push(subtotal);
  });

  var totalPrice = updatedSum.reduce(sum);
  $('#total-price').text(totalPrice);

}

$(document).ready(function(){
  updateTotal();

  $(document).on('click', '.remove', function(event){
    $(this).closest(.row).remove();
    updateTotal();
  });

$(#additem).on('submit', function(){
  event.preventDefault();
  var name = $(this).children('[name=name]').val();
  var cost = $(this).children('[name=cost]').val();

  $('#item-list').append('<div class="row item">' +
    '<div class="item-name col-3 mb-4">' + name + '</div>' +
    '<div class="item-price col-3">' + cost + '</div>');

   updateTotal();
   $(this).children('[name=name]').val('');
   $(this).children('[name=cost]').val('');
 });

});
