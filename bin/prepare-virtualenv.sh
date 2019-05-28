#!/bin/sh

set -e

SCRIPTPATH=`dirname $0`
. "$SCRIPTPATH/config.sh"

echo --
echo -- INSTALL VIRTUAL ENV
echo --

install_virtualenv()
{
    echo "installing new virtualenv for node $nodeversion"
    python3 -m venv "$virtualenvdir"

    . "$virtualenvdir/bin/activate"

    python3 -m pip install nodeenv
    python3 -m nodeenv -p --prebuilt --node=$nodeversion
}

if [ -d "$virtualenvdir" ]; then
    echo "using existing virtualenv"
    . "$virtualenvdir/bin/activate"
    if [ $(node --version) != "v$nodeversion" ]; then
        install_virtualenv
    else
        echo "using existing node v$nodeversion installation"
    fi
else
    install_virtualenv
fi

. "$basedir/bin/activate-virtualenv.sh"


echo --
echo -- SETTING NPM / YARN CONFIGURATION
echo --
npm config set tag-version-prefix ''

echo --
echo -- INSTALL BASE TOOLING INTO VIRTUAL ENV
echo --

npm install -g yarn
npm install -g bower
npm install -g ember-cli@$embercliversion
npm install -g node-gyp

