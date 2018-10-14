var getCardsBtn = document.getElementById("getCardsBtn");
var copyBtn = document.getElementById("copyBtn");
var cardListTxt = document.getElementById("cardListTxt");

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
      } else {
        alert("Found nothing");
      }
    }
  );
};

copyBtn.onclick = function() {
  cardListTxt.select();
  document.execCommand("copy");
};
