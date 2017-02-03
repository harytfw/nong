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

let i_am_old_driver = {
  start: function () {
    this.add_css();
    this.add_small_icon();
  },
  add_css: function () {
    if (!unsafeWindow.nong_has_add_css) {
      unsafeWindow.nong_has_add_css = true;
      GM_addStyle(`
        #nong-drive-anytime-icon{
          position:fixed;
          z-index:6969;
          color: white;
          border-radius: 32px;
          width: 32px;
          height: 32px;
          left: 10px;
          bottom: 15px;
          text-align: center;
          line-height: 32px;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/x\
          hBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAjbsAAI27AZ11gYA\
          AAAAHdElNRQfdCQQWEiC7N9+uAAADmUlEQVRIx5XVb0gVZhQG8N+93lvmlkZQVhO5hK6GfyIoglpGkLAlbMEg1oe2VuuPwnDZWgV9G2NrtTT\
          tg4UsttX60mBFtjUFaaQSFKuu1dhQr+XKdKTFtmKl7kNOvWqNzrf3fZ/3vOc873nOCRhtCXIts0SONEH0aRd1Ro2o3pHgwIh10CJr5et1SYs\
          WDxE2U4YcQbW+UK/PEy1dhU6NimUIICAkNPBQhmKNOpVLe1IES+w1yW5H3RWx1DwRKejR5rw6MSlW2eoPJepHOyhQ6RebNcmxUYFEv/rNbaT\
          KNMt91So1yVYqU5FT8cEvccO3UoUViYnaJkfS4GmSXNtcFVMkLNVx1+XF535BjVSJyt2xKz7LYai9upVLNE2dC9KHmC/XLFtYuZvWCD6R5KB\
          1bikXNkeriv+Qi3XahCJ3rPF/tl63Qryny+LHZXNIoxQ5YnaNen2ccaOiKBWTJVmjQxKYq10x9osOyz1BthJVfvC9KlvkDtQDpGlShmLt5gY\
          t06taRIHD2sEEr/jKKe963iWXPWedat94zUTQ7ojXRVTrtYyTTgh4x01ZwjJt8KMO1VZJlWK++VJMtdIxv/vJFlnGy3bTagEnnKRNGSr0OKx\
          Wq2ZV8k1AjtM6dDgtG2ELlbnmhjOO6PEZyrSFpGkRENHpvnoHndeqH8n2SLQaO+2x0j0NGrxggWxpurwkoEUa/QqFnPXxCLYX6JAP8nVYMOL\
          0oHohhfqHvq3/qb8/UvaD6JA+YY/0eNGsQdhDXa64aCfY6aKoZFOEB69P1u2RsL6QdjPRYoN5w/x3qbTDJ77GRTusUGT6sAhmKMdM7SFRGQJ\
          +9o/drkhAv/GW+9Rmb8gWELXC5475yAMB9Mqyy2UBGaJs1SZDRKsP4nLer0EymOis/XFFvl2riAxttgbVCCoQU23tkED1O2maKWCqGU4N64T\
          p3vKdmAJBNUFRtd6UolKS9yUMwh4wQFoYfw8T02ZJqiR7U60ow+Xcbe0gcKkWs8FsLZYO7m8cKef4hnLL+oFsx3IQtNFt+wYaSvkQL2nODba\
          0bqXSkBfnIA/pSnXbJ9F0dc7FN75FYo6bJqxQTJMPbdIsE2RqVmi7a2IKhU1XLWbhyGJd7ro6c5ClTKu7/nLUAQcc9ad7WpXKwhx1Yl4dq8b\
          zlJpsry/dE/GyXFkmodtVl50Vk+xtJW4r0TC2ZNJV6HrqaOt62mh7zPMzDtfAGHE803j/F3hgObLNSqRJAAAAJXRFWHRkYXRlOmNyZWF0ZQA\
          yMDE2LTA5LTE3VDE1OjE5OjIyKzA4OjAwASEzcAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0wOS0wNFQyMjoxODozMiswODowMLfhS54AAAB\
          NdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDcuMC4xLTYgUTE2IHg4Nl82NCAyMDE2LTA5LTE3IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3J\
          n3dmlTgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQANTEyj41TgQAAABd\
          0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAA1MTIcfAPcAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI\
          6Ok1UaW1lADEzNzgzMDQzMTKNF3afAAAAEnRFWHRUaHVtYjo6U2l6ZQAzMy40S0K9TyGvAAAAX3RFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9\
          tZS93d3dyb290L3NpdGUvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL3NyYy8xMTI1Ny8xMTI1NzU3LnBuZ9riv0oAAAA\
          ASUVORK5CYII=");
        }
        #nong-drive-anytime-dialog{
          position:fixed;
          left:8%;
          top:10%;
          z-index:69699;
          background-color:white;
        }
        #nong-table-wrapper {
          overflow-x: hidden;
          overflow-y: auto;
          position: relative;
          max-height: 30em;
        }
        #nong-drive-anytime-icon:hover{
          animation-name: steer;
          animation-duration: 2s;
          animation-iteration-count: 1;
        }
        @keyframes steer {
          0% {
            box-shadow: 0 0 0px 0px #000;
          }
          25% {
            box-shadow: 0 0 5px 2px #000;
          }
          50% {
            box-shadow: 0 0 10px 2px #000;
          }
          75% {
            box-shadow: 0 0 5px 2px #000;
          }
          100%{
            box-shadow: 0 0 0px 0px #000;
          }
        }
      `
      );
    }
  },
  selection: "",
  add_small_icon: function () {
    let icon = document.createElement("div");
    icon.setAttribute("id", "nong-drive-anytime-icon");
    icon.addEventListener("mouseover", (e)=> {
      let text = unsafeWindow.getSelection().toString();
      console.info("选中的文本:", text);
      this.selection = text;
    });
    icon.addEventListener("click", (e)=> {
      this.display_dialog();
    });
    document.body.appendChild(icon);
  },
  display_dialog: function () {
    let dialog = document.createElement("div");
    dialog.setAttribute("id", "nong-drive-anytime-dialog");
    dialog.addEventListener("click",(event)=> {
      event.stopPropagation();
    });
    let vid_input = document.createElement("input");
    vid_input.value = this.selection;
    dialog.appendChild(vid_input);
    //TODO confirm btn;
    let occupation = document.createElement("div");
    occupation.setAttribute("id", "nong-occupation");
    occupation.setAttribute("style", "dispay:none");
    dialog.appendChild(occupation);
    document.body.appendChild(dialog);
    if (this.selection) {
      display_table(this.selection, function (tab) {
        let outer_table = document.createElement("table");
        outer_table.appendChild(document.createElement("tr"));
        outer_table.lastChild.appendChild(document.createElement("th"));
        outer_table.appendChild(document.createElement("tr"));
        outer_table.lastChild.appendChild(document.createElement("td"));
        let wrapper = document.createElement("div");
        wrapper.id = "nong-table-wrapper";
        wrapper.appendChild(tab);
        outer_table.querySelector("td").appendChild(wrapper);
        document.querySelector("#nong-drive-anytime-dialog").appendChild(outer_table);

      });
    }
    else {
      //TODO
    }
  },
};
let main = {
  baidu: {
    type: 1,
    re: /pan\.baidu\.com\/disk\/home/,
    fill_form: function (magnet) {
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
    fill_form: function (link) {
      let rsc = setInterval(function () {
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
    fill_form: function (link) {
      setTimeout(function () {
        $("#url").val(link.replace("magnet:?xt=urn:btih:", ""));
      }, 1500);
    }
  }
};

let offline_sites = {
  baidu: {
    url: "http://pan.baidu.com/disk/home",
    name: "百度云",
    enable: true
  },
  115: {
    name: "115离线",
    url: "http://115.com/?tab=offline&mode=wangpan",
    enable: true,
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
  },
};
let common = {
  add_style: function () {
    GM_addStyle([
      "#nong-table{border-collapse: initial !important;background-color: white !important;text-align: center !important;margin:10px auto;color:#666 !important;font-size:13px;text-align:center !important;border: 1px solid #cfcfcf !important;border-radius: 10px !important;}",
      "#nong-table a {margin-right: 5px !important;color:blue}",
      "#nong-table a:hover {color:#d20f00 !important;}",
      "#nong-table th,#nong-table td{text-align: inherit !important;height:30px;padding:0 1em 0 !important;}",
      ".nong-row{text-align: inherit !important;height:30px;padding:0 1em 0 !important;border: 1px solid #EFEFEF !important;}",
      ".nong-row:hover{background-color: #dae8ff !important;}",
      ".nong-offline-download{color: rgb(0, 180, 30) !important;}",
      ".nong-offline-download:hover{color:red !important;}",
    ].join(""));
  },
  handle_copy_event: function (event) {
    event.target.innerHTML = "成功";
    GM_setClipboard(event.target.href);
    setTimeout(function () {
      event.target.innerHTML = "复制";
    }, 1000);
    event.preventDefault(); //阻止跳转
  },
  handle_dl_event: function (event) {
    let mag = event.target.parentElement.parentElement.parentElement.getAttribute("mag");
    GM_setValue("magnet", mag);
  },
  handle_close_event: function (event) {
    let dialog = document.querySelector("#nong-drive-anytime-dialog");
    if (dialog) {
      dialog.parentElement.removeChild(dialog);
    }
    this.removeEventListener("click", common.handle_close_event);
  },

  reg_event: function () {

    let selector_event_map = [{
      selector: ".nong-copy",
      type: "click",
      fn: this.handle_copy_event
    }, {
      selector: ".nong-offline-download",
      type: "click",
      fn: this.handle_dl_event
    }];

    selector_event_map.push({ selector: "body", type: "click", fn: this.handle_close_event })
    for (let obj of selector_event_map) {
      for (let elem of document.querySelectorAll(obj.selector)) {
        //console.log(elem, obj.type, obj.fn);
        elem.addEventListener(obj.type, obj.fn);
      }
    }
  },
  parsetext: function (text) {
    let doc = null;
    try {
      doc = document.implementation.createHTMLDocument("");
      doc.documentElement.innerHTML = text;
      return doc;
    }
    catch (e) {
      alert("parse error");
    }
  },
};


let magnet_table = {
  template: {
    create_head: function (src) {
      let a = document.createElement("tr");
      a.className = "nong-row";
      a.id = "nong-head";
      let head_str = [
        "大小",
        "操作",
        "离线下载"
      ];
      let th_list = [document.createElement("th"), document.createElement("th"), document.createElement("th"), document.createElement("th")];

      let select_box = document.createElement("select");
      let option_str = my_search.search_name_string;
      //console.log("get", GM_getValue("search_index"));
      let index = GM_getValue("search_index", 0);
      let op_value = 0;
      for (let str of option_str) {
        let op = document.createElement("option");
        op.value = op_value;
        op.textContent = str;
        if (index == op_value) {
          op.setAttribute("selected", "selected");
        }
        op_value++;
        select_box.appendChild(op);
      }
      select_box.addEventListener("change", function (e) {
        GM_setValue("search_index", this.value);
        let table = document.querySelector("#nong-table");
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

      for (let th of th_list) {
        a.appendChild(th);
      }
      return a;
    },
    create_row: function (data) {
      let tr = document.createElement("tr");
      tr.className = "nong-row";
      tr.setAttribute("mag", data.mag);
      let td = document.createElement("td");
      for (let elem of [this.create_info(data.title, data.mag), this.create_size(data.size, data.src), this.create_operation(data.mag), this.create_offline()]) {
        let c = td.cloneNode(true);
        c.appendChild(elem);
        tr.appendChild(c);
      }
      return tr;
    },
    create_row_for_sukebei: function (data) {
      let tr = document.createElement("tr");
      tr.className = "nong-row";
      tr.setAttribute("mag", data.mag);
      let td = document.createElement("td");
      let append_elems = [
        this.create_info(data.title,  data.src),
        this.create_size(data.size, data.src),
        ((torrent_url = data.torrent_url)=> {
          let operate = this.create_operation(torrent_url);
          operate.firstChild.textContent = "种子";
          operate.firstChild.setAttribute("class", "nong-copy-sukebei");
          operate.firstChild.setAttribute("target", "_blank");
          return operate;
        })(),
        (()=> {
          let div = document.createElement("div");
          div.textContent = "暂不支持离线下载";
          return div;
        })()];
      for (let elem of append_elems) {
        let c = td.cloneNode(true);
        c.appendChild(elem);
        tr.appendChild(c);
      }
      return tr;
    },
    create_info: function (title, mag) {
      let a = this.info.cloneNode(true);
      a.firstChild.textContent = title.length < max_title_length ? title : title.substr(0, max_title_length) + "...";
      a.firstChild.href = mag;
      a.title = title;
      return a;
    },
    create_size: function (size, src) {
      let a = this.size.cloneNode(true);
      a.textContent = size;
      a.href = src;
      return a;
    },
    create_operation: function (mag) {
      let a = this.operation.cloneNode(true);
      a.firstChild.href = mag;
      return a;
    },
    create_offline: function () {
      let a = this.offline.cloneNode(true);
      a.className = "nong-offline";
      return a;
    },

    info: (function () {
      let a = document.createElement("div");
      let b = document.createElement("a");
      b.textContent = "name";
      b.href = "src";
      b.target = "_blank";
      a.appendChild(b);
      return a;
    })(),
    size: function () {
      let a = document.createElement("a");
      a.textContent = "size";
      return a;
    } (),
    operation: (function () {
      let a = document.createElement("div");
      let copy = document.createElement("a");
      copy.className = "nong-copy";
      copy.textContent = "复制";
      a.appendChild(copy);
      return a;
    })(),
    offline: (function () {
      let a = document.createElement("div");
      let b = document.createElement("a");
      b.className = "nong-offline-download";
      b.target = "_blank";
      for (let k in offline_sites) {
        if (offline_sites[k].enable) {
          let c = b.cloneNode(true);
          c.href = offline_sites[k].url;
          c.textContent = offline_sites[k].name;
          a.appendChild(c);
        }
      }
      return a;
    })(),
  },

  generate: function (src, data) {
    let tab = document.createElement("table");
    tab.id = "nong-table";
    tab.appendChild(this.template.create_head(src));
    //console.log(src);
    //console.log(data);
    if (src.match("sukebei.nyaa.se")) {
      for (let d of data) {
        tab.appendChild(this.template.create_row_for_sukebei(d));
      }
    }
    else {
      for (let d of data) {
        tab.appendChild(this.template.create_row(d));
      }
    }
    return tab;
  },

};
let my_search = {
  current: function (kw, cb) {
    let search = my_search[GM_getValue("search_index", 0)];
    try {
      return search(kw, cb);
    }
    catch (e) {
      this.search_error();
    }
  },
  search_error: function (r) {
    alert("搜索出现错误，请检查网络");
  },
  search_name_string: ["btso", "btdb", "sukebei.nyaa", "btkitty"],
  0: function (kw, cb) {
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://btso.pw/search/" + kw,
      onload: function (result) {
        let doc = common.parsetext(result.responseText);
        let data = [];
        let t = doc.getElementsByClassName("data-list")[0];
        if (t) {
          for (let elem of t.getElementsByTagName("a")) {
            if (!elem.className.match("btn")) {
              data.push({
                "title": elem.title,
                "mag": "magnet:?xt=urn:btih:" + elem.outerHTML.replace(/.*hash\//, "").replace(/" .*\n.*\n.*\n.*/, ""),
                "size": elem.nextElementSibling.textContent,
                "src": elem.href,
              });
            }
          }
        }
        else {
          data.push({
            "title": "没有找到磁链接",
            "mag": "",
            "size": "0",
            "src": result.finalUrl,
          });
        }
        cb(result.finalUrl, data);
      },
      onerror: function (e) {
        console.error(e);
        throw "search error";
      }
    });
  },
  1: function (kw, cb) {
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://btdb.in/q/" + kw + "/",
      onload: function (result) {
        let doc = common.parsetext(result.responseText);
        let data = [];
        let t = doc.getElementsByClassName("item-title");
        if (t) {
          for (let elem of t) {
            data.push({
              "title": elem.firstChild.title,
              "mag": elem.nextElementSibling.firstElementChild.href,
              "size": elem.nextElementSibling.children[1].textContent,
              "src": "https://btdb.in" + elem.firstChild.getAttribute("href"),
            });
          }
        }
        else {
          data.push({
            "title": "没有找到磁链接",
            "mag": "",
            "size": "0",
            "src": result.finalUrl,
          });
        }

        cb(result.finalUrl, data);
      },
      onerror: function (e) {
        console.error(e);
        throw "search error";
      }
    });
  },
  2: function (kw, cb) {
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://sukebei.nyaa.se/?page=search&cats=0_0&filter=0&term=" + kw,
      onload: function (result) {
        let doc = common.parsetext(result.responseText);
        let data = [];
        let t = doc.getElementsByClassName("tlistrow");
        if (t) {
          for (let elem of t) {
            data.push({
              "title": elem.querySelector(".tlistname a").textContent,
              "mag": "",
              "torrent_url": "https:" + elem.querySelector(".tlistdownload a").getAttribute("href"),
              "size": elem.querySelector(".tlistsize").textContent,
              "src": "https:" + elem.querySelector(".tlistname a").getAttribute("href"),
            });
          }
        }
        else {
          data.push({
            "title": "没有找到磁链接",
            "mag": "",
            "torrent_url": "",
            "size": "0",
            "src": result.finalUrl,
          });
        }

        cb(result.finalUrl, data);
      },
      onerror: function (e) {
        console.error(e);
        throw "search error";
      }
    });
  },
  3: function (kw, cb) {
    GM_xmlhttpRequest({
      method: "POST",
      url: "http://btkitty.bid/",
      data: "keyword=" + kw,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      onload: function (result) {
        let doc = common.parsetext(result.responseText);
        let data = [];
        let t = doc.getElementsByClassName("list-con");
        if (t) {
          for (let elem of t) {
            data.push({
              "title": elem.querySelector("dt a").textContent,
              "mag": elem.querySelector("dd a").href,
              "size": elem.querySelector(".option span:nth-child(3) b").textContent,
              "src": elem.querySelector("dt a").href,
            });
          }
        }
        else {
          data.push({
            "title": "没有找到磁链接",
            "mag": "",
            "size": "0",
            "src": result.finalUrl,
          });
        }
        cb(result.finalUrl, data);
      },
      onerror: function (e) {
        console.error(e);
        throw "search error";
      }
    })
  },

};
let display_table = function (vid, insert_where) {
  common.add_style();
  my_search.current(vid, function (data, src) {

    let tab = magnet_table.generate(data, src);
    if (typeof insert_where === "string") {
      let elem = document.querySelector(insert_where);
      //console.log("display_table", tab, elem);
      if (elem) {
        elem.parentElement.insertBefore(tab, elem);
      }
    }
    else if (typeof insert_where === "function") {
      insert_where(tab);
    }
    else {
      console.error("插入表格错误");
    }

    common.reg_event();

  });
};


let dl_mode = function (v) {
  let mag = GM_getValue("magnet", "");
  if (mag) {
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.innerHTML = "(" + v.fill_form.toString() + ")(\"" + mag + "\")";
    document.body.appendChild(script);
  }
  GM_getValue("magnet", "");
};

let run = function () {
  max_title_length = GM_getValue("max_title_length", 60);
  let main_keys = Object.keys(main);
  for (let i = 0; i < main_keys.length; i++) {
    let v = main[main_keys[i]];
    if (v.re && v.re.test(location.href)) {
      if (v.type == 1) {
        dl_mode(v);
      }
      break;
    }
  }
};

let max_title_length = GM_getValue("max_title_length", 40);
let set_max_title_length = function () {
  let len = prompt("请输入你想要的标题长度", GM_getValue("max_title_length", 40));
  if (len !== null && len !== "") {
    GM_setValue("max_title_length", len);
    let table = document.querySelector("#nong-table");
    table.parentElement.removeChild(table);
    run();
  }
};

GM_registerMenuCommand("挊随时开车-标题长度", set_max_title_length);
run();

if (window === window.top) {
  i_am_old_driver.start();
}