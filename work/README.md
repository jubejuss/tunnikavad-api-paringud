# Vabanduste generaator. Frontend.

Rakendus töötab paaris backendiga, mille API-sse saame pöörduda ja pärida vabandusi.

## API
API aadress on `http://10.168.60.65:3001` ja endpoint on `/api/excuses`.

## 1. Ühenduse loomine
Andmete tõmbamiseks võima kasutada kaht javascript meetodit – fetch ja axios. Kuna Axios on lihtsam, kasutamse seda. Axiose võib lisada html-i lingina: `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>` või kui meil on node.js projekt, siis kasutame `npm install axios`. Kui soovime kasutada mõnd serverilahendus, mis node.js'i ei toeta, näiteks github pages, siis peame kasutama Axiose cdn serverit. Veel on variant kasutada mõnda ehituslahendust (build tool) nagu Vite, kui meil on node.js projekt. 

Loome `index.html` faili, mis hakkab kuvama vabandusi.  

```html
<!DOCTYPE html>
<html lang="et">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vabanduste generaator - õpetus</title>
    <!-- Axios teek API päringute jaoks. LISA PISUT HILJEM, pärast js faili loomist -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>Vabanduste generaator</h1>
        <p>Ava konsool (F12), et näha API ühenduse tulemust.</p>
    </div>
    <!-- Meie JavaScripti moodul -->
    <script type="module" src="script.js"></script>
</body>
</html> 
```
Loome `script.js` faili, mis haldab ühendust apiga ja funktsioone, mis tegelevad vabanduste haldamisega.
```javascript
// Loome axios instantsi koos baas URL-iga
const api = axios.create({
    baseURL: 'http://10.168.60.65:3001'
});

// Testime ühendust
const testConnection = async () => {
    try {
        const response = await api.get('/api/excuses');
        console.log('Ühendus õnnestus!', response.data);
    } catch (error) {
        console.error('Viga:', error.message);
    }
}

// Käivitame testi kohe, kuna moodulid laetakse automaatselt pärast DOM-i laadimist
testConnection();
```
## Async/Await selgitus

Async/await on JavaScriptis kasutatav süntaks asünkroonsete operatsioonide käsitlemiseks. See muudab asünkroonse koodi kirjutamise ja lugemise lihtsamaks.
Asünkroonne kood võimaldab programmil jätkata tööd samal ajal kui oodatakse aeganõudvate operatsioonide (nagu API päringud, failide lugemine või andmebaasi päringud) lõpetamist.

### Async funktsioonid
- See võimaldab funktsiooni sees kasutada `await` võtmesõna
- `await` võtmesõna saab kasutada ainult `async` funktsiooni sees
- See peatab funktsiooni täitmise, kuni Promise on täidetud. Promise on JavaScriptis objekt, mis esindab asünkroonse operatsiooni lõplikku tulemust.
- Näiteks: `const vastus = await api.get('/andmed')`

Try ja catch on JavaScriptis kasutatav veahaldusmehhanism. Try plokis proovitakse koodi käivitada ja kui tekib viga, siis catch plokk püüab selle vea kinni. See on eriti kasulik asünkroonsete operatsioonide puhul, nagu API päringud.

Meie näites:
- `try` plokis proovime teha API päringu kasutades `await api.get('/api/excuses')`
- Kui päring õnnestub, logitakse konsooli "Ühendus õnnestus!" koos saadud andmetega
- Kui päring ebaõnnestub (näiteks server ei vasta või URL on vale), siis catch plokk püüab vea kinni ja logib konsooli veateate

Ilma try-catch plokita võiks viga programmi töö peatada, aga nüüd saame vea korral kasutajale informatiivse teate kuvada ja programm töötab edasi.

Nüüd avame brauseri ja vaatame konsooli, et näha, kas saame api päringule vastuse.

## 2. Vabanduste kuvamine

Loome funktsiooni, mis loeb API-st vabandused ja kuvab neid lehel. **Enne lisatud ühenduse testi** võib kustutada (see liigub nüüd uue funktsiooni sisse).

### Ülesanne: vaata javascripti koodi põhjal, milliseid HTML elemente on meil vaja lehel kuvada.

