/**
 * 初始化订单管理详情对话框
 */
var OrderInfoDlg = {
    orderInfoData: {},
    validateFields: {
        goodsName: {
            validators: {
                notEmpty: {
                    message: '商品名称不能为空'
                },
                stringLength: {
                    min: 1,
                    max: 30,
                    message: '商品名称长度必须在1到30位之间'
                }
            }
        },
        place: {
            validators: {
                notEmpty: {
                    message: '下单地点不能为空'
                }
            }
        },
        createTime: {
            validators: {
                notEmpty: {
                    message: '下单时间不能为空'
                }
            }
        },
        userName: {
            validators: {
                notEmpty: {
                    message: '下单用户名称不能为空'
                }
            }
        },
        userPhone: {
            validators: {
                notEmpty: {
                    message: '下单用户电话不能为空'
                },
                regexp: {
                    regexp: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
                    message: '下单用户电话格式错误'
                },
            }
        },
        goodsImg: {
            validators: {
                notEmpty: {
                    message: '商品图片不能为空'
                }
            }
        }
    }
};

/**
 * 清除数据
 */
OrderInfoDlg.clearData = function () {
    this.orderInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
OrderInfoDlg.set = function (key, val) {
    this.orderInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
OrderInfoDlg.get = function (key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
OrderInfoDlg.close = function () {
    parent.layer.close(window.parent.Order.layerIndex);
}

/**
 * 收集数据
 */
OrderInfoDlg.collectData = function () {
    this
        .set('goodsName')
        .set('place')
        .set('createTime')
        .set('userName')
        .set('userPhone')
        .set('goodsImg');
}

/**
 * 验证数据
 */
OrderInfoDlg.validate = function () {
    $('#orderInfoForm').data("bootstrapValidator").resetForm();
    $('#orderInfoForm').bootstrapValidator('validate');
    return $("#orderInfoForm").data('bootstrapValidator').isValid();
};

/**
 * 提交添加
 */
OrderInfoDlg.addSubmit = function () {
    this.clearData();
    this.collectData();

    if (!this.validate()) {
        return;
    }

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/order/add", function (data) {
        Feng.success("添加成功!");
        window.parent.Order.table.refresh();
        OrderInfoDlg.close();
    }, function (data) {
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.orderInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
OrderInfoDlg.editSubmit = function () {
    this.clearData();
    this.collectData();

    if (!this.validate()) {
        return;
    }

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/order/update", function (data) {
        Feng.success("修改成功!");
        window.parent.Order.table.refresh();
        OrderInfoDlg.close();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.orderInfoData);
    ajax.start();
}

/**
 * 加载图片
 */
OrderInfoDlg.openPicture = function () {
    $("#showAllImage").viewer({url: 'data-original'});
};


$(function () {
    Feng.initValidator("orderInfoForm", OrderInfoDlg.validateFields);

    /**
     * 初始化图片上传
     */
    var avatarUp = new $WebUpload("goodsImg");
    avatarUp.setUploadBarId("progressBar");
    avatarUp.init();
});
