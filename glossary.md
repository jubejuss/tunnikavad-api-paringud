# JavaScript mõistete sõnastik

## DOM manipuleerimine
- **document.addEventListener** - Sündmuse kuulaja lisamine dokumendile
- **DOMContentLoaded** - Sündmus, mis käivitub, kui HTML dokument on täielikult laaditud
- **getElementById** - Meetod HTML elemendi leidmiseks selle ID järgi
- **innerHTML** - Omadus HTML elemendi sisu muutmiseks
- **createElement** - Meetod uue HTML elemendi loomiseks
- **appendChild** - Meetod lapse elemendi lisamiseks vanemale
- **className** - Omadus HTML elemendi CSS klassi määramiseks
- **element.append** - Lisab elemendi sisse teisi elemente (uuem meetod)
- **element.prepend** - Lisab elemendi algusesse teisi elemente
- **document.body** - Viide HTML dokumendi body elemendile
- **element.classList.add** - Lisab elemendile CSS klassi
- **element.href** - Määrab või tagastab lingi sihtkoha
- **element.textContent** - Määrab või tagastab elemendi tekstisisu

## API ja võrgusuhtlus
- **axios** - Populaarne HTTP-kliendi teek, mida kasutatakse API päringute tegemiseks
- **baseURL** - Baas-URL, millele lisatakse kõik API päringute teed
- **GET päring** - Andmete küsimine serverist
- **POST päring** - Andmete saatmine serverisse
- **async/await** - JavaScripti süntaks asünkroonsete operatsioonide käsitlemiseks
- **try/catch** - Vigade püüdmise mehhanism, mida kasutatakse võrgupäringute vigade käsitlemiseks

## Sündmuste käsitlemine
- **addEventListener** - Meetod sündmuse kuulaja lisamiseks elemendile
- **click** - Hiirekliki sündmus
- **callback funktsioon** - Funktsioon, mis antakse teisele funktsioonile argumendina ja mida kutsutakse hiljem välja

## Andmete töötlemine ja massiivide meetodid
- **forEach** - Massiivi meetod, mis käib läbi kõik massiivi elemendid
- **reverse** - Massiivi meetod, mis pöörab massiivi elementide järjekorra ümber
- **array.map** - Loob uue massiivi, rakendades funktsiooni igale elemendile
- **array.pop** - Eemaldab ja tagastab massiivi viimase elemendi
- **Math.floor** - Meetod arvu ümardamiseks allapoole
- **Math.random** - Meetod juhusliku arvu genereerimiseks vahemikus 0-1
- **toLocaleString** - Meetod kuupäeva vormindamiseks vastavalt määratud lokaadile
- **toISOString** - Meetod kuupäeva teisendamiseks ISO formaati
- **trim** - Meetod sõne alguses ja lõpus olevate tühikute eemaldamiseks
- **string.split** - Jagab sõne massiiviks vastavalt määratud eraldajale

## Muutujad ja andmetüübid
- **const** - Konstantse muutuja deklareerimiseks
- **let** - Ploki ulatusega muutuja deklareerimiseks
- **Date objekt** - Kuupäeva ja kellaaja käsitlemiseks
- **JSON** - JavaScript Object Notation, andmeformaat objektide esitamiseks
- **Array (massiiv)** - Andmestruktuur, mis hoiab järjestatud elementide kogumit
- **Object (objekt)** - Võti-väärtus paaride kogum

## Funktsioonid
- **arrow funktsioonid** - Lühem süntaks funktsioonide kirjutamiseks (nt `() => {}`)
- **funktsioonide deklareerimine** - Funktsioonide määratlemine koodis
- **return** - Väärtuse tagastamine funktsioonist

## Operaatorid ja tingimused
- **Spread operaator (...)** - Laiendab massiivi üksikuteks elementideks
- **OR operaator (||)** - Tagastab esimese tõese väärtuse või viimase väärtuse
- **Tingimuskontroll (if/else)** - Kontrollib tingimust ja täidab vastavat koodiplokki

## Veahaldus
- **Error objekt** - Veateadete loomine ja käsitlemine
- **console.error** - Veateadete kuvamine konsoolis
- **alert** - Hüpikakna kuvamine kasutajale teate näitamiseks

## Brauseri objektid
- **window.location.pathname** - Praeguse URL-i tee osa 