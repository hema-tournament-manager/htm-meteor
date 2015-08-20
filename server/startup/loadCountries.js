Meteor.startup(function() {
  if (Countries.find().count() === 0) {
    var countries = [
      {code2:""  , code3: ""   , name:"Unknown"},
      {code2:"AF", code3: "AFG", name:"Afghanistan"},
      {code2:"AX", code3: "ALA", name:"Åland Islands"},
      {code2:"AL", code3: "ALB", name:"Albania"},
      {code2:"DZ", code3: "DZA", name:"Algeria"},
      {code2:"AS", code3: "ASM", name:"American Samoa"},
      {code2:"AD", code3: "AND", name:"Andorra"},
      {code2:"AO", code3: "AGO", name:"Angola"},
      {code2:"AI", code3: "AIA", name:"Anguilla"},
      {code2:"AQ", code3: "ATA", name:"Antarctica"},
      {code2:"AG", code3: "ATG", name:"Antigua and Barbuda"},
      {code2:"AR", code3: "ARG", name:"Argentina"},
      {code2:"AM", code3: "ARM", name:"Armenia"},
      {code2:"AW", code3: "ABW", name:"Aruba"},
      {code2:"AU", code3: "AUS", name:"Australia"},
      {code2:"AT", code3: "AUT", name:"Austria"},
      {code2:"AZ", code3: "AZE", name:"Azerbaijan"},
      {code2:"BS", code3: "BHS", name:"Bahamas"},
      {code2:"BH", code3: "BHR", name:"Bahrain"},
      {code2:"BD", code3: "BGD", name:"Bangladesh"},
      {code2:"BB", code3: "BRB", name:"Barbados"},
      {code2:"BY", code3: "BLR", name:"Belarus"},
      {code2:"BE", code3: "BEL", name:"Belgium"},
      {code2:"BZ", code3: "BLZ", name:"Belize"},
      {code2:"BJ", code3: "BEN", name:"Benin"},
      {code2:"BM", code3: "BMU", name:"Bermuda"},
      {code2:"BT", code3: "BTN", name:"Bhutan"},
      {code2:"BO", code3: "BOL", name:"Bolivia, Plurinational State of"},
      {code2:"BQ", code3: "BES", name:"Bonaire, Sint Eustatius and Saba"},
      {code2:"BA", code3: "BIH", name:"Bosnia and Herzegovina"},
      {code2:"BW", code3: "BWA", name:"Botswana"},
      {code2:"BV", code3: "BVT", name:"Bouvet Island"},
      {code2:"BR", code3: "BRA", name:"Brazil"},
      {code2:"IO", code3: "IOT", name:"British Indian Ocean Territory"},
      {code2:"BN", code3: "BRN", name:"Brunei Darussalam"},
      {code2:"BG", code3: "BGR", name:"Bulgaria"},
      {code2:"BF", code3: "BFA", name:"Burkina Faso"},
      {code2:"BI", code3: "BDI", name:"Burundi"},
      {code2:"KH", code3: "KHM", name:"Cambodia"},
      {code2:"CM", code3: "CMR", name:"Cameroon"},
      {code2:"CA", code3: "CAN", name:"Canada"},
      {code2:"CV", code3: "CPV", name:"Cape Verde"},
      {code2:"KY", code3: "CYM", name:"Cayman Islands"},
      {code2:"CF", code3: "CAF", name:"Central African Republic"},
      {code2:"TD", code3: "TCD", name:"Chad"},
      {code2:"CL", code3: "CHL", name:"Chile"},
      {code2:"CN", code3: "CHN", name:"China"},
      {code2:"CX", code3: "CXR", name:"Christmas Island"},
      {code2:"CC", code3: "CCK", name:"Cocos (Keeling) Islands"},
      {code2:"CO", code3: "COL", name:"Colombia"},
      {code2:"KM", code3: "COM", name:"Comoros"},
      {code2:"CG", code3: "COG", name:"Congo"},
      {code2:"CD", code3: "COD", name:"Congo, the Democratic Republic of the"},
      {code2:"CK", code3: "COK", name:"Cook Islands"},
      {code2:"CR", code3: "CRI", name:"Costa Rica"},
      {code2:"CI", code3: "CIV", name:"Côte d'Ivoire"},
      {code2:"HR", code3: "HRV", name:"Croatia"},
      {code2:"CU", code3: "CUB", name:"Cuba"},
      {code2:"CW", code3: "CUW", name:"Curaçao"},
      {code2:"CY", code3: "CYP", name:"Cyprus"},
      {code2:"CZ", code3: "CZE", name:"Czech Republic"},
      {code2:"DK", code3: "DNK", name:"Denmark"},
      {code2:"DJ", code3: "DJI", name:"Djibouti"},
      {code2:"DM", code3: "DMA", name:"Dominica"},
      {code2:"DO", code3: "DOM", name:"Dominican Republic"},
      {code2:"EC", code3: "ECU", name:"Ecuador"},
      {code2:"EG", code3: "EGY", name:"Egypt"},
      {code2:"SV", code3: "SLV", name:"El Salvador"},
      {code2:"GQ", code3: "GNQ", name:"Equatorial Guinea"},
      {code2:"ER", code3: "ERI", name:"Eritrea"},
      {code2:"EE", code3: "EST", name:"Estonia"},
      {code2:"ET", code3: "ETH", name:"Ethiopia"},
      {code2:"FK", code3: "FLK", name:"Falkland Islands (Malvinas)"},
      {code2:"FO", code3: "FRO", name:"Faroe Islands"},
      {code2:"FJ", code3: "FJI", name:"Fiji"},
      {code2:"FI", code3: "FIN", name:"Finland"},
      {code2:"FR", code3: "FRA", name:"France"},
      {code2:"GF", code3: "GUF", name:"French Guiana"},
      {code2:"PF", code3: "PYF", name:"French Polynesia"},
      {code2:"TF", code3: "ATF", name:"French Southern Territories"},
      {code2:"GA", code3: "GAB", name:"Gabon"},
      {code2:"GM", code3: "GMB", name:"Gambia"},
      {code2:"GE", code3: "GEO", name:"Georgia"},
      {code2:"DE", code3: "DEU", name:"Germany"},
      {code2:"GH", code3: "GHA", name:"Ghana"},
      {code2:"GI", code3: "GIB", name:"Gibraltar"},
      {code2:"GR", code3: "GRC", name:"Greece"},
      {code2:"GL", code3: "GRL", name:"Greenland"},
      {code2:"GD", code3: "GRD", name:"Grenada"},
      {code2:"GP", code3: "GLP", name:"Guadeloupe"},
      {code2:"GU", code3: "GUM", name:"Guam"},
      {code2:"GT", code3: "GTM", name:"Guatemala"},
      {code2:"GG", code3: "GGY", name:"Guernsey"},
      {code2:"GN", code3: "GIN", name:"Guinea"},
      {code2:"GW", code3: "GNB", name:"Guinea-Bissau"},
      {code2:"GY", code3: "GUY", name:"Guyana"},
      {code2:"HT", code3: "HTI", name:"Haiti"},
      {code2:"HM", code3: "HMD", name:"Heard Island and McDonald Islands"},
      {code2:"VA", code3: "VAT", name:"Holy See (Vatican City State)"},
      {code2:"HN", code3: "HND", name:"Honduras"},
      {code2:"HK", code3: "HKG", name:"Hong Kong"},
      {code2:"HU", code3: "HUN", name:"Hungary"},
      {code2:"IS", code3: "ISL", name:"Iceland"},
      {code2:"IN", code3: "IND", name:"India"},
      {code2:"ID", code3: "IDN", name:"Indonesia"},
      {code2:"IR", code3: "IRN", name:"Iran, Islamic Republic of"},
      {code2:"IQ", code3: "IRQ", name:"Iraq"},
      {code2:"IE", code3: "IRL", name:"Ireland"},
      {code2:"IM", code3: "IMN", name:"Isle of Man"},
      {code2:"IL", code3: "ISR", name:"Israel"},
      {code2:"IT", code3: "ITA", name:"Italy"},
      {code2:"JM", code3: "JAM", name:"Jamaica"},
      {code2:"JP", code3: "JPN", name:"Japan"},
      {code2:"JE", code3: "JEY", name:"Jersey"},
      {code2:"JO", code3: "JOR", name:"Jordan"},
      {code2:"KZ", code3: "KAZ", name:"Kazakhstan"},
      {code2:"KE", code3: "KEN", name:"Kenya"},
      {code2:"KI", code3: "KIR", name:"Kiribati"},
      {code2:"KP", code3: "PRK", name:"Korea, Democratic People's Republic of"},
      {code2:"KR", code3: "KOR", name:"Korea, Republic of"},
      {code2:"KW", code3: "KWT", name:"Kuwait"},
      {code2:"KG", code3: "KGZ", name:"Kyrgyzstan"},
      {code2:"LA", code3: "LAO", name:"Lao People's Democratic Republic"},
      {code2:"LV", code3: "LVA", name:"Latvia"},
      {code2:"LB", code3: "LBN", name:"Lebanon"},
      {code2:"LS", code3: "LSO", name:"Lesotho"},
      {code2:"LR", code3: "LBR", name:"Liberia"},
      {code2:"LY", code3: "LBY", name:"Libya"},
      {code2:"LI", code3: "LIE", name:"Liechtenstein"},
      {code2:"LT", code3: "LTU", name:"Lithuania"},
      {code2:"LU", code3: "LUX", name:"Luxembourg"},
      {code2:"MO", code3: "MAC", name:"Macao"},
      {code2:"MK", code3: "MKD", name:"Macedonia, the former Yugoslav Republic of"},
      {code2:"MG", code3: "MDG", name:"Madagascar"},
      {code2:"MW", code3: "MWI", name:"Malawi"},
      {code2:"MY", code3: "MYS", name:"Malaysia"},
      {code2:"MV", code3: "MDV", name:"Maldives"},
      {code2:"ML", code3: "MLI", name:"Mali"},
      {code2:"MT", code3: "MLT", name:"Malta"},
      {code2:"MH", code3: "MHL", name:"Marshall Islands"},
      {code2:"MQ", code3: "MTQ", name:"Martinique"},
      {code2:"MR", code3: "MRT", name:"Mauritania"},
      {code2:"MU", code3: "MUS", name:"Mauritius"},
      {code2:"YT", code3: "MYT", name:"Mayotte"},
      {code2:"MX", code3: "MEX", name:"Mexico"},
      {code2:"FM", code3: "FSM", name:"Micronesia, Federated States of"},
      {code2:"MD", code3: "MDA", name:"Moldova, Republic of"},
      {code2:"MC", code3: "MCO", name:"Monaco"},
      {code2:"MN", code3: "MNG", name:"Mongolia"},
      {code2:"ME", code3: "MNE", name:"Montenegro"},
      {code2:"MS", code3: "MSR", name:"Montserrat"},
      {code2:"MA", code3: "MAR", name:"Morocco"},
      {code2:"MZ", code3: "MOZ", name:"Mozambique"},
      {code2:"MM", code3: "MMR", name:"Myanmar"},
      {code2:"NA", code3: "NAM", name:"Namibia"},
      {code2:"NR", code3: "NRU", name:"Nauru"},
      {code2:"NP", code3: "NPL", name:"Nepal"},
      {code2:"NL", code3: "NLD", name:"Netherlands"},
      {code2:"NC", code3: "NCL", name:"New Caledonia"},
      {code2:"NZ", code3: "NZL", name:"New Zealand"},
      {code2:"NI", code3: "NIC", name:"Nicaragua"},
      {code2:"NE", code3: "NER", name:"Niger"},
      {code2:"NG", code3: "NGA", name:"Nigeria"},
      {code2:"NU", code3: "NIU", name:"Niue"},
      {code2:"NF", code3: "NFK", name:"Norfolk Island"},
      {code2:"MP", code3: "MNP", name:"Northern Mariana Islands"},
      {code2:"NO", code3: "NOR", name:"Norway"},
      {code2:"OM", code3: "OMN", name:"Oman"},
      {code2:"PK", code3: "PAK", name:"Pakistan"},
      {code2:"PW", code3: "PLW", name:"Palau"},
      {code2:"PS", code3: "PSE", name:"Palestinian Territory"},
      {code2:"PA", code3: "PAN", name:"Panama"},
      {code2:"PG", code3: "PNG", name:"Papua New Guinea"},
      {code2:"PY", code3: "PRY", name:"Paraguay"},
      {code2:"PE", code3: "PER", name:"Peru"},
      {code2:"PH", code3: "PHL", name:"Philippines"},
      {code2:"PN", code3: "PCN", name:"Pitcairn"},
      {code2:"PL", code3: "POL", name:"Poland"},
      {code2:"PT", code3: "PRT", name:"Portugal"},
      {code2:"PR", code3: "PRI", name:"Puerto Rico"},
      {code2:"QA", code3: "QAT", name:"Qatar"},
      {code2:"RE", code3: "REU", name:"Réunion"},
      {code2:"RO", code3: "ROU", name:"Romania"},
      {code2:"RU", code3: "RUS", name:"Russian Federation"},
      {code2:"RW", code3: "RWA", name:"Rwanda"},
      {code2:"BL", code3: "BLM", name:"Saint Barthélemy"},
      {code2:"SH", code3: "SHN", name:"Saint Helena, Ascension and Tristan da Cunha"},
      {code2:"KN", code3: "KNA", name:"Saint Kitts and Nevis"},
      {code2:"LC", code3: "LCA", name:"Saint Lucia"},
      {code2:"MF", code3: "MAF", name:"Saint Martin (French part)"},
      {code2:"PM", code3: "SPM", name:"Saint Pierre and Miquelon"},
      {code2:"VC", code3: "VCT", name:"Saint Vincent and the Grenadines"},
      {code2:"WS", code3: "WSM", name:"Samoa"},
      {code2:"SM", code3: "SMR", name:"San Marino"},
      {code2:"ST", code3: "STP", name:"Sao Tome and Principe"},
      {code2:"SA", code3: "SAU", name:"Saudi Arabia"},
      {code2:"SN", code3: "SEN", name:"Senegal"},
      {code2:"RS", code3: "SRB", name:"Serbia"},
      {code2:"SC", code3: "SYC", name:"Seychelles"},
      {code2:"SL", code3: "SLE", name:"Sierra Leone"},
      {code2:"SG", code3: "SGP", name:"Singapore"},
      {code2:"SX", code3: "SXM", name:"Sint Maarten (Dutch part)"},
      {code2:"SK", code3: "SVK", name:"Slovakia"},
      {code2:"SI", code3: "SVN", name:"Slovenia"},
      {code2:"SB", code3: "SLB", name:"Solomon Islands"},
      {code2:"SO", code3: "SOM", name:"Somalia"},
      {code2:"ZA", code3: "ZAF", name:"South Africa"},
      {code2:"GS", code3: "SGS", name:"South Georgia and the South Sandwich Islands"},
      {code2:"SS", code3: "SSD", name:"South Sudan"},
      {code2:"ES", code3: "ESP", name:"Spain"},
      {code2:"LK", code3: "LKA", name:"Sri Lanka"},
      {code2:"SD", code3: "SDN", name:"Sudan"},
      {code2:"SR", code3: "SUR", name:"Suriname"},
      {code2:"SJ", code3: "SJM", name:"Svalbard and Jan Mayen"},
      {code2:"SZ", code3: "SWZ", name:"Swaziland"},
      {code2:"SE", code3: "SWE", name:"Sweden"},
      {code2:"CH", code3: "CHE", name:"Switzerland"},
      {code2:"SY", code3: "SYR", name:"Syrian Arab Republic"},
      {code2:"TW", code3: "TWN", name:"Taiwan"},
      {code2:"TJ", code3: "TJK", name:"Tajikistan"},
      {code2:"TZ", code3: "TZA", name:"Tanzania, United Republic of"},
      {code2:"TH", code3: "THA", name:"Thailand"},
      {code2:"TL", code3: "TLS", name:"Timor-Leste"},
      {code2:"TG", code3: "TGO", name:"Togo"},
      {code2:"TK", code3: "TKL", name:"Tokelau"},
      {code2:"TO", code3: "TON", name:"Tonga"},
      {code2:"TT", code3: "TTO", name:"Trinidad and Tobago"},
      {code2:"TN", code3: "TUN", name:"Tunisia"},
      {code2:"TR", code3: "TUR", name:"Turkey"},
      {code2:"TM", code3: "TKM", name:"Turkmenistan"},
      {code2:"TC", code3: "TCA", name:"Turks and Caicos Islands"},
      {code2:"TV", code3: "TUV", name:"Tuvalu"},
      {code2:"UG", code3: "UGA", name:"Uganda"},
      {code2:"UA", code3: "UKR", name:"Ukraine"},
      {code2:"AE", code3: "ARE", name:"United Arab Emirates"},
      {code2:"GB", code3: "GBR", name:"United Kingdom"},
      {code2:"US", code3: "USA", name:"United States"},
      {code2:"UM", code3: "UMI", name:"United States Minor Outlying Islands"},
      {code2:"UY", code3: "URY", name:"Uruguay"},
      {code2:"UZ", code3: "UZB", name:"Uzbekistan"},
      {code2:"VU", code3: "VUT", name:"Vanuatu"},
      {code2:"VE", code3: "VEN", name:"Venezuela, Bolivarian Republic of"},
      {code2:"VN", code3: "VNM", name:"Viet Nam"},
      {code2:"VG", code3: "VGB", name:"Virgin Islands, British"},
      {code2:"VI", code3: "VIR", name:"Virgin Islands, U.S."},
      {code2:"WF", code3: "WLF", name:"Wallis and Futuna"},
      {code2:"EH", code3: "ESH", name:"Western Sahara"},
      {code2:"YE", code3: "YEM", name:"Yemen"},
      {code2:"ZM", code3: "ZMB", name:"Zambia"},
      {code2:"ZW", code3: "ZWE", name:"Zimbabwe"}
    ];

    countries.forEach(function(country) {
      Countries.insert(country);
    });
  }
});