function printReceipt(inputs) {
  var cartItems = buildCartItems(inputs);
  var cartItemsWithSubtotal = getSubtotal(cartItems);
  var cartItemsWithTotal = getTotal(cartItemsWithSubtotal);
  var receipt = buildReceiptList(cartItemsWithTotal);
  console.log(receipt);
}

function buildCartItems(inputs) {
  var cartItems = [];
  var allItems = loadAllItems();

  inputs.forEach(function (item) {
    var cartItem = isExist(item, cartItems);

    if (cartItem) {
      cartItem.count++;
    }
    else{
      var allItem = findAllItems(item, allItems);
      cartItems.push({item: allItem, count: 1});
    }
  });
  return cartItems;
}

function isExist(element, cartItems) {
  var existItem;

  cartItems.forEach(function (cartItem) {
    if (element === cartItem.item.barcode) {
      existItem = cartItem;
    }
  });
  return existItem;
}

function findAllItems(item, allItems) {
  var element = {};

  allItems.forEach(function (allItem) {
    if (allItem.barcode === item) {
      element = allItem;
    }
  });
  return element;
}

function getSubtotal(cartItems) {
  var receiptItems = [];
  var subTotal = 0;
  cartItems.forEach(function (cartItem) {
    subTotal = cartItem.item.price * cartItem.count;
    receiptItems.push({cartItem: cartItem, subTotal: subTotal});
  });
  return receiptItems;
}

function getTotal(receiptItems) {
  var total = 0;
  var receipt = {};

  receiptItems.forEach(function (receiptItem) {
    total += receiptItem.subTotal;
  });
  return {receiptItems:receiptItems,total:total};
}

function buildReceiptList(receipt) {
  var str  = "***<没钱赚商店>收据***\n";

  receipt.receiptItems.forEach(function (receiptItem) {
    str +=  '名称：' + receiptItem.cartItem.item.name + '，数量：' + receiptItem.cartItem.count + receiptItem.cartItem.item.unit + '，单价：' + receiptItem.cartItem.item.price.toFixed(2) + '(元)，小计：' + receiptItem.subTotal.toFixed(2) + '(元)\n';
});
    str += '----------------------\n' + '总计：' + receipt.total.toFixed(2) + '(元)\n' + '**********************';

  return str;
}

