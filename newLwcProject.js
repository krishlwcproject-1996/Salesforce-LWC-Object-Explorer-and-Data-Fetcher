import { LightningElement,track } from 'lwc';
import A1 from '@salesforce/apex/RecordFetcherController.fetchAllObjectList';
import fetchgetAllFields from '@salesforce/apex/RecordFetcherController.fetchgetAllFields'
import fetchAllRecordsOfSelectedObject from '@salesforce/apex/RecordFetcherController.fetchAllRecordsOfSelectedObject'




export default class newLwcProject extends LightningElement {
    @track lstFields = [];
    @track objectList = [];
    objectName = '';    
    showButton = false;
    arrayToSend = [];
    accountList = [];
    arrayToSend = [];
    columnsMap=[];

    openModel = false;

    connectedCallback() { 
        A1()
        .then((result) => {
            alert(result);
            if (result) {
                this.objectList = [];
                for (let key in result ) {
                    this.objectList.push({ label: result[key], value: key });
                }
            } else {
                console.log('Objects are not found else')
            }
        }).catch((_error) => {
            console.log('Objects are not found in catch')
        });
    }
    
    onObjectChange(event) { 
        this.lstFields = [];
        this.accountList = [];
        this.columnsMap=[];
        this.lab=[];
        this.val=[];
        this.arrayToSend=[];
        this.objectName = event.detail.value;
        this.showButton = true
        this.getFieldsHandle();   
    }

    getFieldsHandle(){
		fetchgetAllFields({ strObjectName: this.objectName })
		.then(result => {
			this.lstFields = [];
            for (let key in result) {
                this.lstFields.push({ label: key, value: key });
            }
		})
		.catch(_error => {
			console.log('All fields are not fetched');
		})
	}
    
    handleGetRecordsOfSelectObject() {
        fetchAllRecordsOfSelectedObject({ strObjectName: this.objectName })
		.then(result => {
			this.accountList = result;
		})
		.catch(error => {
			console.log('error while getting records ' , error);
		})
    }
   

    handleCheckBoxClick(event) { // getting proxy in event.detail.value
        this.arrayToSend = [];
        for(let index in event.detail.value) {
            this.arrayToSend.push(event.detail.value[index])
        }
        var val = this.arrayToSend;// same ['Id','Name']
			console.log('-->',val);
        
        this.columnsMap = val.map((v,i) => 
        ({label: val[i], fieldName:v})
       )       
			console.log('this.columnsMap',val);
    }  
    handleShowData() {
        this.handleGetRecordsOfSelectObject();
    }

}