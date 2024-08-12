document.addEventListener("DOMContentLoaded", function() {
    const attachments = [
        { path: 'images/gabit.png' },
        { path: 'images/okno_tymczasowe.png' }
    ];

    const attachmentsContainer = document.getElementById('attachments');

    attachments.forEach(attachment => {
        const img = new Image();
        img.src = attachment.path;
        img.onload = function() {
            // Pobieranie nazwy pliku
            const fileName = attachment.path.split('/').pop();

            // Tworzenie elementu załącznika
            const attachmentItem = document.createElement('div');
            attachmentItem.classList.add('attachment-item');

            // Link z ikoną pliku, otwierający w nowej karcie
            const fileIconLink = document.createElement('a');
            fileIconLink.href = attachment.path;
            fileIconLink.target = "_blank"; // Otwieranie w nowej karcie

            const fileIcon = document.createElement('i');
            fileIcon.classList.add('fa', 'fa-file-alt');
            fileIconLink.appendChild(fileIcon);
            attachmentItem.appendChild(fileIconLink);

            // Szczegóły załącznika
            const attachmentDetails = document.createElement('div');
            attachmentDetails.classList.add('attachment-details');

            // Link do zdjęcia otwierającego się w nowej karcie z nazwą pliku
            const imageLink = document.createElement('a');
            imageLink.classList.add('attachment-name');
            imageLink.textContent = fileName;
            imageLink.href = attachment.path;
            imageLink.target = "_blank"; // Otwieranie zdjęcia w nowej karcie
            imageLink.download = fileName;
            attachmentDetails.appendChild(imageLink);

            // Rozmiar pliku (po wczytaniu obrazka)
            const fileSize = document.createElement('span');
            fileSize.classList.add('attachment-size');
            fileSize.textContent = formatFileSize(img.fileSize || img.src.length); // Przykładowy sposób obliczenia rozmiaru, zależnie od implementacji
            attachmentDetails.appendChild(fileSize);

            // Dodanie szczegółów do elementu załącznika
            attachmentItem.appendChild(attachmentDetails);

            // Dodanie załącznika do kontenera
            attachmentsContainer.appendChild(attachmentItem);
        };
    });
});

// Funkcja do formatowania rozmiaru pliku w czytelny sposób
function formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}














// Przewijanie strony i ukrywanie/pokazywanie nagłówka
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
});

// Funkcja do zmiany języka i aktualizacji flagi oraz tekstu w dropdownie
function setLanguage(lang) {
    console.log("Function setLanguage called with lang:", lang);

    const dropdown = document.querySelector('.language-dropdown');
    const selected = dropdown.querySelector('.selected');
    const flag = selected.querySelector('img');
    const text = selected.querySelector('span');

    // Aktualizacja obrazka flagi i alt text w zależności od wybranego języka
    switch (lang) {
        case 'pl':
            flag.src = 'images/pl.svg';
            flag.alt = 'Polski';
            text.textContent = '';
            break;
        case 'en':
            flag.src = 'images/gb.svg';
            flag.alt = 'English';
            text.textContent = '';
            break;
        case 'de':
            flag.src = 'images/de.svg';
            flag.alt = 'Deutsch';
            text.textContent = '';
            break;
        case 'fr':
            flag.src = 'images/fr.svg';
            flag.alt = 'Français';
            text.textContent = '';
            break;
        case 'it':
            flag.src = 'images/it.svg';
            flag.alt = 'Italiano';
            text.textContent = '';
            break;
        case 'nl':
            flag.src = 'images/nl.svg';
            flag.alt = 'Nederlands';
            text.textContent = '';
            break;
    }
    dropdown.classList.remove('open'); // Zamyka dropdown po zmianie języka

    //Zwijane menu na małych ekranach
    document.querySelectorAll('.collapsible').forEach(item => {
        item.addEventListener('click', function () {
            const allContents = document.querySelectorAll('.collapsible + .content');
            const content = this.nextElementSibling;
            const isExpanded = content.style.maxHeight;

            allContents.forEach(c => {
                if (c !== content && c.style.maxHeight) {
                    c.previousElementSibling.classList.remove('active');
                    c.style.maxHeight = null;
                }
            });

            if (isExpanded) {
                content.style.maxHeight = null;
                this.classList.remove('active');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                this.classList.add('active');
            }
        });
    });

    // Aplikacja tłumaczeń na stronie
    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.getAttribute("data-translate");
        if (translations[lang][key]) {
            if (element.querySelectorAll('i').length > 0) {
                const icons = Array.from(element.querySelectorAll('i'));
                element.innerHTML = translations[lang][key];
                icons.forEach((icon, index) => {
                    const br = document.createElement('br');
                    element.insertBefore(icon, element.childNodes[index * 2]);
                    element.insertBefore(br, element.childNodes[index * 2 + 1]);
                });
            } else {
                element.innerHTML = translations[lang][key];
            }
        } else {
            console.log("Missing translation for key:", key);
        }
    });
}

