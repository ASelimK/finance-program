import React,{Component} from 'react';
import {variables} from './Variables.js'
export class Transactions extends Component{

    constructor(props, context){
        super(props);

        this.state={
            transactions:[],
            modalTitle:"",
            transactionId:0,
            userId: 0, 
            transactionType: 'Tl', 
            transactionAmount: 0, 
            updatedBy: 0
        }
    }

    refreshList(){
        fetch(variables.API_URL+'transactions')
        .then(response=>response.json())
        .then(data=>{this.setState({transactions:data}, ()=>{
            console.log("transactions: ", this.state.transactions)
        }); 
        });
    }
    componentDidMount(){
        this.refreshList();
    }

    // changeTransactionUserId =(e)=>{
    //     this.setState({userId:e.target.value});
    // }
    // changeTransactionType =(e)=>{
    //     this.setState({transactionType:e.target.value});
    // }
    // changeTransactionAmount =(e)=>{
    //     this.setState({transactionAmount:e.target.value});
    // }
    // changeTransactionDate =(e)=>{
    //     this.setState({transactionDate:e.target.value});
    // }

    deleteClick(id){
        fetch(variables.API_URL+'transactions',{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserId: id
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    editClick(usr){
        this.setState({
            modalTitle:"Edit Transaction",

        });
    }

    addClick(){
        this.setState({
            modalTitle:"Add Transaction",
        });
    }

    createClick(){
        fetch(variables.API_URL+'transactions',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserId: this.state.userId,
                TransactionType: this.state.transactionType ,
                TransactionAmount: this.state.transactionAmount
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    render(){
        const transactions = this.state.transactions;
        const transactionId = this.state.transactionId;
        const modalTitle = this.state.modalTitle;
        const userId = this.state.userId;
        const transactionType = this.state.transactionType;
        const transactionAmount = this.state.transactionAmount;
        const updatedBy = this.state.updatedBy;

        return(
            <div>
                <h3>TRANSACTIONS</h3>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.addClick()}>
                Create Transaction
                </button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>        
                                Transaction Id
                            </th>
                            <th>
                                User Id
                            </th>
                            <th>
                                Transaction Type
                            </th>
                            <th>
                                Transaction Amount
                            </th>
                            <th>
                                Transaction Date
                            </th>
                            <th>
                                Is Active
                            </th>
                            <th>
                                Updated By
                            </th>
                            <th>
                                Updated Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((trn)=>
                            <tr key ={trn.transactionId}>
                                <td>{trn.transactionId}</td>
                                <td>{trn.userId}</td>
                                <td>{trn.transactionType}</td>
                                <td>{trn.transactionAmount}</td>
                                <td>{new Date(trn.transactionDate).toDateString()}</td>
                                <td>{trn.isActive ? 'true': 'false'}</td>
                                <td>{trn.updatedBy}</td>
                                <td>{trn.updatedDate}</td>
                                <td>
                                    <button type="button" 
                                            className="btn btn-light mr-1"     
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={()=>this.editClick(trn)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </button>
                                </td>
                                <td>
                                    <button type="button" 
                                            className="btn btn-light mr-1"                                       
                                            onClick={()=>this.deleteClick(trn.userId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        {/* <div className="input-group mb-3">
                            <span className="input-group-text">User Id</span>
                            <input type="number" className="form-control"
                                value={userId}
                                onChange={this.changeTransactionUserId}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Transaction Type</span>
                            <input type="text" className="form-control"
                                value={transactionType}
                                onChange={this.changeTransactionType}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Transaction Amount</span>
                            <input type="number" className="form-control"
                                value={transactionAmount}
                                onChange={this.changeTransactionAmount}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Transaction Date</span>
                            <input type="date" className="form-control"
                                value={transactionDate}
                                onChange={this.changeTransactionDate}/>
                        </div> */}

                        {transactionId==0?
                        <button type="button"
                        className="btn btn-primary float-start"
                        onClick={()=>this.createClick()}
                        >Create</button>
                        :null}

                        {transactionId!=0?
                        <button type="button"
                        className="btn btn-primary float-start"
                        onClick={()=>this.updateClick()}
                        >Update</button>
                        :null}

                    </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}