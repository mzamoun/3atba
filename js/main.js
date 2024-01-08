
function dbg(fct, ...data) {
    console.log("DBG " + fct + " DEB : ")
    for (var i = 0; i < data.length; i++) {
        console.log(data[i])
    }
    console.log("DBG " + fct + " FIN : ")
}

//////////////////////////////////////////////////////////////
function addProps(obj1, obj2) {
    var obj = {}
    for (var key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            obj[key] = obj1[key]
        }
    }
    for (var key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            obj[key] = obj2[key]
        }
    }
    return obj;
}
//////////////////////////////////////////////////////////////
function copyProps(obj1, obj2) {
    for (var key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            obj2[key] = obj1[key]
        }
    }
}
//////////////////////////////////////////////////////////////
function isElementInArray(tab, element) {
    // dbg("isElementInArray tab " , tab)

    var ok = false;
    for (var i = 0; i < tab.length; i++) {
        console.log(tab[i])
        if (element == tab[i]) {
            ok = true
            // console.log("DBG OK")
            break;
        }
    }

    // dbg("isElementInArray ok " , ok)

    return ok;
}
//////////////////////////////////////////////////////////////
function removeFromArray(tab, element) {

    if (isElementInArray(tab, element)) {
        try {
            tab.splice(tab.indexOf(element), 1); // 2nd parameter means remove one item only
        } catch (error) {
            tab.remove(element);
        }
    }

}
//////////////////////////////////////////////////////////////
function getStringFromArray(tab, outSep) {

    var s = ""

    if (tab != null && tab.length > 0) {
        s = tab[0]
        for (var i = 1; i < tab.length; i++) {
            s += outSep + tab[i]
        }
    }

    return s;

}

//////////////////////////////////////////////////////////////
function showAlert() {
    alert("The button was clicked!");
}

//////////////////////////////////////////////////////////////
function getDivSep(heightPx) {
    return getTag("div", "", "", { height: heightPx + "px", width: "100%", clear: "both" })
}

//////////////////////////////////////////////////////////////
function getTag(tag, txt, objAttrs, objAttrStyle) {

    // dbg("getTag objAttrs ", objAttrs)

    var attrs = "";
    var style = "";

    var styleValue = "";

    if (isEmpty(txt)) txt = ""

    if (!isEmpty(objAttrs)) {
        for (var key in objAttrs) {
            if (objAttrs.hasOwnProperty(key)) {
                var value = objAttrs[key];
                attrs += genAttr(key, value) + " "
            }
        }
    }

    attrs = attrs.trim();

    if (!isEmpty(objAttrStyle)) {
        for (var key in objAttrStyle) {
            if (objAttrStyle.hasOwnProperty(key)) {
                var value = objAttrStyle[key];
                styleValue += genAttrStyle(key, value)
            }
        }
    }

    if (objAttrStyle != null) {
        styleValue = styleValue.trim();
        if (styleValue != "") {
            style = genAttr("style", styleValue)
        }
    }

    // dbg("getTag attrs ", attrs)

    var s = '<' + tag + ' ' + attrs + ' ' + style + ' >' + txt + '</' + tag + '>';
    // dbg("tag", s)

    // console.log("DBG getTag : s=|"+s+"|")

    return s;
}

//////////////////////////////////////////////////////////////
function genAttr(name, value) {
    var s = "";
    if (name == null) name = "";
    if (value == null) value = "";

    name = name.trim();
    value = (value + "").trim();

    if (name != "") {
        s = name + '="' + value + '" '
    }

    // console.log("DBG genAttr s=|"+s+"|")

    return s;
}

//////////////////////////////////////////////////////////////
function genAttrStyle(name, value) {
    var s = "";
    if (name == null) name = "";
    if (value == null) value = "";

    name = name.trim();
    value = (value + "").trim();

    if (name != "") {
        s = name + ":" + value + "; "
    }

    // console.log("DBG genAttrStyle s=|"+s+"|")

    return s;
}

//////////////////////////////////////////////////////////////

function getAttr(idDiv, attr) {

    var s = "";

    var div = document.getElementById(idDiv);
    if (div != null && attr != null && attr != "") {
        s = div.getAttribute(attr);
    } else {
        console.log("ERROR: getAttr : div NOT EXIST !! [" + idDiv + "]")
        s = null;
    }

    return s;

}

