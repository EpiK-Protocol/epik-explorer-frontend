#!/bin/bash

sh ops.sh build prod
sh ops.sh push prod
sh ops.sh run prod