// Przełączanie widoczności dropdownu językowego
function toggleDropdown() {
    const dropdown = document.querySelector('.language-dropdown');
    dropdown.classList.toggle('open');
}
// Rozwijanie buttonów w main
function toggleContent(id) {
    const content = document.getElementById(id);
    const button = content.previousElementSibling;

    if (content.classList.contains('hidden-main')) {
        content.classList.remove('hidden-main');
        content.style.maxHeight = content.scrollHeight + "px";
        button.classList.add('active');  // Dodaje klasę 'active', gdy zawartość jest rozwijana
    } else {
        content.classList.add('hidden-main');
        content.style.maxHeight = null;
        button.classList.remove('active');  // Usuwa klasę 'active', gdy zawartość jest zwijana
    }
}



// Obsługa kliknięć na opcje językowe i zmiana języka
document.querySelectorAll('.language-option').forEach(item => {
    item.addEventListener('click', function () {
        const langMatch = this.getAttribute('onclick').match(/'(\w+)'/);
        if (langMatch && langMatch.length > 1) {
            setLanguage(langMatch[1]);
        }
    });
});

// Obsługa kliknięć poza dropdownem, aby go zamknąć
document.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.language-dropdown');
    const isClickInside = dropdown.contains(event.target);

    if (!isClickInside && dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
    }
});

