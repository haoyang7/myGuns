# My Guns
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
  
  ![图片](https://img-blog.csdnimg.cn/20181228174639902)
  
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

--- 
## 问题记录
1. 添加一条订单记录时，出现

    Field error in object 'order' on field 'createTime': rejected value []; codes [typeMismatch.order.createTime,typeMismatch.createTime,typeMismatch.java.util.Date,typeMismatch]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [order.createTime,createTime]; arguments []; default message [createTime]]; default message [Failed to convert property value of type 'java.lang.String' to required type 'java.util.Date' for property 'createTime'; nested exception is org.springframework.core.convert.ConversionFailedException: Failed to convert from type [java.lang.String] to type [@com.baomidou.mybatisplus.annotations.TableField java.util.Date] for value ''; nested exception is java.lang.IllegalArgumentException]
    
    在表单中createTime类型为String，而Order类中的createTime为Date类型，无法转换。
    
    解决方法：在Order类的createTime上添加注解@DateTimeFormat，pattern为需要转换为什么形式
    ```
    /**
     * 下单时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField("create_time")
    private Date createTime;
    ```
2. 