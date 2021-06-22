#!/bin/bash

declare -a companies=(
"360 Vehicle Leasing"
"3 s traders / Betterclean Services"
"A2B Office Supplies"
"Acacia Style Ltd"
"Action Coach"
"Admin Anywhere"
"Advantage ATO"
"AFG LAW"
"Annabelles Challenge"
"AOJ Restaurants"
"AOJ Restaurants - Pilsworth Store"
"AOJ Restaurants - Radcliffe"
"AOJ Restaurants - Whitefield"
"Apex Network Solutions Ltd"
"ArtClassesfor Children (F&F - Munro)"
"Ashworth Home Services"
"AST Hampsons"
"Baldingstone Fabrications Ltd"
"BBG"
"BBS"
"Bespoke"
"Blomstra ( Via Nettl )"
"Bolholt / Stables"
"Boxlogix"
"Brand Idol"
"Bridget Aherne Comms"
"Brighter Blinds"
"Brightway Cleaning"
"Bury Athletics Club"
"Bury Business Group"
"Bury College"
"Bury Council"
"Bury Council - 6TH"
"Bury Council - All Saints"
"Bury Council - Bury Adult Learning"
"Bury Council - Butterstile Primary School"
"Bury Council - Communities & Wellbeing - Bury Aces"
"Bury Council - Killelea House"
"Bury Council - Persona"
"Bury Council - St Monicas"
"Bury Council - Woodhill High"
"Bury FC"
"Bury Financial Advisers"
"Bury GP Federation via BL"
"Bury Market - Amelia Jacobs Boutique"
"Bury Market - Bubbles & Scent"
"Bury Market - Charlie & Co"
"Bury Market - Cheese Plus"
"Bury Market - Gelatos"
"Bury Market Traders"
"Bury Masonic Hall"
"Bury Town FC"
"BusinessLodge (Haircloth …)"
"Carlo Picasso Decorator"
"Carriages"
"Cartime"
"Cava Finance"
"CD Designs"
"Chadwicks"
"Chris Kennedy"
"Chris Murray"
"Compliance Training"
"Connect Comms"
"Conservatory Insulations Northwest Ltd"
"Cook Stars Bury"
"CST Int Ltd t/a Cloudsource"
"DAM Photography"
"Datum"
"Davenports Group"
"DBH Business Solutions"
"Delicious Catering"
"Diamond Solutions"
"Dolly Pops"
"Dooties"
"DTE"
"DTE Business Advisers Limited"
"DTE Risk & Financial Management Limited"
"Eagle & Child"
"Eat Pennines"
"Emmanuel Holcombe School PTA"
"Exchange Utility"
"F & F - AFG LAW"
"F & F Brand Idol"
"F & F - Bury Council"
"F&F Cartime"
"F & F - Munro"
"F & F Sportworks"
"F&F Wirehouse"
"Garside Garage"
"GB Vehicle Leasing"
"GEM Business Support"
"Geralds Ladies Outerwear"
"Get Driving Today"
"Globelink Fallow"
"GM Fire & Rescue"
"GM Police"
"Groundwork"
"GRP Roofing Centre"
"Hay lets Communicate"
"HDR Plumbing & Heating"
"HH Smith & Sons"
"Horsfield & Smith"
"HR Simple Limited"
"Hunt Minas"
"Hypa Concept"
"Icon Kitchen Studio"
"ISM"
"JD Sports"
"Jetchem"
"Joe Porter Scaffolding NW LTD"
"Kadant UK"
"Kaleidoscope Brokerage"
"Kodisto Limited"
"Lacey Plumbing & Heating"
"Lakeside Collection t/a Stables"
"Lets One Ltd"
"Lex Business Equipment Ltd"
"Lifestyle Sales & Lettings"
"Little Haven at Home"
"Live4Energy"
"LNK Motors"
"Luke Barnett"
"Map HR"
"Maq Beaty"
"Mark Whittle (Gardner)"
"Martin Stembridge Photography"
"Mecha Works ( Via BL)"
"Michael Herwald"
"Microbiological Solutions Ltd"
"Microcare"
"Military Standard Training"
"Mill Gate Shopping centre"
"Milliken"
"Munro Greenhalgh"
"Mustard Graphics"
"Nail Envy by Natalie"
"Nazia Haque Wealth Management"
"Nellys Coffee & Cakes"
"Nettl of Bury"
"Netveg Limited"
"New Pads on the rock"
"Newtons of Bury"
"Oakmere Landscaping"
"Orital Design"
"Paul Mason ( Via Nettl )"
"Peers & Associates Ltd"
"People Matters"
"Persona"
"Platinum Care"
"Playfootball 2018 tournament"
"PM+M"
"Ponds NW"
"PQA via Nettl"
"Prestwich Pharmacy"
"Rakem"
"Ramsbottom Sweet Shop"
"Ramsbottom Tap (Badner Ltd)"
"Recruitmant Solutions Services Ltd"
"Recycling Lives"
"Red Tiger Karate"
"Rest & Recharge properties Ltd"
"Richards Plumbing & Heating"
"RMC / Eclipse Lighting & Sound"
"Royal Bank of Scotland"
"Safe"
"Sally Lawler"
"Sambro"
"Schwartz Digital"
"Senior Waste Removals"
"Shiny Music"
"Simeon Annis"
"Slattery Patissier & Chocolatier"
"Sport Works (Gtr Manchester)"
"Springside Primary"
"Square Peg Associates"
"Stables Country Club"
"Stay N Play Doggy Daycare"
"St Lukes"
"Susan Short"
"The Caravan Valeter"
"The Chocolate Café"
"The Victoria Walshaw"
"Think Carpet & Floors"
"Think Design"
"TJWBTC"
"Totally Wicked Ramsbottom"
"Tubs Direct"
"Twelve Creative"
"UKMeds4U.com Limited"
"UK Mortgage"
"Via Facebook"
"Victoria Walshaw"
"Walmersley Golf Club"
"Wayne Hobson Tailor"
"Weaveability Ltd"
"Wellies Pet Services"
"Wirehouse via BL"
"Woodbank FC"
"Woodcocks Haworth & Nuttall"
"X Bury Council"
)

