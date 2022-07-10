maxZindex = 0;

function createTerminal() {
    //se ci sono gia' 10 terminali non ne creo altri
    if (document.getElementsByClassName("terminal").length > 5) {
        alert("Hai raggiunto il numero massimo di terminali");
        return;
    }

    maxZindex++;
    //clono il div con classe terminal
    var terminal = document.querySelector(".terminal").cloneNode(true);
    terminal.style.display = "initial";
    //setto un attributo active=true per il nuovo div
    terminal.setAttribute("active", "true");
    terminal.style.zIndex = maxZindex;
    terminal.addEventListener("keyup", function (e) {
        //funzione invio che prende l'evento ed il testo del terminale
        let filesystem = root;
        invio(e, this.querySelector(".text"), this.querySelector(".title"), filesystem);
    });

    //evento per il movimento della finestra
    terminal.querySelector(".terminal-header").onmousedown = function (e) {
        if(terminal.style.zIndex != maxZindex){
            maxZindex++;
            terminal.style.zIndex = maxZindex;
        }

        terminal.setAttribute("isDown", "true");
        //let offset = [terminal.offsetLeft - e.clientX, terminal.offsetTop - e.clientY];

        document.onmousemove = function (e) {
            let mousePosition = [e.clientX, e.clientY];
            if (terminal.getAttribute("isDown") == "true") {
                if (terminal.style.width == "100%") {
                    terminal.style.width = terminal.getAttribute("width");
                    terminal.style.height = terminal.getAttribute("height");
                }
                terminal.style.left = (mousePosition[0] - terminal.clientWidth / 2) + "px";
                terminal.style.top = (mousePosition[1] - terminal.querySelector(".terminal-header").clientHeight / 2) + "px";
            }
        }
    }
    terminal.querySelector(".terminal-header").onmouseup = function (e) {
        terminal.removeAttribute("isDown");
        document.onmousemove = null;
    }

    terminal.querySelector(".text").onclick = function (e) {
        if(terminal.style.zIndex != maxZindex){
            maxZindex++;
            terminal.style.zIndex = maxZindex;
        }
    }

    terminal.querySelector(".button-zoom").onclick = function (e) {
        if (terminal.style.width != "100%") {
            //salvo il valore di width e height
            terminal.setAttribute("width", terminal.style.width);
            terminal.setAttribute("height", terminal.style.height);
            terminal.style.height = "100%";
            terminal.style.width = "100%";
            terminal.setAttribute("top", terminal.style.top);
            terminal.setAttribute("left", terminal.style.left);
            terminal.style.top = "0px";
            terminal.style.left = "0px";
        }
        else {
            terminal.style.width = terminal.getAttribute("width");
            terminal.style.height = terminal.getAttribute("height");
            terminal.style.top = terminal.getAttribute("top");
            terminal.style.left = terminal.getAttribute("left");
        }
    }

    //clono lo span con classe app-active
    var appActive = document.querySelector(".app-active").cloneNode(true);
    appActive.style.display = "initial";

    terminal.querySelector(".button-exit").onclick = function (e) {
        terminal.remove();
        appActive.remove();
    }

    terminal.querySelector(".button-minimize").onclick = function (e) {
        terminal.style.display = "none";
        appActive.style.backgroundColor = "grey";
    }

    appActive.onclick = function (e) {
        if (terminal.style.display == "none") {
            terminal.style.display = "initial";
            appActive.style.backgroundColor = "aliceblue";
        } else {
            terminal.style.display = "none";
            appActive.style.backgroundColor = "grey";
        }
    }

    //appendo il div con classe terminal al body
    document.body.appendChild(terminal);

    //appendo lo span con classe app-active al div con classe btn-terminal
    document.querySelector(".container-app-active").appendChild(appActive);
}

//evento click sul div con classe btn-terminal
document.querySelector(".btn-terminal").onclick = function (e) {
    if (e.target.className != "app-active") {
        createTerminal();
    }
}