#### Etapp 1: Põhiseadistus ja API ühendus

```javascript
// See etapp keskendub API ühenduse loomisele ja andmete kättesaamise kontrollimisele

// Loo axios'i instants koos baas URL-iga kõigi päringute jaoks
const api = axios.create({
    baseURL: 'http://10.168.60.65:3001'
});

// Oota, kuni DOM on täielikult laaditud, enne koodi käivitamist
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM täielikult laaditud ja parsitud');
    
    // Põhifunktsioon API ühenduse testimiseks
    // See on Etapp 1 põhifunktsionaalsus - lihtne API test
    const testApiConnection = async () => {
        try {
            console.log('Üritan API-ga ühendust luua...');
            // Tee GET päring vabanduste lõpp-punktile
            const response = await api.get('/api/excuses');
            console.log('API ühendus õnnestus!');
            console.log('Töötlemata API vastus:', response);
            console.log('Vabanduste andmed:', response.data);
        } catch (error) {
            // Käsitle kõiki API päringu ajal tekkivaid vigu
            console.error('API ühendus ebaõnnestus:', error.message);
            alert('Viga: ' + (error.response?.data?.error || error.message));
        }
    }
    
    // Testi API ühendust lehe laadimisel
    testApiConnection();
});
```
#### Etapp 2: Andmete kuvamise loogika lisamine

```javascript
// See etapp lisab funktsionaalsuse API-st saadud andmete kuvamiseks

// Loo axios'i instants koos baas URL-iga kõigi päringute jaoks
const api = axios.create({
    baseURL: 'http://10.168.60.65:3001'
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM täielikult laaditud ja parsitud');
    // UUS ETAPIS 2: Hangi viide HTML elemendile, kus vabandused kuvatakse
    const excusesList = document.getElementById('excusesList');
    console.log('Vabanduste loendi element leitud:', excusesList);
    
    // UUS ETAPIS 2: Funktsioon nimetati ümber loadExcuses'iks, et paremini peegeldada selle eesmärki
    // Funktsioon vabanduste laadimiseks API-st
    const loadExcuses = async () => {
        try {
            console.log('Toon vabandusi API-st...');
            const response = await api.get('/api/excuses');
            const excuses = response.data;
            console.log('Saadud vabandused:', excuses);
            
            // UUS ETAPIS 2: Kutsu kuvamisfunktsioon saadud andmetega
            displayExcuses(excuses);
        } catch (error) {
            console.error('Viga vabanduste laadimisel:', error);
            alert('Viga: ' + (error.response?.data?.error || error.message));
        }
    }
    
    // UUS ETAPIS 2: Funktsioon vabanduste kuvamiseks DOM-is
    // See on Etapp 2 peamine lisandus - andmete renderdamine lehele
    const displayExcuses = excuses => {
        try {
            console.log('Kuvan', excuses.length, 'vabandust');
            excusesList.innerHTML = '';
            excuses.forEach(excuse => {
                console.log('Töötlen vabandust:', excuse);
                const excuseElement = document.createElement('div');
                excuseElement.className = 'excuse-item';
                excuseElement.textContent = excuse.text;
                excusesList.appendChild(excuseElement);
            });
            console.log('Kõik vabandused edukalt kuvatud');
        } catch (error) {
            console.error('Viga vabanduste kuvamisel:', error);
            excusesList.innerHTML = 'Vabandust, vabanduste kuvamine ebaõnnestus.';
        }
    }
    
    // Laadi vabandused lehe laadimisel
    loadExcuses();
});
```
#### Etapp 3: Täiustatud kuvamine vormindamisega

