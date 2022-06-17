function salvarNoticia() {
    var elTitulo = document.getElementsByName("titulo")[0];
    var elConteudo = document.getElementsByName("conteudo")[0];
    var elTags = document.getElementsByName("news Tags")[0];
    var elUrlImg = document.getElementsByName("urlimg")[0];
    if (elTitulo.value != "" && elConteudo.value != "") {
        let objNoticias = JSON.parse(localStorage.getItem("noticias"));
        if (objNoticias === null || objNoticias.length == 0)
            objNoticias = new Array();

        let dataAtual = new Date();
        let noticia = new Object;
        noticia.date = dataAtual.toLocaleString();
        noticia.cod = dataAtual.getTime();
        noticia.titulo = elTitulo.value;
        noticia.urlimg = elUrlImg.value;
        noticia.conteudo = elConteudo.value;
        noticia.tags = elTags.value;
        objNoticias.push(noticia);

        localStorage.setItem("noticias", JSON.stringify(objNoticias));
        elTitulo.value = null, elConteudo.value = null, elTags.value = null;
        document.querySelector("#resultado").innerHTML = "Registro de notícia salvo com sucesso."
    } else {
        console.error("Preencha todos os campos");
    }
}

const checkVal = (arr, val) => {
    let valExist = arr.some(value => value === val);
    return valExist;

}

function listTags() {
    let objNoticias = JSON.parse(localStorage.getItem("noticias"));
    if (objNoticias === null || objNoticias.length == 0)
        objNoticias = new Array();
    var tagsStr = "";
    for (let noticia of objNoticias) {
        if (noticia.tags != null || noticia.tags !== undefined)
            tagsStr = tagsStr + ";" + noticia.tags;
    }
    let finalArr = new Array();
    if (tagsStr.length > 0) {
        tagsStr = tagsStr.replace("/,/g", ";");
        let arrTags = tagsStr.split(";");
        for (let item of arrTags) {
            if (!checkVal(finalArr, item)) {
                finalArr.push(item);
            }
        }
    }
    let el;
    for (let item of finalArr) {
        el = "<li><a onclick='filterByTag(\"" + item.trim() + "\")' href='#'>" + item + "</a></li>";
        $("#tags").append(el);
    }
}

function listarNoticias() {
    let objNoticias = JSON.parse(localStorage.getItem("noticias"));
    if (objNoticias === null || objNoticias.length == 0)
        objNoticias = new Array();
    var tags = "";
    for (let noticia of objNoticias) {
        let elPost = "<div class='card col-md-5'>";
        elPost += "<a href='#!'><img class='card-img-top' src='" + noticia.urlimg +"'></a>";
        elPost += "<div class='card-body'>";
        elPost += "<div class='small text-muted'>" + noticia.date + "</div>";
        elPost += "<h2 class='card-title h4'>" + noticia.titulo.slice(0, 50) + "</h2>";
        elPost += "<p class='card-text'>" + noticia.conteudo.slice(0, 150) + "</p>";
        elPost += "<a class='btn btn-primary' href='view.html?cod=" + noticia.cod + "'> Ver mais→</a>";
        elPost += "</div></div>";
        $("#result").append(elPost);
    }
}

function pesquisar(term) {
    let objNoticias = JSON.parse(localStorage.getItem("noticias"));
    if (objNoticias === null || objNoticias.length == 0)
        objNoticias = new Array();
    var found = false;
    $("#result").empty();
    for (let noticia of objNoticias) {
        if (noticia.titulo.toLowerCase().indexOf(term) > -1 || noticia.conteudo.toLowerCase().indexOf(term)>-1) {
            let elPost = "<div class='card col-md-5'>";
            elPost += "<a href='#!'><img class='card-img-top' src='" + noticia.urlimg +"'></a>";
            elPost += "<div class='card-body'>";
            elPost += "<div class='small text-muted'>" + noticia.date + "</div>";
            elPost += "<h2 class='card-title h4'>" + noticia.titulo.slice(0, 50) + "</h2>";
            elPost += "<p class='card-text'>" + noticia.conteudo.slice(0, 150) + "</p>";
            elPost += "<a class='btn btn-primary' href='view.html?cod=" + noticia.cod + "'> Ver mais →</a>";
            elPost += "</div></div>";
            $("#result").append(elPost);
            found = true;
        }
    }
    if (!found)
        $("#result").html("Sem resultados!");
}

function filterByTag(tagItem) {
    let objNoticias = JSON.parse(localStorage.getItem("noticias"));
    if (objNoticias === null || objNoticias.length == e)
        objNoticias = new Array();
    var found = false;
    $("#result").empty();
    for (let noticia of objNoticias) {
        if (noticia.tags === undefined || noticia.tags == null)
            continue;
        if (noticia.tags.indexOf(tagItem) > -1) {
            let elPost = "<div class='card col-md-5'>";
            elPost += "<a href='#!'><img class='card-img-top'src='" + noticia.urlimg +"'></a>"
            elPost += "<div class='card - body'>";
            elPost += "<div class='small text-muted'>" + noticia.date + "</div>";
            elPost += "<h2 class='card-title h4'>" + noticia.titulo.slice(0, 50) + "</h2>";
            elPost += "<pclass='card-text'>" + noticia.conteudo.slice(0, 150) + "</p>";
            elPost += "<a class='btn btn-primary' href='view.html?cod=" + noticia.cod + "'> Ver mais →</a>";
            elPost += "</div></div>";
            $("#result").append(elPost);
            found = true;
        }
    }
    if (!found)
        $("result").html("Sem resultados");
}