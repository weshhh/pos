function printReceipt(Input) {

  var Items = buildItemsObjects(Input);
  var itemsWithSubTotal = getSubTotal(Items);
  var itemsWithTotal = getTotal(itemsWithSubTotal);
  var receiptList = buildCartItems(itemsWithTotal);
  console.log(receiptList);
}

function buildItemsObjects(Input) {
  var Items = {};

  Items.Coco = Input[0];
  Items.Spirit= Input[1];
  Items.Battery = Input[2];

  return Items;
}

function getSubTotal(Items) {

  for(value in Items){
    Items[value].subTotal = Items[value].price * Items[value].count;
  }

  return Items;
}

function getTotal(itemsWithSubTotal) {
  var cartItems = {};
  cartItems.Items = itemsWithSubTotal;
  cartItems.Total = 0;

  for(value in itemsWithSubTotal) {
    cartItems.Total += itemsWithSubTotal[value].subTotal;
  }

  return cartItems;
}

function buildCartItems(itemsWithTotal) {
  var receiptList = '***<没钱赚商店>收据***\n';

  for(value in itemsWithTotal.Items){
    receiptList += '名称：' + itemsWithTotal.Items[value].name + '，数量：' + itemsWithTotal.Items[value].count + itemsWithTotal.Items[value].unit + '，单价：' + itemsWithTotal.Items[value].price.toFixed(2) + '(元)，小计：' + itemsWithTotal.Items[value].subTotal.toFixed(2) + '(元)\n';

  }
  receiptList += '----------------------\n' + '总计：' + itemsWithTotal.Total.toFixed(2)+ '(元)\n' + '**********************';

  return receiptList;
}