```javascript
// See etapp parandab kuvamist korraliku vormindamise ja täiendavate andmeväljadega

// Loo axios'i instants koos baas URL-iga kõigi päringute jaoks
const api = axios.create({
    baseURL: 'http://10.168.60.65:3001'
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM täielikult laaditud ja parsitud');
    const excusesList = document.getElementById('excusesList');
    
    // Funktsioon vabanduste laadimiseks API-st
    const loadExcuses = async () => {
        try {
            console.log('Toon vabandusi API-st...');
            const response = await api.get('/api/excuses');
            const excuses = response.data;
            // UUS ETAPIS 3: Logi ühe vabanduse andmestruktuur viiteks
            console.log('Saadud vabanduste andmestruktuur:', excuses[0]);
            
            // Kuva vabandused täieliku vormindamisega
            displayExcuses(excuses);
        } catch (error) {
            console.error('Viga vabanduste laadimisel:', error);
            alert('Viga: ' + (error.response?.data?.error || error.message));
        }
    }
    
    // TÄIUSTATUD ETAPIS 3: Kuvamisfunktsioon näitab nüüd kõiki vabanduse omadusi
    const displayExcuses = excuses => {
        try {
            console.log('Kuvan vabandusi täieliku vormindamisega');
            excusesList.innerHTML = '';
            // UUS ETAPIS 3: Pööra massiiv, et näidata uusimaid vabandusi esimesena
            excuses.reverse().forEach(excuse => {
                console.log('Loon HTML-i vabanduse ID-le:', excuse.id);
                const excuseElement = document.createElement('div');
                excuseElement.className = 'excuse-item';
                // UUS ETAPIS 3: Kasuta innerHTML koos abifunktsiooniga textContent asemel
                excuseElement.innerHTML = createExcuseHtml(excuse);
                excusesList.appendChild(excuseElement);
            });
            console.log('Kõik vabandused vormindamisega kuvatud');
        } catch (error) {
            console.error('Viga vabanduste kuvamisel:', error);
            excusesList.innerHTML = 'Vabandust, vabanduste kuvamine ebaõnnestus.';
        }
    }
    
    // UUS ETAPIS 3: Abifunktsioon iga vabanduse HTML-i loomiseks
    // See on Etapp 3 peamine lisandus - rikkaliku HTML-i loomine iga vabanduse jaoks
    const createExcuseHtml = excuse => {
        console.log('Vormistan vabandust:', excuse.text);
        // UUS ETAPIS 3: Vorminda kuupäev Eesti lokaadi järgi
        const date = new Date(excuse.date).toLocaleString('et-EE');
        console.log('Vormindatud kuupäev:', date);
        
        // UUS ETAPIS 3: Loo HTML kõigi saadaolevate väljadega
        const html = `
            <div class="excuse-text">${excuse.text}</div>
            ${excuse.type ? `<div class="excuse-type">Kategooria: ${excuse.type}</div>` : ''}
            <div class="excuse-categories">${excuse.categories ? 'Kategooriad: ' + Object.keys(excuse.categories).join(', ') : ''}</div>
            <div class="excuse-blame">Süüdi on: ${excuse.syydlane}</div>
            <div class="excuse-date">${date}</div>
        `;
        console.log('Loodud HTML vabanduse jaoks');
        return html;
    }
    
    // Laadi vabandused lehe laadimisel
    console.log('Alustan vabanduste laadimist');
    loadExcuses();
});
```
#### Etapp 4: Lõplik viimistletud versioon
```javascript
// See etapp eemaldab silumislogid ja lisab kirjeldavad kommentaarid eesti keeles

// Loo axios'i instants koos baas URL-iga kõigi päringute jaoks
const api = axios.create({
    baseURL: 'http://10.168.60.65:3001'
});

document.addEventListener('DOMContentLoaded', () => {
    const excusesList = document.getElementById('excusesList');

    // Funktsioon vabanduste laadimiseks API-st
    const loadExcuses = async () => {
        try {
            const response = await api.get('/api/excuses');
            const excuses = response.data;  
            // response.data sisaldab API vastust, mis on meie juhul massiiv vabanduste objektidest
            // Iga vabanduse objekt sisaldab välju nagu id, text, date, type, categories ja syydlane
            // Näiteks: { id: 1234567890, text: "Mu kass sõi mu kodutöö ära", date: "2023-05-15T14:30:00Z", 
            // type: "loomad", categories: { kahetsus: true, huumor: true, syydistus: false }, syydlane: "kass" }
            
            // Kuva kõik vabandused
            displayExcuses(excuses);
        } catch (error) {
            alert('Viga: ' + (error.response?.data?.error || error.message));
        }
    }

    // Funktsioon vabanduste kuvamiseks HTML-is
    const displayExcuses = excuses => {
        try {
            excusesList.innerHTML = '';
            excuses.reverse().forEach(excuse => {
                const excuseElement = document.createElement('div');
                excuseElement.className = 'excuse-item';
                excuseElement.innerHTML = createExcuseHtml(excuse);
                excusesList.appendChild(excuseElement);
            });
        } catch (error) {
            console.error('Viga vabanduste kuvamisel:', error);
            excusesList.innerHTML = 'Vabandust, vabanduste kuvamine ebaõnnestus.';
        }
    }

    // Abifunktsioon vabanduse HTML-i loomiseks
    const createExcuseHtml = excuse => {
        const date = new Date(excuse.date).toLocaleString('et-EE');
        return `
            <div class="excuse-text">${excuse.text}</div>
            ${excuse.type ? `<div class="excuse-type">Kategooria: ${excuse.type}</div>` : ''}
            <div class="excuse-categories">${excuse.categories ? 'Kategooriad: ' + Object.keys(excuse.categories).join(', ') : ''}</div>
            <div class="excuse-blame">Süüdi on: ${excuse.syydlane}</div>
            <div class="excuse-date">${date}</div>
        `;
    }

    // Laadi vabandused lehe laadimisel
    loadExcuses();
});
```

