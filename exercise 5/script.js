//class Folder (name, parent, folders, files)
class Folder {
    constructor(name, full_name, parent=null) {
        this.name = name;
        this.full_name = full_name;
        this.parent = parent;
        this.folders = [];
        this.files = [];
    }

    getName() {
        return this.name;
    }

    getFullName() {
        return this.full_name;
    }

    getParent() {
        return this.parent;
    }

    addFolder(folder) {
        this.folders.push(folder);
    }

    addFile(file) {
        this.files.push(file);
    }

    getAll() {
        let folders_names = this.folders.map(folder => folder.getName());
        //ritorna una concatenazione di tutti i nomi dei file e dei folder separati da uno spazio
        return folders_names.concat(this.files).join(' ');
    }
}

var filesystem = new Folder("/", "/");
const root = filesystem;

const somma = (a, b) => a + b;

const sottrazione = (a, b) => a - b;

const moltiplicazione = (a, b) => a * b;

const divisione = (a, b) => {
    if (b === 0) {
        return NaN;
    } else {
        return a / b;
    }
};

const calculate = (input) => {
    console.log("Input: "+input);
    if ((input.includes("*") || input.includes("/")) && input.length > 3) {
        let index = -1;
        let imult = input.indexOf("*");
        let idiv = input.indexOf("/");
        if(imult != -1 && idiv != -1){
            if(imult < idiv){
                index = imult;
            } else {
                index = idiv;
            }
        } else if(imult != -1){
            index = imult;
        } else if(idiv != -1){
            index = idiv;
        }
        let result = 0;
        if(input[index] === "*"){
            result = moltiplicazione(parseFloat(input[index - 1]), parseFloat(input[index + 1]));
        } else {
            result = divisione(parseFloat(input[index - 1]), parseFloat(input[index + 1]));
        }
        input.splice(index - 1, 3, result);
        return calculate(input);
    }
    let operator = input[1];
    let a = parseFloat(input[0]);
    let b = parseFloat(input[2]);
    let res = 0;
    if (isNaN(a) || isNaN(b)) return "Errore";
    switch (operator) {
        case "+":
            res = somma(a, b);
            break;
        case "-":
            res = sottrazione(a, b);
            break;
        case "*":
            res = moltiplicazione(a, b);
            break;
        case "/":
            res = divisione(a, b);
            break;
        default:
            res = NaN;
    }
    if (isNaN(res)) {
        return "Errore";
    } else {
        if(input.length > 3){
            input.splice(0, 3, res);
            return calculate(input);
        }
        return res;
    }
};

const echo = (input) => {
    if (input.length === 0) {
        return "Errore: input non valido\n";
    }
    let _input = input.join(" ");
    //controllo se ho inserito la stringa dentro gli apici
    if (_input.lastIndexOf('"') !== _input.length - 1) {
        return "Errore: input non valido\n";
    }
    _input = _input.replace('"', '').replace('"', '') + "\n";
    if(_input.includes('"')) {
        return "Errore: input non valido\n";
    }
    return _input;
}

const clear = (input, textarea) => {
    if (input.length > 1) {
        textarea.value += "Errore: comando non valido\n";
        return 0;
    }
    textarea.value = "howtogeek@ubuntu:" + filesystem.getFullName() + "$ ";
    return 1;
}

const mkdir = (input) => {
    if (input.length === 0 || input.length > 1) {
        return "Errore: input non valido";
    }
    let _input = input.join(" ");
    //controllo se esiste gia una cartella con lo stesso nome
    let folder = filesystem.folders.find(folder => folder.getName() === _input);
    if (folder !== undefined) {
        return "Errore: cartella già esistente";
    }
    let _folder = null;
    if (filesystem.getName() === "/") {
        _folder = new Folder(_input ,filesystem.getFullName() + _input, filesystem);
    } else {
        _folder = new Folder(_input, filesystem.getFullName() + "/" + _input, filesystem);
    }
    filesystem.addFolder(_folder);
    return "ok";
}

const localStorage = (input) => {
    if (input.length > 1) {
        return "Errore: input non valido";
    }
    if (input.length === 0) {
        return filesystem.getAll();
    }
    //controllo se esiste la cartella o file che sto cercando nel mio filesystem
    let _input = input.join(" ");
    let folder = filesystem.folders.find(folder => folder.getName() === _input);
    let file = filesystem.files.includes(_input);
    if (folder !== undefined) {
        return folder.getName();
    } else if (file) {
        return _input;
    }
    return "Errore: file o cartella non esistente";
}