for x in "${companies[@]}"
do
	data="'""{\"name\": \"${x}\", \"street1\": \"\", \"street2\": \"\", \"town\": \"\", \"county\": \"\", \"postcode\": \"\", \"country_code\": \"\", \"company_number\": \"\", \"phone_number\": \"\", \"is_payroll\": 0, \"payroll_report_name\": \"\", \"payroll_reconciliation_type\": \"\", \"is_supporter\": 0, \"is_patron\": 0, \"notes\": \"\"}""'"
	json=$( jq -c -n \
		--arg name "${x}" \
		--arg street1 "" \
		--arg street2 "" \
		--arg town "" \
		--arg county "" \
		--arg postcode "" \
		--arg country_code "" \
		--arg email "" \
		--arg company_number "" \
		--arg phone_number "" \
		--arg is_payroll 0 \
		--arg payroll_report_name "" \
		--arg payroll_reconciliation_type "" \
		--arg is_supporter 0 \
		--arg is_patron 0 \
		--arg notes "" \
		'{name: $name, street1: $street1, street2: $street2, town: $town, county: $county, postcode: $postcode, country_code: $country_code, email: $email, company_number: $company_number, phone_number: $phone_number, is_payroll: $is_payroll, payroll_report_name: $payroll_report_name, payroll_reconciliation_type: $payroll_reconciliation_type, is_supporter: $is_supporter, is_patron: $is_patron, notes: $notes}'
		)
	json="'"$json"'"
	echo $x;
	eval bash ./post.sh ${json} /company/create
	#echo $json
	#exit
done
