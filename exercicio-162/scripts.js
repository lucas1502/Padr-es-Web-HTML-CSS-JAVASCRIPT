
function atualizaPreco(moeda, htmlElem) {
    fetch(`https://www.mercadobitcoin.net/api/${moeda}/ticker/`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let obj = document.querySelector(`#${htmlElem}`);
            obj.innerHTML = parseFloat(data.ticker.last).toLocaleString(undefined, { minimumFractionDigits: 1 });
        })
        .catch(err => console.log("Erro ao obter a cotação de BTCUSD: ", err))
}

function main() {
    atualizaPreco('LTC', 'litecoin');
    atualizaPreco('BTC', 'bitcoin');
    atualizaPreco('ETH', 'ethereum');
    atualizaPreco('DOGE', 'dogecoin');

    let objs = ["bitcoin", "litecoin", "ethereum", "dogecoin"];
    objs.forEach((item) => {
        let elem = document.querySelector(`#${item}`);
        elem.innerHTML = "<mark>" + elem.textContent + "</mark>";
    })
}

setInterval(function () {
    main();
}, 5000);