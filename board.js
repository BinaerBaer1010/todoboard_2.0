var request = fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists", {
        headers: {
            "Authorization": "b5ba360e5154f4744c1dfbbec43ade8f"
        }
    })
    .then(res => res.json())
    .then(lists => console.log(lists));

// Neues List-Item beim Klicken auf den "+"-Button oder Enter
function newItem(listen_id, inputWert) {

    var li = document.createElement("li");
    var uuid = generateRandomUniqueID(); //jedes List-Item bekommt eine eigene ID
    li.id = "listitem" + uuid; //ID von li ist immer "listitem" + die generierte ID Bsp. "listitem_ljrm2t63v"
    var t = document.createElement("span");
    var text = document.createTextNode(inputWert);
    t.appendChild(text);

    //Input Icon Checkbox vor dem List-Item
    var liCheckbox = document.createElement("input");
    liCheckbox.type = "checkbox";
    liCheckbox.className = "checkbox";

    //EventListener kann mehrmals ausgeführt werden, target zeigt aktuelles Ziel also liCheckbox
    liCheckbox.addEventListener("change", function(event) {
        var li = event.currentTarget.parentElement; //Parent Element von liCheckbox => li

        if (event.target.checked == true) {
            var ul = document.querySelector("#ul_completed" + listen_id); //hinter jede ul kommt die listen_id der Gesamtliste
            ul.append(li);
            li.classList.add('checked'); //wenn checked=true, dann wird die Klasse checked hinzugefügt (zum Durchstreichen des Item)
        } else { //wenn  Checkbox-Haken wieder entfernt wird, wird es wieder zu uncompleted Tasks hinzugefügt
            var ul = document.querySelector("#ul" + listen_id);
            ul.append(li);
            li.classList.remove('checked');
        }
    })

    //Sobald kein Input-Wert eingegeben wird, kommt die Aufforderung "Ungültige Eingabe! Bitte ToDo eingeben!"
    //Neue List Items werden automatisch in die uncompleted Task List eingefügt
    if (inputWert !== '') {
        var idt = "ul" + listen_id;
        console.log(idt);
        document.getElementById('ul' + listen_id).appendChild(li);
    } else {
        alert("Ungültige Eingabe! Bitte ToDo eingeben!");
    }

    //Nach jedem neu erstellten List-Item wird automatisch ein Div dahinter erstellt (hier: Close- und Edit-Icon)
    var closeIconDiv = document.createElement("div"); // Close-Icon

    var editIcon = document.createElement("img"); // Edit-Icon
    editIcon.src = "pictures/edit_icon.png";
    editIcon.className = "bttnBereich";
    editIcon.onclick = function() { //----> dieser Code-Abschnitt ist noch zu überprüfen
        if (li.classList.contains('checked')) {
            alert("Aufgabe ist schon erledigt und kann nicht mehr editiert werden!");
        } else {
            var userinput = prompt("Bitte hier das geänderte ToDo eingeben:");
            if (userinput == null || userinput == "") {

            } else {
                var textSpan = li.getElementsByTagName('span')[0];
                textSpan.innerText = userinput;
            }

        }
    }

    //u007D7 macht ein x hinter das Listenelement, um dieses zu löschen/ schließen
    var txt = document.createTextNode("\u00D7");

    // Eventlistener zum Schließen
    closeIconDiv.addEventListener("click", function() {
        closeIconDiv.parentElement.style.display = "none";
    });
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var newDiv = this.parentElement;
            newDiv.style.display = "none";
        }
    }

    //Alles hinzufügen (appending)
    li.appendChild(liCheckbox);
    li.appendChild(t);
    closeIconDiv.className = "close";
    closeIconDiv.appendChild(txt);
    li.appendChild(closeIconDiv);
    li.appendChild(editIcon);
}