//////////////////////////////////////////////////////////////
function setAttr(idDiv, attr, value) {

    var div = document.getElementById(idDiv);
    if (div != null && attr != null && attr != "") {
        div.setAttribute(attr, value);
        return true;
    } else {
        console.log("ERROR: setAttr : div NOT EXIST !! [" + idDiv + "]")
        return false;
    }

}

//////////////////////////////////////////////////////////////
function removeAttr(idDiv, attr) {

    var div = document.getElementById(idDiv);
    if (div != null && attr != null && attr != "") {
        div.removeAttribute(attr);
        return true;
    } else {
        console.log("ERROR: removeAttr : div NOT EXIST !! [" + idDiv + "]")
        return false;
    }

}

//////////////////////////////////////////////////////////////
function getAttrStyle(idDiv, attr) {

    var div = document.getElementById(idDiv);
    if (div != null && attr != null && attr != "") {
        return div.style[attr];
    } else {
        console.log("ERROR: setStyle : div NOT EXIST !! [" + idDiv + "]")
        return null;
    }

}

//////////////////////////////////////////////////////////////
function setAttrStyle(idDiv, attr, value) {

    var div = document.getElementById(idDiv);
    if (div != null && attr != null && attr != "") {
        div.style[attr] = value;
        return true;
    } else {
        console.log("ERROR: setStyle : div NOT EXIST !! [" + idDiv + "]")
        return false;
    }

}

//////////////////////////////////////////////////////////////
function setStyle(idDiv, attr, value) {

    var div = document.getElementById(idDiv);
    if (div != null && attr != null && attr != "") {
        div.style[attr] = value;
        return true;
    } else {
        console.log("ERROR: setStyle : div NOT EXIST !! [" + idDiv + "]")
        return false;
    }

}

//////////////////////////////////////////////////////////////
function setClass(idDiv, className) {
    if (className == null) className = "";
    className = className.trim();

    if (className == "") return false;

    var div = document.getElementById(idDiv);
    if (div != null) {
        div.className = className;
        return true;
    } else {
        console.log("ERROR: setClass : div NOT EXIST !! [" + idDiv + "]")
        return false;
    }

}


//////////////////////////////////////////////////////////////
function getClassList(idDiv) {

    var list = [];

    var div = document.getElementById(idDiv);
    if (div != null) {
        var cls = div.className
        if (cls == null) cls = "";
        cls = cls.trim();

        if (cls != "") {
            var tab = cls.split(" ");
            list = tab;
        }
    } else {
        console.log("ERROR: getClassList : div NOT EXIST !! [" + idDiv + "]")
        list = null;
    }

    return list;
}

//////////////////////////////////////////////////////////////
function addClass(idDiv, className) {

    // console.log("DBG addClass ", idDiv, className)

    var added = false;

    if (className == null) className = "";
    className = className.trim();

    if (className == "") return added;

    var div = document.getElementById(idDiv);
    if (div != null) {
        // console.log("DBG before div.classList=", div.classList)
        div.classList.add(className);
        // console.log("DBG after div.classList=", div.classList)
    } else {
        console.log("ERROR: addClass : div NOT EXIST !! [" + idDiv + "]")
    }

    return added;
}

//////////////////////////////////////////////////////////////
function removeClass(idDiv, className) {

    // console.log("DBG removeClass ", idDiv, className)

    var removed = false;

    if (className == null) className = "";
    className = className.trim();

    if (className == "") return removed;

    var div = document.getElementById(idDiv);
    if (div != null) {
        // console.log("DBG before div.classList=", div.classList)
        div.classList.remove(className);
        // console.log("DBG after div.classList=", div.classList)
    } else {
        console.log("ERROR: removeClass : div NOT EXIST !! [" + idDiv + "]")
    }

    return removed;
}

//////////////////////////////////////////////////////////////
function toggleClass(idDiv, className) {

    var ok = false;

    if (className == null) className = "";
    className = className.trim();

    if (className == "") return ok;

    var div = document.getElementById(idDiv);
    if (div != null) {
        div.classList.toggle(className);
        ok = true;
    } else {
        console.log("ERROR: toggleClass : div NOT EXIST !! [" + idDiv + "]")
    }

    return ok;
}

//////////////////////////////////////////////////////////////
function getText(idDiv) {


    var txt = ""

    var div = document.getElementById(idDiv);
    if (div != null) {
        txt = div.innerText
    } else {
        console.log("ERROR: getText : div NOT EXIST !! [" + idDiv + "]")
    }

    return txt;
}