function createTextEditor() {
    //se ci sono gia' 10 text editor non ne creo altri
    if (document.getElementsByClassName("text-editor").length > 5) {
        alert("Hai raggiunto il numero massimo di text editor");
        return;
    }

    maxZindex++;
    //clono il div con classe text-editor
    var textEditor = document.querySelector(".text-editor").cloneNode(true);
    textEditor.style.display = "initial";
    //setto un attributo active=true per il nuovo div
    textEditor.setAttribute("active", "true");
    textEditor.style.zIndex = maxZindex;
    textEditor.addEventListener("keyup", function (e) {
        //funzione invio che prende l'evento ed il testo del text editor
        let filesystem = root;
        invio(e, this.querySelector(".text"), this.querySelector(".title"), filesystem);
    });

    //evento per il movimento della finestra
    textEditor.querySelector(".text-editor-header").onmousedown = function (e) {
        if(textEditor.style.zIndex != maxZindex){
            maxZindex++;
            textEditor.style.zIndex = maxZindex;
        }

        textEditor.setAttribute("isDown", "true");
        //let offset = [textEditor.offsetLeft - e.clientX, textEditor.offsetTop - e.clientY];

        document.onmousemove = function (e) {
            let mousePosition = [e.clientX, e.clientY];
            if (textEditor.getAttribute("isDown") == "true") {
                if (textEditor.style.width == "100%") {
                    textEditor.style.width = textEditor.getAttribute("width");
                    textEditor.style.height = textEditor.getAttribute("height");
                }
                textEditor.style.left = (mousePosition[0] - textEditor.clientWidth / 2) + "px";
                textEditor.style.top = (mousePosition[1] - textEditor.querySelector(".text-editor-header").clientHeight / 2) + "px";
            }
        }
    }
    textEditor.querySelector(".text-editor-header").onmouseup = function (e) {
        textEditor.removeAttribute("isDown");
        document.onmousemove = null;
    }

    textEditor.querySelector(".text").onclick = function (e) {
        if(textEditor.style.zIndex != maxZindex){
            maxZindex++;
            textEditor.style.zIndex = maxZindex;
        }
    }

    textEditor.querySelector(".button-zoom").onclick = function (e) {
        if (textEditor.style.width != "100%") {
            //salvo il valore di width e height
            textEditor.setAttribute("width", textEditor.style.width);
            textEditor.setAttribute("height", textEditor.style.height);
            textEditor.style.height = "100%";
            textEditor.style.width = "100%";
            textEditor.setAttribute("top", textEditor.style.top);
            textEditor.setAttribute("left", textEditor.style.left);
            textEditor.style.top = "0px";
            textEditor.style.left = "0px";
        }
        else {
            textEditor.style.width = textEditor.getAttribute("width");
            textEditor.style.height = textEditor.getAttribute("height");
            textEditor.style.top = textEditor.getAttribute("top");
            textEditor.style.left = textEditor.getAttribute("left");
        }
    }

    textEditor.querySelector(".saveButton").onclick = function (e) {
        let text = textEditor.querySelector(".text").value;
        let myFile = new File([text], "file.txt", {type: "text/plain;charset=utf8"});
        saveAs(myFile); 
    }

    //appendo il div con classe text-editor al body
    document.body.appendChild(textEditor);

    //clono lo span con classe app-active
    var appActive = document.querySelector(".text-editor-app-active").cloneNode(true);
    appActive.style.display = "initial";

    textEditor.querySelector(".button-exit").onclick = function (e) {
        textEditor.remove();
        appActive.remove();
    }

    textEditor.querySelector(".button-minimize").onclick = function (e) {
        textEditor.style.display = "none";
        appActive.style.backgroundColor = "grey";
    }

    appActive.onclick = function (e) {
        if (textEditor.style.display == "none") {
            textEditor.style.display = "initial";
            appActive.style.backgroundColor = "aliceblue";
        } else {
            textEditor.style.display = "none";
            appActive.style.backgroundColor = "grey";
        }
    }

    //appendo lo span con classe app-active al div con classe btn-text-editor
    document.querySelector(".text-editor-container-app-active").appendChild(appActive);
}