Selgitame koodi rida-realt:

1. `document.addEventListener('DOMContentLoaded', () => {...})` - Ootab kuni HTML dokument on täielikult laetud, enne kui käivitab funktsiooni. See tagab, et kõik vajalikud HTML elemendid on olemas.

2. `const excusesList = document.getElementById('excusesList')` - Leiab HTML-ist elemendi ID-ga 'excusesList', kuhu hakkame vabandusi kuvama.

3. `loadExcuses` funktsioon:
   - `async` märgib, et tegu on asünkroonse funktsiooniga
   - `try` plokis proovib API-st andmeid laadida
   - `await api.get('/api/excuses')` teeb päringu API-sse ja ootab vastust
   - Kui päring õnnestub, salvestab vastuse andmed `excuses` muutujasse
   - Kui tekib viga, näitab kasutajale veateadet

4. `displayExcuses` funktsioon:
   - Tühjendab esmalt vabanduste nimekirja (`excusesList.innerHTML = ''`)
   - `excuses.reverse()` pöörab massiivi ümber, et uuemad vabandused oleksid eespool
   - Käib läbi kõik vabandused ja loob igaühe jaoks uue HTML elemendi
   - Lisab igale elemendile klassi 'excuse-item' stiilide jaoks
   - Täidab elemendi HTML-iga, mis luuakse `createExcuseHtml` funktsioonis
   - Lisab loodud elemendi vabanduste nimekirja

5. `createExcuseHtml` funktsioon:
   - Võtab sisse ühe vabanduse objekti
   - Teisendab kuupäeva loetavasse formaati Eesti lokalisatsiooniga
   - Loob HTML struktuuri, kus:
     - Kuvab vabanduse teksti
     - Kui on olemas tüüp, kuvab selle
     - Kui on olemas kategooriad, kuvab need komadega eraldatult
     - Kuvab süüdlase
     - Kuvab kuupäeva

6. Lõpuks käivitab `loadExcuses()`, mis alustab vabanduste laadimist kohe kui leht on valmis.

## 3. Juhusliku vabanduse kuvamine
Kuna meie eesmärk ei tarvitse olla kõikide vabanduste kuvamine, vaid ainult ühe juhusliku vabanduse, siis tuleks lisada ka funktsioon, mis loeb juhuslikku vabandust ja kuvab selle.  
Selle loomine käib sarnaselt eelmisele funktsioonile, kuid `forEach` asemel tuleks kasutada `Math.random()` funktsiooni, mis genereerib juhusliku arvu.

`Math.random()` funktsioon:
- Tagastab juhusliku ujukomaarvulise numbri vahemikus 0 (kaasa arvatud) kuni 1 (välja arvatud)
- Näiteks: 0.7564892447293154 või 0.12741927461287
- Korrutades seda massiivi pikkusega (`excuses.length`) saame juhusliku indeksi
- `Math.floor()` ümardab saadud arvu alla lähima täisarvuni
- Seega `Math.floor(Math.random() * excuses.length)` annab meile juhusliku indeksi vahemikus 0 kuni massiivi pikkus-1

