// Etapp 5: Vabanduste lisamise funktsionaalsus
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
    // Lisaks on ka Finally, mis lisatakse igal juhul
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
            excusesList.innerHTML = 'Vabandust, vabanduste kuvamine ebaõnnestus.';
        }
    }

    // Funktsioon juhusliku vabanduse kuvamiseks
    const displayRandomExcuse = excuses => {
        try {
            const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
            randomExcuseElement.innerHTML = createExcuseHtml(randomExcuse);
        } catch (error) {
            randomExcuseElement.innerHTML = 'Vabandust, vabanduse kuvamine ebaõnnestus.';
        }
    }

    // Abifunktsioon vabanduse HTML-i loomiseks
    const createExcuseHtml = excuse => {
        // Konverteerime vabanduse kuupäeva ja kellaaja lokaalseks stringiks
        const date = new Date(excuse.date).toLocaleString('et-EE');
        
        // Kontrollime, kas vabandusel on kategooriaid
        // Kui on, siis filtreerime välja ainult aktiivsed kategooriad (väärtus true)
        // Seejärel teisendame need võtmed stringiks, mis on eraldatud komadega
        const activeCategories = excuse.categories ? 
            Object.entries(excuse.categories) // Muudame kategooriad võtme-väärtuse paarideks
                .filter(([_, value]) => value === true) // Filtreerime välja ainult need, mille väärtus on true
                .map(([key]) => key) // Võtame ainult võtmed (kategooriate nimed)
                .join(', ') : ''; // Liidame võtmed stringiks, eraldades need komadega
                
        return `
            <div class="excuse-text">${excuse.text}</div>
            ${excuse.type ? `<div class="excuse-type">Kategooria: ${excuse.type}</div>` : ''}
            ${activeCategories ? `<div class="excuse-categories">Tüüp: ${activeCategories}</div>` : ''}
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