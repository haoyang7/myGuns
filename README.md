# My Guns(gunsV5.1)
---
## 介绍
Guns基于SpringBoot 2，致力于做更简洁的后台管理系统，完美整合springmvc + shiro + 
mybatis-plus + beetl!Guns项目代码简洁，注释丰富，上手容易，同时Guns包含许多基础模块
(用户管理，角色管理，部门管理，字典管理等10个模块)，可以直接作为一个后台管理系统的脚手架!
---
## 学习记录
1. laydate的使用
- 官网文档[日期和时间组件文档](https://www.layui.com/doc/modules/laydate.html)
  
- 基础参数选项
  
  通过核心方法：laydate.render(options) 来设置基础参数，也可以通过方法：laydate.set
  (options) 来设定全局基础参数.
  
- elem - 绑定元素
  
    ```
    类型：String/DOM，默认值：无
    必填项，用于绑定执行日期渲染的元素，值一般为选择器，或DOM对象
    laydate.render({ 
      elem: '#test' //或 elem: document.getElementById('test')、elem: lay('#test') 等
    });
    ```
    
- type - 控件选择类型

     type可选值 | 名称 | 用途 
     :----: | :----: | :----: 
     year | 年选择器 | 只提供年列表选择 
     month | 年月选择器 | 只提供年、月选择 
     date | 日期选择器 |  可选择：年、月、日。type默认值，一般可不填 
     time | 时间选择器 | 只提供时、分、秒选择 
     datetime | 日期时间选择器 | 可选择：年、月、日、时、分、秒 
     
    ```
    //年选择器
    laydate.render({ 
      elem: '#test'
      ,type: 'year'
    });
     
    //年月选择器
    laydate.render({ 
      elem: '#test'
      ,type: 'month'
    });
     
    //日期选择器
    laydate.render({ 
      elem: '#test'
      //,type: 'date' //默认，可不填
    });
     
    //时间选择器
    laydate.render({ 
      elem: '#test'
      ,type: 'time'
    });
     
    //日期时间选择器
    laydate.render({ 
      elem: '#test'
      ,type: 'datetime'
    });
    ```
- **闪出问题解决**
  
  在render里加trigger: 'click'
    ```
    laydate.render({
            elem: '#createTime',
            type: 'datetime',
            trigger: 'click'
        });
    ```
2. spring boot热部署
- 2.1 重新加载html
  
  修改html之后按快捷键CTRL+F9
- 2.2 重新加载java类
  
  2.2.1 在application.yml中修改spring.devtools.restart.enabled=true
  
  2.2.2 idea配置 选中Build Project automatically
  
  2.2.3 按下 Ctrl+Shift+Alt+/，选择Registry 选中compiler.automake.allow.when.app.
  running
3. 修改项目名和包名
- 3.1 修改项目名
  - 3.1.1 右击项目，点Refactor->Rename
  - 3.1.2 修改模块名称 Rename Module
  - 3.1.3 修改pom的artifactId改为myguns
- 3.2 修改包名
  - 3.2.1 选择cn.stylefeng.guns包，仍然为右键refactor->Rename
  - 3.2.2 弹出对话框选择，Rename all，输入project
  - 3.2.3 修改包名称，再次选择cn.stylefeng.project包，右键refactor->Rename，选择
  Rename Package，输入要改的名字
  - 3.2.4 改完后项目可能有些类报错，进去把这些类没用的import删掉就好
  - 3.2.5 修改application.yml中的mybatis-plus.typeAliasesPackage，改为现在的包名
  - 3.2.6 修改logback-spring.xml配置文件中的springProfile下的logger包名
  - 3.2.7 修改mapper扫描相关的包配置，在config\datasource修改包名为现在的包名（多数据
  源的也要修改）
  - 3.2.8 修改SessionHolderInterceptor类的扫描配置,在core\interceptor，修改包名为
  现在的包名
  - 3.2.9 修改WebConfig中的相关配置，在\config\web，修改JdkRegexpMethodPointcut.
  patterns的包名为现在的包名
  - 3.2.10 另外，检查aop相关的包扫描，默认可能ide已经帮你改掉了，如果没改得自己改下
4. guns核心思想(引用技术文档)
- 4.1 分包
  
  在日常开发中，业务模块的包结构划分一般划分为三个config、core、modular或者四个common、
  config、core、modular

  其中common为模块内通用的注解、常量、枚举、异常和持久化的实体等，若common不单独划分一个
  包，则可以把common包放到core包下面

  config包存放整个模块的配置类，因为项目基于spring boot开发，大部分的spring配置都换成
  了java bean方式的配置，所以单独分一个包来存放配置，config包中除了存放配置类，还有一些
  以Properties结尾的类，这些类的作用是启动应用的时候把application.yml中的配置映射到类
  的属性上，使用时需要注意以下几点
  
  ![分包](img/20181228174639902)
  
  modular存放按业务划分的业务代码，若本模块中包含多个模块业务，则在modular中建立多个
  业务包，在具体的业务包下再建立controller、dao、service、transfer、warpper这几个包，
  其中transfer为前后端传输数据所用的属性封装，warpper为对返回结果的包装器
  (下面会介绍到)，如果当前模块中只存在一类业务，那么没有必要在modular包下再建立多个业务
  模块，可直接在modular模块建立controller、dao、service、transfer、warpper

  core包存放当前模块所运行的一些核心机制，例如全局的异常拦截器，日志AOP，权限的AOP，项目
  初始化后的监听器，工具类等，还可以存放一些对某些框架的扩展，例如对beetl模板的扩展配置
  和工具类，对flowable的扩展类，Shiro的一些拓展类等等

  这样拆分的好处在于把业务，配置和运行机制清晰的拆分开，提高项目的可维护性，加快项目的开
  发效率!
  
- 4.2 统一异常拦截
  
  4.2.1 介绍
  
  统一异常拦截指对程序抛出的异常利用@ControllerAdvice在统一的一个类中做catch处理，
  在Guns中，我们在GlobalExceptionHandler类中做统一异常拦截处理，GlobalExceptionHandler类
  中可以拦截所有控制器执行过程中抛出的异常，若需要拦截其他包下的异常可以参考
  SessionInterceptor这个类中AOP的写法，来拦截其他特定包的异常。统一异常拦截的写法
  注意一下几点 
  
  
  ![统一异常拦截](img/20181228174639953)
  
  4.2.2 优点

  对异常进行统一处理，不需要再在业务代码中进行try catch操作，尽情写业务，有异常也会被
  自动拦截到，并且自动处理返回给前端提示

  4.2.3 关于性能

  有人可能会认为利用异常拦截这种机制，把业务逻辑的错误都用业务异常抛出进入aop的执行器，
  对性能会有所影响，经过笔者的调研和测试，频繁的抛出异常和try catch不会有性能损耗，
  主要的性能损耗在catch方法内部，并且在catch内，记录日志比较占用大部分的时间

  所以，如果是系统特别注重性能等问题，可以把业务异常分为两类，一类是较为频繁抛出的业务
  异常，一类是较少出现次数的业务异常，第一类异常可以再@ExceptionHandler中不做日志记录
  ，只进行简单的返回操作，第二类可以着重做异常处理，并做结果返回
  
- 4.3 结果包装器

  我们在进行列表查询或详情查询的过程中，查到的结果中，有些值可能在数据库中存的是一些
  列数字(一般为状态值等)，但是我们要返回给前端，业务人员看的时候不希望直接返回给他们
  这些不直观的值(例如1，2，3，4)，我们更希望返回给前端中文名称(例如启用，冻结，已删除)
  ，所以我们应该对这些数值做一下包装，把他们包装成文字描述

  4.3.1 如何使用

  以查询用户列表的接口为例，不包装的情况下默认的查询结果为这些字段
  
  ![字段](img/201812281746400)
  
  其中性别，角色，部门，状态都是数值或者id类型，我们需要把他们包装成文字形式返回给前端

  1.首先建立UserWarpper类继承BaseControllerWarpper类 
  
  ```
  // 用户管理的包装类
  public class UserWarpper extends BaseControllerWrapper {

    public UserWarpper(Map<String, Object> single) {
        super(single);
    }

    public UserWarpper(List<Map<String, Object>> multi) {
        super(multi);
    }

    public UserWarpper(Page<Map<String, Object>> page) {
        super(page);
    }

    public UserWarpper(PageResult<Map<String, Object>> pageResult) {
        super(pageResult);
    }

    @Override
    protected void wrapTheMap(Map<String, Object> map) {
        map.put("sexName", ConstantFactory.me().getSexName((Integer) map.get("sex")));
        map.put("roleName", ConstantFactory.me().getRoleName((String) map.get("roleid")));
        map.put("deptName", ConstantFactory.me().getDeptName((Integer) map.get("deptid")));
        map.put("statusName", ConstantFactory.me().getStatusName((Integer) map.get("status")));
    }
  }
  ```
  通过查看BaseControllerWarpper类可了解到被包装的参数必须为**Map**或者**List**类型
  ```
  public abstract class BaseControllerWrapper {

    private Page<Map<String, Object>> page = null;

    private PageResult<Map<String, Object>> pageResult = null;

    private Map<String, Object> single = null;

    private List<Map<String, Object>> multi = null;

    public BaseControllerWrapper(Map<String, Object> single) {
        this.single = single;
    }

    public BaseControllerWrapper(List<Map<String, Object>> multi) {
        this.multi = multi;
    }

    public BaseControllerWrapper(Page<Map<String, Object>> page) {
        if (page != null && page.getRecords() != null) {
            this.page = page;
            this.multi = page.getRecords();
        }
    }

    public BaseControllerWrapper(PageResult<Map<String, Object>> pageResult) {
        if (pageResult != null && pageResult.getRows() != null) {
            this.pageResult = pageResult;
            this.multi = pageResult.getRows();
        }
    }

    @SuppressWarnings("unchecked")
    public <T> T wrap() {

        /**
         * 包装结果
         */
        if (single != null) {
            wrapTheMap(single);
        }
        if (multi != null) {
            for (Map<String, Object> map : multi) {
                wrapTheMap(map);
            }
        }

        /**
         * 根据请求的参数响应
         */
        if (page != null) {
            return (T) page;
        }
        if (pageResult != null) {
            return (T) pageResult;
        }
        if (single != null) {
            return (T) single;
        }
        if (multi != null) {
            return (T) multi;
        }

        return null;
    }

    protected abstract void wrapTheMap(Map<String, Object> map);
  }
  ```
  我们继承BaseControllerWarpper类主要是为了实现warpTheMap()方法，也就是具体的包装
  过程，warpTheMap()方法的参数map就是被包装的原始数据的每个条目，我们可以在这每个条目
  中增加一些字段也就是被包装字段的中文名称，如下 
  
  ![被包装字段的中文名称](img/2018122817464044)


  4.3.2 ConstantFactory

  在包装过程中，我们经常会用到ConstantFactory这个类，这个类是连接**数据库**和**包装类**的
  桥梁，我们可以在ConstantFactory中封装一些编辑的查询方法，这些方法通常会被多个包装类
  多次调用，并且在调用这些方法的时候ConstantFactory.me()的形式静态调用，可以快速的
  包装一些状态和id，非常方便，在ConstantFactory中我们可以利用spring cache的
  @Cacheable注解来缓存一些数据，把这些频繁的查询缓存起来
  
- 4.4 前端思想
  
  Guns前端采用了beetl模板引擎，beetl包含语法简洁，速度快，文档全，社区活跃等众多优点，所有的beetl语法都以@开头
  
  4.4.1 布局

  在用户登录页面后进入的是index.html页面，这个页面加载了整个后台管理系统的框架，我们可以看到index.html
  源代码中把整个页面分为了三部分，左侧菜单栏，右侧页面和右侧主题栏部分，其实就是利用**beetl的@include**把整个
  大的复杂的页面细化了，这样好维护
  
  ![index.html](img/2018122817464090)
  
  左侧菜单和右侧主题栏部分在用户登录后会一直不变，除非刷新浏览器页面，动态变化的是页面右侧这部分，我们打开6个
  标签页，并打开浏览器F12调试

  ![index.html](img/20181228174640135)
  
  新建和切换标签，页面的地址不会变化，变化的是页面右侧的iframe这部分

  下面我们分析一下右侧页面的组成，我们打开菜单管理页面，查看他的代码
  
  ```
  @layout("/common/_container.html"){
  <div class="row">
  XXXX等html代码...
  </div>
  <script src="${ctxPath}/static/modular/system/menu/menu.js"></script>
  @}
  ```
  
  整个页面被@layout所包围，@layout是beetl的引用布局(具体用法文档可以查看beetl的官方文档)，Guns中内置了
  /common/_container.html这样一个布局，可以把/common/_container.html理解为一个html的抽象封装，我们每
  个页面都继承自这个模板，默认包含了一系列通用的js css引用等，这样写即简化了我们的开发和维护，又使我们的
  代码简洁有序，在/common/_container.html中的${layoutContent}就代表我们每个页面不同的html

  4.4.2 标签

  为了把一些重复性的html封装起来，我们使用了beetl的标签，这些标签的本质是把重复性的html代码用一行html
  标签替代，从而方便使用，易于维护，这些标签都放在common/tags这个文件夹 
  
  ![index.html](img/20181228174640190)
  
  标签中的一些属性例如${name} ${id}等属性均为当被调用时，从调用体的属性传来
  <#xxxTag name="xxx" id="xxx">
  
  4.4.3 手动新增标签页

  新版Guns提供了手动新增标签页的方法Feng.newCrontab(href,menuName);
  第一个参数是新打开tab页面的地址，第二个参数是新增tag页面的标签名称。
  
5. 对订单管理的添加和修改做数据验证
- 5.1 在order_add.html和order_edit.html的div添加 id属性
  
  ```
  <div class="form-horizontal" id="orderInfoForm">
  ```
  
- 5.2 在order_info.js 
  
  1.OrderInfoDlg添加validateFields(可以做长度验证，正则匹配等等)
  
  ```
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
  ```
  
  2.在 $(function (){});添加Feng.initValidator，第一个参数为之前在html里加上的
  id属性，第二个参数为上面OrderInfoDlg添加的validateFields
  
  ```
  $(function () {
    Feng.initValidator("orderInfoForm", OrderInfoDlg.validateFields);
  });
  ```
  
  3.添加做数据验证的函数
  
  ```
  OrderInfoDlg.validate = function () {
    $('#orderInfoForm').data("bootstrapValidator").resetForm();
    $('#orderInfoForm').bootstrapValidator('validate');
    return $("#orderInfoForm").data('bootstrapValidator').isValid();
  };
  ```
  
  4.在提交添加和提交修改的函数里调用if (!this.validate()) {return;}
  
  ```
  OrderInfoDlg.addSubmit = function () {
    this.clearData();
    this.collectData();
    //提交信息前的验证
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
  ```
  
6. 订单管理上传图片和显示图片 参考[github.com/happyfish100 fastdfs-client-java ](https://github.com/happyfish100/fastdfs-client-java)
- 6.1 pom.xml添加fastdfs依赖
  
  ```
  <dependency>
      <groupId>org.csource</groupId>
      <artifactId>fastdfs-client-java</artifactId>
      <version>1.27-SNAPSHOT</version>
  </dependency>
  ```
  
- 6.2 配置fdfs_client.conf(此处使用本地虚拟机做测试)
  
  ```
  tracker_server = 192.168.1.166:22122
  ```

- 6.3 导入FastdfsUtil类

- 6.4 在WEB-INF.view下新建lib文件夹，把fastdfs-client-java-1.27-SNAPSHOT.jar放到lib下
并 add as library

- 6.5 在_container.html引入js和css文件
  
  ```
  <link href="${ctxPath}/static/css/plugins/viewer/viewer.min.css" rel="stylesheet">
  <link href="${ctxPath}/static/css/build.css" rel="stylesheet">
  
  <!--图片插件-->
  <script src="${ctxPath}/static/js/plugins/viewer/viewer.min.js"></script>
  <script src="${ctxPath}/static/js/common/fileDownload.js"></script>
  ```

- 6.6 把UserMgrController下的upload请求的函数改为
  
  ```
  @RequestMapping(method = RequestMethod.POST, path = "/upload")
  @ResponseBody
  public Object upload(@RequestPart("file") MultipartFile picture) {
      String[] fielpath = null;
      try {
          fielpath = FastdfsUtil.uploadFile(picture, picture.getOriginalFilename(), picture.getSize());
      } catch (IOException e) {
          e.printStackTrace();
      }
      return Const.file_url + fielpath[0] + "/" + fielpath[1];
  }
  ```
  
  其中Const.file_url为
  
  ```
  /**
  * 下载文件的url
  */
  String file_url = "http://192.168.1.166:8888/";
  ```
  
- 6.7 修改order_add.html和order_edit.html的goodsImg标签
  
  1.order_add.html
  ```
  <#avatar id="goodsImg" name="商品图片" />
      <div class="progress progress-striped" id="progressTipArea" style="margin-top: 20px;">
           <div id="progressBar" style="width: 0%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="0" role="progressbar" class="progress-bar progress-bar-info">
           </div>
      </div>
  <div class="hr-line-dashed"></div>
  ```
  
  2.order_edit.html
  ```
  <#avatar id="goodsImg" name="商品图片" avatarImg="${item.goodsImg}" />
      <div class="progress progress-striped" id="progressTipArea" style="margin-top: 20px;">
           <div id="progressBar" style="width: 0%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="0" role="progressbar" class="progress-bar progress-bar-info">
           </div>
      </div>
  <div class="hr-line-dashed"></div>
  ```
- 6.8 修改order_info.js
  
  1.在 $(function (){});
  ```
  /**
  * 初始化图片上传
  */
  var avatarUp = new $WebUpload("goodsImg");
  avatarUp.setUploadBarId("progressBar");
  avatarUp.init();
  ```
  
  2.添加加载图片的函数
  ```
  /**
  * 加载图片
  */
  OrderInfoDlg.openPicture = function()
  {
      $("#showAllImage").viewer({url: 'data-original'});
  };
  ```
  
- 6.9 修改order.js 
  
  1.initColumn
  ```
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
  ```
  
  2.添加函数
  
  ```
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
  ```
  
  
--- 
## 问题记录
1. 添加一条订单记录时，出现

    Field error in object 'order' on field 'createTime': rejected value []; codes [typeMismatch.order.createTime,typeMismatch.createTime,typeMismatch.java.util.Date,typeMismatch]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [order.createTime,createTime]; arguments []; default message [createTime]]; default message [Failed to convert property value of type 'java.lang.String' to required type 'java.util.Date' for property 'createTime'; nested exception is org.springframework.core.convert.ConversionFailedException: Failed to convert from type [java.lang.String] to type [@com.baomidou.mybatisplus.annotations.TableField java.util.Date] for value ''; nested exception is java.lang.IllegalArgumentException]
    
    在表单中createTime类型为String，而Order类中的createTime为Date类型，无法转换。
    
    解决方法：在Order类的createTime上添加注解@DateTimeFormat，pattern为需要转换为什么形式
    ```
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField("create_time")
    private Date createTime;
    ```
    
2. 在修改订单里的创建时间只有年月日

    beetl标签input.tag 
    
    ```
    @if(isNotEmpty(value)){
        value="${tool.dateType(value)}"
    @}
    ```
    
    tool在BeetlConfiguration中注册
    
    ```
    groupTemplate.registerFunctionPackage("tool", new ToolUtil());
    ```
    
    在ToolUtil中找到dateType方法
    
    ```
    /**
     * 判断一个对象是否是时间类型
     *
     * @author stylefeng
     * @Date 2017/4/18 12:55
     */
    public static String dateType(Object o) {
        if (o instanceof Date) {
            return DateUtil.formatDate((Date) o);
        } else {
            return o.toString();
        }
    }
    ```
    
    发现它是先判断一个对象是否是时间类型，如果是则通过DateUtil转换格式
    
    再到DateUtil中找formatDate方法
    
    ```
    /**
	 * 格式化日期部分（不包括时间）<br>
	 * 格式 yyyy-MM-dd
	 * 
	 * @param date 被格式化的日期
	 * @return 格式化后的字符串
	 */
	public static String formatDate(Date date) {
		if (null == date) {
			return null;
		}
		return DatePattern.NORM_DATE_FORMAT.format(date);
	}
    ```
    
    返回DatePattern.NORM_DATE_FORMAT.format(date)，找到DatePattern.NORM_DATE_FORMAT
    
    ```
    /** 标准日期格式：yyyy-MM-dd */
	public final static String NORM_DATE_PATTERN = "yyyy-MM-dd";
	/** 标准日期格式 {@link FastDateFormat}：yyyy-MM-dd */
	public final static FastDateFormat NORM_DATE_FORMAT = FastDateFormat.getInstance(NORM_DATE_PATTERN);
    ```
    
    可以看出返回的时间格式是yyyy-MM-dd
    
    解决方法：
    
    1.自定义ToolUtil,里面复制之前调用的core包下的ToolUtil，新增函数dateToStr
    
    ```
    /**
     * dateToStr(yyyy-MM-dd HH:mm:ss)
     *
     * @param o
     * @return
     */
    public static String dateToStr(Object o) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (o instanceof Date) {
            return dateFormat.format((Date) o);
        } else {
            return o.toString();
        }
    }
    ```
    
    2.修改BeetlConfiguration下的ToolUtil为本项目包的ToolUtil
    
    ```
    import cn.mystudy.myguns.core.util.ToolUtil;
    ```
    
    3.再改input.tag下的
    
    ```
    @if(isNotEmpty(value)){
        value="${tool.dateToStr(value)}"
    @}
    ```
    
3. 本地虚拟机启动fastdfs文件服务器
  
    防火墙
    ```
    #不关闭防火墙的话无法使用
    systemctl stop firewalld.service #关闭
    systemctl restart firewalld.service #重启
    ```
    tracker
    ```
    /etc/init.d/fdfs_trackerd start #启动tracker服务
    /etc/init.d/fdfs_trackerd restart #重启动tracker服务
    /etc/init.d/fdfs_trackerd stop #停止tracker服务
    chkconfig fdfs_trackerd on #自启动tracker服务
    ```
    storage
    ```
    /etc/init.d/fdfs_storaged start #启动storage服务
    /etc/init.d/fdfs_storaged restart #重动storage服务
    /etc/init.d/fdfs_storaged stop #停止动storage服务
    chkconfig fdfs_storaged on #自启动storage服务
    ```
    nginx
    ```
    /usr/local/nginx/sbin/nginx #启动nginx
    /usr/local/nginx/sbin/nginx -s reload #重启nginx
    /usr/local/nginx/sbin/nginx -s stop #停止nginx
    ```