public with sharing class RecordFetcherController {
    @AuraEnabled(cacheable = true)
    public static Map<String, String> fetchAllObjectList() {
        Map<String, String> mapOfAllObject = new Map<String, String>();
        for (Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()) {
            String name = objTyp.getDescribe().getLocalName();
            String label = objTyp.getDescribe().getLabel();
            mapOfAllObject.put(name, label);
        }
        System.debug('mapOfAllObject' + mapOfAllObject);
        return mapOfAllObject;
    }

    @AuraEnabled(cacheable = true)
    public static Map<String, String> fetchgetAllFields(String strObjectName) {
        Map<String, Schema.SObjectType> detail = Schema.getGlobalDescribe();
        Map<String, String> mapOfFields = new Map<String, String>();
        for (Schema.SObjectField fields : detail.get(strObjectName).getDescribe().fields.getMap().Values()) {

            mapOfFields.put(fields.getDescribe().getName(), fields.getDescribe().getName());

        }
        return mapOfFields;
    }


@AuraEnabled(cacheable = true)
public static List<sObject> fetchAllRecordsOfSelectedObject(String strObjectName) {
    System.debug(' strObjectName ' + strObjectName);

    Map<String, Schema.SObjectType> detail = Schema.getGlobalDescribe();
    List<String> allFieldsOfSelectedObject = new List<String>();
    for (Schema.SObjectField fields : detail.get(strObjectName).getDescribe().fields.getMap().Values()) {
        allFieldsOfSelectedObject.add(fields.getDescribe().getName());
    }
    String allFields = String.join(allFieldsOfSelectedObject, ',');
    String query = 'select ' + allFields + ' from ' + strObjectName;
    // query+= ' limit 10';  
    // System.debug(' Database quqey '+ Database.query(query));

    return Database.query(query);
}
}