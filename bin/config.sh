#!/bin/sh

if [ -z "$config" ]
then

    set -e

    # config values
    basedir="$(git rev-parse --show-toplevel)"
    nodeversion=10.15.3
    embercliversion=3.10.1
    virtualenvdir="$basedir/virtualenv"




fi

