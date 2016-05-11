function printReceipt(Input) {
  var cartItems = buildItemList(Input);
  var cartItemsWithSubtotal= getSubTotal(cartItems);
  var cartItemsWithTotal= getTotal(cartItemsWithSubtotal);
  var receipt = buildReceiptText(cartItemsWithTotal);

  console.log(receipt);
}

function buildItemList(Input) {
  var cartItems = [];

  Input.forEach(function (element) {
    var cartItem = isExit(element,cartItems);

    if (cartItem) {
      cartItem.count++;
    }
    else{
      cartItems.push({item: element, count: 1});
    }
  });
  return cartItems;
}

function isExit(element, cartItems) {
  var existItem;

  cartItems.forEach(function (cartItem) {
    if (element.barcode === cartItem.item.barcode) {
      existItem = cartItem;
    }
  });
  return existItem;
}

function getSubTotal(cartItems){
  var newCart = [];

  cartItems.forEach(function(cartItem){
      newCart.push({cartItem:cartItem , subTotal:cartItem.count * cartItem.item.price});
  });
  return newCart;
}

function getTotal(cartItems){
  var total = 0;

  cartItems.forEach(function(cartItem){
    total += cartItem.subTotal;
  });

  return { cartItem:cartItems,total:total};
}

function buildReceiptText(receipt){
  var str = '***<没钱赚商店>收据***\n';

  receipt.cartItem.forEach(function(element){
    str +=  '名称：' + element.cartItem.item.name + '，数量：' + element.cartItem.count + element.cartItem.item.unit + '，单价：' + element.cartItem.item.price.toFixed(2) + '(元)，小计：' + element.subTotal.toFixed(2) + '(元)\n';
  });
  str += '----------------------\n' + '总计：' + receipt.total.toFixed(2) + '(元)\n' + '**********************';

  return str;
}