### Ülesanne
Proovime seda teha.

***

### Lahendus
- lisame funktsiooni uue muutuja `const randomExcuseElement = document.getElementById('randomExcuse');`  Nagu näha on vajalik ka HTML-is element, kust me vabandust kuvame.  
- Lisame `loadExcuses` funktsiooni sisse funktsiooni `displayRandomExcuse`
- Loome funktsiooni `displayRandomExcuse`, mis loeb juhusliku vabanduse ja kuvab selle.

Kogu lahendus on nüüd selline:

```javascript
const api = axios.create({
    baseURL: 'http://10.168.60.65:3001'
});

document.addEventListener('DOMContentLoaded', () => {
    const excusesList = document.getElementById('excusesList');
    // UUS: Lisa viide HTML elemendile, kus kuvatakse juhuslik vabandus
    const randomExcuseElement = document.getElementById('randomExcuse');

    const loadExcuses = async () => {
        try {
            const response = await api.get('/api/excuses');
            const excuses = response.data;  
            displayExcuses(excuses);
            
            // UUS: Kuva juhuslik vabandus samadest andmetest
            displayRandomExcuse(excuses);
        } catch (error) {
            alert('Viga: ' + (error.response?.data?.error || error.message));
        }
    }

    const displayExcuses = excuses => {
        try {
            excusesList.innerHTML = '';
            excuses.reverse().forEach(excuse => {
                const excuseElement = document.createElement('div');
                excuseElement.className = 'excuse-item';
                excuseElement.innerHTML = createExcuseHtml(excuse);
                excusesList.appendChild(excuseElement);
            });
        } catch (error) {
            console.error('Viga vabanduste kuvamisel:', error);
            excusesList.innerHTML = 'Vabandust, vabanduste kuvamine ebaõnnestus.';
        }
    }

    // UUS: Funktsioon juhusliku vabanduse kuvamiseks
    // See funktsioon valib juhuslikult ühe vabanduse massiivist ja kuvab selle eraldi sektsioonis
    const displayRandomExcuse = excuses => {
        try {
            // Vali juhuslik vabandus massiivist
            const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
            // Kasuta sama HTML genereerimise funktsiooni, mida kasutame kõigi vabanduste jaoks
            randomExcuseElement.innerHTML = createExcuseHtml(randomExcuse);
        } catch (error) {
            console.error('Viga juhusliku vabanduse kuvamisel:', error);
            randomExcuseElement.innerHTML = 'Vabandust, vabanduse kuvamine ebaõnnestus.';
        }
    }

    const createExcuseHtml = excuse => {
        const date = new Date(excuse.date).toLocaleString('et-EE');
        return `
            <div class="excuse-text">${excuse.text}</div>
            ${excuse.type ? `<div class="excuse-type">Kategooria: ${excuse.type}</div>` : ''}
            <div class="excuse-categories">${excuse.categories ? 'Kategooriad: ' + Object.keys(excuse.categories).join(', ') : ''}</div>
            <div class="excuse-blame">Süüdi on: ${excuse.syydlane}</div>
            <div class="excuse-date">${date}</div>
        `;
    }

    loadExcuses();
});
```


## 4. Vabanduste lisamine

### Etapp 5: Vabanduste lisamise funktsionaalsus


