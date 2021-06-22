'use strict';

const axios = require('axios');
const FormData = require('form-data');

exports.create = async (req, res) => {
    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            // ...form.getHeaders(),
            // 'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };
    const companies = await axios.get(process.env.API_URL + '/company/options', config)
        .then(async result => {
            console.log(result);
            return result.data.result.options;
        });
    const countries = [
        {code: "GB", label: "United Kingdom"},
        {code: "AF", label: "Afghanistan"},
        {code: "AX", label: "Åland Islands"},
        {code: "AL", label: "Albania"},
        {code: "DZ", label: "Algeria"},
        {code: "AS", label: "American Samoa"},
        {code: "AD", label: "Andorra"},
        {code: "AO", label: "Angola"},
        {code: "AI", label: "Anguilla"},
        {code: "AQ", label: "Antarctica"},
        {code: "AG", label: "Antigua and Barbuda"},
        {code: "AR", label: "Argentina"},
        {code: "AM", label: "Armenia"},
        {code: "AW", label: "Aruba"},
        {code: "AU", label: "Australia"},
        {code: "AT", label: "Austria"},
        {code: "AZ", label: "Azerbaijan"},
        {code: "BS", label: "Bahamas"},
        {code: "BH", label: "Bahrain"},
        {code: "BD", label: "Bangladesh"},
        {code: "BB", label: "Barbados"},
        {code: "BY", label: "Belarus"},
        {code: "BE", label: "Belgium"},
        {code: "BZ", label: "Belize"},
        {code: "BJ", label: "Benin"},
        {code: "BM", label: "Bermuda"},
        {code: "BT", label: "Bhutan"},
        {code: "BO", label: "Bolivia, Plurinational State of"},
        {code: "BQ", label: "Bonaire, Sint Eustatius and Saba"},
        {code: "BA", label: "Bosnia and Herzegovina"},
        {code: "BW", label: "Botswana"},
        {code: "BV", label: "Bouvet Island"},
        {code: "BR", label: "Brazil"},
        {code: "IO", label: "British Indian Ocean Territory"},
        {code: "BN", label: "Brunei Darussalam"},
        {code: "BG", label: "Bulgaria"},
        {code: "BF", label: "Burkina Faso"},
        {code: "BI", label: "Burundi"},
        {code: "KH", label: "Cambodia"},
        {code: "CM", label: "Cameroon"},
        {code: "CA", label: "Canada"},
        {code: "CV", label: "Cape Verde"},
        {code: "KY", label: "Cayman Islands"},
        {code: "CF", label: "Central African Republic"},
        {code: "TD", label: "Chad"},
        {code: "CL", label: "Chile"},
        {code: "CN", label: "China"},
        {code: "CX", label: "Christmas Island"},
        {code: "CC", label: "Cocos (Keeling) Islands"},
        {code: "CO", label: "Colombia"},
        {code: "KM", label: "Comoros"},
        {code: "CG", label: "Congo"},
        {code: "CD", label: "Congo, the Democratic Republic of the"},
        {code: "CK", label: "Cook Islands"},
        {code: "CR", label: "Costa Rica"},
        {code: "CI", label: "Côte d'Ivoire"},
        {code: "HR", label: "Croatia"},
        {code: "CU", label: "Cuba"},
        {code: "CW", label: "Curaçao"},
        {code: "CY", label: "Cyprus"},
        {code: "CZ", label: "Czech Republic"},
        {code: "DK", label: "Denmark"},
        {code: "DJ", label: "Djibouti"},
        {code: "DM", label: "Dominica"},
        {code: "DO", label: "Dominican Republic"},
        {code: "EC", label: "Ecuador"},
        {code: "EG", label: "Egypt"},
        {code: "SV", label: "El Salvador"},
        {code: "GQ", label: "Equatorial Guinea"},
        {code: "ER", label: "Eritrea"},
        {code: "EE", label: "Estonia"},
        {code: "ET", label: "Ethiopia"},
        {code: "FK", label: "Falkland Islands (Malvinas)"},
        {code: "FO", label: "Faroe Islands"},
        {code: "FJ", label: "Fiji"},
        {code: "FI", label: "Finland"},
        {code: "FR", label: "France"},
        {code: "GF", label: "French Guiana"},
        {code: "PF", label: "French Polynesia"},
        {code: "TF", label: "French Southern Territories"},
        {code: "GA", label: "Gabon"},
        {code: "GM", label: "Gambia"},
        {code: "GE", label: "Georgia"},
        {code: "DE", label: "Germany"},
        {code: "GH", label: "Ghana"},
        {code: "GI", label: "Gibraltar"},
        {code: "GR", label: "Greece"},
        {code: "GL", label: "Greenland"},
        {code: "GD", label: "Grenada"},
        {code: "GP", label: "Guadeloupe"},
        {code: "GU", label: "Guam"},
        {code: "GT", label: "Guatemala"},
        {code: "GG", label: "Guernsey"},
        {code: "GN", label: "Guinea"},
        {code: "GW", label: "Guinea-Bissau"},
        {code: "GY", label: "Guyana"},
        {code: "HT", label: "Haiti"},
        {code: "HM", label: "Heard Island and McDonald Islands"},
        {code: "VA", label: "Holy See (Vatican City State)"},
        {code: "HN", label: "Honduras"},
        {code: "HK", label: "Hong Kong"},
        {code: "HU", label: "Hungary"},
        {code: "IS", label: "Iceland"},
        {code: "IN", label: "India"},
        {code: "ID", label: "Indonesia"},
        {code: "IR", label: "Iran, Islamic Republic of"},
        {code: "IQ", label: "Iraq"},
        {code: "IE", label: "Ireland"},
        {code: "IM", label: "Isle of Man"},
        {code: "IL", label: "Israel"},
        {code: "IT", label: "Italy"},
        {code: "JM", label: "Jamaica"},
        {code: "JP", label: "Japan"},
        {code: "JE", label: "Jersey"},
        {code: "JO", label: "Jordan"},
        {code: "KZ", label: "Kazakhstan"},
        {code: "KE", label: "Kenya"},
        {code: "KI", label: "Kiribati"},
        {code: "KP", label: "Korea, Democratic People's Republic of"},
        {code: "KR", label: "Korea, Republic of"},
        {code: "KW", label: "Kuwait"},
        {code: "KG", label: "Kyrgyzstan"},
        {code: "LA", label: "Lao People's Democratic Republic"},
        {code: "LV", label: "Latvia"},
        {code: "LB", label: "Lebanon"},
        {code: "LS", label: "Lesotho"},
        {code: "LR", label: "Liberia"},
        {code: "LY", label: "Libya"},
        {code: "LI", label: "Liechtenstein"},
        {code: "LT", label: "Lithuania"},
        {code: "LU", label: "Luxembourg"},
        {code: "MO", label: "Macao"},
        {code: "MK", label: "Macedonia, the Former Yugoslav Republic of"},
        {code: "MG", label: "Madagascar"},
        {code: "MW", label: "Malawi"},
        {code: "MY", label: "Malaysia"},
        {code: "MV", label: "Maldives"},
        {code: "ML", label: "Mali"},
        {code: "MT", label: "Malta"},
        {code: "MH", label: "Marshall Islands"},
        {code: "MQ", label: "Martinique"},
        {code: "MR", label: "Mauritania"},
        {code: "MU", label: "Mauritius"},
        {code: "YT", label: "Mayotte"},
        {code: "MX", label: "Mexico"},
        {code: "FM", label: "Micronesia, Federated States of"},
        {code: "MD", label: "Moldova, Republic of"},
        {code: "MC", label: "Monaco"},
        {code: "MN", label: "Mongolia"},
        {code: "ME", label: "Montenegro"},
        {code: "MS", label: "Montserrat"},
        {code: "MA", label: "Morocco"},
        {code: "MZ", label: "Mozambique"},
        {code: "MM", label: "Myanmar"},
        {code: "NA", label: "Namibia"},
        {code: "NR", label: "Nauru"},
        {code: "NP", label: "Nepal"},
        {code: "NL", label: "Netherlands"},
        {code: "NC", label: "New Caledonia"},
        {code: "NZ", label: "New Zealand"},
        {code: "NI", label: "Nicaragua"},
        {code: "NE", label: "Niger"},
        {code: "NG", label: "Nigeria"},
        {code: "NU", label: "Niue"},
        {code: "NF", label: "Norfolk Island"},
        {code: "MP", label: "Northern Mariana Islands"},
        {code: "NO", label: "Norway"},
        {code: "OM", label: "Oman"},
        {code: "PK", label: "Pakistan"},
        {code: "PW", label: "Palau"},
        {code: "PS", label: "Palestine, State of"},
        {code: "PA", label: "Panama"},
        {code: "PG", label: "Papua New Guinea"},
        {code: "PY", label: "Paraguay"},
        {code: "PE", label: "Peru"},
        {code: "PH", label: "Philippines"},
        {code: "PN", label: "Pitcairn"},
        {code: "PL", label: "Poland"},
        {code: "PT", label: "Portugal"},
        {code: "PR", label: "Puerto Rico"},
        {code: "QA", label: "Qatar"},
        {code: "RE", label: "Réunion"},
        {code: "RO", label: "Romania"},
        {code: "RU", label: "Russian Federation"},
        {code: "RW", label: "Rwanda"},
        {code: "BL", label: "Saint Barthélemy"},
        {code: "SH", label: "Saint Helena, Ascension and Tristan da Cunha"},
        {code: "KN", label: "Saint Kitts and Nevis"},
        {code: "LC", label: "Saint Lucia"},
        {code: "MF", label: "Saint Martin (French part)"},
        {code: "PM", label: "Saint Pierre and Miquelon"},
        {code: "VC", label: "Saint Vincent and the Grenadines"},
        {code: "WS", label: "Samoa"},
        {code: "SM", label: "San Marino"},
        {code: "ST", label: "Sao Tome and Principe"},
        {code: "SA", label: "Saudi Arabia"},
        {code: "SN", label: "Senegal"},
        {code: "RS", label: "Serbia"},
        {code: "SC", label: "Seychelles"},
        {code: "SL", label: "Sierra Leone"},
        {code: "SG", label: "Singapore"},
        {code: "SX", label: "Sint Maarten (Dutch part)"},
        {code: "SK", label: "Slovakia"},
        {code: "SI", label: "Slovenia"},
        {code: "SB", label: "Solomon Islands"},
        {code: "SO", label: "Somalia"},
        {code: "ZA", label: "South Africa"},
        {code: "GS", label: "South Georgia and the South Sandwich Islands"},
        {code: "SS", label: "South Sudan"},
        {code: "ES", label: "Spain"},
        {code: "LK", label: "Sri Lanka"},
        {code: "SD", label: "Sudan"},
        {code: "SR", label: "Suriname"},
        {code: "SJ", label: "Svalbard and Jan Mayen"},
        {code: "SZ", label: "Swaziland"},
        {code: "SE", label: "Sweden"},
        {code: "CH", label: "Switzerland"},
        {code: "SY", label: "Syrian Arab Republic"},
        {code: "TW", label: "Taiwan, Province of China"},
        {code: "TJ", label: "Tajikistan"},
        {code: "TZ", label: "Tanzania, United Republic of"},
        {code: "TH", label: "Thailand"},
        {code: "TL", label: "Timor-Leste"},
        {code: "TG", label: "Togo"},
        {code: "TK", label: "Tokelau"},
        {code: "TO", label: "Tonga"},
        {code: "TT", label: "Trinidad and Tobago"},
        {code: "TN", label: "Tunisia"},
        {code: "TR", label: "Turkey"},
        {code: "TM", label: "Turkmenistan"},
        {code: "TC", label: "Turks and Caicos Islands"},
        {code: "TV", label: "Tuvalu"},
        {code: "UG", label: "Uganda"},
        {code: "UA", label: "Ukraine"},
        {code: "AE", label: "United Arab Emirates"},
        {code: "US", label: "United States"},
        {code: "UM", label: "United States Minor Outlying Islands"},
        {code: "UY", label: "Uruguay"},
        {code: "UZ", label: "Uzbekistan"},
        {code: "VU", label: "Vanuatu"},
        {code: "VE", label: "Venezuela, Bolivarian Republic of"},
        {code: "VN", label: "Viet Nam"},
        {code: "VG", label: "Virgin Islands, British"},
        {code: "VI", label: "Virgin Islands, U.S."},
        {code: "WF", label: "Wallis and Futuna"},
        {code: "EH", label: "Western Sahara"},
        {code: "YE", label: "Yemen"},
        {code: "ZM", label: "Zambia"},
        {code: "ZW", label: "Zimbabwe"},
    ];
    res.render('new_entrant_form', {
        user: req.session.user,
        customJs: 'new_entrant_form',
        paymentMethods: [
            {code: 'direct_debit', label: 'Direct Debit'},
            {code: 'payroll', label: 'Payroll'},
            {code: 'standing_order', label: 'Standing Order'}
        ],
        frequencies: [
            {code: 'monthly', label: 'Monthly'},
            {code: '4-weekly', label: '4 Weekly'},
            {code: 'weekly', label: 'Weekly'},
        ],
        companies: companies,
        countries: countries
    });
};

