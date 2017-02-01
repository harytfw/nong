"use strict";

// ==UserScript==
// @name        挊-随时开车
// @namespace   撸
// @description 自动获取磁链接并自动离线下载


// @include     http*://*

// @version     1.31
// @run-at      document-end
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @grant       unsafeWindow
// @grant       GM_registerMenuCommand
// ==/UserScript==

var i_am_old_driver = {
  start: function start() {
    this.add_css();
    this.add_small_icon();
  },
  add_css: function add_css() {
    if (!unsafeWindow.nong_has_add_css) {
      unsafeWindow.nong_has_add_css = true;
      GM_addStyle("\n        #nong-drive-anytime-icon{\n          position:fixed;\n          z-index:6969;\n          color: white;\n          border-radius: 32px;\n          width: 32px;\n          height: 32px;\n          left: 10px;\n          bottom: 15px;\n          text-align: center;\n          line-height: 32px;\n          background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/x          hBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAjbsAAI27AZ11gYA          AAAAHdElNRQfdCQQWEiC7N9+uAAADmUlEQVRIx5XVb0gVZhQG8N+93lvmlkZQVhO5hK6GfyIoglpGkLAlbMEg1oe2VuuPwnDZWgV9G2NrtTT          tg4UsttX60mBFtjUFaaQSFKuu1dhQr+XKdKTFtmKl7kNOvWqNzrf3fZ/3vOc873nOCRhtCXIts0SONEH0aRd1Ro2o3pHgwIh10CJr5et1SYs          WDxE2U4YcQbW+UK/PEy1dhU6NimUIICAkNPBQhmKNOpVLe1IES+w1yW5H3RWx1DwRKejR5rw6MSlW2eoPJepHOyhQ6RebNcmxUYFEv/rNbaT          KNMt91So1yVYqU5FT8cEvccO3UoUViYnaJkfS4GmSXNtcFVMkLNVx1+XF535BjVSJyt2xKz7LYai9upVLNE2dC9KHmC/XLFtYuZvWCD6R5KB          1bikXNkeriv+Qi3XahCJ3rPF/tl63Qryny+LHZXNIoxQ5YnaNen2ccaOiKBWTJVmjQxKYq10x9osOyz1BthJVfvC9KlvkDtQDpGlShmLt5gY          t06taRIHD2sEEr/jKKe963iWXPWedat94zUTQ7ojXRVTrtYyTTgh4x01ZwjJt8KMO1VZJlWK++VJMtdIxv/vJFlnGy3bTagEnnKRNGSr0OKx          Wq2ZV8k1AjtM6dDgtG2ELlbnmhjOO6PEZyrSFpGkRENHpvnoHndeqH8n2SLQaO+2x0j0NGrxggWxpurwkoEUa/QqFnPXxCLYX6JAP8nVYMOL          0oHohhfqHvq3/qb8/UvaD6JA+YY/0eNGsQdhDXa64aCfY6aKoZFOEB69P1u2RsL6QdjPRYoN5w/x3qbTDJ77GRTusUGT6sAhmKMdM7SFRGQJ          +9o/drkhAv/GW+9Rmb8gWELXC5475yAMB9Mqyy2UBGaJs1SZDRKsP4nLer0EymOis/XFFvl2riAxttgbVCCoQU23tkED1O2maKWCqGU4N64T          p3vKdmAJBNUFRtd6UolKS9yUMwh4wQFoYfw8T02ZJqiR7U60ow+Xcbe0gcKkWs8FsLZYO7m8cKef4hnLL+oFsx3IQtNFt+wYaSvkQL2nODba          0bqXSkBfnIA/pSnXbJ9F0dc7FN75FYo6bJqxQTJMPbdIsE2RqVmi7a2IKhU1XLWbhyGJd7ro6c5ClTKu7/nLUAQcc9ad7WpXKwhx1Yl4dq8b          zlJpsry/dE/GyXFkmodtVl50Vk+xtJW4r0TC2ZNJV6HrqaOt62mh7zPMzDtfAGHE803j/F3hgObLNSqRJAAAAJXRFWHRkYXRlOmNyZWF0ZQA          yMDE2LTA5LTE3VDE1OjE5OjIyKzA4OjAwASEzcAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0wOS0wNFQyMjoxODozMiswODowMLfhS54AAAB          NdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDcuMC4xLTYgUTE2IHg4Nl82NCAyMDE2LTA5LTE3IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3J          n3dmlTgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQANTEyj41TgQAAABd          0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAA1MTIcfAPcAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI          6Ok1UaW1lADEzNzgzMDQzMTKNF3afAAAAEnRFWHRUaHVtYjo6U2l6ZQAzMy40S0K9TyGvAAAAX3RFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9          tZS93d3dyb290L3NpdGUvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL3NyYy8xMTI1Ny8xMTI1NzU3LnBuZ9riv0oAAAA          ASUVORK5CYII=\");\n        }\n        #nong-drive-anytime-dialog{\n          position:fixed;\n          left:8%;\n          top:10%;\n          z-index:69699;\n          background-color:white;\n        }\n        #nong-table-wrapper {\n          overflow-x: hidden;\n          overflow-y: auto;\n          position: relative;\n          max-height: 30em;\n        }\n        #nong-drive-anytime-icon:hover{\n          animation-name: steer;\n          animation-duration: 2s;\n          animation-iteration-count: 1;\n        }\n        @keyframes steer {\n          0% {\n            box-shadow: 0 0 0px 0px #000;\n          }\n          25% {\n            box-shadow: 0 0 5px 2px #000;\n          }\n          50% {\n            box-shadow: 0 0 10px 2px #000;\n          }\n          75% {\n            box-shadow: 0 0 5px 2px #000;\n          }\n          100%{\n            box-shadow: 0 0 0px 0px #000;\n          }\n        }\n      ");
    }
  },
  selection: "",
  add_small_icon: function add_small_icon() {
    var icon = document.createElement("div");
    icon.setAttribute("id", "nong-drive-anytime-icon");
    icon.addEventListener("mouseover", function (e) {
      var text = unsafeWindow.getSelection().toString();
      console.info("选中的文本:", text);
      i_am_old_driver.selection = text;
    });
    icon.addEventListener("click", function (e) {
      i_am_old_driver.display_dialog();
    });
    document.body.appendChild(icon);
  },
  display_dialog: function display_dialog() {
    var dialog = document.createElement("div");
    dialog.setAttribute("id", "nong-drive-anytime-dialog");
    dialog.addEventListener("click", function (event) {
      event.stopPropagation();
    });
    var vid_input = document.createElement("input");
    vid_input.value = this.selection;
    dialog.appendChild(vid_input);
    //TODO confirm btn;
    var occupation = document.createElement("div");
    occupation.setAttribute("id", "nong-occupation");
    occupation.setAttribute("style", "dispay:none");
    dialog.appendChild(occupation);
    document.body.appendChild(dialog);
    if (this.selection) {
      display_table(this.selection, function (tab) {
        var outer_table = document.createElement("table");
        outer_table.appendChild(document.createElement("tr"));
        outer_table.lastChild.appendChild(document.createElement("th"));
        outer_table.appendChild(document.createElement("tr"));
        outer_table.lastChild.appendChild(document.createElement("td"));
        var wrapper = document.createElement("div");
        wrapper.id = "nong-table-wrapper";
        wrapper.appendChild(tab);
        outer_table.querySelector("td").appendChild(wrapper);
        document.querySelector("#nong-drive-anytime-dialog").appendChild(outer_table);
      });
    } else {
      //TODO
    }
  }
};
var main = {
  baidu: {
    type: 1,
    re: /pan\.baidu\.com\/disk\/home/,
    fill_form: function fill_form(magnet) {
      document.querySelector(".g-button[data-button-id=b13]").click();
      setTimeout(function () {
        document.querySelector("#_disk_id_2").click();
        setTimeout(function () {
          document.querySelector("#share-offline-link").value = magnet;
          document.querySelector(".g-button[data-button-id=b65]").click();
        }, 500);
      }, 1500);
    }
  },
  115: {
    type: 1,
    re: /115\.com\/\?tab\=offline\&mode\=wangpan/,
    fill_form: function fill_form(link) {
      var rsc = setInterval(function () {
        if (document.readyState == "complete") {
          clearInterval(rsc);
          setTimeout(function () {
            Core["OFFL5Plug"].OpenLink();
            setTimeout(function () {
              $("#js_offline_new_add").val(link);
            }, 300);
          }, 1000);
        }
      }, 400);
    }
  },
  furk: {
    type: 1,
    re: /www\.furk\.net\/users\/files\/add/,
    fill_form: function fill_form(link) {
      setTimeout(function () {
        $("#url").val(link.replace("magnet:?xt=urn:btih:", ""));
      }, 1500);
    }
  }
};