```javascript
// See etapp lisab võimaluse uute vabanduste lisamiseks API kaudu

const api = axios.create({
    baseURL: 'http://10.168.60.65:3001'
});

// UUS ETAPIS 5: Funktsioon vabanduse lisamiseks
// See funktsioon saadab POST päringu API-le uue vabanduse lisamiseks
const submitExcuse = async (excuseText) => {
    try {
        const response = await api.post('/api/excuses', {
            text: excuseText,
            date: new Date().toISOString() // Lisame praeguse kuupäeva ja kellaaja ISO formaadis (nt. "2023-11-15T14:30:00.000Z")
        });
        
        return response.data;
    } catch (error) {
        throw new Error('Vabanduse lisamine ebaõnnestus: ' + (error.response?.data?.error || error.message));
    }
};

// UUS ETAPIS 5: Funktsioon vormi käsitlemiseks
// See funktsioon seadistab sündmuste kuulajad vormi elementidele
const initializeForm = (onExcuseAdded) => {
    const submitButton = document.getElementById('submitExcuse');
    const excuseText = document.getElementById('excuseText');

    submitButton.addEventListener('click', async () => {
        try {
            // Kontrollime, kas kasutaja on sisestanud vabanduse teksti
            // Kui väli on tühi, näitame hoiatusteadet ja katkestame funktsiooni
            if (!excuseText.value.trim()) {
                alert('Palun sisesta vabandus!');
                return;
            }

            // Saadame vabanduse teksti serverisse, kasutades submitExcuse funktsiooni
            // See on asünkroonne operatsioon, mis ootab vastust serverilt
            await submitExcuse(excuseText.value);
            
            // Kui vabandus on edukalt lisatud, tühjendame sisestusvälja
            excuseText.value = ''; // Tühjenda väli
            
            // Kui funktsioonile on antud callback, kutsume selle välja
            // See võimaldab värskendada vabanduste nimekirja pärast uue lisamist
            if (onExcuseAdded) {
                onExcuseAdded(); // Kutsu callback funktsioon
            }
        } catch (error) {
            // Kui tekib viga, näitame kasutajale veateadet
            alert(error.message);
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const excusesList = document.getElementById('excusesList');
    const randomExcuseElement = document.getElementById('randomExcuse');

    // Funktsioon vabanduste laadimiseks API-st
    const loadExcuses = async () => {
        try {
            const response = await api.get('/api/excuses');
            const excuses = response.data;  
            // Kuva kõik vabandused
            displayExcuses(excuses);
            // Kuva juhuslik vabandus samadest andmetest
            displayRandomExcuse(excuses);
        } catch (error) {
            alert('Viga: ' + (error.response?.data?.error || error.message));
        }
    }

    // Funktsioon vabanduste kuvamiseks HTML-is
    const displayExcuses = excuses => {
        try {
            excusesList.innerHTML = '';
            excuses.reverse().forEach(excuse => {
                const excuseElement = document.createElement('div');
                excuseElement.className = 'excuse-item';
                excuseElement.innerHTML = createExcuseHtml(excuse);
                excusesList.appendChild(excuseElement);
            });
        } catch (error) {
            console.error('Viga vabanduste kuvamisel:', error);
            excusesList.innerHTML = 'Vabandust, vabanduste kuvamine ebaõnnestus.';
        }
    }

    // Funktsioon juhusliku vabanduse kuvamiseks
    const displayRandomExcuse = excuses => {
        try {
            const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
            randomExcuseElement.innerHTML = createExcuseHtml(randomExcuse);
        } catch (error) {
            console.error('Viga juhusliku vabanduse kuvamisel:', error);
            randomExcuseElement.innerHTML = 'Vabandust, vabanduse kuvamine ebaõnnestus.';
        }
    }

    // Abifunktsioon vabanduse HTML-i loomiseks
    const createExcuseHtml = excuse => {
        const date = new Date(excuse.date).toLocaleString('et-EE');
        return `
            <div class="excuse-text">${excuse.text}</div>
            ${excuse.type ? `<div class="excuse-type">Kategooria: ${excuse.type}</div>` : ''}
            <div class="excuse-categories">${excuse.categories ? 'Kategooriad: ' + Object.keys(excuse.categories).join(', ') : ''}</div>
            <div class="excuse-blame">Süüdi on: ${excuse.syydlane}</div>
            <div class="excuse-date">${date}</div>
        `;
    }

    // UUS ETAPIS 5: Vormi initsialiseerimise kutsumine
    // Seadistame vormi ja määrame callback funktsiooni, mis laadib vabandused uuesti pärast uue lisamist
    initializeForm(() => {
        loadExcuses(); // Laadi vabandused uuesti pärast uue lisamist
    });

    // Laadi vabandused lehe laadimisel
    loadExcuses();
});
```

## Deployment
Githubis  
Settings > Pages > Build and deployment > Github Actions > Static HTML > commit