exports.add = async (req, res) => {
    const form = new FormData();

    form.append('companyId', req.body.companyNumber);
    form.append('firstName', req.body.first_name);
    form.append('lastName', req.body.last_name);
    form.append('street1', req.body.street1);
    form.append('street2', req.body.street2);
    form.append('town', req.body.town);
    form.append('county', req.body.county);
    form.append('countryCode', req.body.country_code);
    form.append('postcode', req.body.postcode);
    form.append('email', req.body.email);
    form.append('phoneNumber', req.body.phone_number);
    if (req.body.is_form_copied_and_sent_to_business == 'on') {
        form.append('isFormCopiedAndSentToBusiness', '1');
    } else {
        form.append('isFormCopiedAndSentToBusiness', '0');
    }
    // form.append('isDrawNumbersSentToEntrant', req.body.is_draw_numbers_sent_to_entrant);
    form.append('isDrawNumbersSentToEntrant', 0);
    form.append('notes', req.body.notes);
    form.append('payrollReference', req.body.payroll_reference);
    form.append('paymentFrequency', req.body.payment_frequency);
    form.append('paymentMethod', req.body.payment_method);
    form.append('howManyEntries', req.body.how_many_entries);
    form.append('balance', req.body.balance);
    if (req.body.is_added_to_crm == 'on') {
        form.append('isAddedToCrm', '1');
    } else {
        form.append('isAddedToCrm', '0');
    }
    if (req.body.is_consent_given_to_contact_line_manager == 'on') {
        form.append('isConsentGivenToContactLineManager', '1');
    } else {
        form.append('isConsentGivenToContactLineManager', '0');
    }
    // form.append('status', req.body.status);

    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    const headers = {
        ...config,
        ...form.getHeaders(),
        // "Content-Length": form.getLengthSync()
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
    };
    await axios.post(process.env.API_URL + '/draw_entrants/create', form, config)
        .then(async result => {
            //res.send(JSON.stringify({result: true, data: result.data}));
            res.redirect('/draw_entrants/update/' + result.data.index);
        });
};

