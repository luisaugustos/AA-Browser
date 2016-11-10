const electron = require('electron');
const app = electron.app;
const child_process = require('child_process');
var rq = require('request-promise');


var ui = {};
var tabs = [];
ui.tabs = document.getElementById("tabs");
ui.conteudo = document.getElementById("conteudo")
var buttonNewTab = document.getElementById("open-new-tab");
var buttonGo = document.getElementById("open-page");
var newUrl = document.getElementById("new-tab-url");
buttonNewTab.addEventListener("click", openTab);
buttonGo.addEventListener('click', requestUrl, true);


//Evento da tecla ENTER
newUrl.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("open-page").click();
    }
});
/*
  Abrir uma nova aba
*/
function openTab() {
  tabName = createNewTab();
  createContent(tabName);
  var tab = {id: tabName}
  tabs.push(tab);

  // Simular o evento do click clicando na nova aba aberta
  document.querySelectorAll("[href='#" + tabName + "']")[0].click();
}

function closeTab(e) {
  tabName = e.target.parentNode.getAttribute("href").slice(1);
  console.log(tabName);
  e.target.parentNode.parentNode.remove(); //Remove a aba
  document.getElementById(tabName).remove(); //Remove o conteudo da aba
}

/*
  Cria o elemento da aba no menu superior
  @return: Identificador da Aba
*/
function createNewTab() {
  var tabName = 'tab_' + Math.random().toString(36).substring(20); //gera um ID para a aba
  var tab = document.createElement('li');
  var linkTab = document.createElement('a');
  var closeTabButton = document.createElement('button');
  linkTab.setAttribute('data-toggle', 'tab');
  linkTab.href = '#' + tabName;
  linkTab.innerHTML = 'Nova Aba';
  closeTabButton.id = 'closeTab';
  closeTabButton.className = 'close';
  closeTabButton.setAttribute('type', 'button');
  closeTabButton.innerHTML = '×';
  closeTabButton.addEventListener('click', closeTab, true);
  linkTab.appendChild(closeTabButton);
  tab.appendChild(linkTab);
  ui.tabs.appendChild(tab)
  console.log(tabName);
  return tabName
}

/*
  Cria o conteudo da nova aba
*/
function createContent(tabName) {
  let content = document.createElement('div');
  content.id = tabName;
  content.className = 'tab-pane';
  let inputUrl = document.createElement('input')
  inputUrl.id = 'new-tab-url';
  inputUrl.setAttribute('type', 'text');
  inputUrl.setAttribute('placeholder', 'Digite a url');
  let buttonGo = document.createElement('button');
  buttonGo.id = 'open-page';
  buttonGo.setAttribute('type', 'button');
  buttonGo.innerHTML = 'GO';
  buttonGo.addEventListener('click', requestUrl, true);
  inputUrl.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode == 13) {
        buttonGo.click();
      }
  });
  let iframe = document.createElement('iframe');
  iframe.id = 'webview';
  content.appendChild(inputUrl);
  content.appendChild(buttonGo);
  content.appendChild(iframe);
  ui.conteudo.appendChild(content);
}

function requestUrl(e) {
  let url = e.target.parentNode.querySelector("#new-tab-url")
  url.value = addHttp(url.value)
  let tabName = e.target.parentNode.id
  var tab_process = child_process.fork("tab.js", [url.value], { silent: true });

  tab_process.on('message', function (message) {
    // Coloca o conteudo resultante da request e coloca dentro da tag <iframe>
    var doc = document.getElementById(tabName).querySelector("#webview").contentWindow.document
    doc.open();
    doc.write(message);
    doc.close();
    var re = new RegExp("<title>(.*?)</title>", "i");
    if (message.match(re)[1]) {
      document.querySelectorAll("[href='#" + tabName + "']")[0].innerHTML = message.match(re)[1]
    }
  });

}

function addHttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}