//////////////////////////////////////////////////////////////
function setText(idDiv, txt) {

    var added = false;

    if (txt == null) {
        // console.log("DBG setText txt NULL : not Added !!!")
        return added;
    }

    txt = txt + ""
    txt = txt.trim();

    var div = document.getElementById(idDiv);
    if (div != null) {
        div.innerHTML = txt;
        added = true;
        // console.log("DBG setText txt added to div:", div)

    } else {
        console.log("ERROR: setText : div NOT EXIST !! [" + idDiv + "]")
    }

    return added;
}

//////////////////////////////////////////////////////////////
function addText(idDiv, txt) {

    var added = false;

    if (txt == null) txt = "";
    txt = txt.trim();

    if (isEmpty(txt)) {
        console.log("addText :txt VIDE : not added ")
        return added;
    }

    var div = document.getElementById(idDiv);
    if (div != null) {
        div.innerHTML += txt;
        added = true;

        console.log("addText :txt Added ")


    } else {
        console.log("ERROR: addText : div NOT EXIST !! [" + idDiv + "]")
    }

    return added;
}

//////////////////////////////////////////////////////////////
function removeText(idDiv, txt) {

    var ok = false;

    if (txt == null) txt = "";
    txt = txt.trim();

    if (isEmpty(txt)) return ok;

    var div = document.getElementById(idDiv);
    if (div != null) {
        var html = div.innerHTML;

        var tab = html.split(" ")
        var s = "";
        for (var i = 0; i < tab.length; i++) {
            if (tab[i] != txt) {
                s += " " + tab[i]
            } else {
                ok = true;
            }
        }

        s = s.trim();

        div.innerHTML = s;
        ok = true;
    } else {
        console.log("ERROR: removeText : div NOT EXIST !! [" + idDiv + "]")
    }

    return ok;
}

//////////////////////////////////////////////////////////////
/**
 * TODO 
 * @param {*} idDiv 
 * @param {*} nb 
 */
function animateHeight(idDiv, nb) {
    var div = document.getElementById(idDiv);
    if (div != null) {
        var h0 = div.style.height;
        //TODO
    } else {
        console.log("ERROR: animateHeight : div NOT EXIST !! [" + idDiv + "]")
    }
}

//////////////////////////////////////////////////////////////

function setWidthDiv(idDiv, w) {

    // console.log("DBG setWidthDiv DEB idDiv, w:", idDiv, w)

    // var div = document.getElementById(idDiv);
    // console.log("DBG setWidthDiv div:", div)

    // var obj = $('#' + idDiv);
    // console.log("DBG setWidth: idDiv, w, obj", idDiv, w, obj)
    // if (obj != null) {
    //     console.log("DBG obj not NULL")
    //     // obj.style("width", w+"")
    //     // obj.width("width", '"' + w + '"')
    //     obj.style("width", w)

    //     console.log("DBG ap setWidth")
    // } else {
    //     console.log("ERROR: setWidth : div NOT EXIST !! [" + idDiv + "]")
    // }

    // console.log("DBG setWidthDiv FIN idDiv, w:", idDiv, w)

}

//////////////////////////////////////////////////////////////

function readTextFromClipBoard(fctRes) {

    navigator.clipboard.readText().then(text => {
        fctRes(text);
    })

}

//////////////////////////////////////////////////////////////

function copyTextFromText3(txt, fctRes) {

    if (txt == null) txt = ""

    let textArea = document.getElementById("clipboard")
    if (textArea == null) {
        textArea = document.createElement("clipboard");
        textArea.style.height = "0px";
        textArea.style.width = "0px";
        document.body.appendChild(textArea);
    }
    textArea.value = txt;
    $(textArea).focus();
    $(textArea).select();
    return new Promise((res, rej) => {
        // here the magic happens
        document.execCommand('copy') ? res() : rej();
        // textArea.remove();
        openPopup(null, getTag("h2", "Le text est copié dans le press papier. \n\n Vous pouvez le coller ailleurs."))
    });
}

function copyTextFromText2(txt, fctRes) {

    if (txt == null) txt = ""

    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        openPopup(null, getTag("h2", "Le text est copié dans le press papier. \n\n Vous pouvez le coller ailleurs."))
        return navigator.clipboard.writeText(txt);
    } else {
        // text area method
        copyTextFromText3(txt, fctRes)
    }


}

//////////////////////////////////////////////////////////////

