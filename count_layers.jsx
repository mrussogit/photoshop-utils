s2t = stringIDToTypeID;
(r = new ActionReference).putProperty(s2t('property'), p = s2t('targetLayers'));
r.putEnumerated (s2t ('document'), s2t ('ordinal'), s2t ('targetEnum'));
n =  executeActionGet (r).hasKey(p) ?  executeActionGet (r).getList(p).count : 0;
alert (n)