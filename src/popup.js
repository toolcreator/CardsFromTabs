/*
 * Copyright 2018 Ole Lübke
 *
 * Permission to use, copy, modify, and/or distribute this software
 * for any purpose with or without fee is hereby granted,
 * provided that the above copyright notice and this permission notice appear
 * in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE
 * FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR
 * ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
 * WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
 * ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

var copyChk = document.getElementById("copyChk");
var getCardsBtn = document.getElementById("getCardsBtn");
var copyBtn = document.getElementById("copyBtn");
var cardListTxt = document.getElementById("cardListTxt");

chrome.storage.sync.get(
  ["autocopy"],
  function(result) {
    "use strict";
    if(result) {
      copyChk.checked = result.autocopy;
    }
  }
);

function copyCardListToClipboard() {
  "use strict";
  cardListTxt.select();
  document.execCommand("copy");
}

getCardsBtn.onclick = function() {
  "use strict";
  chrome.tabs.query(
    {
      "currentWindow": true,
      "url": [
        "https://scryfall.com/card/*"
        ,"https://edhrec.com/cards/*"
        ,"https://www.cardmarket.com/*/Magic/Products/Singles/*"
        ,"https://tappedout.net/mtg-card/*"
        ,"http://gatherer.wizards.com/Pages/Card/*"
      ]
    },
    function(tabs) {
      var list = "";
      tabs.forEach(function(tab) {
        if(tab.url.includes("scryfall")) {
          list += tab.title.substring(0,tab.title.indexOf("\u00b7"))
                  .trim() + "\n";
        } else if(tab.url.includes("edhrec")) {
          list += tab.title.substring(
                    tab.title.indexOf("-") + 1, tab.title.indexOf("("))
                  .trim() + "\n";
        } else if(tab.url.includes("cardmarket")) {
          list += tab.title.substring(0, tab.title.indexOf("|"))
                  .trim() + "\n";
        } else if(tab.url.includes("tappedout") || tab.url.includes("gatherer")) {
          list += tab.title.substring(0, tab.title.indexOf("("))
                  .trim() + "\n";
        }
      });
      cardListTxt.innerHTML = list;
      if(list.trim() !== "") {
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
  "use strict";
  chrome.storage.sync.set(
    {
      "autocopy": copyChk.checked
    }
  );
};
