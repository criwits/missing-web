#!/bin/bash
mv ./_book/.git ./
gitbook build
mv ./.git ./_book
cd _book
