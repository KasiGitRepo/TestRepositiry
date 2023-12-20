/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 11-23-2023
 * @last modified by  : Kasi Jangiti
 **/
public with sharing class ContactChangeEventTriggerHandler {
	
	public static void handleAfterInsertEvents(List<ContactChangeEvent> ContactChangeEventList) {
		List<Task> taskList = new List<Task>();
		for (ContactChangeEvent event : ContactChangeEventList) {
			System.debug('Event :' + event);
			// Contains header fields of Change Data Capture events
			EventBus.ChangeEventHeader header = event.ChangeEventHeader;
			System.debug('Change EVent Header :' + header);
			// Check the Chnage type as CREATE
			if (header.changeType == 'CREATE') {
				// Create a new Task
				for (String recordid : header.recordIds) {
					Task taskRec = new Task();
					taskRec.Subject = 'Contact Record is Created, Please look into it';
					taskRec.OwnerId = header.commitUser;
					taskRec.Priority = 'Normal';
					taskRec.ActivityDate = Date.today() + 2;
					taskRec.WhoId = recordid;
					taskList.add(taskRec);
				}
				// Check the Chnage type as UPDATE
			} else if (header.changetype == 'UPDATE') {
                /*
                 When we want to check which fields are modified/updated
                System.debug('Iterate over the list of changed fields');
                  //For update opeartions, iterate over the list of changed fields
                  for(String field : header.changedfields){
                    if(event.get(field) == null){
                        System.debug('Deleted field values(set to null) :' + field );
                    }else{
                        System.debug('Chnaged field values :' + field + ' New value :' + event.get(field));
                    }
                }
                */
                //For checking with only EMail field
				for (String field : header.changedfields) {
					if (field == 'Email') {
						// Create a new Task
						for (String recordid : header.recordIds) {
							Task taskRec = new Task();
							taskRec.Subject = 'Contact Record is Updated, Please look into it';
							taskRec.OwnerId = header.commitUser;
							taskRec.Priority = 'Normal';
							taskRec.ActivityDate = Date.today() + 2;
							taskRec.WhoId = recordid;
							taskList.add(taskRec);
						}
					}
				}

                //For update opeartions, iterate over the list of changed fields
                for(String field : header.changedfields){
                    if(event.get(field) == null){
                        System.debug('Deleted field values(set to null) :' + field );
                    }else{
                        System.debug('Chnaged field values :' + field + ' New value :' + event.get(field));
                    }
                }
			}
		}
		
		if (taskList.size() > 0) {
			try {
				insert taskList;
			} catch (Exception ex) {
				System.debug('Error Message :' + ex.getMessage());
			}
		}
	}
}
