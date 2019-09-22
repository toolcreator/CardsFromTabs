/*
 * Copyright (c) 2019 Ole Lübke
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var copyChk = document.getElementById("copyChk");
var getCardsBtn = document.getElementById("getCardsBtn");
var copyBtn = document.getElementById("copyBtn");
var cardListTxt = document.getElementById("cardListTxt");

chrome.storage.sync.get(
  ["autocopy"],
  function (result) {
    "use strict";
    if (result) {
      copyChk.checked = result.autocopy;
    }
  }
);

function copyCardListToClipboard() {
  "use strict";
  cardListTxt.select();
  document.execCommand("copy");
}

getCardsBtn.onclick = function () {
  "use strict";
  chrome.tabs.query(
    {
      "currentWindow": true,
      "url": [
        "https://scryfall.com/card/*"
        , "https://edhrec.com/cards/*"
        , "https://www.cardmarket.com/*/Magic/Products/Singles/*"
        , "https://tappedout.net/mtg-card/*"
        , "http://gatherer.wizards.com/Pages/Card/*"
        , "https://www.mtg-forum.de/db/magiccard.php*"
      ]
    },
    function (tabs) {
      var list = "";
      tabs.forEach(function (tab) {
        if (tab.url.includes("scryfall")) {
          list += tab.title.substring(0, tab.title.indexOf("\u00b7"))
            .trim() + "\n";
        } else if (tab.url.includes("edhrec")) {
          list += tab.title.substring(
            tab.title.indexOf("-") + 1, tab.title.indexOf("("))
            .trim() + "\n";
        } else if (tab.url.includes("cardmarket")) {
          list += tab.title.substring(0, tab.title.indexOf("|"))
            .trim() + "\n";
        } else if (tab.url.includes("tappedout") || tab.url.includes("gatherer")) {
          list += tab.title.substring(0, tab.title.indexOf("("))
            .trim() + "\n";
        } else if (tab.url.includes("mtg-forum")) {
          list += tab.title.substring(0, tab.title.indexOf("-"))
            .trim() + "\n";
        }
      });
      cardListTxt.innerHTML = list;
      if (list.trim() !== "") {
        alert("Found " + tabs.length + " tabs with cards");
        if (copyChk.checked) {
          copyCardListToClipboard();
        }
      } else {
        alert("Found nothing");
      }
    }
  );
};

copyBtn.onclick = copyCardListToClipboard;

copyChk.onchange = function () {
  "use strict";
  chrome.storage.sync.set(
    {
      "autocopy": copyChk.checked
    }
  );
};