function copyTextFromDiv(idDiv, isHtml, sepFromTab, fctRes) {

    // dbg("copyTextFromDiv idDiv", idDiv)

    if (isEmpty(isHtml) || isHtml == "true") isHtml = true;
    else isHtml = false;

    var txt = "";

    var div = document.getElementById(idDiv);
    if (div) {
        if (isHtml) txt = div.innerHTML;
        else txt = div.innerText;
        if (!isEmpty(sepFromTab)) {
            txt = txt.replaceAll("\t", sepFromTab)
        }

        copyTextFromText2(txt, fctRes)

    } else {
        console.log("ERROR: copyTextFromDiv : div NOT EXIST !! [" + idDiv + "]")
    }

    // dbg("copyTextFromDiv txt", txt)

}

function space(n) {
    var sp = "&nbsp;";
    var s = ""
    if (isEmpty(n)) n = 1
    for (var i = 1; i <= n; i++) {
        s += sp;
    }
    return s;
}

//////////////////////////////////////////////////////////////

function showDiv(idDiv, txt, isAddClassShow) {
    removeClass(idDiv, "hide")
    if (isAddClassShow == true || isAddClassShow == 'true') addClass(idDiv, "show")
    setText(idDiv, txt)
}
//////////////////////////////////////////////////////////////
function hideDiv(idDiv) {
    removeClass(idDiv, "show")
    addClass(idDiv, "hide")
}
//////////////////////////////////////////////////////////////
function isVisible(idDiv) {
    // console.log("DBG isVisible idDiv=" + idDiv)
    var ok = true;
    var list = getClassList(idDiv)
    // console.log("DBG isVisible list=" + list)
    if (list != null) {
        if (isElementInArray(list, "hide")) ok = false;
        else if (isElementInArray(list, "show")) ok = true;
        else ok = true;
    }

    var div = document.getElementById(idDiv)
    if (div != null && div.style != null) {
        // console.log("DBG isVisible style=" , div.style )
        var display = div.style.display
        // console.log("DBG isVisible display=" + display)
        if (display == "none") {
            ok = false;
        }
    } else {
        ok = false;
    }

    // console.log("DBG isVisible ok=" + ok)

    return ok;
}
//////////////////////////////////////////////////////////////
function showHideDiv(idDiv, txt, isAddClassShow) {

    var isVis = isVisible(idDiv)

    // dbg("showHideDiv debut", idDiv, isVis)

    if (isVis) hideDiv(idDiv)
    else showDiv(idDiv, txt, isAddClassShow)

    isVis = !isVis

    // dbg("showHideDiv after : ", idDiv, isVis)

    return isVis

}

//////////////////////////////////////////////////////////////

function showHideZone(id_zone, id_btn, titlePlus) {
    if (isEmpty(titlePlus)) titlePlus = ""
    var isVis = showHideDiv(id_zone);

    var sign = isVis ? " - " : " + "
    if (!isEmpty(titlePlus)) {
        sign += " " + titlePlus
    }
    setText(id_btn, sign);
}

function showHideZones(id_zones, id_btn, titlePlus) {

    dbg("showHideZones", id_zones, id_btn, titlePlus)


    if (isEmpty(titlePlus)) titlePlus = ""
    var id_zone = id_zones[0]
    var isVis = showHideDiv(id_zone);
    // console.log("DBG showHideZones isVis i=" + 0 + " : " + isVis)
    for (var i = 1; i < id_zones.length; i++) {
        if (id_zones[i] != null) {

            var isVisI = showHideDiv(id_zones[i]);
            console.log("DBG showHideZones isVis i=" + i + " : " + isVisI, id_zones[i])
        }
    }
    var sign = isVis ? " - " : " + "
    if (!isEmpty(titlePlus)) {
        sign += " " + titlePlus
    }

    // console.log("================================")
    // dbg("showHideZones", id_zones, id_btn, titlePlus, id_zone, isVis, sign)
    // console.log("================================")


    setText(id_btn, sign);
}

/**
 * 
 * @param {*} id_zone 
 * @param {*} id_btn 
 * @param {*} zone_title 
 * @param {*} zone_label 
 * @param {*} bgColor 
 * @param {*} is_closed 
 * @param {*} width_all 
 * @param {*} id_zone_autre 
 * @returns 
 */
