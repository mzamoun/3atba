



/**
 * 
 * TODO  a tester 
 * 
 * @param {*} id 
 * @param {*} val : true or false 
 */
function checkboxSetValue(id, value) {
    var obj = document.getElementById(id)

    if (value == false) {
        obj.checked = ""
    } else {
        obj.checked = "checked"
    }

    obj.value = value
    set_val_from_div(id, value)
}

function checkboxGetValue(id) {
    var obj = document.getElementById(id)

    // dbg("checkboxGetValue", obj)

    return obj.value == "true"
}

function onChangeCheckBox(obj) {
    obj.value = obj.checked
    dbg("onChangeCheckBox obj:", obj)
    dbg("onChangeCheckBox obj.id:", obj.id)
}

function getCheckBox(id, text, fct_onclick, title) {
    if (isEmpty(fct_onclick)) fct_onclick = "";

    var input = getTag("input", "", { id: id, value: "false", type: "checkbox", onchange: "onChangeCheckBox(this); " + fct_onclick, title: title })
    var span = getTag("span", "", { class: "checkmark" })
    var inside = text + input + span
    var s = getTag("label", inside, { class: "container" })
    return s;
}

/////////////////////
/**
 * 
 * @param {*} nom 
 * @param {*} options : tab of { value: 'option1', label: 'Option 1' }
 */
function ButtonRadio(nom, options) {
    this.nom = nom;
    this.options = options;
}

/**
 * 
 * @param {*} idDiv 
 * @param {*} classCss 
 * @returns 
 */
ButtonRadio.prototype.getHtml = function (idDiv, classCss) {
    if(classCss == null) {
        classCss = "radio-buttons";
    }
    var html = '<div class="'+classCss+'">';

    // Parcours des options pour créer les boutons radio
    var i = 0;
    this.options.forEach(function (option) {
        html += '<input type="radio" id="' + this.nom + i + '"  name="' + this.nom + '" value="' + option.value + '">';
        html += '<label>' + option.label + '</label><br>';
        i++;
    });

    html += '</div>';

    if (idDiv != null && idDiv != "") {
        var target = document.getElementById(idDiv);
        if (target != null) {
            target.innerHTML = html;
        }
    }
    return html;
};

/**
 * 
 * @returns { value: 'option1', label: 'Option 1' }
 */
ButtonRadio.prototype.getOptionChecked = function () {
    var selectedOption = document.querySelector('input[name="'+this.nom+'"]:checked');

    if (selectedOption) {
        console.log("Option sélectionnée : ", selectedOption.value);
    } else {
        console.log("Aucune option sélectionnée.");
    }

    return selectedOption;
};

        /////////////////////
        /**
         * 
         * @param {*} nom 
         * @param {*} options : tab of { value: 'option1', label: 'Option 1' }
         */
        function ButtonRadio(nom, options, isVertical) {

            console.log("ButtonRadio, isVertical:", isVertical)

            if (isVertical === null || isVertical === "") {
                isVertical = true;
                console.log("ButtonRadio, isVertical: 2 ", isVertical)
            }

            
            this.nom = nom;
            this.options = options;
            this.isVertical = isVertical;

            console.log("ButtonRadio, this.isVertical:", this.isVertical)
            
            /**
             * 
             * @param {*} idDiv 
             * @param {*} classCss 
             * @returns 
             */
            this.getHtml = function (idDiv, classCss) {

                console.log("getHtml(), this:", this)
                console.log("getHtml(), this.isVertical:", this.isVertical)

                if (classCss == null) {
                    classCss = "radio-buttons";
                }
                var html = '<div class="' + classCss + '">';

                const saut = this.isVertical === true ? "<br>" : "";

                // Parcours des options pour créer les boutons radio
                for (var i = 0; i < options.length; i++) {
                    var option = options[i];
                    html += '<input type="radio" id="' + this.nom + i + '"  name="' + this.nom + '" value="' + option.value + '" label="' + option.label + '" >';
                    html += '<label id="' + 'label_' + this.nom + i + '" for="' + this.nom + i + '" >' + option.label + '</label>' + saut;
                }

                html += '</div>';

                if (idDiv != null && idDiv != "") {
                    var target = document.getElementById(idDiv);
                    if (target != null) {
                        target.innerHTML = html;
                    }
                }
                return html;
            };

            /**
             * 
             * @returns { value: 'option1', label: 'Option 1' }
             */
            this.getOptionChecked = function () {
                var inputSelected = document.querySelector('input[name="' + this.nom + '"]:checked');
                var inputSelectedObj = $(inputSelected)
                var opt = null;

                if (inputSelected) {
                    console.log("input sélectionnée : ", inputSelected);
                    console.log("Value sélectionnée : ", inputSelected.value);
                    opt = {
                        value: inputSelectedObj.attr("value"),
                        label: inputSelectedObj.attr("label"),
                    }
                } else {
                    console.log("Aucune option sélectionnée.");
                }

                return opt;
            };

            /////

            this.setOption = function (option) {
                var inputs = $('input[name="' + this.nom + '"]');
                console.log("setOption : inputs : ", inputs)
                for (var i = 0; i < inputs.length; i++) {
                    var input = $(inputs[i])
                    var label = $('#label_' + this.nom + i);
                    console.log("input", input)
                    // input.attr("c")
                    if (input.attr("value") == option.value) {
                        input.attr("checked", "checked")
                        if (option.label != null) {
                            input.attr("label", option.label);
                            label.text(option.label)
                        }
                    }
                }
            };

        }

        //////////////////////////////////

