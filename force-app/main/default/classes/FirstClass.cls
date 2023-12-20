/**
 * @description       :
 * @author            : Kasi Jangiti
 * @group             :
 * @last modified on  : 07-22-2023
 * @last modified by  : Kasi Jangiti
 **/
public class FirstClass {
	public void createAccount() {
		
		Account acc = new Account( Name='Salesforce', Phone='345534543543', Industry ='Energy');

		System.debug('Account Name :' + acc.Name);
		System.debug('Account Phone :' + acc.Phone);
		System.debug('Account Industry :' + acc.Industry);
        
	}
}

