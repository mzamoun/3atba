
var username = ""

function onMenuLoginClickTest() {
    var compoLogin = getCompoFormLogin();

    openPopup("Login", compoLogin, "500px", "300px", [
        {
            label: "Ok", fct: function () {
                alert("Ok");
                openClosePopup();
            }
        },
        {
            label: "Cancel", fct: function () {
                alert("Cancel");
                openClosePopup();
            }
        }
    ])
}

//////////////////////////////////////////////////////////////////////////
/**
 * 
 * @param {*} context : login, isAdmin
 * @returns 
 */
function showCompoLoginPopup(context) {

    var compoLogin = getCompoFormLogin(context);

    openPopup("Login", compoLogin, "600px", "500px", [])
}


/**
 * 
 * @param {*} context : login, isAdmin
 * @returns 
 */
function getCompoFormLogin(context) {

    var btn_width = "77%"
    var btn_marge_left = "10%"
    var btn_marge_right = "10%"

    var title = "Connexion"
    if (context == "isAdmin") title = "Is Admin"

    var s = '<div class="center" >';
    s += '<link rel="stylesheet" href="css/Login.css">\n'
    s += '<form id="formLogin" class="center">';

    s = s + ' <div class="login center">'

    s += getTag("h3", title, { class: "center" })

    s += getTag("h4", "", { class: "KO_TXT hide", id: "login_error" })

    s += getTag("input", "", { id: "username", type: "text", placeholder: "Email", autocomplete: "username", class: "center" }, { width: "90%", "margin-left": "0", "margin-right": "0" })
    s += getTag("input", "", { id: "password", type: "password", placeholder: "Password", autocomplete: "current-password", class: "center" }, { width: "90%", "margin-left": "0", "margin-right": "0" })

    s += getTag("input", "", { type: "submit", id: "btnLogin", value: "Sign In", onclick: "onLoginClick(event" + "," + quote(context) + ")", class: "btnLogin center" }, { width: btn_width, "margin-left": btn_marge_left, "margin-right": btn_marge_right })

    if (context == "login") {
        s += getTag("input", "", { type: "button", id: "btnNewPassword", value: "New Password", onclick: "onNewPasswordClick(event)", class: "btnLogin center" }, { width: btn_width, "margin-left": btn_marge_left, "margin-right": btn_marge_right })
        // s +=  getTag("input", "", {type:"button", id:"btnForgotPassword", value:"Forgot Password"v, onclick:"onForgotPasswordClick(event)"}) 
    }

    s += getTag("input", "", { type: "button", id: "btnCancel", value: "Cancel", onclick: "onCancelClick(event)", class: "btnLogin center" }, { width: btn_width, "margin-left": btn_marge_left, "margin-right": btn_marge_right })

    s += ' </div>'

    s += '</form>'

    s += '<script>'
    s += '$(document).ready(function(){\n'
    // s += '   addEventValidUsername(["btnLogin", "forgotPassword", "btnResetPassword"]);\n'
    s += ' }); \n'
    s += '</script>'

    s += "</div>"

    return s;
}

/////////////////////////


function onCancelClick(e) {
    e.preventDefault();
    openClosePopup();
}

function onLoginClick(e, context) {
    username = ""

    e.preventDefault();
    console.log("DBG onLoginClick ", e)
    var data = {
        cmd: context,
        login: {
            username: $("#username").val(),  // Nous récupérons la valeur de nos input que l'on fait passer à connexion.php
            password: $("#password").val(),
        }
        // callbackFun : 'onLogin'
    };

    var msgErr = "Login/Pass Faild"
    if (context == "isAdmin") {
        msgErr = "Only For Admin. Please, contact your administrator."
    }

    call_server_generique(data,
        function (result) {
            var isAdmin = result.login.isAdmin;
            console.log("=============================")
            console.log("DBG isAdmin : ", isAdmin)
            console.log("=============================")
            if (isAdmin) {
                username = $("#username").val()
                showDiv("div_param")
                hideDiv("edit_param")
                openClosePopup();
                setCookie("username_" + context, username);
                addClass("userConnected", "cadreSimple")
                addClass("userConnected", "button")
                showDiv("userConnected", username)
            } else {
                hideDiv("div_param")
                showDiv("login_error", msgErr)
            }
        },
        function (error) {
            showDiv("login_error", msgErr + ". Error=" + JSON.stringify(error))
        },
    )
}

function saveLoginInBrowser() {
    setCookie("username", username);
}
function restoreLoginInBrowser() {
    // username = getCookie('username');
}

function getUsernameConnected() {
    var usernameLogin = getCookie("username_login");
    var usernameAdmin = getCookie("username_isAdmin");
    var username = ""
    if (!isEmpty(usernameLogin)) username = usernameLogin
    else if (!isEmpty(usernameAdmin)) username = usernameAdmin

    return username;
}

function isConnected() {
    var usernameLogin = getCookie("username_login");
    var usernameAdmin = getCookie("username_isAdmin");
    return !isEmpty(usernameLogin) || !isEmpty(usernameAdmin)
}
function isAdminConnected() {
    var username = getCookie("username_isAdmin");
    return !isEmpty(username)
}

function deconnexion() {
    setCookie("username_login", "")
    setCookie("username_isAdmin", "")
    showDiv("userConnected", "")
    removeClass("userConnected", "cadreSimple")
    removeClass("userConnected", "button")
    showDiv("edit_param")
    hideDiv("div_param")
    openClosePopup()


}

function setCookie(cname, cvalue) {
    localStorage.setItem(cname, cvalue);
}

function getCookie(cname) {
    return localStorage.getItem(cname);;
}

function showPopupUserConnected(fct_decoonexion_spec) {
    var username = getUsernameConnected()
    if (!isEmpty(username)) {
        var s = ""
        var btnDeconnect = getTag("button", "Deconnexion", { class: "button", onclick: "deconnexion(); " + fct_decoonexion_spec + "; " })
        s += getDivSep(30)
        s += btnDeconnect
        // var div = getTag("div", s, {}, { width: "500px", height: "250px" })
        var div = s
        openPopup(username, div, "500px", "300px")
    }
}

function showLoginWindow() {
    showCompoLoginPopup('isAdmin')
}
