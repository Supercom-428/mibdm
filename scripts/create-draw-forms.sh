#!/bin/bash

declare -a forms=(
    "Direct Debit"
    "Standing Order"
    "Payroll"
)

for x in "${forms[@]}"
do
	json=$( jq -c -n \
		--arg title "${x}" \
		'{title: $title}'
		)
	json="'"$json"'"
	echo $x;
	eval bash ./post.sh ${json} /draw_form/create
	#echo $json
	#exit
done