// Słownik tłumaczeń
const translations = {
    pl: {
        'join_us': 'Bądź z nami na bieżąco',
        'about_us': 'O Nas',
        'description': 'Nasza rodzinna firma, założona w 1976 roku, zatrudnia ponad 200 osób i jest rozpoznawalna w niemal całej Europie. Od początku skupiamy się na rozwoju i ekspansji rynkowej. Zarządzamy z pasją, dążąc do zadowolenia klientów z naszych produktów stolarki okienno-drzwiowej. W pracy koncentrujemy się na ciągłym doskonaleniu rozwiązań, reagując na potrzeby rynku.',
        'contact': 'KONTAKT',
        'opening_hours': 'GODZINY OTWARCIA',
        'products': 'OFERTA',
        'monday_friday': 'PONIEDZIAŁEK-PIĄTEK 07:00-17:00',
        'saturday': 'SOBOTA 09:00-13:00',
        'sunday': 'NIEDZIELA NIECZYNNE',
        'windows': 'OKNA',
        'doors': 'DRZWI',
        'sliding_systems': 'PRZESUWNE',
        'facades': 'FASADY',
        'fire_systems': 'SYSTEMY PPOŻ.',
        'shutters': 'ROLETY',
        'french_balconies': 'BALKONY',
        'street': 'ul. Leśna 5, 77-100 Bytów',
        'product_info': 'Informacje o produkcie',
        'window': 'OKNO',
        'technical_data': 'Dane techniczne',
        'name': 'Nazwa',
        'frame_material': 'Materiał ramy okna',
        'inner_frame_color': 'Kolor ramy wewnętrznej',
        'outer_frame_color': 'Kolor ramy zewnętrznej',
        'window_width': 'Szerokość okna',
        'window_height': 'Wysokość okna',
        'hardware_type': 'Typ okucia',
        'window_weight': 'Waga okna',
        'production_date': 'Data produkcji',
        'gasket_type': 'Rodzaj uszczelki',
        'glass_thickness': 'Grubość szkła',
        'frame_reinforcement': 'Rodzaj zbrojenia ramy',
        'documentation': 'Dokumentacja'
    },
    de: {
        'join_us': 'Bleiben Sie mit uns auf dem Laufenden',
        'about_us': 'Über uns',
        'description': 'Unser Familienunternehmen, gegründet im Jahr 1976, beschäftigt mehr als 200 Mitarbeiter und ist fast in ganz Europa bekannt. Von Anfang an konzentrieren wir uns auf die Entwicklung und Expansion des Marktes. Wir verwalten mit Leidenschaft und streben danach, unsere Kunden mit unseren Fenster- und Türenprodukten zufrieden zu stellen. Bei der Arbeit konzentrieren wir uns auf die kontinuierliche Verbesserung der Lösungen und reagieren auf die Bedürfnisse des Marktes.',
        'contact': 'KONTAKT',
        'opening_hours': 'ÖFFNUNGSZEITEN',
        'products': 'ANGEBOT',
        'monday_friday': 'MONTAG-FREITAG 07:00-17:00',
        'saturday': 'SAMSTAG 09:00-13:00',
        'sunday': 'SONNTAG GESCHLOSSEN',
        'windows': 'FENSTER',
        'doors': 'TÜREN',
        'sliding_systems': 'SCHIEBESYSTEME',
        'facades': 'FASSADEN',
        'fire_systems': 'FEUERSCHUTZ SYSTEME',
        'shutters': 'ROLLOS',
        'french_balconies': 'FRANZÖSISCHE BALKONE',
        'street': 'str. Leśna 5, 77-100 Bytów',
        'product_info': 'Produktinformationen',
        'window': 'FENSTER',
        'technical_data': 'Technische Daten',
        'name': 'Name',
        'frame_material': 'Rahmenmaterial',
        'inner_frame_color': 'Farbe des Innenrahmens',
        'outer_frame_color': 'Farbe des Außenrahmens',
        'window_width': 'Fensterbreite',
        'window_height': 'Fensterhöhe',
        'hardware_type': 'Beschlagtyp',
        'window_weight': 'Fenstergewicht',
        'production_date': 'Herstellungsdatum',
        'gasket_type': 'Dichtungsart',
        'glass_thickness': 'Glasdicke',
        'frame_reinforcement': 'Rahmenverstärkungstyp',
        'documentation': 'Dokumentation'
    },
    en: {
        'join_us': 'Stay up to date with us',
        'about_us': 'About Us',
        'description': 'Our family business, founded in 1976, employs over 200 people and is recognized across almost all of Europe. From the beginning, we have focused on development and market expansion. We manage with passion, striving to satisfy our customers with our window and door joinery products. At work, we concentrate on continuously improving solutions, responding to market needs.',
        'contact': 'CONTACT',
        'opening_hours': 'OPENING HOURS',
        'products': 'PRODUCTS',
        'monday_friday': 'MONDAY-FRIDAY 07:00-17:00',
        'saturday': 'SATURDAY 09:00-13:00',
        'sunday': 'SUNDAY CLOSED',
        'windows': 'WINDOWS',
        'doors': 'DOORS',
        'sliding_systems': 'SLIDING SYSTEMS',
        'facades': 'FACADES',
        'fire_systems': 'FIRE SYSTEMS',
        'shutters': 'SHUTTERS',
        'french_balconies': 'FRENCH BALCONIES',
        'street': 'st. Leśna 5, 77-100 Bytów',
        'product_info': 'Product Information',
        'window': 'WINDOW',
        'technical_data': 'Technical Data',
        'name': 'Name',
        'frame_material': 'Frame Material',
        'inner_frame_color': 'Inner Frame Color',
        'outer_frame_color': 'Outer Frame Color',
        'window_width': 'Window Width',
        'window_height': 'Window Height',
        'hardware_type': 'Hardware Type',
        'window_weight': 'Window Weight',
        'production_date': 'Production Date',
        'gasket_type': 'Gasket Type',
        'glass_thickness': 'Glass Thickness',
        'frame_reinforcement': 'Frame Reinforcement Type',
        'documentation': 'Documentation'
    },
    fr: {
        'join_us': 'Restez à jour avec nous',
        'about_us': 'À propos de nous',
        'description': 'Notre entreprise familiale, fondée en 1976, emploie plus de 200 personnes et est reconnue dans presque toute l’Europe. Dès le début, nous nous sommes concentrés sur le développement et l’expansion du marché. Nous gérons avec passion, cherchant à satisfaire nos clients avec nos produits de menuiserie de fenêtres et de portes. Au travail, nous nous concentrons sur l’amélioration continue des solutions, en réponse aux besoins du marché.',
        'contact': 'CONTACT',
        'opening_hours': 'HEURES D’OUVERTURE',
        'products': 'PRODOTTI',
        'monday_friday': 'LUNDI-VENDREDI 07:00-17:00',
        'saturday': 'SAMEDI 09:00-13:00',
        'sunday': 'DIMANCHE FERMÉ',
        'windows': 'FENÊTRES',
        'doors': 'PORTES',
        'sliding_systems': 'SYSTÈMES COULISSANTS',
        'facades': 'FAÇADES',
        'fire_systems': 'SYSTÈMES DE PROTECTION INCENDIE',
        'shutters': 'VOLETS',
        'french_balconies': 'BALCONS FRANÇAIS',
        'street': 'r. Leśna 5, 77-100 Bytów',
        'product_info': 'Informations sur le produit',
        'window': 'FENÊTRE',
        'technical_data': 'Données techniques',
        'name': 'Nom',
        'frame_material': 'Matériau du cadre',
        'inner_frame_color': 'Couleur du cadre intérieur',
        'outer_frame_color': 'Couleur du cadre extérieur',
        'window_width': 'Largeur de la fenêtre',
        'window_height': 'Hauteur de la fenêtre',
        'hardware_type': 'Type de quincaillerie',
        'window_weight': 'Poids de la fenêtre',
        'production_date': 'Date de production',
        'gasket_type': 'Type de joint',
        'glass_thickness': 'Épaisseur du verre',
        'frame_reinforcement': 'Type de renforcement du cadre',
        'documentation': 'Documentation'
    },
    it: {
        'join_us': 'Rimani aggiornato con noi',
        'about_us': 'Chi siamo',
        'description': 'La nostra azienda di famiglia, fondata nel 1976, impiega oltre 200 persone ed è riconosciuta in quasi tutta Europa. Fin dall\'inizio, ci siamo concentrati sullo sviluppo e sull\'espansione del mercato. Gestiamo con passione, cercando di soddisfare i nostri clienti con i nostri prodotti di serramenti di finestre e porte. Al lavoro, ci concentriamo sul miglioramento continuo delle soluzioni, rispondendo alle esigenze del mercato.',
        'contact': 'CONTATTO',
        'opening_hours': 'ORARI DI APERTURA',
        'products': 'PRODOTTI',
        'monday_friday': 'LUNEDÌ-VENERDÌ 07:00-17:00',
        'saturday': 'SABATO 09:00-13:00',
        'sunday': 'DOMENICA CHIUSO',
        'windows': 'FINESTRE',
        'doors': 'PORTE',
        'sliding_systems': 'SISTEMI SCORREVOLI',
        'facades': 'FACCIATE',
        'fire_systems': 'SISTEMI ANTINCENDIO', 'shutters': 'TAPPARELLE', 'french_balconies': 'BALCONI ALLA FRANCESE',
        'street': 'via. Leśna 5, 77-100 Bytów',
        'product_info': 'Informazioni sul prodotto',
        'window': 'FINESTRA',
        'technical_data': 'Dati tecnici',
        'name': 'Nome',
        'frame_material': 'Materiale del telaio',
        'inner_frame_color': 'Colore del telaio interno',
        'outer_frame_color': 'Colore del telaio esterno',
        'window_width': 'Larghezza della finestra',
        'window_height': 'Altezza della finestra',
        'hardware_type': 'Tipo di ferramenta',
        'window_weight': 'Peso della finestra',
        'production_date': 'Data di produzione',
        'gasket_type': 'Tipo di guarnizione',
        'glass_thickness': 'Spessore del vetro',
        'frame_reinforcement': 'Tipo di rinforzo del telaio',
        'documentation': 'Documentazione'
    },
    nl: {
        'join_us': 'Blijf op de hoogte',
        'about_us': 'Over ons',
        'description': 'Ons familiebedrijf, opgericht in 1976, heeft meer dan 200 medewerkers en is bijna overal in Europa erkend. Vanaf het begin hebben we ons gericht op ontwikkeling en marktuitbreiding. We beheren met passie en streven ernaar onze klanten tevreden te stellen met onze producten voor ramen en deuren. Op het werk concentreren we ons op het continu verbeteren van oplossingen, reagerend op marktbehoeften.',
        'contact': 'CONTACT',
        'opening_hours': 'OPENINGSTIJDEN',
        'products': 'PRODUCTEN',
        'monday_friday': 'MAANDAG-VRIJDAG 07:00-17:00',
        'saturday': 'ZATERDAG 09:00-13:00',
        'sunday': 'ZONDAG GESLOTEN',
        'windows': 'RAMEN',
        'doors': 'DEUREN',
        'sliding_systems': 'SCHUIFSYSTEMEN',
        'facades': 'GEVELS',
        'fire_systems': 'BRANDSYSTEMEN',
        'shutters': 'ROLLUIKEN',
        'french_balconies': 'FRANSE BALKONS',
        'street': 'str. Leśna 5, 77-100 Bytów',
        'product_info': 'Productinformatie',
        'window': 'RAAM',
        'technical_data': 'Technische gegevens',
        'name': 'Naam',
        'frame_material': 'Raammateriaal',
        'inner_frame_color': 'Kleur van het binnenkozijn',
        'outer_frame_color': 'Kleur van het buitenkozijn',
        'window_width': 'Raambreedte',
        'window_height': 'Raamhoogte',
        'hardware_type': 'Type beslag',
        'window_weight': 'Ramen gewicht',
        'production_date': 'Productiedatum',
        'gasket_type': 'Type pakking',
        'glass_thickness': 'Glasdikte',
        'frame_reinforcement': 'Type frameversterking',
        'documentation': 'Documentatie'
    }
};

// Ustawienie domyślnego języka po załadowaniu strony
document.addEventListener('DOMContentLoaded', function () {
    setLanguage('pl');
});
