// ==UserScript==
// @name        挊
// @namespace   撸
// @description 自动获取磁链接并自动离线下载
// @include     http://www.javhip.com/*
// @include     http://www.avmask.net/*
// @include     http://www.avmemo.com/*
// @include     http://www.javlibrary.com/*
// @include     http://www.libredmm.com/products/*
// @include     http://www.dmm.co.jp/digital/videoa/*
// @include     http://www.minnano-av.com/av*
// @include     http://www.oisinbosoft.com/dera/*
// @include     http://www.javbus.co/*
// @include     http://avdb.la/movie/*
// @include     http://www.141jav.com/view/*
// @include     http://www.av4you.net/work/*.htm
// @include     http://pan.baidu.com/disk/home
// @include     http://115.com/?tab=offline&mode=wangpan
// @include     http://cloud.letv.com/webdisk/home/index
// @include     http://disk.yun.uc.cn/
// @include     https://www.furk.net/users/files/add
// @include     *.yunpan.360.cn/my/
// @include     http://www.btcherry.net/*
// @include     https://btdigg.org/search*
// @include     http://www.cilizhushou.com/search/*
// @include     http://www.btava.com/*
// @include     http://www.instsee.com/*
// @version     1.21
// @run-at      document-end
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// ==/UserScript==

var sites = {
  baidu: {
    url: 'http://pan.baidu.com/disk/home',
    name: '百度云',
    enable: true
  },
  115: {
    name: '115离线',
    url: 'http://115.com/?tab=offline&mode=wangpan',
    enable: true
  },
  letv: {
    name: '乐视云',
    url: 'http://cloud.letv.com/webdisk/home/index',
    enable: false
  },
  360: {
    name: '360云',
    url: 'http://yunpan.360.cn/my/',
    enable: true
  },
  uc: {
    name: 'UC离线',
    url: 'http://disk.yun.uc.cn/',
    enable: true
  },
  furk: {
    name: 'Furk',
    url: 'https://www.furk.net/users/files/add',
    enable: false
  },
};


var $ = function(selector) {
  return document.querySelectorAll(selector);
};

var $after = function(target, newnode) {
  target.parentElement.insertBefore(newnode, target.nextElementSibling);
};
var $xafter = function(selector, target, func) {
  var result = document.querySelectorAll(selector);
  //isdeep 是否克隆子元素
  var tmp = null;
  for (var i = 0; i < result.length; i++) {
    tmp = target.cloneNode(true);
    if (result[i].nextElementSibling === null) {
      result[i].parentElement.appendChild(tmp);
    }
    else {
      result[i].parentElement.insertBefore(tmp, result[i].nextElementSibling);
    }
    tmp.setAttribute('data', func(result[i]));
  }
};

var $cs = function(selector, arg, context) {
  'use strict';
  var q = null;
  if (context) {
    q = context.querySelectorAll(selector);
  }
  else {
    q = document.querySelectorAll(selector);
  }
  var r = [];
  for (var i = 0; i < q.length; i++) {
    r.push($c({
      self: q[i],
      prop: arg.prop,
      event: arg.event,
    }));
  }
  return r;
};

