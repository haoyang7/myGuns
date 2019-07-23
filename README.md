# My Guns
---
## 介绍
Guns基于SpringBoot 2，致力于做更简洁的后台管理系统，完美整合springmvc + shiro + mybatis-plus + beetl!Guns项目代码简洁，注释丰富，上手容易，同时Guns包含许多基础模块(用户管理，角色管理，部门管理，字典管理等10个模块)，可以直接作为一个后台管理系统的脚手架! 2018目标 `更简洁`，`更规范`!
---
## 学习记录
1. laydate的使用
- 官网文档[日期和时间组件文档](https://www.layui.com/doc/modules/laydate.html)
  
- 基础参数选项
  
  通过核心方法：laydate.render(options) 来设置基础参数，也可以通过方法：laydate.set(options) 来设定全局基础参数.
  
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
  
  2.2.3 按下 Ctrl+Shift+Alt+/，选择Registry 选中compiler.automake.allow.when.app.running
3. 修改项目名和包名
- 3.1 修改项目名
  - 3.1.1 右击项目，点Refactor->Rename
  - 3.1.2 修改模块名称 Rename Module
  - 3.1.3 修改pom的artifactId改为myguns
- 3.2 修改包名
  - 3.2.1 选择cn.stylefeng.guns包，仍然为右键refactor->Rename
  - 3.2.2 弹出对话框选择，Rename all，输入project
  - 3.2.3 修改包名称，再次选择cn.stylefeng.project包，右键refactor->Rename，选择Rename Package，输入要改的名字
  - 3.2.4 改完后项目可能有些类报错，进去把这些类没用的import删掉就好
  - 3.2.5 修改application.yml中的mybatis-plus.typeAliasesPackage，改为现在的包名
  - 3.2.6 修改logback-spring.xml配置文件中的springProfile下的logger包名
  - 3.2.7 修改mapper扫描相关的包配置，在config\datasource修改包名为现在的包名（多数据源的也要修改）
  - 3.2.8 修改SessionHolderInterceptor类的扫描配置,在core\interceptor，修改包名为现在的包名
  - 3.2.9 修改WebConfig中的相关配置，在\config\web，修改JdkRegexpMethodPointcut.patterns的包名为现在的包名
  - 3.2.10 另外，检查aop相关的包扫描，默认可能ide已经帮你改掉了，如果没改得自己改下
