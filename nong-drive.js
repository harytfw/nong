// ==UserScript==
// @name        挊-随时开车
// @namespace   撸
// @description 自动获取磁链接并自动离线下载


// @include     http*://*

// @version     1.37
// @run-at      document-end
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @grant       unsafeWindow
// @grant       GM_registerMenuCommand
// @noframes
// ==/UserScript==

let i_am_old_driver = {
    start: function () {
        this.add_css();
        this.add_small_icon();
    },
    add_css: function () {
        if (!unsafeWindow.add_css_flag) {
            unsafeWindow.add_css_flag = true;
            var css = '\
        #nong-drive-anytime-icon{\
          position:fixed;\
          z-index:6969;\
          color: white;\
          border-radius: 32px;\
          width: 32px;\
          height: 32px;\
          left: 10px;\
          bottom: 15px;\
          opacity:0.1;\
          text-align: center;\
          line-height: 32px;\
          -webkit-transition: opacity 0.6s ease-in-out;\
          -moz-transition: opacity 1s ease-in-out;\
          -o-transition: opacity 1s ease-in-out;\
          transition: opacity 1s ease-in-out;\
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0A\
          AAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0Q\
          A/wD/AP+gvaeTAAAAB3RJTUUH3gwKEBo6JKpagwAAA/lJREFUWMPtlk1oXFUUgL/z3ps3mUlmJmli0iZ26E9KSAuWq\
          tSdQkQoKKIUXfi3KlhUkJKdaEREurHFjTttcaHUgiD+oJCdtIq01kpBS5Mmtvkh6cwkmc5fkjdzj4uXKc1kppOOEQQ\
          9q3vfO/ee755z7jkX/usi9RQee+7QujYa/uyjjQWoYrgZiAEOoEAGSK+MGwapClBhfAfwIjAAdAMuYIAkcAE4CZwHi\
          o1ArAE48NJhjDGYUskVkUPAEaAXVVTVX6GACCLCCsgp4F3gxt1COJXGAWzbdkXkbVMqHUE1hGURjLYRbt9MsLUdL58\
          ln5xhaSGJKXodiLwGbAdeBqYaDkEZAHgFeF+NCVnBED37H+We3Q/gtsQQxwFj8Ao50tdHmDjzHfnENPje+AR4Fcit1\
          wt2FeM7gQ9R7XLDLfQdeIau+x8mEI4gloWIIJaFHQzR0nkv0a07yEz/iZdNg0gfcBG4DDB26UJdAKvKtxeAXiyL+P5\
          H2NJ/H65lQM1qLVVUDS2b42wfeBon3AKqIeAwEFlvCCoBmoEBVGmKxOjq3+uflhIBKVa9MmoM0fguIt3b/CSFfUC8U\
          YAY0K2qhNs7CUZi5U1xxNSEsJ0AsfguxLIAokBPowAO4CIQim1CbGf1z1oQIjS1diC2Xd6j4RAoYFDw8jnUmDULqkI\
          oeIUc+PoGWGwUIAMkESGXmqVYyJWv1x0hjCmSmbyKKZUA8sBsowBp4IKIUFiYY35iDKnRLm5BiFBI3SA9cbVcGceBa\
          38nBCeBpCl6jJ8dJjM7WU6uNRKwgMU013/4mqV0CkQM8DGQaBQA/MZyChFyiRl+//ZzUmOXMaXirSIkYqGqZJMzjH5\
          /mrmRS34o4GzCcU/vLmR5Z+rKugBqleJO4ATwuKrihpuJbonTFt9JU+smioU8C5PjLEyOs5ieB2Apn2NPYvqrN5bSn\
          4rIN8bPBXp+OtcQAPh3+T3gWVRDquqf3rJBjZ9wfkdUA2f2Jafmnl/KPNlRyC+q6gf43bFQD8K+fTL623l69z5Ynma\
          AYeAiIm0iEgVs/MJUFJGMiPwBHE2IPXRCs9loMPiEIiHjLT8EBIAfgeLg1h6OT07X90ANT4BfWOIrXong3/NZ4BpoY\
          k/JY2hxLmzgTVQHvVzW9TKZZVSP1fPEHd+EVUCqytFCim3GAwgBb6E6WMznXO/mzWWtA1H3UbpemT/4VHnoQ8BgMZe\
          tC2HdnZna0vbFl+VhYcXYMae5ZTkQjbliWYPAEBCuXLdhALUhmpcD0agrlnUQ1TVdckMBakAcd8LhkUAk+nrq119GK\
          /U3LAcq5bacCAM9sb7+0eS5n9XLZlblwD8GUAFRzUP/y79D/gKteao6M/AMZwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjA\
          xNi0wOS0xN1QxNToyMToyNiswODowMH9bMZYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTQtMTItMTBUMTY6MjY6NTgrM\
          Dg6MDAX0x1GAAAATXRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA3LjAuMS02IFExNiB4ODZfNjQgMjAxNi0wOS0xNyB\
          odHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ93ZpU4AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AA\
          AAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADEyOEN8QYAAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMTI40I0\
          R3QAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNDE4MjAwM\
          DE4ibQBZAAAABJ0RVh0VGh1bWI6OlNpemUAMi4zM0tCSV84/gAAAF90RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWU\
          vd3d3cm9vdC9zaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE4MjEvMTE4MjE5M\
          S5wbmd8fDQnAAAAAElFTkSuQmCC");\
        }\
        #nong-drive-anytime-dialog{\
          position:fixed;\
          left:8%;\
          top:10%;\
          z-index:69699;\
          border-radius: 8px 8px;\
          padding-top: 10px;\
          padding-left:10px;\
          padding-right:10px;\
          background-color: rgba(237, 237, 237, 0.8);\
        }\
        #nong-drive-anytime-dialog>span{\
            margin-left: 40px;\
        }\
        #nong-drive-anytime-dialog #nong-move{\
            width: 16px;\
            height: 16px;\
            display:none;\
            background-image: url("data:image/png;ba\
        se64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQ\
        AAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfeChoLIiwIy72HAAAA3ElEQVQ\
        oz3XRsUrDYBQF4C9NVnFRB8fiLFhEcJAOHRJw6FApdLBv4EP4An0QQeyatZMdsjiok+DiA7jEJcShaZs0eob/Hg6H+99\
        7bqiJqVMv/kViaSmuS2GN91179upM7rNtCJyb2/PtyYn33eZBVScmTaVTNR+15hnprw2JoaySC0XFMkMJkVt3Hly4ROE\
        KgRCFL/cOI5Qo/3g3iM10Kz42rljXTEyEVK7nY2ftnrnFysBis+YWj6tP6kHd+HGslBt4W89Qj/rAVMe+gWwbdRNx+1h\
        Rw5A6QlqXfgFuOzSValRoagAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wOS0xN1QxNToyMToxNyswODowMFejPcEAAAA\
        ldEVYdGRhdGU6bW9kaWZ5ADIwMTQtMTAtMjZUMTE6MzQ6NDQrMDg6MDDQbkqYAAAATXRFWHRzb2Z0d2FyZQBJbWFnZU1\
        hZ2ljayA3LjAuMS02IFExNiB4ODZfNjQgMjAxNi0wOS0xNyBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ93ZpU4AAAA\
        YdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADUxMo+NU4E\
        AAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTEyHHwD3AAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+\
        yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNDE0Mjk0NDg0ExvBiAAAABJ0RVh0VGh1bWI6OlNpemUAMTUuMktCe0oJtgA\
        AAF90RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9zaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5\
        lYXN5aWNvbi5jbi9zcmMvMTE3NzQvMTE3NzQ3Ni5wbmf8M3m2AAAAAElFTkSuQmCC"\);\
            display: none;\
            float: right;opacity: 0.4;\
            cursor:pointer;\
        }\
        #nong-drive-anytime-dialog>button{\
            margin-left: 12px;\
        }\
        #nong-drive-anytime-dialog > table{\
            \
        }\
        #nong-table-wrapper {\
          overflow-x: hidden;\
          overflow-y: auto;\
          position: relative;\
          max-height: 30em;\
        }\
        #nong-drive-anytime-icon:hover{\
            opacity:1;\
        }\
        ';
            GM_addStyle(css);
        }
    },
    selection: "",
    add_small_icon: function () {
        let icon = document.createElement("div");
        icon.setAttribute("id", "nong-drive-anytime-icon");
        icon.addEventListener("mouseover", (e) => {
            let text = unsafeWindow.getSelection().toString();
            console.info("选中的文本:", text);
            this.selection = text;
        });
        icon.addEventListener("click", (e) => {
            if (this.selection === "") {
                this.selection = unsafeWindow.getSelection().toString();
            }
            this.display_dialog();
        });
        document.body.appendChild(icon);
    },
    display_dialog: function () {
        let dialog = document.createElement("div");
        dialog.setAttribute("id", "nong-drive-anytime-dialog");
        dialog.addEventListener("click", (event) => {
            event.stopPropagation();
        });
        let span = document.createElement("span");
        span.textContent = "番号：";
        dialog.appendChild(span);
        let vid_input = document.createElement("input");
        vid_input.value = this.selection;
        vid_input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.target.nextElementSibling.click();
            }
        });
        dialog.appendChild(vid_input);

        let btn = document.createElement("button");
        btn.textContent = "确定";
        btn.addEventListener("click", (e) => {
            this.selection = vid_input.value;
            display_table(this.selection, null);
        });
        dialog.appendChild(btn);

        let move = document.createElement("div");

        move.setAttribute("id", "nong-move");
        move.setAttribute("draggable","true");
        {
            let ismoving = false;
            // move.addEventListener("mousedown",(e)=>{
            //     ismoving = true;
            //     console.log("down");
            // });
            move.addEventListener("dragstart",(e)=>{
                console.log("drag",e);
                dialog.style.left = (dialog.offsetLeft+e.movementX)+"px";
                dialog.style.top = (dialog.offsetTop+e.movementY)+"px";
            });
            // move.addEventListener("mouseup",(e)=>{
            //     ismoving =false;
            //     console.log("up")
            // });

        }


        dialog.appendChild(move);
        document.body.appendChild(dialog);

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
            selector: "#nong-drive-anytime-dialog .nong-copy",
            type: "click",
            fn: this.handle_copy_event
        }, {
            selector: "#nong-drive-anytime-dialog .nong-offline-download",
            type: "click",
            fn: this.handle_dl_event
        }];

        selector_event_map.push({ selector: "body", type: "click", fn: this.handle_close_event });
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
        } catch (e) {
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
            console.log(this);
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
                display_table(i_am_old_driver.selection, null);
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
                this.create_info(data.title, data.src),
                this.create_size(data.size, data.src),
                ((torrent_url = data.torrent_url) => {
                    let operate = this.create_operation(torrent_url);
                    operate.firstChild.textContent = "种子";
                    operate.firstChild.setAttribute("class", "nong-copy-sukebei");
                    operate.firstChild.setAttribute("target", "_blank");
                    return operate;
                })(),
                (() => {
                    let div = document.createElement("div");
                    div.textContent = "暂不支持离线下载";
                    return div;
                })()
            ];
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
        }(),
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
    generate_head: function () {
        let tab = document.createElement("table");
        tab.id = "nong-table";
        tab.appendChild(this.template.create_head("https://greasyfork.org/zh-CN/scripts/8392-%E6%8C%8A"));
        return tab;
    },
    generate: function (src, data) {
        let tab = document.querySelector("#nong-drive-anytime-dialog #nong-table");
        tab.querySelector("#nong-head a").href = src;
        if (src.match("sukebei.nyaa.se")) {
            data.forEach((d) => {
                tab.appendChild(this.template.create_row_for_sukebei(d));
            });

        } else {
            data.forEach((d) => {
                tab.appendChild(this.template.create_row(d));
            });

        }
        return tab;
    },

};
let my_search = {

    search_name_string: ["btso", "btdb", "sukebei.nyaa", "btkitty"],
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
            url: "http://btdb.to/q/" + kw + "/",
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
            url: "https://nyaa.si/?f=0&c=0_0&q=" + kw,
            onload: function (result) {
                let doc = common.parsetext(result.responseText);
                let data = [];
                let t = doc.querySelectorAll("tr.default");
                if (t.length!==0) {
                    for (let elem of t) {
                        data.push({
                            "title": elem.querySelector("td:nth-child(2)>a:nth-child(1)").title,
                            "mag": "",
                            "torrent_url": "https:" + elem.querySelector("td:nth-child(3)>a:nth-child(1)").href,
                            "size": elem.querySelector("td:nth-child(4)").textContent,
                            "src": "https:" + elem.querySelector("td:nth-child(2)>a:nth-child(1)").href,
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
        });
    },

};


let display_table = function (vid, insert_where) {
    common.add_style();
    if (!document.querySelector("#nong-drive-anytime-dialog #nong-head")) {
        let tab_with_head = magnet_table.generate_head();
        if (typeof insert_where === "string") {
            let elem = document.querySelector(insert_where);
            //console.log("display_table", tab, elem);
            if (elem) {
                elem.parentElement.insertBefore(tab_with_head, elem);
            }
        } else if (typeof insert_where === "function") {
            insert_where(tab_with_head);
        } else {
            console.error("插入表格错误");
            return;
        }
    } else {
        let head = document.querySelector("#nong-drive-anytime-dialog #nong-head");
        Array.from(document.querySelectorAll("#nong-drive-anytime-dialog .nong-row")).forEach(function (row) {
            if (row !== head) {
                row.parentElement.removeChild(row);
            }
        });
    }
    my_search.current(vid, function (data, src) {
        let tab = magnet_table.generate(data, src);
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
    GM_setValue("magnet", "");
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
        run();
    }
};
let select_popup = function () {
    let enable = GM_getValue("enable_select_popup", false);
    if (enable) {
        document.body.addEventListener("mouseup", function (e) {
            if (unsafeWindow.getSelection().toString() !== "") {
                let elem = document.querySelector("#nong-drive-anytime-icon");
                elem.style.left = e.clientX + "px";
                elem.style.top = e.clientY + "px";
            }
            //elem.style.position = "absolute";
        });
        document.body.addEventListener("mousedown", function (e) {
            if (e.target.id !== "nong-drive-anytime-icon") {
                let elem = document.querySelector("#nong-drive-anytime-icon");
                elem.setAttribute("style", "");
            }

        });
        GM_registerMenuCommand("挊随时开车-关闭选中时弹出图标", function () {
            GM_setValue("enable_select_popup", false);        });
    } else {
        GM_registerMenuCommand("挊随时开车-开启选中时弹出图标", function () {
            GM_setValue("enable_select_popup", true);
        });
    }
};
GM_registerMenuCommand("挊随时开车-标题长度", set_max_title_length);

select_popup();
run();

if (window === window.top) {
    i_am_old_driver.start();
}