#!/bin/bash
cd src
zip CardsFromTabs.zip ./manifest.json ./popup.html ./popup.js
mv CardsFromTabs.zip ../
cd ../
