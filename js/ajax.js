function test(s) {
    // alert(s)
    openPopup("infos", getTag("h2", s))
}

var idDiv_traitement_en_cours = "traitement_en_cours";
function showTraitementEncours(tag) {
    var id = idDiv_traitement_en_cours + tag

    var dial = $('<div></div>').appendTo('body');
    dial.attr('id', id);

    // var dial = $("#" + id);
    if (dial != null) {
        dial.attr("class", "show");
        dial.dialog(
            {
                title: tag,
                modal: true,
                buttons: {
                    Close: function () {
                        $(this).dialog("close");
                    }
                }
            }
        );
    }

}

var date_deb_ajax = {}
var date_fin_ajax = {}

var date_deb_ajax_str = {}
var date_fin_ajax_str = {}

var time_exec_ajax = {}

function ajaxPostDeb(tag) {
    date_deb_ajax[tag] = new Date()
    date_deb_ajax_str[tag] = getDateTimeStrIso(date_deb_ajax[tag])
    showTraitementEncours(tag);
}

function ajaxPostFin(tag) {
    date_fin_ajax[tag] = new Date()
    date_fin_ajax_str[tag] = getDateTimeStrIso(date_deb_ajax[tag])

    time_exec_ajax[tag] = get_diff_dates_str(date_deb_ajax[tag], date_fin_ajax[tag])

    var idDialog0 = idDiv_traitement_en_cours + tag
    var div = document.getElementById(idDialog0)
    $(div).dialog("close");
    $(div).remove();

    dbg("ajaxPostFin", tag, date_deb_ajax[tag], date_fin_ajax[tag], time_exec_ajax[tag])

}

function ajaxPost(urlRelative, dataJson, fctSuccess, fctError) {

    if (isEmpty(dataJson)) dataJson = {}
    var tag = JSON.stringify(dataJson)

    ajaxPostDeb(tag);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: urlRelative,
        data: JSON.stringify(dataJson),
        dataType: 'json',
        success: function (reponse) {
            fctSuccess(reponse);
            console.log(reponse);
            ajaxPostFin(tag);
        },
        error: function (err) {
            fctError(err);
            console.log("ERROR: ", err);
            ajaxPostFin(tag);
        }
    });

}

function gotoUrl(url) {
    window.location.replace(url);
    // window.location.href = (url+"?vv="+new Date());
}

function openInNewTab(url) {
    window.open(url, '_blank').focus();
}

function downloadFileEnd() {
    IS_SELECT_LINE = true
    console.log("downloadFile END")
}

function downloadFile(filePath, idLog) {
    // path = path.replaceAll("\\n", "/")
    var fileUrl = urlRoot + "fileDownload";

    var fileName = getFileName(filePath)

    IS_SELECT_LINE = false

    console.log("downloadFile DEB")
    var tag = fileName;

    ajaxPostDeb(tag);

    $.ajax({
        url: fileUrl,
        type: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        xhrFields: {
            responseType: 'blob'
        },

        data: JSON.stringify({ filePath: filePath }),
        success: function (data) {

            dbg("*** Download : data.size : ", data.size)

            if (data.size > 0) {
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(data);
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                setTimeout(function () {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 100);
            } else {
                alert("Empty File : " + fileName)
                // if (!isEmpty(idLog)) {
                //     setText(idLog, getTag("h1", "Empty file"))
                // }
            }
            ajaxPostFin(tag);
            setTimeout(
                downloadFileEnd
                , 200
            )
        },
        error: function (error) {
            console.log('Error downloading file: ', error);
            setError(JSON.stringify(error))
            ajaxPostFin(tag);
            setTimeout(
                downloadFileEnd
                , 200
            )
        }
    });

}


//////////////
function bidon_ajax() {
    console.log("ajax")
}
//////////////////

