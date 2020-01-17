"use strict";

var _extends = Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var defaultParagraphSeparatorString = "defaultParagraphSeparator";
var formatBlock = "formatBlock";
var addEventListener = function addEventListener(parent, type, listener) {
  return parent.addEventListener(type, listener);
};
var appendChild = function appendChild(parent, child) {
  return parent.appendChild(child);
};
var createElement = function createElement(tag) {
  return document.createElement(tag);
};
var queryCommandState = function queryCommandState(command) {
  return document.queryCommandState(command);
};
var queryCommandValue = function queryCommandValue(command) {
  return document.queryCommandValue(command);
};

/** @desc https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand */
var exec = function exec(command) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return document.execCommand(command, false, value);
};

var defaultActions = {
  bold: {
    icon: "<b>B</b>",
    title: "Bold",
    state: function state() {
      return queryCommandState("bold");
    },
    result: function result() {
      return exec("bold");
    }
  },
  italic: {
    icon: "<i>I</i>",
    title: "Italic",
    state: function state() {
      return queryCommandState("italic");
    },
    result: function result() {
      return exec("italic");
    }
  },
  underline: {
    icon: "<u>U</u>",
    title: "Underline",
    state: function state() {
      return queryCommandState("underline");
    },
    result: function result() {
      return exec("underline");
    }
  },
  strikethrough: {
    icon: "<strike>S</strike>",
    title: "Strike-through",
    state: function state() {
      return queryCommandState("strikeThrough");
    },
    result: function result() {
      return exec("strikeThrough");
    }
  },
  heading1: {
    icon: "<b>H<sub>1</sub></b>",
    title: "Heading 1",
    state: function state() {
      return queryCommandState("Heading 1");
    },
    result: function result() {
      return exec(formatBlock, "<h1>");
    }
  },
  heading2: {
    icon: "<b>H<sub>2</sub></b>",
    title: "Heading 2",
    result: function result() {
      return exec(formatBlock, "<h2>");
    }
  },
  paragraph: {
    icon: "&#182;",
    title: "Paragraph",
    result: function result() {
      return exec(formatBlock, "<p>");
    }
  },
  quote: {
    icon: "&#8220; &#8221;",
    title: "Quote",
    result: function result() {
      return exec(formatBlock, "<blockquote>");
    }
  },
  olist: {
    icon: "&#35;",
    title: "Ordered List",
    result: function result() {
      return exec("insertOrderedList");
    }
  },
  ulist: {
    icon: "&#8226;",
    title: "Unordered List",
    result: function result() {
      return exec("insertUnorderedList");
    }
  },
  code: {
    icon: "&lt;/&gt;",
    title: "Code",
    result: function result() {
      return exec(formatBlock, "<pre>");
    }
  },
  line: {
    icon: "&#8213;",
    title: "Horizontal Line",
    result: function result() {
      return exec("insertHorizontalRule");
    }
  },
  link: {
    icon: "&#128279;",
    title: "Link",
    result: function result() {
      var url = window.prompt("Enter the link URL");
      if (url) exec("createLink", url);
    }
  },
  image: {
    icon: "&#128247;",
    title: "Image",
    result: function result() {
      var url = window.prompt("Enter the image URL");
      if (url) exec("insertImage", url);
    }
  }
};

var defaultClasses = {
  actionbar: "u-pell__bar",
  button: "u-pell__button",
  content: "u-pell__content",
  selected: "u-pell__active"
};
// 光标处理
var cursor = function(el) {
  var saveSelection, restoreSelection;

  if (window.getSelection && document.createRange) {
    saveSelection = function(containerEl) {
      var range = window.getSelection().getRangeAt(0);
      var preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(containerEl);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      var start = preSelectionRange.toString().length;

      return {
        start: start,
        end: start + range.toString().length
      };
    };

    restoreSelection = function(containerEl, savedSel) {
      var charIndex = 0,
        range = document.createRange();
      range.setStart(containerEl, 0);
      range.collapse(true);
      var nodeStack = [containerEl],
        node,
        foundStart = false,
        stop = false;

      while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType == 3) {
          var nextCharIndex = charIndex + node.length;
          if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
            range.setStart(node, savedSel.start - charIndex);
            foundStart = true;
          }
          if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
            range.setEnd(node, savedSel.end - charIndex);
            stop = true;
          }
          charIndex = nextCharIndex;
        } else {
          var i = node.childNodes.length;
          while (i--) {
            nodeStack.push(node.childNodes[i]);
          }
        }
      }

      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };
  } else if (document.selection && document.body.createTextRange) {
    saveSelection = function(containerEl) {
      var selectedTextRange = document.selection.createRange();
      var preSelectionTextRange = document.body.createTextRange();
      preSelectionTextRange.moveToElementText(containerEl);
      preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
      var start = preSelectionTextRange.text.length;

      return {
        start: start,
        end: start + selectedTextRange.text.length
      };
    };

    restoreSelection = function(containerEl, savedSel) {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(containerEl);
      textRange.collapse(true);
      textRange.moveEnd("character", savedSel.end);
      textRange.moveStart("character", savedSel.start);
      textRange.select();
    };
  }

  var savedSelection;

  // 记住光标
  function save() {
    savedSelection = saveSelection(el);
  }

  // 恢复光标
  function reset() {
    if (savedSelection) {
      restoreSelection(el, savedSelection);
    }
  }

  // 插入内容
  function insert(str) {
    var result, val = "value" in el ? el.value : el.innerHTML;
    el.focus();
    if (document.selection) {
      /*ie*/
      el.focus();
      result = document.selection.createRange();
      document.selection.empty();
      result.text = str;
    } else {
      result = [val.substring(0, el.selectionStart), str, val.substr(el.selectionEnd)];
      el.focus();
      "value" in el ? (el.value = result.join("")) : (el.innerHTML = result.join(""));
    }
  }

  return {
    save: save,
    reset: reset,
    insert: insert
  };
};

