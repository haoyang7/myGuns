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
