var getCardsBtn = document.getElementById("getCardsBtn");
getCardsBtn.onclick = function(elem) {
  chrome.tabs.query(
    {
      "currentWindow": true,
      "url": ["https://scryfall.com/card/*"]  
    },
    function(tabs) {
      var list = "";
      tabs.forEach(function(tab) {
        list += tab.title.substring(0, tab.title.indexOf("\u00b7")).trim() + "<br />";
      });
      document.getElementById("cardList").innerHTML = list;
      if(list.trim() != "") {
        alert("Found " + tabs.length + " tabs with cards");
      } else {
        alert("Found nothing");
      }
    }
  );
};
