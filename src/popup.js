var copyChk = document.getElementById("copyChk");
var getCardsBtn = document.getElementById("getCardsBtn");
var copyBtn = document.getElementById("copyBtn");
var cardListTxt = document.getElementById("cardListTxt");

chrome.storage.sync.get(
  ['autocopy'],
  function(result) {
    if(result) {
      copyChk.checked = result.autocopy;
    }
  }
);

function copyCardListToClipboard() {
  cardListTxt.select();
  document.execCommand("copy");
}

getCardsBtn.onclick = function() {
  chrome.tabs.query(
    {
      "currentWindow": true,
      "url": ["https://scryfall.com/card/*"]  
    },
    function(tabs) {
      var list = "";
      tabs.forEach(function(tab) {
        list += tab.title.substring(0, tab.title.indexOf("\u00b7")).trim() + "\n";
      });
      cardListTxt.innerHTML = list;
      if(list.trim() != "") {
        alert("Found " + tabs.length + " tabs with cards");
        if(copyChk.checked) {
          copyCardListToClipboard();
        }
      } else {
        alert("Found nothing");
      }
    }
  );
};

copyBtn.onclick = copyCardListToClipboard;

copyChk.onchange = function() {
  chrome.storage.sync.set(
    {
      'autocopy': copyChk.checked
    },
    function(bytesInUse) {
      // empty
    }
  );
};