const change_dir = (input) => {
    if (input.lenght === 0 || input.length > 1) {
        return "Errore: input non valido";
    }
    //se l'input contiene / allora seguo il percorso
    if (input[0].includes("/")) {
        if(input[0].length === 1) {
            filesystem = root;
            return "ok";
        }
        let _input = input[0].split("/");
        let _folder = filesystem;
        for (let i = 0; i < _input.length; i++) {
            if (_input[i] === "" && i === 0) {
                //se il percorso inizia con /
                _folder = root;
                continue;
            }
            if (_input[i] === "..") {
                //se il percorso contiene ..
                if (_folder.getParent() === null) {
                    return "Errore: non puoi tornare indietro";
                }
                _folder = _folder.getParent();
                continue;
            }
            let folder = _folder.folders.find(folder => folder.getName() === _input[i]);
            if (folder === undefined) {
                return "Errore: cartella non esistente";
            }
            _folder = folder;
        }
        filesystem = _folder;
        bar_text.innerHTML = "howtogeek@ubuntu: " + filesystem.getFullName();
        return "ok";
    }
    if (input[0] === "..") {
        if (filesystem.getParent() === null) {
            return "Errore: non puoi tornare indietro";
        }
        filesystem = filesystem.getParent();
        bar_text.innerHTML = "howtogeek@ubuntu: " + filesystem.getFullName();
        return "ok";
    }
    let folder = filesystem.folders.find(folder => folder.getName() === input[0]);
    if (folder === undefined) {
        return "Errore: cartella non trovata - NON posso spostarmi in questa cartella";
    }
    filesystem = folder;
    bar_text.innerHTML = "howtogeek@ubuntu: " + filesystem.getFullName();
    return "ok";
}

const touch = (input) => {
    if (input.length === 0 || input.length > 1) {
        return "Errore: input non valido";
    }
    let _input = input.join(" ");
    //controllo se esiste gia un file con lo stesso nome
    let file = filesystem.files.includes(_input);
    if (file) {
        return "Errore: file già esistente";
    }
    filesystem.addFile(_input);
    return "ok";
}

const rm = (input) => {
    return "non implementato";
}

const rmdir = (input) => {
    return "non implementato";
}

var text = document.getElementsByClassName("text")[0];
var bar_text = document.getElementsByClassName("title")[0];

text.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        //recupero il contenuto dell'input
        let temp = text.value;
        let temp_array = temp.split(" ");

        //trovo l'indice più grande di howtogeek@ubuntu:~$
        let index = temp_array.length - 1;
        let path = "howtogeek@ubuntu:" + filesystem.getFullName() + "$";
        while (! temp_array[index].includes(path)) {
            index-=1;
        }
        //ottengo l'ultimo comando inserito
        let array = temp_array.slice(index + 1);
        //elimino \n dall'ultimo elemento
        array[array.length - 1] = array[array.length - 1].replace("\n", "");
        //elimino elementi vuoti
        array = array.filter(function (el) {
            return el != "";
        });
        console.log(array);

        //calcolo il risultato dell'ultimo comando
        let _clear = 0;
        if (array.length > 0) {
            switch (array[0]) {
                case "somma":
                    text.value += somma(parseFloat(array[1]), parseFloat(array[2])) + "\n";
                    break;
                case "sottrai":
                    text.value += sottrazione(parseFloat(array[1]), parseFloat(array[2])) + "\n";
                    break;
                case "moltiplica":
                    text.value += moltiplicazione(parseFloat(array[1]), parseFloat(array[2])) + "\n";
                    break;
                case "dividi":
                    text.value += divisione(parseFloat(array[1]), parseFloat(array[2])) + "\n";
                    break;
                case "calcola":
                    text.value += calculate(array.slice(1)) + "\n";
                    break;
                case "echo":
                    text.value += echo(array.slice(1));
                    break;
                case "clear":
                    _clear = clear(array, text);
                    break;
                case "ls":
                    text.value += localStorage(array.slice(1)) + "\n";
                    break;
                case "cd":
                    text.value += change_dir(array.slice(1)) + "\n";
                    break;
                case "pwd":
                    text.value += filesystem.getName() + "\n";
                    break;
                case "mkdir":
                    text.value += mkdir(array.slice(1)) + "\n";
                    break;
                case "touch":
                    text.value += touch(array.slice(1)) + "\n";
                    break;
                case "rm":
                    text.value += rm(array.slice(1)) + "\n"; //da implementare
                    break;
                case "rmdir":
                    text.value += rmdir(array.slice(1)) + "\n"; //da implementare
                    break;
                default:
                    text.value += "Errore: comando non valido\n";
            }
        }

        //aggiungo watermark
        if (_clear === 0) {
            text.value += "howtogeek@ubuntu:" + filesystem.getFullName() + "$ ";
        }
    }
});
