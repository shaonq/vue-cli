<template>
<u-md>

# HTTP接口文档 v 1.0 Bate


## API接口规范
> HTTP接口规范。返回数据格式统一如下：

```javascript
{
    status:"0", // 必选,返回码
    data:[],   // 返回码正确时必须，返回数据
    message："", // 返回码错误时必须，返回消息，网页端接口出现错误时使用此消息展示给用户
    count:0      // 有分页时必选，返回数据所有的条目数，用来分页
}
```
> Api status 定义


code|value
---|---
0|正常
10|认证失败， 用户未登录
500|其他异常
1001|系统错误
1003|服务器忙
1005|参数错误，请参考API文档



## 接口签名规范 
> Token 放在 headers 传递  统一命名 ["Orchisky-Token"]

```javascript
/** jQuery */
$.ajax({
      headers: {
        "Orchisky-Token":"[YouToken]"  
      }
})
/** axios */
axios({
    method: "POST",
    headers: {
        "Orchisky-Token":"[YouToken]"  ,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
```

* **优先使用 "GET" 和 "POST" 协议传输**
* 同一类型接口不同类型使用参数 `type="add|edit|delete"` 区分


# API说明 


### 书写接口文档规范
* 任何api接口文档都必须在项目根目录新建一个**README.md**的markdwon的说明文档
* 如果项目分类比较多，必须在**README.md**添加访问子文档的跳转链接

#### 接口文档书写示例


描述|内容
---|---
接口功能|接口文档示例
请求方法|POST
请求HOST|http://www.orchisky.cn
请求路径|/api/server/demo
备注|签名参数
请求参数|按POST提交表单的标准，你的任何值字符串是需要 urlencode 编码的

参数|描述
---|---
id|文章id 【必填】
messageJson|Json字符串格式，具体如下 【必填】

```javascript
// messageJson   【说明参数规则】
{
    "title": 标题, 【string 非必填，字数显示1~32个】
    "content": 内容,  【string 必填，字数限制2000以内】
}
```

响应内容

> 成功情况：

```javascript
{
    "status": "0",
    "data": {}
}
```

> 失败情况


```javascript
{
    "status": "1005",
    "message": "参数错误"
}
```

</u-md>
</template>

<script>
export default {

}
</script>

<style>

</style>
