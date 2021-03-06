/**
 * 订单管理管理初始化
 */
var Order = {
    id: "OrderTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Order.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        // {title: '主键', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '商品名称', field: 'goodsName', visible: true, align: 'center', valign: 'middle'},
        {title: '下单地点', field: 'place', visible: true, align: 'center', valign: 'middle'},
        {title: '下单时间', field: 'createTime', visible: true, align: 'center', valign: 'middle'},
        {title: '下单用户名称', field: 'userName', visible: true, align: 'center', valign: 'middle'},
        {title: '下单用户电话', field: 'userPhone', visible: true, align: 'center', valign: 'middle'},
        {
            title: '商品图片', field: 'goodsImg', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
                var imhUrls = row.goodsImg;
                var id = row.id;
                var imgArr = imhUrls.split(",");
                var htmls = "";
                var imgHtml = "";
                if (imgArr[0] != '' && imgArr[0] != null && imgArr[0] != undefined) {
                    for (var i = 1; i < imgArr.length; i++) {
                        htmls += '<li>' + '<img src=" ' + imgArr[i] + '" style="width: 100%;height: 100%;display: none;list-style-type: none">' + '</li>';
                    }
                    var html = '<li style="text-align: center">' + '<img align="center"  src="' + imgArr[0] + '" style="width: 80px;height: 50px;" onclick= "Order.showImg(\'' + id + '\')"  />' + '</li>';
                    imgHtml = html + htmls;
                    var htmlimg = '<ul id="showAllImages' + id + '" style="list-style-type: none;width: 80px;height: 50px">' + imgHtml + '</ul>';
                    return htmlimg;
                } else {
                    return;
                }
            }
        }
    ];
};

/**
 * 检查是否选中
 */
Order.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Order.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加订单管理
 */
Order.openAddOrder = function () {
    var index = layer.open({
        type: 2,
        title: '添加订单管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/order/order_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看订单管理详情
 */
Order.openOrderDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '订单管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/order/order_update/' + Order.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除订单管理
 */
Order.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/order/delete", function (data) {
            Feng.success("删除成功!");
            Order.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("orderId", this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询订单管理列表
 */
Order.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Order.table.refresh({query: queryData});
};

/**
 * 显示图片
 * @param imgURL
 */
Order.showImg = function (id) {
    $("#showAllImages" + id).viewer({url: 'data-original'});
};
/**
 * 图片加载失败的提示
 */
$("#img").on("error", function () {
    $('#myModal').modal('hide');
    if ($('#img').attr("src") != '') {
        Feng.error("图片加载失败！")
    }
});

$(function () {
    var defaultColunms = Order.initColumn();
    var table = new BSTable(Order.id, "/order/list", defaultColunms);
    table.setPaginationType("client");
    Order.table = table.init();
});
