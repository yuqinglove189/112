const printInventory = require('../main/main');

describe('pos', function() {
    var allItems;
    var inputs;

    beforeEach(function() {
        //allItems = loadAllItems();
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('should print correct text', function() {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });

    it('测试购物编码和数量', function() {

        spyOn(console, 'group');

        printInventory(inputs);

        let expectText = {
            "ITEM000001": 5,
            "ITEM000003": 2,
            "ITEM000005": 3,
        }
        expect(console.group).toHaveBeenCalledWith(expectText);
    });

    it('测试购物清单详细信息', function() {
        spyOn(console, 'info');

        printInventory(inputs);
        let expectText = [{
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 5,
                free: 1,
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count: 2,
                free: 0,
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 3,
                free: 1,
            }
        ];
        expect(console.info).toHaveBeenCalledWith(expectText);
    });
});