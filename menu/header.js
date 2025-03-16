// ===== ELEMENTIDE LOOMINE =====
// Loome header elemendi kohe kui skript laetakse, et vältida vilgutamist
// See aitab vähendada visuaalset "hüppamist" lehe laadimisel
const header = document.createElement('header');
const nav = document.createElement('nav');
// Lisame navigatsiooni elemendi päisesse
header.append(nav);

// ===== LEHTEDE LOENDI MÄÄRAMINE =====
// Määrame lehtede loendi koos pealkirjade ja URL-idega
// Iga leht on objekt, mis sisaldab pealkirja (title) ja URL-i (url)
const pages = [
    { title: 'Avaleht', url: 'index.html' },
    { title: 'Teenused', url: 'teenused.html' },
    { title: 'Kontakt', url: 'kontakt.html' }
];

// ===== AKTIIVSE LEHE TUVASTAMINE =====
// Määrame praeguse lehe nime, võttes selle URL-ist
// window.location.pathname annab meile täispika URL tee (nt '/minuleht/teenused.html')
// .split('/') jagab tee osadeks kasutades '/' eraldajana, tulemuseks massiiv
// .pop() võtab massiivi viimase elemendi ehk faili nime
// Kui URL on tühi (nt avaleht), siis || operaator tagastab 'index.html'
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// ===== NAVIGATSIOONILINGI LOOMINE =====
// Funktsioon üksiku navigatsioonilingi loomiseks
// Võtab argumendiks objekti, mis sisaldab lingi pealkirja (title) ja URL-i (url), see objekt tuleb pages massiivist.
const createNavLink = ({title, url}) => {
    // Loome uue <a> elemendi
    const link = document.createElement('a');
    // Määrame lingi sihtkoha
    link.href = url;
    // Määrame lingi teksti sisu
    link.textContent = title;
    // Kui see on praegune leht, lisame 'active' klassi
    // See võimaldab aktiivset lehte CSS-iga eristada
    if (currentPage === url) {
        link.classList.add('active');
    }
    return link;
};

// ===== NAVIGATSIOONIMENÜÜ KOOSTAMINE =====
// Lisame navigatsioonilingid nav elemendi sisse
// Kasutame map'i, et luua iga lehe jaoks link, ja spread operaatorit (...),
// et lisada kõik lingid korraga
// nav on HTML element, kuhu me tahame menüü linke lisada
// pages on massiiv (array), kus on info kõikide lehtede kohta
// map on meetod, mis käib läbi kõik elemendid masiivis
// createNavLink on funktsioon, mis loob ühe menüülingi
// append lisab elemendid menüüsse
nav.append(...pages.map(createNavLink));
// sama asi vanemas versioonis:
// for (let page of pages) {
//     const link = createNavLink(page);
//     nav.appendChild(link);
// }

// ===== PÄISE LISAMINE DOKUMENDILE =====
// Lisame päise dokumendi body elemendi algusesse

// See kood peab asuma faili lõpus, sest:
// 1. Enne seda peab header element olema loodud ja seadistatud
// 2. document.body peab olema kättesaadav (DOM peab olema laaditud)
// 3. Kood täidetakse järjekorras ülevalt alla, seega kõik vajalikud 
//    elemendid ja funktsioonid peavad olema eelnevalt defineeritud
document.body.prepend(header);



// ===== KOKKUVÕTE =====
// Kogu protsessi selgitus inimkeeles:

// 1. Kõigepealt loome veebilehele päise (header) ja navigatsioonimenüü (nav) elemendid
//    - Päis on veebilehe ülemine osa, kus tavaliselt asub navigatsioon
//    - Navigatsioon sisaldab linke, mis viivad erinevate lehtedele

// 2. Määrame lehtede loendi, mis sisaldab kõiki menüüs kuvatavaid lehti
//    - Iga leht on objekt, millel on pealkiri (title) ja URL (url)
//    - Meie lehel on kolm lehte: Avaleht, Teenused ja Kontakt

// 3. Määrame, milline leht on praegu aktiivne
//    - Võtame praeguse lehe URL-i ja eraldame sealt faili nime
//    - Kui oleme avalehel, siis URL võib olla tühi, sel juhul kasutame 'index.html'

// 4. Loome funktsiooni, mis teeb iga menüülingi jaoks <a> elemendi
//    - Funktsioon võtab sisendiks objekti, kus on lehe pealkiri ja URL
//    - Loome <a> elemendi, määrame selle href atribuudi ja teksti sisu
//    - Kui link viitab praegusele lehele, lisame sellele 'active' klassi, et seda CSS-iga esile tõsta

// 5. Lisame kõik lingid navigatsioonielementi
//    - Kasutame map() meetodit, et luua iga lehe jaoks link
//    - Kasutame spread operaatorit (...), et lisada kõik lingid korraga
//    - Alternatiivina võiks kasutada ka tsüklit (for), mis lisab iga lingi eraldi

// 6. Lõpuks isame päise (header) dokumendi algusesse

// 7. Tulemusena on veebilehel nüüd navigatsiooniriba, mis:
//    - Näitab kõiki saadaolevaid lehti
//    - Märgib ära, millisel lehel kasutaja praegu on
//    - Võimaldab kasutajal lihtsalt liikuda erinevate lehtede vahel
