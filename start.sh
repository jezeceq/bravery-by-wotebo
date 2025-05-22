#!/bin/bash
echo "Instaluji zavislosti..."
npm install
echo ""
echo "Vytvarim build aplikace..."
npm run build
echo ""
echo "Spoustim aplikaci..."
npx serve dist