function gen_btn_showHideZone(id_zone, id_btn, zone_title, zone_label, bgColor, is_closed, width_all, id_zone_autre) {
    if (isEmpty(zone_label)) zone_label = ""
    if (isEmpty(bgColor)) bgColor = "lightblue"
    if (isEmpty(is_closed)) is_closed = false
    if (isEmpty(width_all)) width_all = "98%"

    // console.log("================================")
    // dbg("gen_btn_showHideZone", id_zone, id_btn, zone_name, titlePlus, bgColor, is_closed, width_all, id_zone_autre)
    // console.log("================================")


    var title = is_closed ? " + " : " - "

    // if (!isEmpty(titlePlus)) {
    //     title += " " + titlePlus
    // }

    // var objAttrsTitle = {}
    // title = getTag("h4", title, objAttrsTitle)

    // var args = quote(id_zone) + "," + quote(id_btn) + "," + quote(titlePlus)
    var args = "[" + quote(id_zone) + "," + quote(id_zone_autre) + "], " + quote(id_btn)
    var objAttrsBtn = { id: id_btn, onclick: 'showHideZones(' + args + ')', title: 'Show Hide ' + zone_title, class: "button4 " }
    var objAttrsLabel = { id: id_btn + "_label", class: "" }

    var objStyleBtn = { "text-align": "center", width: "40px" }
    if (!isEmpty(bgColor)) objStyleBtn["background-color"] = bgColor

    var objStyleLabel = { "text-align": "center", "margin-left": "20px" }
    if (!isEmpty(bgColor)) objStyleLabel["background-color"] = bgColor

    var objStyleAll = { width: width_all, "text-align": "left" }
    if (!isEmpty(bgColor)) objStyleAll["background-color"] = bgColor

    var btn = getTag("button", title, objAttrsBtn, objStyleBtn)

    var label = getTag("span", zone_label, objAttrsLabel, objStyleLabel)

    return getTag("div", getTag("h4", btn + label), { class: "arrondi" }, objStyleAll);
}

//////////////////////////////////////////////////////////////

function quote(myVar) {
    return "'" + myVar + "'"
}

//////////////////////////////////////////////////////////////
function getStyleCell(width, is_word_break, text_align) {
    var style = "";

    var style_width = " ";
    if (width != null && width != "") { style_width = 'width: ' + width + '; ' }

    if (text_align == null || text_align == "") text_align = "left";
    var style_align = 'text-align: ' + text_align + '; ';

    if (is_word_break == null || is_word_break == "") is_word_break = true;
    var style_word_break = "";
    if (is_word_break) style_word_break = "word-break: break-all; ";

    style = style_word_break + style_width + style_align;

    return style;
}

///////////////
function getBold(col) {
    return '<b>' + col + '</b>'
}

/////////

function isEmpty(col) {
    return col == null || col + "" == "" || col + "" == "undefined"
}
///////////
function getArrayOfArrays(tab_lines, sep) {
    var arr = []

    if (isEmpty(sep)) sep = "";

    if (!isEmpty(tab_lines)) {
        for (var i = 0; i < tab_lines.length; i++) {
            arr[i] = tab_lines[i].split(sep)
        }
    }

    return arr;
}

function getBtnCopyPressPapier(idDiv) {

    var x = "20px";

    var fct_onclick = "";
    fct_onclick += "copyTextFromDiv('" + idDiv + "', false, null, null)";

    var marge_btn = "5px"

    var img = getTag("img", "", { "width": x, "height": x, "title": "Copy to Xls", "class": "button3 border ", src: "img/xls.jpg", onclick: fct_onclick }, null)
    var btn = getTag("button", img, { class: "button4" }, { "margin-top": marge_btn, "margin-bottom": marge_btn, "margin-left": marge_btn })
    // var txt = getTag("div", btn, {class:"border leftAll"}, null)

    return btn;
}

function getFileWithSlash(f) {
    if (f == null) {
        return null;
    }
    return f.replaceAll("\\", "/").replaceAll("//", "/");
}

function getBaseName(f) {
    if (f == null) {
        return null;
    }
    f = getFileWithSlash(f);
    var tab = f.split("/")
    return tab[tab.length - 1];
}

function getFileName(f) {
    if (isEmpty(f)) {
        return null;
    }
    return getBaseName(f)
}

function getDirName(f) {
    if (isEmpty(f)) {
        return null;
    }
    f = getFileWithSlash(f);
    var tab = f.split("/")
    return tab[tab.length - 2];
}

