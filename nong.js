// ==UserScript==
// @name        挊
// @namespace   撸
// @description 自动获取磁链接并自动离线下载

// @include     http*://avmo.pw/*
// @include     http*://avso.pw/*
// @include     http*://avxo.pw/*

// @include     http*://*javlibrary.com/*
// @include     http*://*5avlib.com/*
// @include     http*://*look4lib.com/*
// @include     http*://*javlib3.com/*
// @include     http*://*javli6.com/*
// @include     http*://*j8vlib.com/*
// @include     http*://*j9lib.com/*
// @include     http*://*javl10.com/*


// @include     http*://www.libredmm.com/products/*
// @include     http*://www.javbus.com/*
// @include     http*://www.javbus.me/*
// @include     http*://www.javbus2.com/*
// @include     http*://www.javbus3.com/*
// @include     http*://www.javbus5.com/*
// @include     http*://*j8vlib.com/*

// @include     http*://www.icpmp.com/fanhao/*.html

// @include     http*://avdb.la/movie/*
// @include     http*://www.141jav.com/view/*
// @include     http*://www.av4you.net/work/*.htm
// @include     http*://www.dmmy18.com/*

// @include     http*://pan.baidu.com/disk/home*
// @include     http*://115.com/?tab=offline&mode=wangpan
// @include     http*://cloud.letv.com/webdisk/home/index
// @include     http*://disk.yun.uc.cn/
// @include     http*://www.furk.net/users/files/add
// @include     *.yunpan.360.cn/my/
// @include     http://www.dmm.co.jp/digital/videoa/*
// @include     http://www.btcherry.org/*
// @include     https://btdigg.org/search*

// @version     1.39
// @run-at      document-end
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// ==/UserScript==
//www.minnano-av.com

