#!/bin/bash

set -e
SCRIPTPATH=`dirname $0`
. "$SCRIPTPATH/config.sh"

if test '!' -e "$virtualenvdir/bin/activate"
then
	echo "Could not find virtualenv!" >&2
	echo "Run prepare-virtualenv.sh first." >&2
    exit 1
fi

. "$virtualenvdir/bin/activate"
npm set progress=false