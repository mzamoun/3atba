
function dateNow() {

    var date = new Date();

    var day = getNN(date.getDate());
    var month = getNN(date.getMonth() + 1);
    var year = date.getFullYear();
    // var hh = getNN(date.getHours());
    // var mm = getNN(date.getMinutes());
    // var ss = getNN(date.getSeconds());

    var today = day + "/" + month + "/" + year;
    return today;
}

function getDateTimeStrIso(date) {

    var day = getNN(date.getDate());
    var month = getNN(date.getMonth() + 1);
    var year = date.getFullYear();
    var hh = getNN(date.getHours());
    var mm = getNN(date.getMinutes());
    var ss = getNN(date.getSeconds());

    var today = year + "-" + month + "-" + day + "-" + hh + "-" + mm + "-" + ss;
    return today;
}

function getDateBB(date) {

    var day = getNN(date.getDate());
    var month = getNN(date.getMonth() + 1);
    var year = date.getFullYear();
    var hh = getNN(date.getHours());
    var mm = getNN(date.getMinutes());

    var today = year + month + day + "_" + hh + "_" + mm;
    return today;
}

/**
 * 
 * @param {*} date 
 * @returns yyyy-mm-dd
 */
function getDateStrIso(date) {

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    return today;
}

function get_diff_dates_str(d1, d2) {
    var ms = d2 - d1
    if (ms < 1000) return ms + " ms"
    else {
        var s = Math.floor(ms / 1000)
        if (s < 60) {
            var ms = ms % 1000
            return s + " s " + ms + " ms"
        } else {
            var mn = Math.floor(ms / 60 * 1000)
            ms = ms - mn * 60 * 1000
            var s = Math.floor(ms / 1000)
            ms = ms % 1000
            return mn + " mn " + s + " s " + ms + " ms"
        }

    }
}

/**
 * 
 * @param {*} date 
 * @param {*} nbMois 
 * @returns yyyy-mm-dd
 */
function getDateStrIsoPlusNbMois(date, nbMois) {

    var date2 = new Date(date)

    date2.setMonth(date2.getMonth() + nbMois)

    return getDateStrIso(date2);
}


/**
 * 
 * @param {*} idDiv 
 * @return yyyy-mm-dd
 */
function getDateStrIsoFromIhm(idDiv) {
    return $("#" + idDiv).val()
}

/**
 * 
 * @param {*} idDiv 
 * @param {*} dateStrIso : yyyy-mm-dd
 */
function setDateStrIso(idDiv, dateStrIso) {
    $("#" + idDiv).val(dateStrIso)
}

function setDateStrIsoFromDate(id, date) {
    var dateIhm = getDateStrIso(date);
    setDateStrIso(id, dateIhm)
}



function getTsClair(ts) {
    var s = ""
    if (!isEmpty(ts)) {
        var tab = ts.split("")
        if (tab.length > 13) {

            s = tab[0] + tab[1] + tab[2] + tab[3] //yyyy
            s += "_" + tab[4] + tab[5]  // mmm
            s += "_" + tab[6] + tab[7]  //dd
            s += "_" + tab[8] + tab[9]  //HH
            s += "_" + tab[10] + tab[11]  //MM
            s += "_" + tab[12] + tab[13]  //SS
        }

    }
    return s;
}


/**
 * 
 * @param {*} year 
 * @param {*} month >= 1
 */
function getMaxDayOfDate(year, month) {
    var d = new Date(year, month, 0);
    var max = d.getDate()
    return max;
}

/**
 * 
 * @param {*} year 
 * @param {*} month >= 1
 */
function getMaxDayOfDateIso(d) {
    var tab = d.split("-");
    var y = tab[0], m = tab[1]
    return getMaxDayOfDate(y, m);
}

/**
 * 
 * @param {*} d : yy-mm-dd
 */
function correctDate(d) {
    var tab = d.split("-");
    var y = tab[0], m = tab[1], dd = tab[2]

    if (y == "" || m == "" || dd == "") {
        return getDateStrIso(new Date())
    }
    if (isNaN(y) || isNaN(m) || isNaN(dd)) {
        return getDateStrIso(new Date())
    } else {
        if (m < 1 || m > 12 || dd < 1) {
            return getDateStrIso(new Date())
        } else {
            var maxDay = getMaxDayOfDateIso(d)
            if (dd > maxDay) {
                dd = maxDay
                return y + "-" + m + "-" + dd
            }
        }
    }

    return d;

}

function getDateFrFromYYYYMMDD(dateYYYYMMDD) {
    if (isEmpty(dateYYYYMMDD)) return "";
    return dateYYYYMMDD.substring(6, 8) + "/" + dateYYYYMMDD.substring(4, 6) + "/" + dateYYYYMMDD.substring(0, 4)

}

/**  2023_05_31_17_02_03 -> 31/05/2023 17:02 */
function getDateFrFromYYYY_MM_DD_HH_mm_ss(date) {
    if (isEmpty(date)) return "";
    var tab = date.split("_")
    var s = "/"
    return tab[2] + s + tab[1] + s + tab[0] + " " + tab[3] + ":" + tab[4]

}

/** 2023_05_31_17_02_03 */
function getDateFromYYYY_MM_DD_HH_mm_ss(date) {
    if (isEmpty(date)) return null;
    var tab = date.split("_")
    var d = new Date();
    d.setFullYear(tab[0])
    d.setMonth(tab[1] - 1)
    d.setDate(tab[2])
    d.setHours(tab[3])
    d.setMinutes(tab[4])
    d.setSeconds(tab[5])

    return d

}

/**
 * 
 * @param {*} env_dates : ENV + "_" + YYYYMMDD + "_" + YYYYMMDD + "_" + YYYYMMDD + "_" + HH_MN
 */
function getEnvDatesLabel(env_dates) {

    if (isEmpty(env_dates)) {
        return "";
    }

    var tab = env_dates.split("_")
    var env = tab[0]
    var dateDeb = getDateFrFromYYYYMMDD(tab[1])
    var dateFin = getDateFrFromYYYYMMDD(tab[2])
    var dateFile = getDateFrFromYYYYMMDD(tab[3])
    var hh = tab[4]
    var mn = tab[5]

    var sep = " | "
    var envDateDebFin = getTag("span", env + sep + dateDeb + " - " + dateFin, {}, { color: "gray" })
    return dateFile + " " + hh + ":" + mn + sep + envDateDebFin
}