var init = function init(settings) {
  var actions = settings.actions ? settings.actions.map(function(action) {
    if (typeof action === "string") return defaultActions[action];
    else if (defaultActions[action.name]) return _extends({},
      defaultActions[action.name], action);
    return action;
  }) : Object.keys(defaultActions).map(function(action) {
    return defaultActions[action];
  });

  var classes = _extends({},
    defaultClasses, settings.classes);

  var defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || "div";

  var actionbar = createElement("div");
  actionbar.className = classes.actionbar;
  appendChild(settings.element, actionbar);

  var content = (settings.element.content = createElement("div"));
  var autoCursor = cursor(content);
  content.contentEditable = true;
  content.className = classes.content;
  var compositionstart = false;
  var oninput = function(_ref) {
    var firstChild = _ref.target.firstChild;
    if (firstChild && !compositionstart && firstChild.nodeType === 3) exec(formatBlock, "<" + defaultParagraphSeparator + ">");
    else if (content.innerHTML === "<br>") content.innerHTML = "";
    // 处理图片
    settings.onChange(content.innerHTML);
  };
  content.oninput = oninput;
  /** 处理用户键盘输入 */
  addEventListener(content, "compositionstart",
    function() {
      compositionstart = true;
    });
  addEventListener(content, "compositionend",
    function(_ref) {
      compositionstart = false;
      oninput(_ref);
    });
  content.onkeydown = function(event) {
    /** 输入 Enter 需要换行的元素 queryCommandValue(formatBlock) === "blockquote" */
    var elements = ["blockquote", "pre", "br"];
    if (event.key === "Enter" && ~elements.indexOf(queryCommandValue(formatBlock))) {
      setTimeout(function() {
        return exec(formatBlock, "<" + defaultParagraphSeparator + ">");
      },
        0);
    }
  };

  content.onblur = function() {
    autoCursor.save();
  };

  appendChild(settings.element, content);

  actions.forEach(function(action) {
    // 按钮和分割线
    if (action.name) {
      var button = createElement("button");
      button.className = classes.button;
      button.innerHTML = action.icon;
      button.title = action.title;
      button.setAttribute("type", "button");
      button.onclick = function() {
        return action.result.call(this, autoCursor) && content.focus();
      };

      if (action.state) {
        var handler = function handler(ev) {
          return button.classList[action.state() ? "add" : "remove"](classes.selected);
        };
        addEventListener(content, "keyup", handler);
        addEventListener(content, "mouseup", handler);
        addEventListener(button, "click", handler);
      }
          appendChild(actionbar, button);
    } else if(action.type) {
      var button = createElement("i");
      button.className = classes.button;
     appendChild(actionbar, button);
    }


  });
  
  // 处理高度
  var height =settings.element.style.height;
  if(height){
    height = settings.element.scrollHeight;
    settings.element.style.height ="auto";
    content.style.height = (height - actionbar.scrollHeight)+'px';    
  }

  if (settings.styleWithCSS) exec("styleWithCSS");
  exec(defaultParagraphSeparatorString, defaultParagraphSeparator);
  return {content,exec}
};

// const pell = {exec: exec,  init: init};

export
  default
  function(options={}) {
   // element =, onChange
  // Initialize pell on an HTMLElement
  return init({
    // <HTMLElement>, required
    element: options.el,
    // <Function>, required
    // Use the output html, triggered by element's `oninput` event
    onChange: function(html) {
      options.onChange && options.onChange(html);
    },
    // <string>, optional, default = 'div'
    // Instructs the editor which element to inject via the return key
    defaultParagraphSeparator: "div",
    // <boolean>, optional, default = false
    // Outputs <span style="font-weight: bold;"></span> instead of <b></b>
    styleWithCSS: false,
    // <Array[string | Object]>, string if overwriting, object if customizing/creating
    // action.name<string> (only required if overwriting)
    // action.icon<string> (optional if overwriting, required if custom action)
    // action.title<string> (optional)
    // action.result<Function> (required)
    // Specify the actions you specifically want (in order)
    // 'underline', 'strikethrough', 'paragraph',
    actions:options.actions
  });
}