<template>
  <div class="u-pell--body">
    <h1>HTTP接口文档</h1>
    <blockquote>HTTP接口规范。返回数据格式统一如下：</blockquote>
    <pre>
/**
 * @param {String|Number} 必选,返回码
 * @param {String} data: 返回码正确时必须，返回数据
 * @param {String} message：返回码错误时必须，返回消息，网页端接口出现错误时使用此消息展示给用户
 * @param {Number} count: 有分页时必选，返回数据所有的条目数，用来分页
 */

{ status:"0", data:[], message："", count:0 }
    </pre>
    <h1>Api status 定义</h1>
    <table>
      <thead></thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>正常</td>
        </tr>
        <tr>
          <td>10</td>
          <td>认证失败， 用户未登录</td>
        </tr>
        <tr>
          <td>500</td>
          <td>其他异常</td>
        </tr>
        <tr>
          <td>1001</td>
          <td>系统错误</td>
        </tr>
        <tr>
          <td>1003</td>
          <td>服务器忙</td>
        </tr>
        <tr>
          <td>1005</td>
          <td>参数错误，请参考API文档</td>
        </tr>
      </tbody>
    </table>
    <h1>接口签名规范</h1>
    <blockquote>Token 放在 headers 传递 统一命名 [“Orchisky-Token”]</blockquote>
    <pre>
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
    </pre>
    <ul>
      <li>
        <strong>优先使用 “GET” 和 “POST” 协议传输</strong>
      </li>
      <li>
        同一类型接口不同类型使用参数&nbsp;
        <code>type="add|edit|delete"</code>&nbsp;区分
      </li>
    </ul>
    <h1>API说明</h1>
    <blockquote>书写接口文档规范</blockquote>
    <ul>
      <li>
        任何api接口文档都必须在项目根目录新建一个
        <strong>README.md</strong>的markdwon的说明文档
      </li>
      <li>
        如果项目分类比较多，必须在
        <strong>README.md</strong>添加访问子文档的跳转链接
      </li>
    </ul>
    <blockquote>接口文档书写示例</blockquote>
    <table style="margin-top:20px;text-align: left;">
      <thead>
        <tr>
          <th>描述</th>
          <th>内容</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>接口功能</td>
          <td>接口文档示例</td>
        </tr>
        <tr>
          <td>请求方法</td>
          <td>POST</td>
        </tr>
        <tr>
          <td>请求HOST</td>
          <td>http://www.orchisky.cn</td>
        </tr>
        <tr>
          <td>请求路径</td>
          <td>/api/server/demo</td>
        </tr>
        <tr>
          <td>备注</td>
          <td>签名参数</td>
        </tr>
        <tr>
          <td>请求参数</td>
          <td>按POST提交表单的标准，你的任何值字符串是需要 urlencode 编码的</td>
        </tr>
      </tbody>
    </table>
    <table style="margin-top:20px;text-align: left;">
      <thead>
        <tr>
          <th>参数</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>id</td>
          <td>文章id 【必填】</td>
        </tr>
        <tr>
          <td>messageJson</td>
          <td>Json字符串格式，具体如下 【必填】</td>
        </tr>
      </tbody>
    </table>
    <pre>
/**
 * @param {String} messageJson - JSON String
 */
{
    "title": 标题, 【string 非必填，字数显示1~32个】
    "content": 内容,  【string 必填，字数限制2000以内】
}
    </pre>
    <h1>响应内容</h1>
    <blockquote>成功情况：</blockquote>
    <pre>
{ "status": "0", "data": {} }
    </pre>
    <blockquote>失败情况</blockquote>
    <pre>
{ "status": "1005", "message": "参数错误" }
    </pre>
  </div>
</template>