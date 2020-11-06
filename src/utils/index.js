import util from './util'

const Utils = {}

// 内容替换
Utils.encode = function (_map, _content) {
    _content = '' + _content
    if (!_map || !_content) {
        return _content || ''
    }
    return _content.replace(_map.r, function ($1) {
        var _result = _map[!_map.i ? $1.toLowerCase() : $1]
        return _result != null ? _result : $1
    });
};

// 聊天内容转义
Utils.escape = (function () {
    let _reg = /<br\/?>$/
    let _map = {
        r: /\<|\>|\&|\r|\n|\s|\'|\"/g,
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        ' ': '&nbsp;',
        '"': '&quot;',
        "'": '&#39;',
        '\n': '<br/>',
        '\r': ''
    }
    return function (_content) {
        _content = Utils.encode(_map, _content)
        return _content.replace(_reg, '<br/>');
    };
})();


// 把 util 统一暴露
export default Object.assign({}, Utils, util)