// Neues List-Item beim Klicken auf den "+"-Button oder Enter
function newItem(listen_id, inputWert) {
    var li = document.createElement("li");
    li.className = "liItem_ID";
    var t = document.createTextNode(inputWert);

    //Input Icon checkbox vor dem List-Item
    var liCheckbox = document.createElement("input");
    liCheckbox.type = "checkbox";
    liCheckbox.className = "checkbox";

    //EventListener kann mehrmals ausgeführt werden, target zeigt aktuelles Ziel also liCheckbox
    liCheckbox.addEventListener("change", function(event) {
        var ul = document.querySelector(".ul_completedTasks ")
        var li = document.querySelector(".liItem_ID");
        if (event.target.checked == true) {
            ul.appendChild(li);
            li.className = 'checked';
        }
    })

    //Sobald kein Input-Wert eingegeben wird, kommt die Aufforderung "Ungültige Eingabe! Bitte ToDo eingeben!"
    if (inputWert !== '') {
        document.getElementById(listen_id).appendChild(li);
    } else {
        alert("Ungültige Eingabe! Bitte ToDo eingeben!");
    }

    //Nach jedem neu erstellten List-Item wird automatisch ein Div dahinter erstellt (hier: Close- und Edit-Icon)
    var closeIconDiv = document.createElement("div"); // Close-Icon

    var editIcon = document.createElement("img"); // Edit-Icon
    editIcon.src = "pictures/edit_icon.png";
    editIcon.className = "bttnBereich";
    editIcon.onclick = function() { //----> dieser Code-Abschnitt ist noch zu überprüfen
        if (li.class == 'checked') {
            alert("Aufgabe ist schon erledigt und kann nicht mehr editiert werden!");
        } else {
            li.contentEditable = 'true';
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

    //Neue List Items werden automatisch in die uncompleted Task List eingefügt
    //Alles hinzufügen (appending)
    //!!!! PROBLEM ID der Liste verknüpfen mit der Klasse ul_incompleteTasks --> Sonst Einfügen neuer Elemente in andere Listen
    document.querySelector(".ul_incompleteTasks ").append(li); //Hinzufügen zur uncompleted Task List
    li.appendChild(liCheckbox);
    li.appendChild(t);
    closeIconDiv.className = "close";
    closeIconDiv.appendChild(txt);
    li.appendChild(closeIconDiv);
    li.appendChild(editIcon);
}

//Fügt eine ganz neue Liste hinzu
function newList(defaultTitle = null) {
    const listenID = generateRandomUniqueID(); //Aufruf der Funktion, die eine einzigartige ID erstellt

    //div ist die list_areaClass, die die weiße Box zeigt
    var div = document.createElement("div");
    div.className = "list_areaClass";
    div.id = listenID; //diese Liste bekommt die generierte ID

    //boxlist ist das div innerhalb der list_areaClass (für die Liste)
    var boxlist = document.createElement("div");
    boxlist.className = "box_list"

    //form ist das Formular innerhalb des div (boxlist)
    var form = document.createElement("form");
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

    //h fügt die H4 innerhalb der boxlist hinzu = Titel der einzelnen Listen
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

    //ul completedTasks wird hinzugefügt
    var ulCompleted = document.createElement("ul");
    ulCompleted.className = 'ul_completedTasks';

    //Titel für die "ToDo" Items der incomplete Task List
    var titel_incomplete = document.createElement("h3");
    var text_h3 = document.createTextNode("ToDo");
    titel_incomplete.appendChild(text_h3);

    //Titel für die erledigten "ToDo" (completed Task List)
    var titel_complete = document.createElement("h3");
    var text_h3 = document.createTextNode("Completed");
    titel_complete.appendChild(text_h3);

    //Appending
    h.appendChild(t); //H4 enthält den Input-Wert t (Eingabe des Namens der neuen Liste)
    form.appendChild(input); //Form enthält das Inputfeld
    divBttn.appendChild(textBttn); //Button-Div enthält den Text "+"
    form.appendChild(divBttn); //Form enthält das Button-Div Element
    boxlist.appendChild(h); //Boxlist ist das Div um die Liste herum und enthält die Überschrift H4
    boxlist.appendChild(form); //Boxlist enthält das Formular

    div.appendChild(boxlist); //Div mit weißem Hintergrund/ weiße Box enthält das Boxlist-Div
    div.appendChild(titel_incomplete);
    div.appendChild(ul); //Im Div wird die ul icompleteTasks erstellt
    div.appendChild(titel_complete);
    div.appendChild(ulCompleted); //Liste mit completed Tasks wird hinzugefügt

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
//Jede Liste bekommt eine einzigartige ID, die JS generiert
function generateRandomUniqueID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

//-----------------------------------------------------
// Initialer Aufruf zum Erstellen der ersten Liste als Beispiel
/*
window.addEventListener('load', function() {
    // Dieser Code wird ausgeführt, wenn die Seite fertig geladen hat
    // Würde der Code zu früh ausgeführt werden, gäbe es die HTML Elemente noch nicht
    console.log("Füge eine Liste hinzu");
    newList("Beispielliste");
})*/