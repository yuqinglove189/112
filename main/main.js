module.exports = function printInventory(inputs) {
    var barcodeList=getBarcodeList(inputs);
    var shoppingCart=getShoppingCart(barcodeList);
    var listPrint=getShoppingLists(shoppingCart);
    console.log(listPrint);
};

function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}

function getBarcodeList(inputs){
    var barcodes={};
    inputs.forEach(function(input){
        if(barcodes[input]||input.indexOf('-')!=-1){
            barcodes[input]++;
            barcodes[input.substr(0,input.indexOf('-'))]=input.substr(input.indexOf('-')+1,input.length);
        } else {
            barcodes[input]=1;
        }
    });
    return barcodes
}
function getShoppingCart(barcodeList){
    var items=loadAllItems();
    var shopping_cart=[];
    items.forEach(function(item){
        if(barcodeList[item.barcode]){
            item.count=barcodeList[item.barcode];
            item.free=Math.floor(item.count/3);
            shopping_cart.push(item);
        }
    });

    return shopping_cart
}
function getShoppingLists(shoppingCart){
    var list='***<没钱赚商店>购物清单***';
    var list_free='----------------------'+'\n'+'挥泪赠送商品：';
    var sum=0;
    var save=0;
    shoppingCart.forEach(function(lists){
        var subtotal=(lists.count-lists.free)*lists.price
        list=list+'\n'+'名称：'+lists.name+'，数量：'+lists.count+lists.unit+'，单价：'+lists.price.toFixed(2)+'(元)，小计：'+subtotal.toFixed(2)+'(元)'
        sum+=subtotal;
        if(lists.free>0){
            list_free=list_free+'\n'+'名称：'+lists.name+'，数量：'+lists.free+lists.unit;
            save+=lists.free*lists.price;
        }
    });
    list=list+'\n'+list_free+'\n'+'----------------------'+'\n'+'总计：'+sum.toFixed(2)+'(元)'+'\n'+'节省：'+save.toFixed(2)+'(元)'+'\n'+'**********************';
    return list
}