var offline_sites = {
  baidu: {
    url: "http://pan.baidu.com/disk/home",
    name: "百度云",
    enable: true
  },
  115: {
    name: "115离线",
    url: "http://115.com/?tab=offline&mode=wangpan",
    enable: true
  },
  letv: {
    name: "乐视云",
    url: "http://cloud.letv.com/webdisk/home/index",
    enable: false
  },
  360: {
    name: "360云",
    url: "http://yunpan.360.cn/my/",
    enable: false
  },
  uc: {
    name: "UC离线",
    url: "http://disk.yun.uc.cn/",
    enable: false
  },
  furk: {
    name: "Furk",
    url: "https://www.furk.net/users/files/add",
    enable: true
  }
};
var common = {
  add_style: function add_style() {
    GM_addStyle(["#nong-table{border-collapse: initial !important;background-color: white !important;text-align: center !important;margin:10px auto;color:#666 !important;font-size:13px;text-align:center !important;border: 1px solid #cfcfcf !important;border-radius: 10px !important;}", "#nong-table a {margin-right: 5px !important;color:blue}", "#nong-table a:hover {color:#d20f00 !important;}", "#nong-table th,#nong-table td{text-align: inherit !important;height:30px;padding:0 1em 0 !important;}", ".nong-row{text-align: inherit !important;height:30px;padding:0 1em 0 !important;border: 1px solid #EFEFEF !important;}", ".nong-row:hover{background-color: #dae8ff !important;}", ".nong-offline-download{color: rgb(0, 180, 30) !important;}", ".nong-offline-download:hover{color:red !important;}"].join(""));
  },
  handle_copy_event: function handle_copy_event(event) {
    event.target.innerHTML = "成功";
    GM_setClipboard(event.target.href);
    setTimeout(function () {
      event.target.innerHTML = "复制";
    }, 1000);
    event.preventDefault(); //阻止跳转
  },
  handle_dl_event: function handle_dl_event(event) {
    var mag = event.target.parentElement.parentElement.parentElement.getAttribute("mag");
    GM_setValue("magnet", mag);
  },
  handle_close_event: function handle_close_event(event) {
    var dialog = document.querySelector("#nong-drive-anytime-dialog");
    if (dialog) {
      dialog.parentElement.removeChild(dialog);
    }
    this.removeEventListener("click", common.handle_close_event);
  },

  reg_event: function reg_event() {

    var selector_event_map = [{
      selector: ".nong-copy",
      type: "click",
      fn: this.handle_copy_event
    }, {
      selector: ".nong-offline-download",
      type: "click",
      fn: this.handle_dl_event
    }];

    selector_event_map.push({ selector: "body", type: "click", fn: this.handle_close_event });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = selector_event_map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var obj = _step.value;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = document.querySelectorAll(obj.selector)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var elem = _step2.value;

            //console.log(elem, obj.type, obj.fn);
            elem.addEventListener(obj.type, obj.fn);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  parsetext: function parsetext(text) {
    var doc = null;
    try {
      doc = document.implementation.createHTMLDocument("");
      doc.documentElement.innerHTML = text;
      return doc;
    } catch (e) {
      alert("parse error");
    }
  }
};

var magnet_table = {
  template: {
    create_head: function create_head(src) {
      var a = document.createElement("tr");
      a.className = "nong-row";
      a.id = "nong-head";
      var head_str = ["大小", "操作", "离线下载"];
      var th_list = [document.createElement("th"), document.createElement("th"), document.createElement("th"), document.createElement("th")];

      var select_box = document.createElement("select");
      var option_str = my_search.search_name_string;
      //console.log("get", GM_getValue("search_index"));
      var index = GM_getValue("search_index", 0);
      var op_value = 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = option_str[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var str = _step3.value;

          var op = document.createElement("option");
          op.value = op_value;
          op.textContent = str;
          if (index == op_value) {
            op.setAttribute("selected", "selected");
          }
          op_value++;
          select_box.appendChild(op);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      select_box.addEventListener("change", function (e) {
        GM_setValue("search_index", this.value);
        var table = document.querySelector("#nong-table");
        table.parentElement.removeChild(table);
        run();
      });
      th_list[0].appendChild(select_box);

      th_list[1].appendChild(document.createElement("a"));
      th_list[1].lastChild.setAttribute("href", src);
      th_list[1].lastChild.setAttribute("target", "_blank");
      th_list[1].lastChild.textContent = head_str[0];

      th_list[2].appendChild(document.createElement("a"));
      th_list[2].lastChild.textContent = head_str[1];

      th_list[3].appendChild(document.createElement("a"));
      th_list[3].lastChild.textContent = head_str[2];

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = th_list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var th = _step4.value;

          a.appendChild(th);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return a;
    },
    create_row: function create_row(data) {
      var tr = document.createElement("tr");
      tr.className = "nong-row";
      tr.setAttribute("mag", data.mag);
      var td = document.createElement("td");
      var _arr = [this.create_info(data.title, data.mag), this.create_size(data.size, data.src), this.create_operation(data.mag), this.create_offline()];
      for (var _i = 0; _i < _arr.length; _i++) {
        var elem = _arr[_i];
        var c = td.cloneNode(true);
        c.appendChild(elem);
        tr.appendChild(c);
      }
      return tr;
    },
    create_row_for_sukebei: function create_row_for_sukebei(data) {
      var tr = document.createElement("tr");
      tr.className = "nong-row";
      tr.setAttribute("mag", data.mag);
      var td = document.createElement("td");
      var append_elems = [function (title, src, self) {
        return self.create_info(title, src);
      }(data.title, data.src, this), function (size, src, self) {
        return self.create_size(size, src);
      }(data.size, data.src, this), function (torrent_url, self) {
        var operate = self.create_operation(torrent_url);
        operate.firstChild.textContent = "种子";
        operate.firstChild.setAttribute("class", "nong-copy-sukebei");
        operate.firstChild.setAttribute("target", "_blank");
        return operate;
      }(data.torrent_url, this), function (self) {
        var div = document.createElement("div");
        div.textContent = "暂不支持离线下载";
        return div;
      }(this)];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = append_elems[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var elem = _step5.value;

          var c = td.cloneNode(true);
          c.appendChild(elem);
          tr.appendChild(c);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return tr;
    },
    create_info: function create_info(title, mag) {
      var a = this.info.cloneNode(true);
      a.firstChild.textContent = title.length < max_title_length ? title : title.substr(0, max_title_length) + "...";
      a.firstChild.href = mag;
      a.title = title;
      return a;
    },
    create_size: function create_size(size, src) {
      var a = this.size.cloneNode(true);
      a.textContent = size;
      a.href = src;
      return a;
    },
    create_operation: function create_operation(mag) {
      var a = this.operation.cloneNode(true);
      a.firstChild.href = mag;
      return a;
    },
    create_offline: function create_offline() {
      var a = this.offline.cloneNode(true);
      a.className = "nong-offline";
      return a;
    },

    info: function () {
      var a = document.createElement("div");
      var b = document.createElement("a");
      b.textContent = "name";
      b.href = "src";
      b.target = "_blank";
      a.appendChild(b);
      return a;
    }(),
    size: function () {
      var a = document.createElement("a");
      a.textContent = "size";
      return a;
    }(),
    operation: function () {
      var a = document.createElement("div");
      var copy = document.createElement("a");
      copy.className = "nong-copy";
      copy.textContent = "复制";
      a.appendChild(copy);
      return a;
    }(),
    offline: function () {
      var a = document.createElement("div");
      var b = document.createElement("a");
      b.className = "nong-offline-download";
      b.target = "_blank";
      for (var k in offline_sites) {
        if (offline_sites[k].enable) {
          var c = b.cloneNode(true);
          c.href = offline_sites[k].url;
          c.textContent = offline_sites[k].name;
          a.appendChild(c);
        }
      }
      return a;
    }()
  },

  generate: function generate(src, data) {
    var tab = document.createElement("table");
    tab.id = "nong-table";
    tab.appendChild(this.template.create_head(src));
    //console.log(src);
    //console.log(data);
    if (src.match("sukebei.nyaa.se")) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = data[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var d = _step6.value;

          tab.appendChild(this.template.create_row_for_sukebei(d));
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    } else {
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = data[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _d = _step7.value;

          tab.appendChild(this.template.create_row(_d));
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    }
    return tab;
  }

};
var my_search = {
  current: function current(kw, cb) {
    var search = my_search[GM_getValue("search_index", 0)];
    try {
      return search(kw, cb);
    } catch (e) {
      this.search_error();
    }
  },
  search_error: function search_error(r) {
    alert("搜索出现错误，请检查网络");
  },
  search_name_string: ["btso", "btdb", "sukebei.nyaa", "btkitty"],
  0: function _(kw, cb) {
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://btso.pw/search/" + kw,
      onload: function onload(result) {
        var doc = common.parsetext(result.responseText);
        var data = [];
        var t = doc.getElementsByClassName("data-list")[0];
        if (t) {
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = t.getElementsByTagName("a")[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var elem = _step8.value;

              if (!elem.className.match("btn")) {
                data.push({
                  "title": elem.title,
                  "mag": "magnet:?xt=urn:btih:" + elem.outerHTML.replace(/.*hash\//, "").replace(/" .*\n.*\n.*\n.*/, ""),
                  "size": elem.nextElementSibling.textContent,
                  "src": elem.href
                });
              }
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        } else {
          data.push({
            "title": "没有找到磁链接",
            "mag": "",
            "size": "0",
            "src": result.finalUrl
          });
        }
        cb(result.finalUrl, data);
      },
      onerror: function onerror(e) {
        console.error(e);
        throw "search error";
      }
    });
  },
  1: function _(kw, cb) {
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://btdb.in/q/" + kw + "/",
      onload: function onload(result) {
        var doc = common.parsetext(result.responseText);
        var data = [];
        var t = doc.getElementsByClassName("item-title");
        if (t) {
          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (var _iterator9 = t[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
              var elem = _step9.value;

              data.push({
                "title": elem.firstChild.title,
                "mag": elem.nextElementSibling.firstElementChild.href,
                "size": elem.nextElementSibling.children[1].textContent,
                "src": "https://btdb.in" + elem.firstChild.getAttribute("href")
              });
            }
          } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion9 && _iterator9.return) {
                _iterator9.return();
              }
            } finally {
              if (_didIteratorError9) {
                throw _iteratorError9;
              }
            }
          }
        } else {
          data.push({
            "title": "没有找到磁链接",
            "mag": "",
            "size": "0",
            "src": result.finalUrl
          });
        }

        cb(result.finalUrl, data);
      },
      onerror: function onerror(e) {
        console.error(e);
        throw "search error";
      }
    });
  },
  2: function _(kw, cb) {
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://sukebei.nyaa.se/?page=search&cats=0_0&filter=0&term=" + kw,
      onload: function onload(result) {
        var doc = common.parsetext(result.responseText);
        var data = [];
        var t = doc.getElementsByClassName("tlistrow");
        if (t) {
          var _iteratorNormalCompletion10 = true;
          var _didIteratorError10 = false;
          var _iteratorError10 = undefined;

          try {
            for (var _iterator10 = t[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
              var elem = _step10.value;

              data.push({
                "title": elem.querySelector(".tlistname a").textContent,
                "mag": "",
                "torrent_url": "https:" + elem.querySelector(".tlistdownload a").getAttribute("href"),
                "size": elem.querySelector(".tlistsize").textContent,
                "src": "https:" + elem.querySelector(".tlistname a").getAttribute("href")
              });
            }
          } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion10 && _iterator10.return) {
                _iterator10.return();
              }
            } finally {
              if (_didIteratorError10) {
                throw _iteratorError10;
              }
            }
          }
        } else {
          data.push({
            "title": "没有找到磁链接",
            "mag": "",
            "torrent_url": "",
            "size": "0",
            "src": result.finalUrl
          });
        }

        cb(result.finalUrl, data);
      },
      onerror: function onerror(e) {
        console.error(e);
        throw "search error";
      }
    });
  },
  3: function _(kw, cb) {
    GM_xmlhttpRequest({
      method: "POST",
      url: "http://btkitty.bid/",
      data: "keyword=" + kw,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      onload: function onload(result) {
        var doc = common.parsetext(result.responseText);
        var data = [];
        var t = doc.getElementsByClassName("list-con");
        if (t) {
          var _iteratorNormalCompletion11 = true;
          var _didIteratorError11 = false;
          var _iteratorError11 = undefined;

          try {
            for (var _iterator11 = t[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
              var elem = _step11.value;

              data.push({
                "title": elem.querySelector("dt a").textContent,
                "mag": elem.querySelector("dd a").href,
                "size": elem.querySelector(".option span:nth-child(3) b").textContent,
                "src": elem.querySelector("dt a").href
              });
            }
          } catch (err) {
            _didIteratorError11 = true;
            _iteratorError11 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion11 && _iterator11.return) {
                _iterator11.return();
              }
            } finally {
              if (_didIteratorError11) {
                throw _iteratorError11;
              }
            }
          }
        } else {
          data.push({
            "title": "没有找到磁链接",
            "mag": "",
            "size": "0",
            "src": result.finalUrl
          });
        }
        cb(result.finalUrl, data);
      },
      onerror: function onerror(e) {
        console.error(e);
        throw "search error";
      }
    });
  }

};
var display_table = function display_table(vid, insert_where) {
  common.add_style();
  my_search.current(vid, function (data, src) {

    var tab = magnet_table.generate(data, src);
    if (typeof insert_where === "string") {
      var elem = document.querySelector(insert_where);
      //console.log("display_table", tab, elem);
      if (elem) {
        elem.parentElement.insertBefore(tab, elem);
      }
    } else if (typeof insert_where === "function") {
      insert_where(tab);
    } else {
      console.error("插入表格错误");
    }

    common.reg_event();
  });
};

var dl_mode = function dl_mode(v) {
  var mag = GM_getValue("magnet", "");
  if (mag) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.innerHTML = "(" + v.fill_form.toString() + ")(\"" + mag + "\")";
    document.body.appendChild(script);
  }
  GM_getValue("magnet", "");
};

var run = function run() {
  max_title_length = GM_getValue("max_title_length", 60);
  var main_keys = Object.keys(main);
  for (var i = 0; i < main_keys.length; i++) {
    var v = main[main_keys[i]];
    if (v.re && v.re.test(location.href)) {
      if (v.type == 1) {
        dl_mode(v);
      }
      break;
    }
  }
};

var max_title_length = GM_getValue("max_title_length", 40);
var set_max_title_length = function set_max_title_length() {
  var len = prompt("请输入你想要的标题长度", GM_getValue("max_title_length", 40));
  if (len !== null && len !== "") {
    GM_setValue("max_title_length", len);
    var table = document.querySelector("#nong-table");
    table.parentElement.removeChild(table);
    run();
  }
};

GM_registerMenuCommand("挊随时开车-标题长度", set_max_title_length);
run();

if (window === window.top) {
  i_am_old_driver.start();
}