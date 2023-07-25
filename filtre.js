function filtrareTrasee() {
    //se salveaza in constanta elementele din html cu id din paranteza
    const inaltimeSelect = document.getElementById("inaltime");
    const durataSelect = document.getElementById("durata");
    const dificultateSelect = document.getElementById("dificultate");
    const traseeMontaneDiv = document.getElementById("trasee_montane");
  
    //extragem valorile in functie de care vor fi criterile de filtrare 
    //pentru ca e un interval, de exemplu 0-1000 m, prin split le separam dupa "-" 
    const inaltimeSelectata = inaltimeSelect.value.split("-");
    //inaltime min va fi 0 (primul element dupa ce am "splituit")
    const inaltimeMin = parseInt(inaltimeSelectata[0]);
    //inaltime max va fi 1000
    const inaltimeMax = parseInt(inaltimeSelectata[1]);
  
    //acelas concept si pentru durata
    const durataSelectata = durataSelect.value.split("-");
    const durataMin = parseFloat(durataSelectata[0]);
    const durataMax = parseFloat(durataSelectata[1]);
  
    //la dificultate avem doar un cuvant si nu mai este necesara splituirea, se ia doar valoarea
    const dificultateSelectata = dificultateSelect.value;
  
    //determina dacă nu ai selectat criteriu
    function valNull(valoare) {
      return valoare === "";
    }
  
    // Filtrăm traseele in functie de criteriu
    const traseeFiltrate = Array.from(traseeMontaneDiv.children).filter(traseu => {
     //extragem valorile din atribute
      const inaltime = parseInt(traseu.getAttribute("inaltime"));
      const durata = parseFloat(traseu.getAttribute("durata"));
      const dificultate = traseu.getAttribute("dificultate");
  
      //se verifica conditia pentru fiecare criteriu prin apelarea functiei anterioare de valNull sau fixand criteriul intr-un interval
      const inaltimeConditie = valNull(inaltimeSelectata[0]) || (inaltime >= inaltimeMin && inaltime <= inaltimeMax);
      const durataConditie = valNull(durataSelectata[0]) || (durata >= durataMin && durata <= durataMax);
      const dificultateConditie = valNull(dificultateSelectata) || dificultate === dificultateSelectata;
  
      //se returneaza true daca toate criterile sunt indeplinite
      return inaltimeConditie && durataConditie && dificultateConditie;
    });
  
    // Ascundem toate traseele inițiale
    Array.from(traseeMontaneDiv.children).forEach(traseu => {
      traseu.style.display = "none";
    });
  
    // Afișăm doar traseele filtrate
    traseeFiltrate.forEach(traseu => {
      traseu.style.display = "block";
    });
  }
  