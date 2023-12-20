/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 08-10-2023
 * @last modified by  : Kasi Jangiti
 **/
public class SOQL_Practice {
	
	public List<Opportunity> oppList;
	public List<Account> accList;
	public List<Contact> conList;
	public List<Lead> leadList;
	
	public SOQL_Practice() {
		oppList = new List<Opportunity>();
		accList = new List<Account>();
		conList = new List<Contact>();
		leadList = new List<Lead>();
	}
	
	public void getDataByQuaries() {
		
		conList = [SELECT Id, FirstName, LastName, email, Phone, Account.Name
				   FROM Contact
				   WHERE Phone != null
					   OR Phone = ''];
		for (Contact con : conList) {
			System.debug(con);
		}
		
		accList = [SELECT Id, Name, Phone, Rating,
					   (SELECT Id, FirstName, LastName FROM Contacts)
				   FROM Account
				   WHERE Rating != null
					   OR Rating = ''];
		for (Account ac : accList) {
			System.debug(ac);
		}
	}
	
	public void getOrderby() {
		
		List<Account> accLists = [SELECT Id, Name, Industry, Rating FROM Account ORDER BY Rating DESC NULLS LAST];
		for (Account ac : accLists) {
			System.debug(ac);
		}
		
		List<Account> acList = [SELECT name, ownership FROM Account WHERE ownership = 'public'];
		for (Account ac1 : acList) {
			System.debug(ac1);
		}
	}
	
	public void getAllRows() {
		List<Account> aList = [SELECT Name, Phone, Industry FROM Account ALL ROWS];
		System.debug('Get All Rows:' + aList.size());
	}
	
	public void getLimit() {
		List<Account> acc = [SELECT Name FROM Account LIMIT 10];
		System.debug('List Limit: ' + acc.size());
	}
	
	public void getINKeyword() {
		List<Account> acc1 = [SELECT Name, Phone, Industry, Rating FROM Account WHERE Rating IN ( 'Warm', 'Cold' )];
		for (Account a : acc1) {
			System.debug('getINKeyword :' + a);
		}
	}
	
	public void getNOTINKeyword() {
		List<Account> acc2 = [SELECT Name, Phone, Industry, Rating FROM Account WHERE Rating NOT IN ( 'Warm', 'Cold' )];
		for (Account a1 : acc2) {
			System.debug('getNOTINKeyword:' + a1);
		}
	}
	
	public void getLike() {
		List<Account> acc3 = [SELECT Name, Phone, Industry, Rating FROM Account WHERE Name LIKE '%a%'];
		for (Account a2 : acc3) {
			System.debug('getLike Contains:' + a2);
		}
		
		List<Account> acc3a = [SELECT Name, Phone, Industry, Rating FROM Account WHERE Name LIKE '%a'];
		for (Account a2a : acc3a) {
			System.debug('getLike Startswith:' + a2a);
		}
		
		List<Account> acc3b = [SELECT Name, Phone, Industry, Rating FROM Account WHERE Name LIKE 'a%'];
		for (Account a2b : acc3b) {
			System.debug('getLike Endswith:' + a2b);
		}
	}
	
	public void getOffset() {
		
		List<Account> acc4 = [SELECT Name, Phone, Industry, Rating FROM Account LIMIT 10 OFFSET 5];
		for (Account a4 : acc4) {
			System.debug('getOffset and Limit :' + a4);
		}
	}
	
	public void getCount() {
		Integer count = [SELECT count() FROM Account];
		System.debug('getCount:' + count);
	}
	
	public void typeCasting() {
		String ind = 'Agriculture';
		Map<Id, Account> accMap = new Map<Id, Account>([SELECT Name, Industry FROM Account WHERE Industry = :ind LIMIT 20]);
		
		String stringQuery = 'Select Name,Industry,Rating,Ownership from Account';
		Map<Id, Account> aMap = new Map<Id, Account>((List<Account>) Database.query(stringQuery));
		for (Id keys : aMap.KeySet()) {
			System.debug('Id :' + keys + ':' + 'Value : ' + aMap.get(keys));
		}
	}
	
	public void lockRecords() {
		List<Account> acc5 = [SELECT Name, Phone, Industry, Rating FROM Account WHERE name LIKE '%x%' FOR UPDATE];
		for (Account a5 : acc5) {
			System.debug('getOffset and Limit :' + a5);
		}
	}
	
	public void childToParent() {
		
		List<Opportunity> opList = [SELECT Name, StageName, Closedate, Amount, Account.Name, Account.Industry
									FROM Opportunity
									WHERE AccountId != ''
										OR AccountId != null];
		for (Opportunity opp : oppList) {
			System.debug('Opportunity Name:' + opp.Name);
			System.debug('Opportunity StageName:' + opp.StageName);
			System.debug('Opportunity Closedate:' + opp.Closedate);
			System.debug('Opportunity Amount:' + opp.Amount);
			System.debug('Account Name:' + Account.Name);
			System.debug('Account Industry:' + Account.Industry);
		}
	}
	
