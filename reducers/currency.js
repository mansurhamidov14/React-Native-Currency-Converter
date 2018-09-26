import {GET_CURRENCIES_RESOLVED, GET_CURRENCIES_REJECTED} from '../actions';

const initialState = {"success":true,"timestamp":1537948445,"base":"EUR","date":"2018-09-25","rates":{"AED":4.322378,"AFN":89.334117,"ALL":126.182846,"AMD":566.198915,"ANG":2.170926,"AOA":341.286759,"ARS":45.053038,"AUD":1.622387,"AWG":2.118149,"AZN":2.003414,"BAM":1.956583,"BBD":2.355264,"BDT":98.8605,"BGN":1.956169,"BHD":0.443576,"BIF":2085.435547,"BMD":1.17675,"BND":1.607499,"BOB":8.130928,"BRL":4.795963,"BSD":1.176679,"BTC":0.000183,"BTN":85.572183,"BWP":12.518268,"BYN":2.460995,"BYR":23064.291123,"BZD":2.365034,"CAD":1.524538,"CDF":1912.217577,"CHF":1.135434,"CLF":0.026593,"CLP":784.538541,"CNY":8.091096,"COP":3532.896328,"CRC":681.126117,"CUC":1.17675,"CUP":31.183863,"CVE":110.313228,"CZK":25.583832,"DJF":209.131359,"DKK":7.459721,"DOP":58.64884,"DZD":138.415172,"EGP":21.07679,"ERN":17.651192,"ETB":32.447103,"EUR":1,"FJD":2.486295,"FKP":0.894295,"GBP":0.894606,"GEL":3.077221,"GGP":0.894389,"GHS":5.615626,"GIP":0.894295,"GMD":57.454815,"GNF":10643.226224,"GTQ":9.074979,"GYD":246.178939,"HKD":9.194529,"HNL":28.28086,"HRK":7.424235,"HTG":81.892322,"HUF":323.694402,"IDR":17554.161369,"ILS":4.212557,"IMP":0.894389,"INR":85.520286,"IQD":1404.038722,"IRR":49547.039402,"ISK":128.936378,"JEP":0.894389,"JMD":159.329273,"JOD":0.834907,"JPY":132.743822,"KES":118.805036,"KGS":81.284444,"KHR":4812.432104,"KMF":492.322537,"KPW":1059.10294,"KRW":1313.955404,"KWD":0.356087,"KYD":0.98058,"KZT":420.275797,"LAK":10026.788376,"LBP":1780.30443,"LKR":198.588234,"LRD":182.396308,"LSL":16.868734,"LTL":3.474635,"LVL":0.711804,"LYD":1.621204,"MAD":11.009728,"MDL":19.808163,"MGA":4015.428622,"MKD":61.579197,"MMK":1880.795616,"MNT":2973.312873,"MOP":9.46495,"MRO":420.100155,"MUR":40.23263,"MVR":18.133669,"MWK":855.691104,"MXN":22.310644,"MYR":4.872951,"MZN":71.570042,"NAD":16.880431,"NGN":425.359875,"NIO":37.664211,"NOK":9.550194,"NPR":136.755925,"NZD":1.76819,"OMR":0.453043,"PAB":1.176691,"PEN":3.887804,"PGK":3.911513,"PHP":63.91221,"PKR":144.973952,"PLN":4.283485,"PYG":6906.697564,"QAR":4.284657,"RON":4.659311,"RSD":118.334016,"RUB":77.385994,"RWF":1037.693053,"SAR":4.413458,"SBD":9.386049,"SCR":16.009088,"SDG":21.17973,"SEK":10.363988,"SGD":1.6065,"SHP":1.554374,"SLL":9943.533879,"SOS":680.760361,"SRD":8.776181,"STD":24595.559891,"SVC":10.295967,"SYP":606.025609,"SZL":16.887534,"THB":38.185871,"TJS":11.090278,"TMT":213.821276,"TND":3.271839,"TOP":2.672989,"TRY":7.205767,"TTD":7.930589,"TWD":36.09207,"TZS":2687.578689,"UAH":33.017256,"UGX":4494.772037,"USD":1.17675,"UYU":38.600328,"UZS":9506.369571,"VEF":292445.738345,"VND":27469.394215,"VUV":133.088441,"WST":3.062299,"XAF":656.202528,"XAG":0.081388,"XAU":0.000981,"XCD":3.180224,"XDR":0.838141,"XOF":656.213979,"XPF":119.310928,"YER":294.534838,"ZAR":16.827866,"ZMK":10592.173151,"ZMW":14.043919,"ZWL":379.331113}};

const currency = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENCIES_RESOLVED:
            return action.payload;
        case GET_CURRENCIES_REJECTED:
            return state;
        default:
            return state;
    }
}

export default currency;