/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 08-25-2023
 * @last modified by  : Kasi Jangiti
 **/
public class OpportunityController {
	@AuraEnabled(cacheable=true)
	public static List<Opportunity> getOpportunityList() {
		return [SELECT Id, Name, StageName, CloseDate, Type, Account.Name, Amount FROM Opportunity WHERE AccountId != ''];
	}
	
	@AuraEnabled
	public static List<Opportunity> fetchOpportunities(String searchText) {
		String key = '%' + searchText + '%';
		return [SELECT Id, Name, StageName, Amount, Account.Name, CloseDate FROM Opportunity WHERE Name LIKE :key];
	}

    @AuraEnabled 
    public static Account createAccountandOpportunity(String name, String rating, Decimal annualRevenue, String industry){

        Account acc = new Account();
        acc.Name=name;
        acc.AnnualRevenue=annualRevenue;
        acc.Industry = industry;
        acc.Rating= rating;
/*
        Opportunity opp = new Opportunity();
        opp.Name = 'Dentsu Agencies';
        opp.StageName ='Qualification';
        opp.Amount=1000000;
        opp.CloseDate = System.today()+16;
        opp.AccountId = acc.Id;*/
        try{
            insert acc;
           // insert opp;
            System.debug('Account Id :' + acc.Id);
          //  System.debug('Opportunity Id:' + opp.Id);
        }catch(Exception e){
            System.debug('Error Occured:' + e.getMessage());
        }
        return acc;
    }
}
