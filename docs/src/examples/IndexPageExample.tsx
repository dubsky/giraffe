import React, {FC} from 'react'
import {fromFlux, Plot, Config} from '@influxdata/giraffe'

const CSV = `
#group,false,false,true,true,false,false,true,true,true,true
#datatype,string,long,dateTime:RFC3339,dateTime:RFC3339,dateTime:RFC3339,double,string,string,string,string
#default,_result,,,,,,,,,
,result,table,_start,_stop,time,usage,_field,_measurement,cpu,host
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:37:24Z,30.76923076923077,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:37:34Z,34.96993987975952,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:37:44Z,12.9,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:37:54Z,25.774225774225773,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:38:04Z,16.949152542372882,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:38:14Z,31.462925851703407,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:38:24Z,20.7,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:38:34Z,23.623623623623622,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:38:44Z,35.1,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:38:54Z,14.985014985014985,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:39:04Z,5.305305305305305,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:39:14Z,6,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:39:24Z,12.6,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:39:34Z,17.664670658682635,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:39:44Z,13.413413413413414,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:39:54Z,8.008008008008009,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:40:04Z,10.9,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:40:14Z,12.374245472837021,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:40:24Z,14.200595829195631,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:40:34Z,10.8,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:40:44Z,13.713713713713714,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:40:54Z,15.5,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:41:04Z,12.687312687312687,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:41:14Z,17.46987951807229,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:41:24Z,18.84346959122632,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:41:34Z,28.3,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:41:44Z,17.08291708291708,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:41:54Z,5.205205205205205,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:42:04Z,12.287712287712287,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:42:14Z,21.42142142142142,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:42:24Z,4.895104895104895,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:42:34Z,17.5,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:42:44Z,33.433433433433436,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:42:54Z,20.62062062062062,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:43:04Z,13.7,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:43:14Z,4.795204795204795,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:43:24Z,0.9,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:43:34Z,1,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:43:44Z,0.9,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:43:54Z,0.8,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:44:04Z,1.2,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:44:14Z,0.9009009009009009,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:44:24Z,0.998003992015968,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:44:34Z,0.9,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:44:44Z,1.2,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:44:54Z,0.8008008008008008,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:45:04Z,1.2,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:45:14Z,1.2012012012012012,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:45:24Z,1.6966067864271457,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:45:34Z,0.9,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:45:44Z,0.8,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:45:54Z,0.8,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:46:04Z,4.6,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:46:14Z,41.34134134134134,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:46:24Z,41.158841158841156,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:46:34Z,34.42460317460318,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:46:44Z,45.16129032258065,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:46:54Z,35.728542914171655,usage_user,cpu,cpu0,oox4k.local
,,0,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:47:04Z,31.995987963891675,usage_user,cpu,cpu0,oox4k.local

#group,false,false,true,true,false,false,true,true,true,true
#datatype,string,long,dateTime:RFC3339,dateTime:RFC3339,dateTime:RFC3339,double,string,string,string,string
#default,_result,,,,,,,,,
,result,table,_start,_stop,time,usage,_field,_measurement,cpu,host
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:37:24Z,11.38861138861139,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:37:34Z,17.61761761761762,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:37:44Z,4.1,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:37:54Z,7.6,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:38:04Z,5.677290836653387,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:38:14Z,9.62888665997994,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:38:24Z,7.407407407407407,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:38:34Z,7.992007992007992,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:38:44Z,9.20920920920921,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:38:54Z,3.4,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:39:04Z,1.596806387225549,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:39:14Z,2.1021021021021022,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:39:24Z,4.4,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:39:34Z,7,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:39:44Z,3.7037037037037037,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:39:54Z,2.6973026973026974,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:40:04Z,3.406813627254509,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:40:14Z,3.5175879396984926,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:40:24Z,4.07149950347567,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:40:34Z,3.1,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:40:44Z,3.903903903903904,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:40:54Z,4.195804195804196,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:41:04Z,3.896103896103896,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:41:14Z,4.618473895582329,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:41:24Z,9.081836327345309,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:41:34Z,14.6,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:41:44Z,6.393606393606394,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:41:54Z,2.3023023023023024,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:42:04Z,3.096903096903097,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:42:14Z,11.52304609218437,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:42:24Z,1.6983016983016983,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:42:34Z,8.991008991008991,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:42:44Z,19.81981981981982,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:42:54Z,9.60960960960961,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:43:04Z,5.194805194805195,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:43:14Z,1,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:43:24Z,0.1001001001001001,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:43:34Z,0.2997002997002997,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:43:44Z,0.1998001998001998,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:43:54Z,0.1001001001001001,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:44:04Z,0.2997002997002997,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:44:14Z,0.2,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:44:24Z,0.10020040080160321,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:44:34Z,0.1998001998001998,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:44:44Z,0.3996003996003996,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:44:54Z,0.10020040080160321,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:45:04Z,0.2994011976047904,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:45:14Z,0.3,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:45:24Z,0.4,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:45:34Z,0.1001001001001001,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:45:44Z,0.1998001998001998,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:45:54Z,0.1001001001001001,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:46:04Z,1.2,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:46:14Z,19.9,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:46:24Z,19.08091908091908,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:46:34Z,13.861386138613861,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:46:44Z,24.343434343434343,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:46:54Z,13.972055888223553,usage_user,cpu,cpu1,oox4k.local
,,1,2019-09-03T19:37:23.657537Z,2019-09-03T19:47:23.657537Z,2019-09-03T19:47:04Z,14.128256513026052,usage_user,cpu,cpu1,oox4k.local
`

export const IndexPageExample: FC = () => {
  const {table} = fromFlux(CSV)

  const config: Config = {
    table,
    valueFormatters: {usage: t => `${Math.round(t)}%`},
    legendFont: '13px Rubik',
    tickFont: '13px Rubik',
    layers: [
      {
        type: 'line',
        x: 'time',
        y: 'usage',
        fill: ['cpu'],
        interpolation: 'monotoneX',
      },
    ],
  }

  return <Plot config={config} />
}