//Fügt eine ganz neue Liste hinzu
function newList(id, defaultTitle = null) {
    const listenID = id;

    //div ist die list_areaClass, die die weiße Box zeigt
    var div = document.createElement("div");
    div.className = "list_areaClass";
    div.id = listenID;

    //form ist das Formular innerhalb des div (weiße Box)
    var form = document.createElement("form");
    form.className = "form_zu_erledigen";
    form.setAttribute("action", "#");
    form.onsubmit = function() {
        // Wert des Input Felds auslesen und neues Todo Item anlegen
        var todoEintrag = document.querySelector("#" + listenID + " #input_ToDoNeu").value;
        newItem(listenID, todoEintrag);

        // Wert des Input Felds zurücksetzen
        document.querySelector("#" + listenID + " #input_ToDoNeu").value = "";
    };

    //input ist das Input-Feld innerhalb des Formulars (form)
    var input = document.createElement("input");
    input.type = "text";
    input.id = 'input_ToDoNeu';
    input.placeholder = "Was musst du erledigen?";

    //h ist der Titel der einzelnen Listen
    var h = document.createElement("H4");
    h.contentEditable = "true";

    // DefaultTitle nehmen, falls definiert - anderenfalls Inhalt des Input-Feldes nehmen
    var inputWert = defaultTitle || document.getElementById("input_titel").value;
    var t = document.createTextNode(inputWert);

    //Plus-Button für einen neuen To-Do-Eintrag
    var divBttn = document.createElement("div");
    divBttn.className = "addButton";
    divBttn.onclick = function() {
        // Wert des Input Felds auslesen und neues Todo Item anlegen
        var todoEintrag = document.querySelector("#" + listenID + " #input_ToDoNeu").value;
        newItem(listenID, todoEintrag);

        // Wert des Input Felds zurücksetzen
        document.querySelector("#" + listenID + " #input_ToDoNeu").value = "";
    };
    var textBttn = document.createTextNode("+");

    //ul incompleteTasks wird hinzugefügt
    var ul = document.createElement("ul");
    ul.className = 'ul_incompleteTasks';
    ul.id = 'ul' + listenID;


    //ul completedTasks wird hinzugefügt
    var ulCompleted = document.createElement("ul");
    ulCompleted.className = 'ul_completedTasks';
    ulCompleted.id = 'ul_completed' + listenID;

    //Titel für die "ToDo" Items der incomplete Task List
    var titel_incomplete = document.createElement("h3");
    var text_h3 = document.createTextNode("ToDo");
    titel_incomplete.appendChild(text_h3);

    //Titel für die erledigten "ToDo" (completed Task List)
    var titel_complete = document.createElement("h3");
    var text_h3 = document.createTextNode("Completed");
    titel_complete.appendChild(text_h3);

    //Divs pro Listen
    var div_incomplete = document.createElement("div");
    var div_complete = document.createElement("div");

    //Appending
    h.appendChild(t); //H4 enthält den Input-Wert t (Eingabe des Namens der neuen Liste)
    form.appendChild(input); //Form enthält das Inputfeld
    divBttn.appendChild(textBttn); //Button-Div enthält den Text "+"
    form.appendChild(divBttn); //Form enthält das Button-Div Element
    div.appendChild(h); //Div (weiße Box) enthält die Überschrift H4
    div.appendChild(form); //Div (weiße Box) enthält das Formular

    div.appendChild(div_incomplete);
    div_incomplete.appendChild(titel_incomplete);
    div_incomplete.appendChild(ul); //Im Div wird die ul icompleteTasks erstellt
    div.appendChild(div_complete);
    div_complete.appendChild(titel_complete);
    div_complete.appendChild(ulCompleted); //Liste mit completed Tasks wird hinzugefügt

    //Der Content-Area allgemein das div list_areaClass hinzufügen (zeigt die weiße Box an)
    var Ausgabebereich = document.getElementById('content_area');
    console.log(Ausgabebereich)
    Ausgabebereich.append(div);

    // Listen Titel input zurücksetzen
    document.getElementById("input_titel").value = "";
}

//Funktion Slider Sidebar
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle('active');
    document.getElementById("content").classList.toggle('active');
}

function changeImage() {
    var image = document.getElementById('toggle_icon');
    if (image.src.match("left")) {
        image.src = "pictures/right_icon.PNG";
    } else {
        image.src = "pictures/left_icon.PNG";
    }
}

//-----------------------------------------------------
// Initialer Aufruf zum Verbinden mit der API
async function loadData() {
    /*JS ist synchron, deswegen 
    --> Hier: Nicht auf Antwort vom Server warten, sondern soll Code weiterladen und wenn die Antwort der API kommt, dann soll der untenstehende Code ausgeführt werden */

    var res = await fetch('https://shopping-lists-api.herokuapp.com/api/v1/lists', {
        method: 'get',
        headers: new Headers({
            'Authorization': "716d793360dd91455b8e8209bc29d3d9"
        })
    });
    var data = await res.json(); //sendet json zurück
    for (var i = 0; i < data.length; i++) {
        var tempObj = data[i];
        newList(tempObj._id, tempObj.name) //greift auf newList() Funktion (s.o.) zu: ID + Name kommt von API
    } //Fügt man nun in der API eine neue Liste hinzu, erscheint diese automatisch auf dem Board
    console.log(data);
}
//?? Post Funktioniert noch nicht 
async function createList(name) {
    var inputWert = defaultTitle || document.getElementById("input_titel").value;
    document.getElementById("input_titel").value = "";
    const newItem = new newItem(tempObj._id, inputWert);
    var response = await fetch('https://shopping-lists-api.herokuapp.com/api/v1/lists', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Authorization': "716d793360dd91455b8e8209bc29d3d9",
            'Content-Type': 'application/json'
        },
        body: newItem
    }).then(function(response) {
        return response.text();
    }).then(function(text) {
        console.log(text);
    })
}