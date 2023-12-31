function showAcceuil() {
    hideInfos();
        var html = getElement('h1', null, 'مرحبا بكم في عتبة مربوحة: اتصال عقاري') + '<br>' ;
        html += getElement('h1', null, 'Bienvenue chez 3ATBA MARBOUHA : Mise en relation immobiliers ') + '<br>' ;

    showCompo( html);
}

function getBtnLogin() {
    hideInfos();
        var html = '' ;

        var classBtn = "btnMenu"

        if(!isConnected()) {
            html += '<br>'+getElement('button', {class:classBtn, onclick:"showLogin()" }, 'Login') + '<br>' ;
        }else {
            html += '<br>'+getElement('button', {class:classBtn, onclick:"openMenuUser(event)" }, 'Show Profil Menu') + '<br>' ;
        }
        
        return html ;
    // showCompo( html);
}

function onClickLogoAcceuil(ev) {
    if(!isConnected()) {
        showLogin(ev);
    }else {
        openMenuUser(ev);
    }
}

function getCompoPersonPrez(prenom, nom, fonction, desc) {
    var urlImage = "img/"+prenom + '_' + nom + '.jpg';

    var s = getElement('img', {src:urlImage}, '')+
    getElement('h3', null, prenom + ' ' + nom)+
    getElement('h4', null, fonction)+
    getElement('p', null, '')+
    getElement('h4', null, desc)
    ;

    return s;
}

function showInfos() {
    hideInfos();
    showCompo(
         '<link rel="stylesheet" href="table.css">\n'+
         getElement('h1', null, 'Who we are ?')+
         getElement('p', null, 'We are a group of ambitious algerians with a shared goal')+'<br>'+
         getElement('table', null, 
             getElement('tr', null, 
                getElement('td', {class:"center"}, 
                    getCompoPersonPrez('Ahmed', 'Laouedj', 'Founder', 'I decided to return to my country to participate in its development with the help of all my Algerian compatriots.')
                    ) 
                + getElement('td', {class:"center"}, 
                    getCompoPersonPrez('Mohamed', 'Masmoudi', 'Co-Founder', 'Always looking to learn and take on new challenges that keep me active in a very competitive professional atmosphere.')
                ) 
             )
         )

         
         );
}
