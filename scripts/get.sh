#!/bin/bash

TOKEN=$(bash ./login.sh)
curl \
  -H 'Accept: application/json' \
   -H "Authorization: Bearer ${TOKEN}" \
	--request GET \
	http://localhost:3000$1