exports.getAll = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    const entrants = await axios.get(process.env.API_URL + '/draw_entrants/list', config)
        .then(async result => {
            let rows = [];
            await result.data.models.forEach(row => {
                rows.push({
                    id: row.id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    email: row.email,
                    phoneNumber: row.phoneNumber,
                    paymentMethod: row.paymentMethod,
                });
            });
            return rows;
        });
    res.render('datatable', {
        datatable: true,
        user: req.session.user,
        title: 'Draw Entrants',
        sort_column: 0,
        sort_direction: "desc",
        data: entrants,
        export_filename: "draw_entrants",
        columns: [
            'ID',
            'First Name',
            'Last Name',
            'Email',
            'Phone Number',
            'Payment Method',
        ],
    });
};

exports.getId = async (req, res) => {
    console.log("/draw_entrants/update__");
    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`
        }
    };

    const entrant = await axios.get(process.env.API_URL + '/draw_entrants/get/' + req.params.id, config)
        .then(async result => {
            return result.data.model;
        });

    console.log("update_id : ", entrant);
    
    const companies = await axios.get(process.env.API_URL + '/company/options', config)
        .then(async result => {
            console.log(result);
            return result.data.result.options;
        });
    
    const countries = [
        {code: "GB", label: "United Kingdom"},
        {code: "AF", label: "Afghanistan"},
        {code: "AX", label: "Åland Islands"},
        {code: "AL", label: "Albania"},
        {code: "DZ", label: "Algeria"},
        {code: "AS", label: "American Samoa"},
        {code: "AD", label: "Andorra"},
        {code: "AO", label: "Angola"},
        {code: "AI", label: "Anguilla"},
        {code: "AQ", label: "Antarctica"},
        {code: "AG", label: "Antigua and Barbuda"},
        {code: "AR", label: "Argentina"},
        {code: "AM", label: "Armenia"},
        {code: "AW", label: "Aruba"},
        {code: "AU", label: "Australia"},
        {code: "AT", label: "Austria"},
        {code: "AZ", label: "Azerbaijan"},
        {code: "BS", label: "Bahamas"},
        {code: "BH", label: "Bahrain"},
        {code: "BD", label: "Bangladesh"},
        {code: "BB", label: "Barbados"},
        {code: "BY", label: "Belarus"},
        {code: "BE", label: "Belgium"},
        {code: "BZ", label: "Belize"},
        {code: "BJ", label: "Benin"},
        {code: "BM", label: "Bermuda"},
        {code: "BT", label: "Bhutan"},
        {code: "BO", label: "Bolivia, Plurinational State of"},
        {code: "BQ", label: "Bonaire, Sint Eustatius and Saba"},
        {code: "BA", label: "Bosnia and Herzegovina"},
        {code: "BW", label: "Botswana"},
        {code: "BV", label: "Bouvet Island"},
        {code: "BR", label: "Brazil"},
        {code: "IO", label: "British Indian Ocean Territory"},
        {code: "BN", label: "Brunei Darussalam"},
        {code: "BG", label: "Bulgaria"},
        {code: "BF", label: "Burkina Faso"},
        {code: "BI", label: "Burundi"},
        {code: "KH", label: "Cambodia"},
        {code: "CM", label: "Cameroon"},
        {code: "CA", label: "Canada"},
        {code: "CV", label: "Cape Verde"},
        {code: "KY", label: "Cayman Islands"},
        {code: "CF", label: "Central African Republic"},
        {code: "TD", label: "Chad"},
        {code: "CL", label: "Chile"},
        {code: "CN", label: "China"},
        {code: "CX", label: "Christmas Island"},
        {code: "CC", label: "Cocos (Keeling) Islands"},
        {code: "CO", label: "Colombia"},
        {code: "KM", label: "Comoros"},
        {code: "CG", label: "Congo"},
        {code: "CD", label: "Congo, the Democratic Republic of the"},
        {code: "CK", label: "Cook Islands"},
        {code: "CR", label: "Costa Rica"},
        {code: "CI", label: "Côte d'Ivoire"},
        {code: "HR", label: "Croatia"},
        {code: "CU", label: "Cuba"},
        {code: "CW", label: "Curaçao"},
        {code: "CY", label: "Cyprus"},
        {code: "CZ", label: "Czech Republic"},
        {code: "DK", label: "Denmark"},
        {code: "DJ", label: "Djibouti"},
        {code: "DM", label: "Dominica"},
        {code: "DO", label: "Dominican Republic"},
        {code: "EC", label: "Ecuador"},
        {code: "EG", label: "Egypt"},
        {code: "SV", label: "El Salvador"},
        {code: "GQ", label: "Equatorial Guinea"},
        {code: "ER", label: "Eritrea"},
        {code: "EE", label: "Estonia"},
        {code: "ET", label: "Ethiopia"},
        {code: "FK", label: "Falkland Islands (Malvinas)"},
        {code: "FO", label: "Faroe Islands"},
        {code: "FJ", label: "Fiji"},
        {code: "FI", label: "Finland"},
        {code: "FR", label: "France"},
        {code: "GF", label: "French Guiana"},
        {code: "PF", label: "French Polynesia"},
        {code: "TF", label: "French Southern Territories"},
        {code: "GA", label: "Gabon"},
        {code: "GM", label: "Gambia"},
        {code: "GE", label: "Georgia"},
        {code: "DE", label: "Germany"},
        {code: "GH", label: "Ghana"},
        {code: "GI", label: "Gibraltar"},
        {code: "GR", label: "Greece"},
        {code: "GL", label: "Greenland"},
        {code: "GD", label: "Grenada"},
        {code: "GP", label: "Guadeloupe"},
        {code: "GU", label: "Guam"},
        {code: "GT", label: "Guatemala"},
        {code: "GG", label: "Guernsey"},
        {code: "GN", label: "Guinea"},
        {code: "GW", label: "Guinea-Bissau"},
        {code: "GY", label: "Guyana"},
        {code: "HT", label: "Haiti"},
        {code: "HM", label: "Heard Island and McDonald Islands"},
        {code: "VA", label: "Holy See (Vatican City State)"},
        {code: "HN", label: "Honduras"},
        {code: "HK", label: "Hong Kong"},
        {code: "HU", label: "Hungary"},
        {code: "IS", label: "Iceland"},
        {code: "IN", label: "India"},
        {code: "ID", label: "Indonesia"},
        {code: "IR", label: "Iran, Islamic Republic of"},
        {code: "IQ", label: "Iraq"},
        {code: "IE", label: "Ireland"},
        {code: "IM", label: "Isle of Man"},
        {code: "IL", label: "Israel"},
        {code: "IT", label: "Italy"},
        {code: "JM", label: "Jamaica"},
        {code: "JP", label: "Japan"},
        {code: "JE", label: "Jersey"},
        {code: "JO", label: "Jordan"},
        {code: "KZ", label: "Kazakhstan"},
        {code: "KE", label: "Kenya"},
        {code: "KI", label: "Kiribati"},
        {code: "KP", label: "Korea, Democratic People's Republic of"},
        {code: "KR", label: "Korea, Republic of"},
        {code: "KW", label: "Kuwait"},
        {code: "KG", label: "Kyrgyzstan"},
        {code: "LA", label: "Lao People's Democratic Republic"},
        {code: "LV", label: "Latvia"},
        {code: "LB", label: "Lebanon"},
        {code: "LS", label: "Lesotho"},
        {code: "LR", label: "Liberia"},
        {code: "LY", label: "Libya"},
        {code: "LI", label: "Liechtenstein"},
        {code: "LT", label: "Lithuania"},
        {code: "LU", label: "Luxembourg"},
        {code: "MO", label: "Macao"},
        {code: "MK", label: "Macedonia, the Former Yugoslav Republic of"},
        {code: "MG", label: "Madagascar"},
        {code: "MW", label: "Malawi"},
        {code: "MY", label: "Malaysia"},
        {code: "MV", label: "Maldives"},
        {code: "ML", label: "Mali"},
        {code: "MT", label: "Malta"},
        {code: "MH", label: "Marshall Islands"},
        {code: "MQ", label: "Martinique"},
        {code: "MR", label: "Mauritania"},
        {code: "MU", label: "Mauritius"},
        {code: "YT", label: "Mayotte"},
        {code: "MX", label: "Mexico"},
        {code: "FM", label: "Micronesia, Federated States of"},
        {code: "MD", label: "Moldova, Republic of"},
        {code: "MC", label: "Monaco"},
        {code: "MN", label: "Mongolia"},
        {code: "ME", label: "Montenegro"},
        {code: "MS", label: "Montserrat"},
        {code: "MA", label: "Morocco"},
        {code: "MZ", label: "Mozambique"},
        {code: "MM", label: "Myanmar"},
        {code: "NA", label: "Namibia"},
        {code: "NR", label: "Nauru"},
        {code: "NP", label: "Nepal"},
        {code: "NL", label: "Netherlands"},
        {code: "NC", label: "New Caledonia"},
        {code: "NZ", label: "New Zealand"},
        {code: "NI", label: "Nicaragua"},
        {code: "NE", label: "Niger"},
        {code: "NG", label: "Nigeria"},
        {code: "NU", label: "Niue"},
        {code: "NF", label: "Norfolk Island"},
        {code: "MP", label: "Northern Mariana Islands"},
        {code: "NO", label: "Norway"},
        {code: "OM", label: "Oman"},
        {code: "PK", label: "Pakistan"},
        {code: "PW", label: "Palau"},
        {code: "PS", label: "Palestine, State of"},
        {code: "PA", label: "Panama"},
        {code: "PG", label: "Papua New Guinea"},
        {code: "PY", label: "Paraguay"},
        {code: "PE", label: "Peru"},
        {code: "PH", label: "Philippines"},
        {code: "PN", label: "Pitcairn"},
        {code: "PL", label: "Poland"},
        {code: "PT", label: "Portugal"},
        {code: "PR", label: "Puerto Rico"},
        {code: "QA", label: "Qatar"},
        {code: "RE", label: "Réunion"},
        {code: "RO", label: "Romania"},
        {code: "RU", label: "Russian Federation"},
        {code: "RW", label: "Rwanda"},
        {code: "BL", label: "Saint Barthélemy"},
        {code: "SH", label: "Saint Helena, Ascension and Tristan da Cunha"},
        {code: "KN", label: "Saint Kitts and Nevis"},
        {code: "LC", label: "Saint Lucia"},
        {code: "MF", label: "Saint Martin (French part)"},
        {code: "PM", label: "Saint Pierre and Miquelon"},
        {code: "VC", label: "Saint Vincent and the Grenadines"},
        {code: "WS", label: "Samoa"},
        {code: "SM", label: "San Marino"},
        {code: "ST", label: "Sao Tome and Principe"},
        {code: "SA", label: "Saudi Arabia"},
        {code: "SN", label: "Senegal"},
        {code: "RS", label: "Serbia"},
        {code: "SC", label: "Seychelles"},
        {code: "SL", label: "Sierra Leone"},
        {code: "SG", label: "Singapore"},
        {code: "SX", label: "Sint Maarten (Dutch part)"},
        {code: "SK", label: "Slovakia"},
        {code: "SI", label: "Slovenia"},
        {code: "SB", label: "Solomon Islands"},
        {code: "SO", label: "Somalia"},
        {code: "ZA", label: "South Africa"},
        {code: "GS", label: "South Georgia and the South Sandwich Islands"},
        {code: "SS", label: "South Sudan"},
        {code: "ES", label: "Spain"},
        {code: "LK", label: "Sri Lanka"},
        {code: "SD", label: "Sudan"},
        {code: "SR", label: "Suriname"},
        {code: "SJ", label: "Svalbard and Jan Mayen"},
        {code: "SZ", label: "Swaziland"},
        {code: "SE", label: "Sweden"},
        {code: "CH", label: "Switzerland"},
        {code: "SY", label: "Syrian Arab Republic"},
        {code: "TW", label: "Taiwan, Province of China"},
        {code: "TJ", label: "Tajikistan"},
        {code: "TZ", label: "Tanzania, United Republic of"},
        {code: "TH", label: "Thailand"},
        {code: "TL", label: "Timor-Leste"},
        {code: "TG", label: "Togo"},
        {code: "TK", label: "Tokelau"},
        {code: "TO", label: "Tonga"},
        {code: "TT", label: "Trinidad and Tobago"},
        {code: "TN", label: "Tunisia"},
        {code: "TR", label: "Turkey"},
        {code: "TM", label: "Turkmenistan"},
        {code: "TC", label: "Turks and Caicos Islands"},
        {code: "TV", label: "Tuvalu"},
        {code: "UG", label: "Uganda"},
        {code: "UA", label: "Ukraine"},
        {code: "AE", label: "United Arab Emirates"},
        {code: "US", label: "United States"},
        {code: "UM", label: "United States Minor Outlying Islands"},
        {code: "UY", label: "Uruguay"},
        {code: "UZ", label: "Uzbekistan"},
        {code: "VU", label: "Vanuatu"},
        {code: "VE", label: "Venezuela, Bolivarian Republic of"},
        {code: "VN", label: "Viet Nam"},
        {code: "VG", label: "Virgin Islands, British"},
        {code: "VI", label: "Virgin Islands, U.S."},
        {code: "WF", label: "Wallis and Futuna"},
        {code: "EH", label: "Western Sahara"},
        {code: "YE", label: "Yemen"},
        {code: "ZM", label: "Zambia"},
        {code: "ZW", label: "Zimbabwe"},
    ];
    res.render('edit_entrant_form', {
        user: req.session.user,
        customJs: 'new_entrant_form',
        id: entrant.id,
        company: entrant.company.name,
        companyId: entrant.companyId,
        firstName: entrant.firstName,
        lastName: entrant.lastName,
        street1: entrant.street1,
        street2: entrant.street2,
        town: entrant.town,
        country: entrant.county,
        countryCode: entrant.countryCode,
        postcode: entrant.postcode,
        email: entrant.email,
        phoneNumber: entrant.phoneNumber,
        isFormCopiedAndSentToBusiness: entrant.isFormCopiedAndSentToBusiness,
        isDrawNumbersSentToEntrant: entrant.isDrawNumbersSentToEntrant,
        notes: entrant.notes,
        payrollReference: entrant.payrollReference,
        paymentFrequency: entrant.paymentFrequency,
        paymentMethod: entrant.paymentMethod,
        balance: entrant.balance,
        isAddedToCrm: entrant.isAddedToCrm,
        isConsentGivenToContactLineManager: entrant.isConsentGivenToContactLineManager,
        drawEntries: entrant.drawEntries,
        paymentMethods: [
            {code: 'direct_debit', label: 'Direct Debit'},
            {code: 'payroll', label: 'Payroll'},
            {code: 'standing_order', label: 'Standing Order'}
        ],
        frequencies: [
            {code: 'monthly', label: 'Monthly'},
            {code: '4-weekly', label: '4 Weekly'},
            {code: 'weekly', label: 'Weekly'},
        ],
        companies: companies,
        countries: countries
    });
};

exports.update = async (req, res) => {
    console.log("req.body.companyId_update : ", req.body);

    const form = new FormData();

    form.append('companyId', req.body.companyNumber);
    form.append('firstName', req.body.first_name);
    form.append('lastName', req.body.last_name);
    form.append('street1', req.body.street1);
    form.append('street2', req.body.street2);
    form.append('town', req.body.town);
    form.append('county', req.body.county);
    form.append('countryCode', req.body.country_code);
    form.append('postcode', req.body.postcode);
    form.append('email', req.body.email);
    form.append('phoneNumber', req.body.phone_number);
    if (req.body.is_form_copied_and_sent_to_business == 'on') {
        form.append('isFormCopiedAndSentToBusiness', '1');
    } else {
        form.append('isFormCopiedAndSentToBusiness', '0');
    }
    // form.append('isDrawNumbersSentToEntrant', req.body.is_draw_numbers_sent_to_entrant);
    form.append('isDrawNumbersSentToEntrant', 0);
    form.append('notes', req.body.notes);
    form.append('addMoreEntries', req.body.add_more_entries);
    form.append('payrollReference', req.body.payroll_reference);
    form.append('paymentFrequency', req.body.payment_frequency);
    form.append('paymentMethod', req.body.payment_method);
    form.append('balance', req.body.balance);
    if (req.body.is_added_to_crm == 'on') {
        form.append('isAddedToCrm', '1');
    } else {
        form.append('isAddedToCrm', '0');
    }
    if (req.body.is_consent_given_to_contact_line_manager == 'on') {
        form.append('isConsentGivenToContactLineManager', '1');
    } else {
        form.append('isConsentGivenToContactLineManager', '0');
    }
    // form.append('status', req.body.status);

    const config = {
        headers: {
            Authorization: `Bearer ${req.session.token}`,
            ...form.getHeaders(),
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        }
    };

    const headers = {
        ...config,
        ...form.getHeaders(),
        // "Content-Length": form.getLengthSync()
        'content-type': `multipart/form-data; boundary=${form._boundary}`,
    };

    await axios.post(process.env.API_URL + '/draw_entrants/update/' + req.body.entrantId, form, config)
        .then(async result => {
            //res.send(JSON.stringify({result: true, data: result.data}));
            res.redirect('/draw_entrants/create');
        });
};