// Log.1145_CR5530_LOT_BNK0051_W.CNT_Item.TIME20221110103734.csv
function getLogNameOfFileName(f) {
    var fname = getFileName(f)
    var tab = fname.split(".")
    return tab[2]
}

function getPrefixLogOfLogName(f) {
    return f == null ? "" : f.substr(0, 3)
}

function getPrefixLogOfFileName(f) {
    var logName = getLogNameOfFileName(f)
    return getPrefixLogOfLogName(logName)
}

function getNN(x) {
    if (x < 10) x = "0" + x;
    return x;
}

function get_val_from_div(idDiv) {
    return $("#" + idDiv).val()
}

// function getValue(id) {
//     var res = ""
//     var div = document.getElementById(id)

//     if (div != null) {
//         console.log(div)
//     } else {
//         console.log("getValue : ERROR : DIV NOT EXIST ID=" + id)
//     }
//     return res;
// }

function set_val_from_div(idDiv, val) {
    return $("#" + idDiv).val(val)
}

function click_div(idDiv) {

    if (!isEmpty(idDiv)) {

        var obj = $("#" + idDiv)
        if (obj != null) {
            obj.click()
        } else {
            console.log("click_div : ERROR : DIV NOT EXIST idDiv=" + idDiv)
        }
    } else {
        console.log("click_div : ERROR 2: DIV NOT EXIST idDiv=" + idDiv)
    }

}

function click_div2(idDiv) {
    var elem = document.getElementById(idDiv);

    var clickEvent = new Event('click'); // Create the event.
    elem.dispatchEvent(clickEvent);    // Dispatch the event.
}

function insertAt(array, index, ...elements) {
    array.splice(index, 0, ...elements);
}

function goto_element_jq(id, wait_ms) {

    var div = document.getElementById(id)

    if (div != null) {

        if (isEmpty(wait_ms)) wait_ms = 100

        $('html, body').animate({
            scrollTop: $("#" + id).offset().top
        }, wait_ms)
    } else {
        console.log("goto_element_jq : ERROR : DIV NOT EXIST ID=" + id)
    }

}

function goto_element_js(id) {

    var div = document.getElementById(id)

    if (div != null) {

        div.scrollIntoView({ block: 'center', behavior: 'smooth' });

        // div.scrollIntoView(true);

        // try {
        //     $("#" + id).fadeOut(500);
        //     $("#" + id).fadeIn(1000);
        // } catch (error) {
        //     console.log("goto_element_js : ERROR=" + error)
        // }

    } else {
        console.log("goto_element_js : ERROR : DIV NOT EXIST ID=" + id)
    }

}

function add_cols_on_begin(linesIn, tab_col_to_add) {

    if (linesIn == null || linesIn.length == 0) {
        return linesIn
    }

    var lines = linesIn;
    if (tab_col_to_add != null && tab_col_to_add.length > 0) {
        var nb_check = tab_col_to_add.length
        for (var i = tab_col_to_add.length - 1; i >= 0; i--) {
            lines = add_col_on_begin(lines, tab_col_to_add[i], nb_check)
        }
    }
    return lines;
}

function add_col_on_begin(linesIn, col_to_add, nb_check) {

    // console.log("*** DBG linesIn:", linesIn)

    if (linesIn == null || linesIn.length == 0) {
        return linesIn
    }

    if (linesIn[0] == null || linesIn[0].length == 0) {
        return linesIn
    }

    // for (var i = 0; i < linesIn.length; i++) {
    //     console.log("****DBG linesIn(i): ", i, linesIn)
    // }

    var lines = []

    if (isEmpty(nb_check)) nb_check = 1

    // console.log("****DBG linesIn[0]: ", i, linesIn[0])
    for (var i = 0; i < nb_check; i++) {
        // console.log("****DBG linesIn[0][i]: ", i, linesIn[0][i])
        if (linesIn[0][i].trim() == col_to_add) {
            lines = linesIn
            return lines;
        }
    }


    var indColToAdd = -1
    for (var i = 0; i < linesIn[0].length; i++) {
        if (linesIn[0][i].trim() == col_to_add) {
            indColToAdd = i
            break;
        }
    }

    if (indColToAdd >= 0) {
        for (var i = 0; i < linesIn.length; i++) {
            var line = linesIn[i]
            insertAt(line, 0, line[indColToAdd])
            lines.push(line)
        }
    } else {
        lines = linesIn;
    }

    return lines
}