//////////////////////////////////
var map_key_select_value = {}
function select_compo_on_change(value, id_select, fct_after_select, args) {
    map_key_select_value[id_select] = value
    var div_select = document.getElementById(id_select)
    div_select.value = value;
    console.log("fct_after_select=" + fct_after_select, fct_after_select)
    if (!isEmpty(fct_after_select)) {
        window[fct_after_select](args)
    }
}

function select_compo_set_value(value, id_select) {
    dbg("select_compo_set_value", value)
    var div_select = document.getElementById(id_select)
    div_select.value = value;
    // $("#" + id_select).val(value);

    // console.log("DBG div_select:", div_select)

    var options = div_select.childNodes[0];
    // unselect all 
    for (var i = 0; i < options.length; i++) {
        console.log("DBG option:", options[i])
        options[i].removeAttribute("selected")
    }

    for (var i = 0; i < options.length; i++) {
        console.log("DBG option:", options[i])
        var val = options[i].getAttribute("value")
        if (val == value) {
            options[i].setAttribute("selected", "selected")
        }
    }

}

function select_compo_get_value(id_select) {
    var value = ""
    var div = document.getElementById(id_select)
    if (div != null) var value = div.value;
    dbg("select_compo_get_value", value)
    return value;
}
/**
 * 
 * @param {*} id_select 
 * @param {*} mapValueLabel 
 * @param {*} labelSelect 
 * @param {*} idToSet 
 * @param {*} valueDefault 
 * @param {*} fct_after_select 
 * @param {*} args 
 * @returns 
 */
function getSelect(id_select, mapValueLabel, labelSelect, idToSet, valueDefault, fct_after_select, args, widthSelect) {
    var s = ""
    var labelBefore = ""
    if (!isEmpty(labelSelect)) {
        labelBefore = getTag("label", labelSelect, { for: id_select, class: "label" })
    }
    var options = ""

    if (typeof mapValueLabel == "string") {
        var lines = mapValueLabel.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i]
            line = line.trim();
            line = line.replace("\r", "")
            if (line != "" && !line.startsWith("#") && line.indexOf("=") > 0) {
                var tab = line.split("=")
                var option = getTag("option", tab[1].trim(), { value: tab[0].trim() })
                options += option
            }
        }
    } else {
        for (var value in mapValueLabel) {
            var label = mapValueLabel[value]
            var option = getTag("option", label, { value: value })
            options += option
        }
    }

    var objStyleSelect = {}
    if (!isEmpty(widthSelect)) {
        objStyleSelect.width = widthSelect;
    }

    var select = getTag("select", options, { id: id_select, name: id_select, class: "select", onchange: "select_compo_on_change(this.value, '" + id_select + "', '" + fct_after_select + "', '" + args + "')" }, objStyleSelect)
    s = labelBefore + select + space(2)

    if (!isEmpty(idToSet)) {
        setText(idToSet, s)

        if (valueDefault != null) {
            select_compo_set_value(valueDefault, id_select)
        }
    }

    return s;
}

/**
 * 
 * @param {*} labelText 
 * @param {*} objAttrsLabel 
 * @param {*} objStyleLabel 
 * @param {*} inputValue 
 * @param {*} objAttrsInput 
 * @param {*} objStyleInput 
 * @returns 
 */
