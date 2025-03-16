# 3-seminar
[Seminari salvestus](https://youtu.be/A2xRDPrZ3g0?si=y0cMsGlU6HLAn-p-)  
[Seminari sõnastik](glossary.md)

## Sisukord
- [Seminari ülevaade](#3-seminar)
- [Sessioonid](#sessioon-1-sissejuhatus-ja-rakenduse-ülevaade)
  - [1. Sissejuhatus ja rakenduse ülevaade](#sessioon-1-sissejuhatus-ja-rakenduse-ülevaade)
  - [2. Axios ja API päringud](#sessioon-2-axios-ja-api-päringud)
  - [3. Vigade käsitlemine Try/Catch abil](#sessioon-3-vigade-käsitlemine-trycatch-abil)
  - [4. Juhuslikkus ja kuupäeva vormindamine](#sessioon-4-juhuslikkus-ja-kuupäeva-vormindamine)
  - [5. JSON andmete töötlemine ja funktsioonide loomine](#sessioon-5-json-andmete-töötlemine-ja-funktsioonide-loomine)
  - [Kokkuvõte ja küsimused](#kokkuvõte-ja-küsimused)
- [Täiendavad Materjalid](#täiendavad-materjalid)
- [Kodutöö](#kodutöö)

Seminar luuakse HTML ja javascripti lahendus, mis kuvab ja mille abil luuakse vabandused.  
Vabandused asuvad backendis, mida saab pärida läbi api: `http://10.168.60.65:3001`  
Töö selgitus asub [siin](work/README.md)  
Seminari töö baasil tuleb luua ka [kodutöö](#kodutöö)
Seminari lõpus loome kiirelt ka lahenduse, mis võimaldab taaskasutada `header` komponenti: [menu](menu)


#### Sessioon 1: Sissejuhatus ja rakenduse ülevaade
- **Kestus:** 30 minutit
- **Eesmärk:** Tutvustada rakenduse eesmärki ja põhifunktsionaalsust.
- **Teemad:**
  - Rakenduse eesmärk: Vabanduste generaator.
  - HTML ja CSS ülevaade: Struktuur ja stiil.
  - DOM manipulatsioon: Kuidas HTML elemente JavaScriptiga muuta.

#### Sessioon 2: Axios ja API päringud
- **Kestus:** 45 minutit
- **Eesmärk:** Õppida, kuidas kasutada Axios teeki API päringute tegemiseks.
- **Teemad:**
  - Mis on Axios ja miks seda kasutatakse?
  - Axiose seadistamine ja kasutamine `script.js` failis. Node vs link.
  - GET ja POST päringud: Kuidas andmeid serverist saada ja saata.
- **Praktiline ülesanne:** Rakenda Axiosi abil lihtne GET päring, et kuvada andmeid HTML-is.

#### Sessioon 3: Vigade käsitlemine Try/Catch abil
- **Kestus:** 30 minutit
- **Eesmärk:** Õppida, kuidas käsitleda vigu JavaScriptis Try/Catch abil.
- **Teemad:**
  - Try/Catch struktuur ja selle kasutamine.
  - Vigade käsitlemine Axiosi päringutes.
- **Praktiline ülesanne:** Lisa Try/Catch blokk Axiosi päringule ja kuva veateade, kui päring ebaõnnestub.

#### Sessioon 4: Juhuslikkus ja kuupäeva vormindamine
- **Kestus:** 30 minutit
- **Eesmärk:** Õppida, kuidas luua juhuslikkust ja vormindada kuupäevi.
- **Teemad:**
  - Juhuslike arvude genereerimine Math.random() abil.
  - Kuupäeva vormindamine toLocaleString() abil.
- **Praktiline ülesanne:** Loo funktsioon, mis kuvab juhusliku vabanduse ja vormindab kuupäeva.

#### Sessioon 5: JSON andmete töötlemine ja funktsioonide loomine
- **Kestus:** 30 minutit
- **Eesmärk:** Õppida, kuidas töödelda JSON andmeid ja luua funktsioone.
- **Teemad:**
  - JSON andmete struktuur ja töötlemine.
  - Funktsioonide loomine ja kasutamine JavaScriptis.
- **Praktiline ülesanne:** Loo funktsioon, mis töötleb JSON andmeid ja kuvab need HTML-is.

#### Kokkuvõte ja küsimused
- **Kestus:** 15 minutit
- **Eesmärk:** Korrata üle õpitud teemad ja vastata küsimustele.
- **Teemad:**
  - Kordamine: Kõik sessioonides käsitletud teemad.
  - Küsimused ja vastused: Osalejate küsimustele vastamine.

### Täiendavad Materjalid
- **Dokumentatsioon:** Axios, JavaScripti Try/Catch, Math.random(), Date.toLocaleString().
- **Näidiskood:** Koodinäited, mis illustreerivad iga sessiooni teemasid.

## Kodutöö  
### Üldine
- Uued tudengipaarid (code review) failis [studen_pairs.md](student_pairs.md)
- Koduse töö ajakulu tuleb ära mõõta. Selleks kasutage mõnda ajaarvestustarkvara (nt Toggle).
- Koduse töö protsessi kohta tuleb koostada refleksiooni faili `03_homework/protsess.md`. Kirjeldage töö laabumise protsessi, lisage sinna mured ja rõõmud, mis tööd tehes ette tulid. Samuti nipid, kui midagi avastasite ja ettepanekud mulle, kuidas ja mida ja paremini veel rääkida.

### CV-rakendusele tuleb lisada:
- rakendus peab asuma repositooriumi juurkataloogis, mitte 03_homework vms kaustas, nii, et iga kord uuendate sama rakendust.    
- Üldine korrastamine. Kui teil on miti javascripti faili, siis pange need ühte `js` folderisse. Kui teil on mitu `css` faili, siis pange need ühte `css` folderisse. Vaadake üle oma failid – pisikestel failidel, kus vaid mõni rida, ei ole pointi. Jätke lihtsalt meelde, et sel moel võib faile funktsioonide kaupa eraldi tõsta. Põhiline css fail olgu `style.css`, põhiline javascripti fail olgu `main.js` või `app.js` või `index.js` ja kui on spetsiifilisi alamskripte, siis nendele selles failis toimuva arusaadav nimi.  Sama lugu css-iga, sel `grid.css` failil sel moel pole enam mõtet, tõstke sisu `style.css` faili. Erinevaid `portrait.css`jms pole vaja, kaasajal käib see `@media`kaudu `style.css` failis või mõnes analoogses kohas. Põhiline `html`fail PEAB olema `index.html`.  
- Lisada rakendusele mobiilimenüü. St kasutades javascripti `toggle` funktsiooni, mida ma esimeses seminaris kasutasime, lisage ja eemaldage menüünupu vajutusega klass, mis peidab või toob nähtavale menüü kitsas vaates. Nupuks kasutage nn hamburgermenüüd, ehk sellist kolmetriibulist ikooni. Leiate googeldades kergelt, millest jutt. Lõpptulemusena peab teil olema laias vaates horisontaalne menüü, aga kitsas vaates vaikimis peidus olev vertikaalne menüü, mis tuleb nähtavale ja läheb peitu nupuvajutusega.
- Lisada rakenduse ülemisse osasse, kus need ristkülikud, kuhugi sobivasse kohta juhuslik vabandus. Võib luua uue ristküliku või panna vabandus mõnda olemasolevasse. Kategooriaid ei ole vaja, kuupäeva ei ole vaja, kuid kui leiate need sobivad olevat, võite panna, kuid sel juhul peate oskama seda ka põhjendada.  
- Alumisse, eelmisel korral loodud sektsiooni, peate lisama vabanduste lisamise vormi, aga sellisel moel, et seda kuvatakse ainult nupule vajutades ja samuti peab vorm nupule vajutades ka peitu minema.
- Vaadake üle oma veebilehe käitumine – kuidas ta erinevates laiustes kuvab. Vajadusel lisage mõni @mediaquery ja selles laiuses sobiv kujundus. Oluline on, et rakendus on kenasti nähtav ja kuvatud kõikides seadmetes või ekraani ja veebilehitseja laiustes.
– NB! Tööd peavd olema üles laetud git'i kaudu, ükskõik kas terminali või Github Desktoppi kasutades, veebi kaudu üleslaetud töid ei arvesta.

### Kuidas teha koodi ülevaatust?
Te võite kasutada mõnda LLM-i, aga te peate aru saama, mida see soovitab. Kui te tehisaru abil soovitate muudatusi, millest te ise aru ei saa, võib juhtuda, et osutate karuteene kaastudengile. Soovitage vaid seda, millest aru saate. Kui aru ei saa, siis tehke asi endale selgeks või jätke soovitamata.  
Sama kehtib ka enda töö kontrollimisega.


Kodutööd tehke nii kaua kui teete, kui kõike ei jõua valmis, siis pole hullu, pange kirja, mis valmistus rakusi (kui valmistas), miks miski pooleli jäi vms. Ajaarvestus annab teile endale ettekujutuse, kui pikalt te tegelikult tööd teete. Tulevikus läheb seda vaja.

# Hindamismaatriks kodutööle: CV-rakenduse täiendamine

See määrang ja punktijaotus aitab hinnata kodutöö erinevaid aspekte järgneva skaalaga:
- **Puudub:** lahendus puudub või ei ole üldse esitatud.
- **On olemas:** lahendus esineb, kuid on mitte täielikult või minimaalselt realiseeritud.
- **On tehtud nii nagu peab:** lahendus vastab täielikult ülesande kirjeldatud nõuetele.
- **On lisatud omalt poolt lisasid:** tööle on lisatud täiendavaid ja läbimõeldud lahendusi, mis tõstavad töö kvaliteeti.

| Kriteerium | Puudub | On olemas – 3 | On tehtud nii nagu peab - 4 | On lisatud omalt poolt lisasid - 5 |
| ---------- | ------ | ------------- | -------------------------- | ---------------------------------- |
| **Failide struktuur** | Failid on korrastamata, puudub loogiline struktuur. | Osaline failide korrastamine on tehtud, kuid esineb ebajärjekindlust. | Failid on korrektselt organiseeritud vastavalt nõuetele (js/, css/ kaustad, index.html, style.css, main.js). | Lisatud on täiendav dokumentatsioon või README failid alamkaustades, mis selgitavad struktuuri. |
| **Mobiilimenüü** | Mobiilimenüü puudub või ei tööta üldse. | Mobiilimenüü on olemas, kuid toggle funktsioon ei tööta korralikult või disain pole lõpuni viimistletud. | Mobiilimenüü töötab korrektselt, hamburger ikoon on olemas, menüü avaneb/sulgub nupuvajutusega. | Lisatud on sujuvad animatsioonid, täiendavad interaktiivsed elemendid või nutikad lahendused. |
| **Juhuslik vabandus** | Juhuslikku vabandust ei kuvata. | Vabandus kuvatakse, kuid paigutus või funktsionaalsus pole optimaalne. | Juhuslik vabandus on korrektselt integreeritud ja sobivalt paigutatud. | Lisatud on täiendavad funktsioonid (nt. kategooriad, kuupäevad) koos põhjendusega, kuid oma kohanduse, mitte copy-pastega. |
| **Vabanduste lisamise vorm** | Vorm puudub või ei tööta. | Vorm on olemas, kuid peitmine/näitamine ei tööta korralikult. | Vorm töötab nõuetekohaselt, avaneb ja sulgub nupuvajutusega. | Lisatud on vormi validatsioon, animatsioonid või täiendavad funktsioonid. |
| **Responsive disain** | Leht pole responsive või on kasutamatu erinevatel ekraanilaiustel. | Põhiline responsive tugi on olemas, kuid esineb visuaalseid probleeme. | Leht on korrektselt responsive, toimib hästi kõigil seadmetel ja laiustel. | Lisatud on @media päringud või täiendavad kohandused eri seadmetele. |
| **Git kasutamine** | Töö pole Git'i kaudu üles laetud. | Git on kasutatud, kuid commit'id pole informatiivsed või töövoog pole selge. | Töö on korrektselt Git'i kaudu üles laetud. | Git'i on kasutatud professionaalselt (head commit sõnumid, loogiline ajalugu). |
| **Refleksioon ja aja jälgimine** | Refleksioon ja aja jälgimine puuduvad. | Refleksioon või aja jälgimine on pealiskaudne või üks neist puudub. | Refleksioon ja aja jälgimine on põhjalikult dokumenteeritud. | Lisatud on põhjalik analüüs ja konstruktiivsed ettepanekud. |
| **Õigeaegsus** | Töö ei ole esitatud või on esitatud üle nädala hiljem. | Töö on esitatud, kuid tähtajast hiljem. | Töö on esitatud tähtaegselt. | |
