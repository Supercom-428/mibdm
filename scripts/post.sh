#!/bin/bash

echo http://localhost:3000$2

TOKEN=$(bash ./login.sh)
echo $1
curl --header "Content-Type: application/json" \
   -H "Authorization: Bearer ${TOKEN}" \
	--request POST \
	--data "$1" \
	http://localhost:3000$2