document.querySelector(".btn-text-editor").onclick = function (e) {
    if (e.target.className != "text-editor-app-active") {
        createTextEditor();
    }
}

function createCalculator() {
    let appActive = document.querySelector(".calculator-app-active");
    let calculator = document.querySelector(".calculator-container");

    if (appActive.style.display != "initial") {
        appActive.style.display = "initial";
        calculator.style.display = "initial";

        //z-index
        maxZindex++;
        calculator.style.zIndex = maxZindex;

        // appActive.onclick = function (e) {
        //     if (calculator.style.display == "initial") {
        //         calculator.style.display = "none";
        //         appActive.style.backgroundColor = "grey";
        //     } else {
        //         calculator.style.display = "initial";
        //         appActive.style.backgroundColor = "aliceblue";
        //     }
        // }

        calculator.querySelector(".button-minimize").onclick = function (e) {
            appActive.style.backgroundColor = "grey";
            calculator.style.display = "none";
        }

        calculator.querySelector(".button-zoom").onclick = function (e) {
            if (calculator.style.width != "100%") {
                //salvo il valore di width e height
                calculator.setAttribute("width", calculator.style.width);
                calculator.setAttribute("height", calculator.style.height);
                calculator.style.height = "100%";
                calculator.style.width = "100%";
                calculator.setAttribute("top", calculator.style.top);
                calculator.setAttribute("left", calculator.style.left);
                calculator.style.top = "0px";
                calculator.style.left = "0px";
            }
            else {
                calculator.style.width = calculator.getAttribute("width");
                calculator.style.height = calculator.getAttribute("height");
                calculator.style.top = calculator.getAttribute("top");
                calculator.style.left = calculator.getAttribute("left");
            }
        }

        calculator.onclick = function (e) {
            if (calculator.style.zIndex != maxZindex) {
                maxZindex++;
                calculator.style.zIndex = maxZindex;
            }
        }

        calculator.querySelector(".calculator-header").onmousedown = function (e) {
            calculator.setAttribute("isDown", "true");

            document.onmousemove = function (e) {
                let mousePosition = [e.clientX, e.clientY];
                if (calculator.getAttribute("isDown") == "true") {
                    if (calculator.style.width == "100%") {
                        calculator.style.width = calculator.getAttribute("width");
                        calculator.style.height = calculator.getAttribute("height");
                    }
                    calculator.style.left = (mousePosition[0] - calculator.clientWidth / 2) + "px";
                    calculator.style.top = (mousePosition[1] - calculator.querySelector(".calculator-header").clientHeight / 2) + "px";
                }
            }
        }
        calculator.querySelector(".calculator-header").onmouseup = function (e) {
            calculator.setAttribute("isDown", "false");
            document.onmousemove = null;
        }

        calculator.querySelector(".button-exit").onclick = function (e) {
            appActive.style.display = "none";
            calculator.style.display = "none";

            //disable event listener
            calculator.querySelector(".calculator-header").onmousedown = null;
            calculator.querySelector(".calculator-header").onmouseup = null;
            calculator.onclick = null;
            calculator.querySelector(".button-minimize").onclick = null;
            calculator.querySelector(".button-zoom").onclick = null;
            calculator.querySelector(".button-exit").onclick = null;
        }
    }else if (appActive.style.backgroundColor != "grey") {
        appActive.style.backgroundColor = "grey";
        calculator.style.display = "none";
    }else{
        appActive.style.backgroundColor = "aliceblue";
        //z-index
        maxZindex++;
        calculator.style.zIndex = maxZindex;
        calculator.style.display = "initial";
    }
}

document.querySelector(".btn-calculator").onclick = function (e) {
    createCalculator();
    // if (e.target.className != "calculator-app-active") {
    //     createCalculator();
    // }
}