var $c = function(arg) {
  'use strict';
  var node = null;
  if (arg instanceof Object) {
    if (arg.clone) {
      node = arg.clone.cloneNode(true);
    }
    else if (arg.self) {
      node = arg.self;
    }
    else if (arg.tag) {
      node = document.createElement(arg.tag);
    }
    else if(arg.html){
      var t = document.createElement(arg.html.match(/<(\w+)\s/)[1]);
      t.outerHTML = arg.html;
      node = t;
    }
    if (node) {
      if (arg.prop) {
        for (var attr in arg.prop) {
          if (attr === 'css' || attr === 'style') {
            node.setAttribute('style', arg.prop[attr]);
          }
          else if (attr === 'className') {
            node.setAttribute('class', arg.prop[attr]);
          }
          else if (attr === 'textContent' || attr === 'innerHTML') {
            node[attr] = arg.prop[attr];
          }
          else {
            node.setAttribute(attr, arg.prop[attr]);
          }
        }
      }
      if (arg.event) {
        if (arg.event instanceof Object) {
          node.addEventListener(arg.event.type, arg.event.listener, false);
        }
        else if (arg.event instanceof Array) {
          agr.event.forEach(function(e) {
            node.addEventListener(e.type, e.listener, false);
          });
        }
      }
      if (arg.append) {
        if (arg.append instanceof Array) {
          arg.append.forEach(function(v) {
            if (v instanceof HTMLElement) {
              node.appendChild(v);
            }
            else if (v instanceof Object) {
              node.appendChild($c(v))
            }
          });
        }
        else if (arg.append instanceof HTMLElement) {
          node.appendChild(arg.append)
        }
        else if (arg.append instanceof Object) {
          node.appendChild($c(arg.append))
        }
      }
    }
  }
  return node;
};
// var getbdstoken = function() {
//   return '...';
// };
// var biadu_query_magnet = function(bdstoken, url) {
//   GM_xmlhttpRequest({
//     method: 'POST',
//     url: 'http://pan.baidu.com/rest/2.0/services/cloud_dl?bdstoken=' + bdstoken + '&channel=chunlei&clienttype=0&web=1&app_id=250528',
//     data: 'method=query_magnetinfo&app_id=250528&source_url=' + url + '&save_path=%2F&type=4',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     onload: function(response) {
//       console.log(response);
//       console.log(response.responseText);
//     }
//   });
// };

var add_style = function(css) {
  if (css) {
    GM_addStyle(css);
  }
  else {
    GM_addStyle([
      '#magnet-tab{text-align: center ;}',
      '#magnet-tab table{margin:10px auto;border:1px solid #cad9ea;color:#666 !important;font-size:12px;text-align:center;background-color: #F3F3F3;}',
      '.magnet-th,.magnet-td{height:30px; border:1px solid #cad9ea;padding:0 1em 0;}',
      '.magnet-copy{color:#08c !important;}',
      '.offline-div{text-align: center;}',
      '.magnet-download{color: rgb(0, 180, 30) !important;margin-right: 4px;}',
      '.magnet-download:hover{color:red !important;}',
    ].join(''));
  }
};

//------------
var sites_table = function(parent, child) {
  for (var key in sites) {
    if (sites[key].enable === false) {
      continue;
    }
    parent = $c({
      self: parent,
      append: [{
        clone: child,
        prop: {
          href: sites[key].url,
          textContent: sites[key].name,
        },
      }],
    });
  }
  return parent;
};

