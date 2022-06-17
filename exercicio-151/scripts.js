function add() {
    var aluno, notahtml, notacss, notajs, sum, avg;
    aluno = document.getElementById("aluno").value;
    notahtml = parseFloat(document.getElementById("notahtml").value)
    notacss = parseFloat(document.getElementById("notacss").value)
    notajs = parseFloat(document.getElementById("notajs").value)

    sum = notahtml + notacss + notajs;
    if (aluno.trim().length == 0) {
        alert("Nome do aluno não pode ficar vazio.");
        return;
    }
    if (isNaN(sum)) {
        alert("Dados inválidos");
        return;
    }

    avg = Math.round(sum / 3);

    var boletim = document.getElementById("tableBoletim");
    var row = boletim.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(0);
    var cell3 = row.insertCell(0);
    var cell4 = row.insertCell(0);

    cell4.innerHTML = aluno;
    cell3.innerHTML = sum;
    cell2.innerHTML = avg;

    if (avg >= 70) {
        cell1.innerHTML = "<font color=green>Aprovado</font>";
    } else {
        cell1.innerHTML = "<font color=red>Reprovado</font>";
    }

    limparCampos();

}

function limparCampos() {
    window.document.querySelector("#aluno").value = null
    window.document.querySelector("#notahtml").value = null
    window.document.querySelector("#notacss").value = null
    window.document.querySelector("#notajs").value = null
}

function saveGridToLocalStorage() {
    let tableContent;
    tableContent = window.document.getElementById("tableBoletim").innerHTML
    localStorage.setItem("boletim", tableContent)
}

function loadFromLocalStorage() {
    let tableContent = localStorage.getItem("boletim")
    if (tableContent.trim().length > 0)
        document.getElementById("tableBoletim").innerHTML = tableContent
}