function getLabelAndInput(labelText, objAttrsLabel, objStyleLabel, inputValue, objAttrsInput, objStyleInput) {
    var s = ""

    if (isEmpty(objStyleLabel)) { objStyleLabel = {} }

    if (isEmpty(objAttrsInput)) { objAttrsInput = {} }
    if (isEmpty(objStyleInput)) { objStyleInput = {} }

    if (isEmpty(inputValue)) { inputValue = "" }
    if (isEmpty(objAttrsInput.value)) { objAttrsInput.value = inputValue }

    // "margin-top": "0px" 
    // { id: "username", type: "text", placeholder: "Email", autocomplete: "username", class: "center" }, { width: "80%", "margin-left": "5%", "margin-right": "5%" }

    var label = getTag("label", labelText, objAttrsLabel, objStyleLabel)
    var input = getTag("input", "", objAttrsInput, objStyleInput)

    s = label + input;

    return s;
}

/**
 * 
 * @param {*} btnCorp
 * @param {*} btnText 
 * @param {*} objAttrsBtn 
 * @param {*} objStyleBtn 
 * @param {*} labelText 
 * @param {*} objAttrsLabel 
 * @param {*} objStyleLabel 
 * @returns 
 */
function getBtnAndLabel(tagBtn, btnCorp, btnText, objAttrsBtn, objStyleBtn, labelText, objAttrsLabel, objStyleLabel) {
    var s = ""

    if (isEmpty(objAttrsLabel)) { objAttrsLabel = {} }
    if (isEmpty(objStyleLabel)) { objStyleLabel = {} }

    if (isEmpty(objAttrsBtn)) { objAttrsBtn = {} }
    if (isEmpty(objStyleBtn)) { objStyleBtn = {} }

    if (isEmpty(btnText)) { btnText = "" }
    if (isEmpty(objAttrsBtn.value)) { objAttrsBtn.value = btnText }

    var btn = getTag(tagBtn, btnCorp, objAttrsBtn, objStyleBtn)
    var label = getTag("label", labelText, objAttrsLabel, objStyleLabel)

    s = btn + label;

    return s;
}


/**
 * 
 * @param {*} labelName 
 * @param {*} objAttrsLabel 
 * @param {*} objStyleLabel 
 * @param {*} inputValue 
 * @param {*} objAttrsInput 
 * @param {*} objStyleInput 
 * @param {*} idTarget 
 * @param {*} fmt  :  yy-mm-dd
 * @returns 
 */
function getDatePicker(labelName, objAttrsLabel, objStyleLabel, inputValue, objAttrsInput, objStyleInput, idTarget, fmt) {
    var s = ""

    if (isEmpty(fmt)) { fmt = "yy-mm-dd" }

    if (isEmpty(objStyleLabel)) { objStyleLabel = {} }

    if (isEmpty(objAttrsInput)) { objAttrsInput = {} }
    if (isEmpty(objStyleInput)) { objStyleInput = {} }

    if (isEmpty(inputValue)) { inputValue = "" }
    if (isEmpty(objAttrsInput.value)) { objAttrsInput.value = inputValue }
    if (isEmpty(objAttrsInput.id)) { objAttrsInput.id = "datepicker" }
    if (isEmpty(objAttrsInput.class)) { objAttrsInput.class = "datepicker" }
    if (isEmpty(objAttrsInput.placeholder)) { objAttrsInput.placeholder = fmt }
    if (isEmpty(objAttrsInput.title)) { objAttrsInput.title = "yy" + fmt }
    var fct_correctDate = "this.value = correctDate(this.value); setDateStrIso('" + objAttrsInput.id + "', this.value); ";
    if (isEmpty(objAttrsInput.onchange)) { objAttrsInput.onchange = fct_correctDate }
    else { objAttrsInput.onchange = fct_correctDate + objAttrsInput.onchange }

    var label = getTag("label", labelName, objAttrsLabel, objStyleLabel)
    var input = getTag("input", "", objAttrsInput, objStyleInput)
    var btnToday = getTag("button", "T", { onclick: "setDateToday('" + objAttrsInput.id + "')", title: "set Today" }, {})

    s = label + input + btnToday;

    if (!isEmpty(idTarget)) {
        setText(idTarget, s)
        setDateFormatForDatePicker(objAttrsInput.id, fmt)
    }

    return s;
}

/**
 * 
 * @param {*} id 
 * @param {*} fmt : defalt : yy-mm-dd
 */
function setDateFormatForDatePicker(id, fmt) {

    if (isEmpty(fmt)) { fmt = "yy-mm-dd" }

    $("#" + id).datepicker({
        dateFormat: fmt
    });
}