var simple_offline_table = function(callback) {
  var link = $c({
    tag: 'a',
    prop: {
      className: 'magnet-download',
      target: '_blank',
    }
  });
  var w = sites_table(document.createElement('div'), link);
  callback($c({
    self: w,
    prop: {
      className: 'offline-div',
    },
  }));
};
//---------start---------
var create_wrapper = function(data) {
  //---------start---------
  var create_table_th = function() {
    var th = $c({
      tag: 'th',
      prop: {
        className: 'magnet-th',
      }
    });
    var tr = $c({
      tag: 'tr',
      append: [{
        clone: th,
        append: [
          $c({
            tag: 'a',
            prop: {
              id: 'switch-engine',
              href: 'javascript:void(0);',
              title: '点击切换搜索结果',
              textContent: '标题',
              css:'color:#4500e6',
            },
          })
        ]
      }],
    });
    ['大小', '操作', '离线下载'].forEach(function(s) {
      tr = $c({
        self: tr,
        append: [{
          clone: th,
          prop: {
            textContent: s,
          },
        }, ],
      });
    });
    return tr;
  };
  //---------end---------
  //---------start---------
  var create_table_td = function(info) {
    var td = $c({
      tag: 'td',
      prop: {
        className: 'magnet-td',
      }
    });
    return $c({
      tag: 'tr',
      append: [{
        clone: td,
        prop: {
          title: info.title,
          textContent: info.title.length > 30 ? info.title.slice(0, 30) + '...' : info.title,
        },
      }, {
        clone: td,
        prop: {
          textContent: info.size
        },
      }, {
        clone: td,
        append: [{
          tag: 'a',
          prop: {
            className: 'magnet-copy',
            textContent: '复制',
            href: info.magnet,
          }
        }, ]
      }, {
        self: sites_table($c({
          clone: td,
          prop: {
            data: info.magnet,
          },
        }), $c({
          tag: 'a',
          prop: {
            className: 'magnet-download',
            target: '_blank',
          }
        })),
      }, ],
    });
  };
  //---------end---------
  //---------start---------
  var table = $c({
    tag: 'table',
    append: [create_table_th()]
  });
  var from_info = $c({
    tag: 'h4',
    append: $c({
      tag: 'a',
      prop: {
        id: 'magnet-href',
        href: data.src,
        target: '_blank',
        css: 'color: #FF10FF;',
        innerHTML: '来自'+search_engine.latest().name,
      }
    }),
  });
  if (data.info.length) {
    data.info.forEach(function(d) {
      table = $c({
        self: table,
        append: [create_table_td(d)],
      });
    });
  }
  else {
    table = $c({
      self: table,
      append: [{
        tag: 'p',
        prop: {
          textContent: '没有找到...',
        }
      }],
    });
  }
  return $c({
    tag: 'div',
    prop: {
      id: 'magnet-tab',
    },
    append: [
      from_info,
      table,
    ],
  });
};
//---------end---------
var search_engine = {
  latest: function() {
    return this.sites[this.index];
  },
  next: function() {
    if (this.index < this.sites.length - 1) {
      this.index += 1;
    }
    else {
      this.index = 0;
    }
    return this.sites[this.index];
  },
  get_true_magnet: function(str) {
    var t = document.createElement('a');
    t.outerHTML = str.match(/document.write\(\'(.*)\'\)/)[1].split('\'+\'').join('');
    return t.href;
  },
  index: 0,
  sites: [{
    name: 'bt2mag',
    url: 'http://www.bt2mag.com/search/',
    s: function(kw, cb) {
      GM_xmlhttpRequest({
        method: 'GET',
        url: this.url + kw,
        onload: function(result) {
          var doc = document.implementation.createHTMLDocument('');
          doc.documentElement.innerHTML = result.responseText;
          var list = [];
          var t = doc.getElementsByClassName('data-list')[0];
          if (t) {
            var elems = t.getElementsByTagName('a');
            for (var i = 0; i < elems.length; i++) {
              if (!elems[i].className.match('btn')) {
                list.push({
                  'title': elems[i].title,
                  'magnet': 'magnet:?xt=urn:btih:' + elems[i].href.replace(/.*hash\//, ''),
                  'size': elems[i].nextElementSibling.textContent
                });
              }
            }
            cb({
              src: result.finalUrl,
              info: list
            });
          }
          else {
            cb({
              src: result.finalUrl,
              info: []
            });
          }
        },
        onerror: function(e) {
          console.log(e);
        }
      });
    }
  }, {
    name: 'diggbt',
    url: 'http://diggbt.net/',
    s: function(kw, cb) {
      GM_xmlhttpRequest({
        method: 'POST',
        url: this.url,
        data: 's=' + kw,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(result) {
          finalurl = result.finalUrl;
          var doc = document.implementation.createHTMLDocument('');
          doc.documentElement.innerHTML = result.responseText;
          var list = [];
          var t = doc.getElementsByClassName('list-con')[0];
          if (t) {
            var elems = t.getElementsByClassName('item-title');
            for (var i = 0; i < elems.length; i++) {
              list.push({
                'title': elems[i].getElementsByTagName('a')[0].textContent,
                'magnet': search_engine.get_true_magnet(elems[i].nextElementSibling.getElementsByTagName('script')[0].innerHTML),
                'size': elems[i].nextElementSibling.getElementsByTagName('b')[1].textContent
              });
            }
            cb({
              src: result.finalUrl,
              info: list
            });
          }
          else {
            cb({
              src: result.finalUrl,
              info: []
            });
          }
        },
        onerror: function(e) {
          console.log(e);
        }
      });
    }
  }, {
    name: 'btlibrary',
    url: 'http://btlibrary.org/',
    s: function(kw, cb) {
      GM_xmlhttpRequest({
        method: 'POST',
        url: this.url,
        data: 's=' + kw,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(result) {
          var doc = document.implementation.createHTMLDocument('');
          doc.documentElement.innerHTML = result.responseText;
          var list = [];
          var t = doc.getElementsByClassName('list-content')[0];
          if (t) {
            var elems = t.getElementsByClassName('item-title');
            for (var i = 0; i < elems.length; i++) {
              list.push({
                'title': elems[i].getElementsByTagName('a')[0].textContent,
                'magnet': elems[i].nextElementSibling.getElementsByTagName('a')[0].href,
                'size': elems[i].nextElementSibling.getElementsByTagName('b')[1].textContent
              });
            }
            cb({
              src: result.finalUrl,
              info: list
            });
          }
          else {
            cb({
              src: result.finalUrl,
              info: []
            });
          }
        },
        onerror: function(e) {
          console.log(e);
        }
      });
    }
  }],
};
var updata_table = function() {
  // body...
};
var handle_event = function(event) {
  if (event.target.className == 'magnet-copy') {
    event.target.innerHTML = '成功';
    GM_setClipboard(event.target.href);
    setTimeout(function() {
      event.target.innerHTML = '复制';
    }, 1000);
    event.preventDefault(); //阻止跳转
  }
  else if (event.target.className == 'magnet-download') {
    GM_setValue('magnet', event.target.parentElement.getAttribute('data'));
  }
};
var reg_event = function() {
  $cs('.magnet-copy', {
    event: {
      type: 'click',
      listener: handle_event
    }
  });
  $cs('.magnet-download', {
    event: {
      type: 'click',
      listener: handle_event
    }
  });
  $cs('#switch-engine', {
    event: {
      type: 'click',
      listener: function() {
        var tab = $('#magnet-tab')[0];
        if (tab) {
          tab.parentElement.removeChild(tab);
          search_engine.next().s(main[extern_key].vid(), function(data) {
            main[extern_key].proc(create_wrapper(data));
            reg_event();
          });
        }
      }
    }
  });
};
var main = {
  //av信息查询 类
  javhip_avmask_avmemo: {
    re: /(javhip|avmask|avmemo).*movie.*/,
    vid: function() {
      return $('.header')[0].nextElementSibling.innerHTML;
    },
    proc: function(wrapper) {
      $after($('#movie-share')[0], wrapper);
    }
  },
  javlibrary: {
    re: /javlibrary.*\?v=.*/,
    vid: function() {
      return $('#video_id')[0].getElementsByClassName('text')[0].innerHTML;
    },
    proc: function(wrapper) {
      $after($('#video_favorite_edit')[0], wrapper);
    }
  },
  libredmm: {
    re: /libredmm/,
    vid: function() {
      return location.href.match(/products\/(.*)/)[1];
    },
    proc: function(wrapper) {
      $after($('.container')[0], wrapper);
    }
  },
  dmm: {
    re: /dmm\.co\.jp/,
    vid: function() {
      var result = location.href.replace(/.*cid=/, '').replace(/\/\??.*/, '').match(/[^h_0-9].*/);
      return result[0] ? result[0].replace('00', '') : '';
    },
    proc: function(wrapper) {
      $after($('.lh4')[0], wrapper);
    }
  },
  minnano: {
    re: /minnano-av/,
    vid: function() {
      var elems = $('.t11');
      var r = '';
      for (var i = 0; i < elems.length; i++) {
        if (elems[i].textContent == '品番') {
          r = elems[i].nextElementSibling.textContent;
          break;
        }
      }
      return r;
    },
    proc: function(wrapper) {
      var tmp = (function() {
        var a = $('table');
        for (var i = 0; i < a.length; i++) {
          if (a[i].bgColor == '#EEEEEE') {
            return a[i];
          }
        }
      })();
      $after(tmp, wrapper);
    }
  },
  oisinbosoft: {
    re: /oisinbosoft/,
    vid: function() {
      var r = location.pathname.replace(/.*\/+/, '').replace('.html', '');
      return r.indexOf('-') == r.lastIndexOf('-') ? r : r.replace(/\w*-?/, '');
    },
    proc: function(wrapper) {
      add_style('#magnet-tab table{clear:both;}');
      $after($('#detail_info')[0], wrapper);
    }
  },
  javbus: {
    re: /javbus/,
    vid: function() {
      var result = $('.movie-code');
      return result ? result[0].textContent : '';
    },
    proc: function(wrapper) {
      $after($('.movie')[0].parentElement, wrapper);
    }
  },
  avdb: {
    re: /avdb\.la/,
    vid: function() {
      return $('.info')[0].firstElementChild.innerHTML.replace(/<.*>/, '').trim();
    },
    proc: function(wrapper) {
      wrapper.className = 'movie';
      $after($('#downs')[0].previousElementSibling, wrapper);
    }
  },
  jav141: {
    re: /141jav/,
    vid: function() {
      return location.href.match(/view\/(.*)\//)[1];
    },
    proc: function(wrapper) {
      $after($('.dlbtn')[0].previousElementSibling, wrapper);
    },
  },
  av4you: {
    re: /av4you/,
    vid: function() {
      return $('.star-detail-name')[0].textContent.trim();
    },
    proc: function(wrapper) {
      $after($('.star-detail')[0], wrapper);
    }
  },
  instsee_single: {
    re: /instsee\.com\/details\.aspx\?id=.*/,
    vid: function() {
      return $('.info li')[0].textContent.replace('番号：', '');
    },
    proc: function(wrapper) {
      $after($('.head_coverbanner')[0], wrapper);
    },
  },
  //网盘下载 类
  //这些 $ 是真正的 jquery
  baidu: {
    re: /pan\.baidu\.com/,
    fill_form: function(magnet) {
      $('.icon-btn-download')[0].click();
      setTimeout(function() {
        $('.create-normal-button')[0].click();
        $('#share-offline-link').val(magnet);
        $('.dlg-ft .sbtn')[0].click();
        setTimeout(function() {
          $('.btlist-bottom .sbtn')[0].click();
        }, 3000);
      }, 1000);
    }
  },
  115: {
    re: /115\.com/,
    fill_form: function(link) {
      var rsc = setInterval(function() {
        if (document.readyState == 'complete') {
          clearInterval(rsc);
          setTimeout(function() {
            Core['OFFL5Plug'].OpenLink();
            setTimeout(function() {
              $('#js_offline_new_add').val(link);
            }, 300);
          }, 1000);
        }
      }, 400);
    }
  },
  letv: {
    re: /cloud\.letv\.com/,
    fill_form: function(link) {
      setTimeout(function() {
        $('#offline-btn').click();
        setTimeout(function() {
          $('#offline_clear_complete').prev().click();
          setTimeout(function() {
            $('#offline-add-link').val(link);
          }, 500);
        }, 1000);
      }, 2000);
    }
  },
  furk: {
    re: /www\.furk\.net/,
    fill_form: function(link) {
      setTimeout(function() {
        $('#url').val(link.replace('magnet:?xt=urn:btih:', ''));
      }, 1500);
    }
  },
  360: {
    re: /yunpan\.360\.cn\/my/,
    fill_form: function(link) {
      yunpan.cmdCenter.showOfflineDia();
      setTimeout(function() {
        $('.offdl-btn-create').click();
        setTimeout(function() {
          $('#offdlUrl').val(link);
        }, 500);
      }, 1000);
    }
  },
  uc: {
    re: /disk\.yun\.uc\.cn\//,
    fill_form: function(link) {
      setTimeout(function() {
        $('#newuclxbtn_index').click();
        setTimeout(function() {
          $('#uclxurl').val(link);
        }, 1000);
      }, 1200);
    }
  },
  //磁链接搜索 类
  btcherry_multiple: {
    re: /btcherry\.net\/search\?keyword=.*/,
    func: function(div) {
      $xafter('.r div a', div, function(elem) {
        //elem 等于 document.querySelectorAll(.r div a)的成员
        return elem.href;
      });
    },
  },
  btcherry_single: {
    re: /btcherry\.net\/t\/.*/,
    func: function(div) {
      div.setAttribute('data', $('#content ul a')[0].href);
      $after($('#content h1')[0], div);
    },
  },
  btdigg_multiple: {
    re: /btdigg/,
    func: function(div) {
      $xafter('.snippet', div, function(elem) {
        return elem.parentElement.getElementsByClassName('ttth')[0].firstElementChild.href;
      });
    },
  },
  // btdigg_single: {

  // },

  cilizhushou_multiple: {
    re: /cilizhushou/,
    func: function(div) {
      $xafter('.tail', div, function(elem) {
        return elem.getElementsByTagName('a')[0].href;
      });
    },
  },
  // shousibaocai_single: {
  //   re: '',
  //   func: '',
  // },
  btava_multiple: {
    re: /search\//,
    func: function(div) {
      $xafter('.data-list .date', div, function(elem) {
        return 'magnet:?xt=urn:btih:' + elem.parentElement.getElementsByTagName('a')[0].href.match(/hash\/(.*)/)[1];
      });
    },
  },
  btava_single: {
    re: /magnet\/detail\/hash\//,
    func: function(div) {
      div.setAttribute('data', $('#magnetLink')[0].value);
      $after($('#magnetLink')[0], div);
    },
  },
  // instsee_multiple:{
  //   re: /^http:\/\/www\.instsee.com\/$|instsee\.com\/default.aspx.*/,
  //   func: function(div){
  //   }
  // },

};
var extern_key = ''; //store matched key of main
var run = function() {
  for (var key in main) {
    if (main[key].re.test(location.href)) {
      extern_key = key; //.....
      if (main[key].vid) {
        add_style();
        search_engine.latest().s(main[key].vid(), function(data) {
          main[key].proc(create_wrapper(data));
          reg_event();
          if (false) {
            var bdstoken = GM_getValue('bdstoken')
            if (bdstoken == '') {
              bdstoken = getbdstoken()
              GM_setValue('bdstoken', bdstoken);
            }
            biadu_query_magnet();
          }
        });
      }
      else if (main[key].func) {
        add_style();
        simple_offline_table(main[key].func);
        reg_event();
      }
      else if (main[key].fill_form) {
        var magnet = GM_getValue('magnet');
        GM_setValue('magnet', '');
        if (magnet) {
          $c({
            self: document.body,
            append: [{
              tag: 'script',
              prop: {
                innerHTML: '(' + main[key].fill_form.toString() + ')(\'' + magnet + '\');',
              }
            }]
          });
        }
        else {
          //alert('没有磁链接');
        }
      }
      break;
    }
  }
};
$c({
  self: document,
  event: {
    type: 'DOMContentLoaded',
    listener: function(e) {
      run();
    },
  },
});