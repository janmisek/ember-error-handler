#!/bin/sh

set -e
SCRIPTPATH=`dirname $0`
. "$SCRIPTPATH/config.sh"

echo --
echo -- INSTALL OS DEPENDENCIES
echo --

sudo apt-get install python3
sudo apt-get install python3-venv
sudo apt-get install chromium-browser