let max_title_length = GM_getValue("max_title_length", 100);
let main = {
  //av信息查询 类
  jav: {
    type: 0,
    re: /(avmo|avso|avxo).*movie.*/,
    insert_where: "#movie-share",
    vid: function () {
      return $(".header")[0].nextElementSibling.innerHTML;
    }
  },
  javlibrary: {
    type: 0,
    re: /(javlibrary|javlib3|look4lib|5avlib|javli6|j8vlib|j9lib|javl10).*\?v=.*/,
    insert_where: "#video_favorite_edit",
    vid: function () {
      return $("#video_id")[0].getElementsByClassName("text")[0].innerHTML;
    }
  },
  javbus: {
    type: 0,
    re: /javbus/,
    insert_where: "#star-div",
    vid: function () {
      let a = $(".header")[0].nextElementSibling;
      return a ? a.textContent : "";
    }
  },
  fanhaoku: {
    type: 0,
    re: /icpmp/,
    insert_where: "div.mod_film:nth-child(8)",
    vid: function () {
      return document.querySelector(".title_inner").title;
    }
  },
  libredmm: {
    type: 0,
    re: /libredmm/,
    insert_where: ".container",
    vid: function () {
      return location.href.match(/products\/(.*)/)[1];
    }
  },
  dmm: {
    type: 0,
    re: /dmm\.co\.jp/,
    insert_where: ".lh4",
    vid: function () {
      let result = location.href.replace(/.*cid=/, "").replace(/\/\??.*/, "").match(/[^h_0-9].*/);
      return result[0] ? result[0].replace("00", "") : "";
    }
  },
  /*
  minnano: {
    type: 0,
    re: /minnano-av/,
    insert_where: "",
    vid: function () {
      let r = "";
      for (let elem of document.querySelectorAll(".t11")) {
        if (elem.textContent == "品番") {
          r = elem.nextElementSibling.textContent;
          break;
        }
      }
      return r;
    },
    proc: function (tab) {
      let tmp = (function () {
        for (let a of document.querySelectorAll("table")) {
          if (a.bgColor == "#EEEEEE") {
            return a;
          }
        }
      })();
      insert_after(tmp);
    }
  },
  oisinbosoft: {
    type: 0,
    re: /oisinbosoft/,
    insert_where: "#detail_info",
    vid: function () {
      let r = location.pathname.replace(/.*\/+/, "").replace(".html", "");
      return r.indexOf("-") == r.lastIndexOf("-") ? r : r.replace(/\w*-?/, "");
    }
  },

  avdb: {
    type: 0,
    re: /avdb\.la/,
    insert_where: "#downs",
    vid: function () {
      return $(".info")[0].firstElementChild.innerHTML.replace(/<.*>/, "").trim();
    },
    proc: function (tab) {
      insert_after($("#downs")[0].previousElementSibling);
    }
  },
  */

  //网盘下载 类
  //这些 $ 是真正的 jquery
  baidu: {
    type: 1,
    re: /pan\.baidu\.com/,
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
    re: /115\.com/,
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
  letv: {
    type: 1,
    re: /cloud\.letv\.com/,
    fill_form: function (link) {
      setTimeout(function () {
        $("#offline-btn").click();
        setTimeout(function () {
          $("#offline_clear_complete").prev().click();
          setTimeout(function () {
            $("#offline-add-link").val(link);
          }, 500);
        }, 1000);
      }, 2000);
    }
  },
  furk: {
    type: 1,
    re: /www\.furk\.net/,
    fill_form: function (link) {
      setTimeout(function () {
        $("#url").val(link.replace("magnet:?xt=urn:btih:", ""));
      }, 1500);
    }
  },
  360: {
    type: 1,
    re: /yunpan\.360\.cn\/my/,
    fill_form: function (link) {
      yunpan.cmdCenter.showOfflineDia();
      setTimeout(function () {
        $(".offdl-btn-create").click();
        setTimeout(function () {
          $("#offdlUrl").val(link);
        }, 500);
      }, 1000);
    }
  },
  uc: {
    type: 1,
    re: /disk\.yun\.uc\.cn\//,
    fill_form: function (link) {
      setTimeout(function () {
        $("#newuclxbtn_index").click();
        setTimeout(function () {
          $("#uclxurl").val(link);
        }, 1000);
      }, 1200);
    }
  },

};
let main_keys = Object.keys(main); //下面的不要出现
main.cur_tab = null;
main.cur_vid = "";
let $ = function (selector, context) {
  if (context) {
    return context.querySelectorAll(selector);
  }
  return document.querySelectorAll(selector);
};
let insert_after = function (b) {
  b = $(b)[0];
  if (b) {
    b.parentElement.insertBefore(main.cur_tab, b);
  }
  else {
    console.error(location, "没有正确插入表格", b);
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
  add_style: function (css) {
    if (css) {
      GM_addStyle(css);
    }
    else {
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
    }
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
    let mag = event.target.parentElement.parentElement.getAttribute("mag");
    GM_setValue("magnet", mag);
  },

  reg_event: function () {
    let selector_event_map = [[".nong-copy", this.handle_copy_event], [".nong-offline-download", this.handle_dl_event]];
    for (let [selector, event] of selector_event_map) {
      for (let elem of document.querySelectorAll(selector)) {
        elem.addEventListener("click", event);
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
    if (data) {
      tab.appendChild(this.template.create_head(src));
      for (let d of data) {
        tab.appendChild(this.template.create_row(d));
      }
    }
    else {
      //notice
    }
    return tab;
  },

};
let my_search = {
  current: function (kw, cb) {
    let search = my_search[GM_getValue("search_index", 0)];
    if (!search) {
      alert("search engine not found");
    }
    return search(kw, cb);
  },
  search_name_string: ["btso", "btdb"],
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
      }
    });
  }
};

let display_table = function (vid, insert_where) {
  my_search.current(vid, function (data, src) {
    if (data) {
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
    }
  });
}


let vid_mode = function (v) {
  let vid = "";
  try {
    vid = v.vid();
  }
  catch (error) {
    vid = "";
    console.error("没有找到番号", v.vid.toString());
  }
  if (vid) {
    console.info("番号：", vid);
    common.add_style();
    display_table(vid, v.insert_where);
  }
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
  for (let i = 0; i < main_keys.length; i++) {
    let v = main[main_keys[i]];

    if (v.re && v.re.test(location.href)) {
      if (v.type === 0) {

        //----

        //for javlibrary
        if (main_keys[i] === "javlibrary") {
          if (document.querySelector("#adultwarningprompt")) {
            document.querySelectorAll("#adultwarningprompt input")[0].click();
          }
        }
        //----

        vid_mode(v);
      }
      else if (v.type == 1) {
        dl_mode(v);
      }
      break;
    }
  }
};
let set_max_title_length = function () {
  let len = prompt("请输入你想要的标题长度", GM_getValue("max_title_length", 100));
  if (len != null && len != "") {
    GM_setValue("max_title_length", len);
  }
}

GM_registerMenuCommand("挊--设置最大标题长度", set_max_title_length);

run();;



