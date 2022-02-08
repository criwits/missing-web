#!/bin/bash

gitbook build
git add .
git commit -m $1
git push origin main

git checkout gh-pages
rm -rf `ls | egrep -v '(.git|_book|node_modules)'`
mv ./_book/* ./

git add .
git commit -m "Publish book"
git push origin gh-pages

git checkout main