function delete_last_empty_cols(lines, minIndicCol) {

    if (isEmpty(minIndicCol)) minIndicCol = 0;

    if (lines != null && lines.length > 1) {
        var is_col_empty = true;
        var k = lines[1].length - 1
        var nb_tour = 0
        while (is_col_empty && k > minIndicCol) {
            nb_tour++

            for (var i = 1; i < lines.length; i++) {
                var line = lines[i]
                var col = line.length > k ? line[k] : ""
                if (col != "") {
                    is_col_empty = false;
                    break;
                }
            }

            if (is_col_empty) {
                for (var i = 0; i < lines.length; i++) {
                    lines[i].pop()
                }
            }

            k = lines[1].length - 1

        }
    }
}

function addObjOfValIntToObjGlobal(map1, map2) {
    for (var key in map1) {
        var val1 = map1[key]
        var val2 = map2[key]
        if (val2 == null) {
            val2 = 0
        }
        map2[key] = val1 + val2
    }
}

function sortObjOfValIntByValueDesc(obj) {
    let sortable = [];
    for (var k in obj) {
        sortable.push([k, obj[k]]);
    }

    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });

    let nb = sortable.length;

    let objSorted = {}
    sortable.forEach(function (item) {
        objSorted[item[0]] = item[1]
    })

    return [objSorted, nb];
}

function sortObjByValues(obj) {
    var sorted = Object.keys(obj).sort((a, b) => obj[a].localeCompare(obj[b]))
        .reduce((acc, key) => { acc[key] = obj[key]; return acc; }, {});
    return sorted;
}

function sortObjByPropOfValue(obj, prop, ascDesc) {
    if (isEmpty(ascDesc)) ascDesc = "Asc"

    var sorted;
    if (ascDesc == "Asc") {
        sorted = Object.keys(obj).sort((a, b) => obj[a][prop].localeCompare(obj[b][prop]))
            .reduce((acc, key) => { acc[key] = obj[key]; return acc; }, {});
    } else {
        sorted = Object.keys(obj).sort((a, b) => obj[b][prop].localeCompare(obj[a][prop]))
            .reduce((acc, key) => { acc[key] = obj[key]; return acc; }, {});
    }

    return sorted;
}

function sortMapIntByValueDesc(map) {
    map[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    }
}

function getValueTextFromHtmlText(xmlString) {
    // var xmlString = "<div id='foo'><a href='#'>Link</a><span></span></div>";
    var doc = new DOMParser().parseFromString(xmlString, "text/xml");
    // console.log(doc.firstChild.innerHTML); // => <a href="#">Link...
    // console.log(doc.firstChild.firstChild.innerHTML); // => Link
    var s = doc
    // var ch = doc
    // while (ch != null) {
    //     s = ch 
    //     ch = ch.firstChild
    // }
    s = s.firstChild

    return JSON.stringify(s);

}

function searchInCurentPage(txt) {
    if (document.body.createTextRange) {
        var textRange = document.body.createTextRange();
        textRange.collapse(true);
        if (textRange.findText(txt)) {
            // countString(txt) > 1 ? textRange.execCommand("BackColor", false, "#FF6600") : textRange.execCommand("BackColor", false, "yellow");
            textRange.execCommand("BackColor", false, "yellow");
            textRange.collapse(false);
        }
        else {
            //NotFounds.push(txt);
        }
    }
}

////////////

function execute_after_delay(fct, ms) {
    setTimeout(fct, ms);
}

////////////////////

function getBandWidthMb() {
    return navigator.connection.downlink;
}

/////////////////////
/**
 * 
 * @param {*} fct 
 */
function executeFunctionByString(fct) {
    if (!isEmpty(fct)) {
        const F = new Function(fct);
        F()
    }
}

///////////////////

function renomerCol(iCol, tab_lines, colNew) {
    tab_lines[0][iCol] = colNew
}

function deleteCol(iCol, tab_lines) {
    for (var i = 0; i < tab_lines.length; i++) {
        var line = tab_lines[i]
        var line2 = []
        for (var j = 0; j < iCol && j < line.length; j++) {
            line2.push(line[j])
        }

        for (var j = iCol + 1; j < line.length; j++) {
            line2.push(line[j])
        }

        tab_lines[i] = line2
    }
}

//////////////
function bidon_main() {
    console.log("main")
}
//////////////////

console.log("************* BAND_WIDTH (Mb) : " + getBandWidthMb())