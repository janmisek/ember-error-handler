#!/bin/bash

basedir="$(git rev-parse --show-toplevel)"
echo :::: Activating virtual env
cd $basedir
source ./virtualenv/bin/activate

echo :::::::::::::::::::: app ::::::::::::::::::::::::

echo :::: app - Cleaning environment
cd $basedir
rm -rf ./node_modules
rm -rf ./bower_components

echo :::: app - Installing the project
cd $basedir
bower install --config.interactive=false
yarn install