	public void parentToChild() {
		
		List<Account> accounts = [SELECT Name, Phone, Industry,
									  (SELECT FirstName, LastName FROM Contacts)
								  FROM Account
								  WHERE Industry = 'Agriculture'];
		for (Account a : accounts) {
			System.debug('Account Name :' + a.Name);
			System.debug('Account Phone :' + a.Phone);
			System.debug('Account Industry :' + a.Industry);
			System.debug('Contact First Name :' + a.Contacts);
		}
		
		List<Account> accountss = [SELECT Id, Name, Phone, Industry
								   FROM Account
								   WHERE Id IN (SELECT AccountId FROM Contact WHERE Name LIKE '%a')];
		for (Account a1 : accountss) {
			System.debug('Account Name :' + a1.Name);
			System.debug('Account Phone :' + a1.Phone);
			System.debug('Account Industry :' + a1.Industry);
		}
		
		List<Account> accountsss = [SELECT Id, Name, Phone, Industry,
										(SELECT FirstName, LastName FROM Contacts WHERE createdBy.LastName LIKE '%a%')
									FROM Account];
		for (Account a2 : accountsss) {
			System.debug('Account Name :' + a2.Name);
			System.debug('Account Phone :' + a2.Phone);
			System.debug('Account Industry :' + a2.Industry);
			System.debug('Contact First Name :' + a2.Contacts);
		}
	}
	
	public void polymorphicQuery() {
		List<Task> taskList = [SELECT Status, Subject, ActivityDate, What.Name, Who.FirstName, Who.LastName, owner.FirstName, Owner.LastName, Owner.Email FROM Task WHERE Owner.FirstName LIKE '%a%'];
		System.debug('Size:' + taskList.size());
		for (Task ts : taskList) {
			System.debug('Status :' + ts.Status);
			System.debug('Subject:' + ts.Subject);
			System.debug('ActivityDate:' + ts.ActivityDate.format());
			System.debug('WhatId:' + ts.What.Name);
			System.debug('WhoId:' + ts.Who.FirstName);
			System.debug('WhoId:' + ts.Who.LastName);
			System.debug('owner FirstName:' + ts.owner.FirstName);
			System.debug('Owner LastName:' + ts.Owner.LastName);
			System.debug('Owner Email:' + ts.Owner.Email);
		}
	}
	
	public void loginHistory() {
		List<LoginHistory> logins = [SELECT UserId, LoginTime, Browser, SourceIp, LoginURL FROM LoginHistory LIMIT 10];
		System.debug(logins);
	}
	
	public void opportunityAggeregatedResult() {
		List<AggregateResult> result = [SELECT count(amount) countAmount, sum(amount) sumAmount, min(amount) minAmount, max(amount) maxAmount, avg(amount) avgAmount FROM Opportunity];
		
		for (AggregateResult ar : result) {
			System.debug('**********Opportunity Details***********');
			System.debug('Count Amount=>' + ar.get('countAmount'));
			System.debug('Total Amount=>' + ar.get('sumAmount'));
			System.debug('Minimum Value=>' + ar.get('minAmount'));
			System.debug('Maxumum Value=>' + ar.get('maxAmount'));
			System.debug('Average Value=>' + ar.get('avgAmount'));
		}
	}
	
	public void realtionWithWhere() {
		List<AggregateResult> ar = [SELECT sum(Amount) totaAmount FROM Opportunity WHERE Account.Name = 'Edge Communications'];
		System.debug(ar);
	}
	
	public void relationwithThreeObjects() {
		
		List<Opportunity> opps = [SELECT Id, Amount, Name, StageName, Closedate,
									  (SELECT Name, Quantity, Listprice, PriceBookEntry.UnitPrice, PriceBookEntry.Name FROM OpportunityLineItems)
								  FROM Opportunity
								  WHERE AccountId != null];
		for (Opportunity op : opps) {
			System.debug('Name : ' + op.Name);
			System.debug('Amount :' + op.Amount);
			System.debug('StageName :' + op.StageName);
			System.debug('Closedate :' + op.Closedate);
			
			for (OpportunityLineItem oli : op.OpportunityLineItems) {
				System.debug('Name : ' + oli.Name);
				System.debug('Quantity :' + oli.Quantity);
				System.debug('Listprice :' + oli.Listprice);
				System.debug('PriceBookEntry.UnitPrice :' + oli.PriceBookEntry.UnitPrice);
				System.debug('PriceBookEntry.Name :' + oli.PriceBookEntry.Name);
			}
		}
		
	}
	
	public void count_Distnict() {
		List<AggregateResult> opps1 = [SELECT COUNT_DISTINCT(StageName) FROM Opportunity];
		System.debug(opps1);
		
		List<AggregateResult> opps2 = [SELECT COUNT_DISTINCT(StageName) FROM Opportunity WITH SECURITY_ENFORCED];
		System.debug(opps2);
	}
	
	public void dynamicQuery(String searchText) {
		
		String query = 'Select Id,Name, StageName,Closedate,Amount, Account.Name, Account.Industry from Opportunity Where Name Like \'%' + searchText + '%\'';
		List<Opportunity> oppList = Database.Query(query);
		
		for (Opportunity opp : oppList) {
			System.debug(opp);
		}
	}
	
	public void bindVariablesPassing() {
		String indName = 'Energy';
		List<Account> accList = [SELECT Id, Name, Phone, Rating, Ownership, Industry FROM Account WHERE Industry = :indName];
		System.debug(accList);
	}
	
	public static void sObjectDynamicQueryRuntime(sObject sobjectName, String field1) {
		String s1 = 'Select Name,';
		S1 = s1 + field1;
		S1 = s1 + 'from';
		S1 = s1 + sobjectName;
		String st = 'Where Name Like \'Account\'';
		S1 = s1 + st;
		System.debug(S1);
	}
	
	public void sObjectDynamicQuery(String str) {
		String s1 = 'Select Name from' + str;
		List<sObject> sList = Database.query(s1);
		for (sObject s : sList) {
			System.debug(s);
		}
	}
	
	public void boudedQuery(String searchText) {
		String parameter = '%' + searchText + '%';
		List<Account> aacounts = [SELECT Fields(standard) FROM Account WHERE Name LIKE :parameter];
		for (Account std : aacounts) {
			System.debug(std);}
}
}