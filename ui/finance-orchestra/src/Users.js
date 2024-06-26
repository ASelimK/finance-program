import {tsConstructoType} from '@babel/types'
import React,{Component} from 'react';
import {variables} from './Variables.js'

export class Users extends Component{
     
    constructor(props, context){
        super(props);

        this.state={
            users:[],
            modalTitle:"",
            userId:0,
            userName: "",
            userSurname: "",
            userGender: "",
            userBirthDate: new Date('1990-01-01'),
            userTlBalance: 0,
            userGoldBalance: 0,
            userUpdatedBy: 0
        }
    }
    refreshList(){
        fetch(variables.API_URL+'users')
        .then(response=>response.json())
        .then(data=>{this.setState({users:data}, ()=>{
            console.log("users: ", this.state.users)
        }); 
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    
    addClick(){
        this.setState({
            modalTitle:"Add User",
            userId:0,
            userName:""
        });
    }

    createClick(){
        fetch(variables.API_URL+'users',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name:this.state.userName,
                Surname:this.state.userSurname ,
                Gender:this.state.userGender ,
                BirthDate:this.state.userBirthDate ,
                TlBalance:this.state.userTlBalance ,
                GoldBalance:this.state.userGoldBalance ,
                UpdatedBy:0 //,
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

    deleteClick(id){
        fetch(variables.API_URL+'users',{
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
            modalTitle:"Edit User",
            userId:usr.userId,
            userName:usr.userName,
            userSurname: usr.userSurname,
            userGender:usr.userGender,
            userBirthDate:usr.userBirthDate,
            userTlBalance:usr.userTlBalance,
            userGoldBalance:usr.userGoldBalance
        });
    }
    updateClick(){
        this.setState({userUpdatedDate:new Date().toDateString()}, ()=>{

            fetch(variables.API_URL+'users',{
                method:'PUT',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserId: this.state.userId, 
                Name:this.state.userName,
                Surname:this.state.userSurname,
                Gender:this.state.userGender ,
                BirthDate:this.state.userBirthDate ,
                TlBalance:this.state.userTlBalance ,
                GoldBalance:this.state.userGoldBalance ,
                UpdatedBy:0 ,
            })
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            });
        })
    }


    changeUserName =(e)=>{
        this.setState({userName:e.target.value});
    }
    changeUserSurname =(e)=>{
        this.setState({userSurname:e.target.value});
    }
    changeUserGender =(e)=>{
        this.setState({userGender:e.target.value});
    }
    changeUserBirthDate =(e)=>{
        this.setState({userBirthDate:e.target.value});
    }
    changeUserTlBalance =(e)=>{
        this.setState({userTlBalance:e.target.value});
    }
    changeUserGoldBalance =(e)=>{
        this.setState({userGoldBalance:e.target.value});
    }
    changeUserUpdatedDate =(e)=>{
        this.setState({userUpdatedDate:e.target.value});
    }
    render(){
        const users = this.state.users;
        const modalTitle = this.state.modalTitle;
        const userId = this.state.userId;
        const userName = this.state.userName;
        const userSurname=this.state.userSurname;
        const userGender=this.state.userGender;
        const userBirthDate=this.state.userBirthDate;
        const userTlBalance=this.state.userTlBalance;
        const userGoldBalance=this.state.userGoldBalance;
        const userUpdatedBy = this.state.userUpdatedBy;
        return(
            <div>
                <h3>USERS</h3>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.addClick()}>
                Create User
                </button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>        
                                User Id
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Surname
                            </th>
                            <th>
                                Gender
                            </th>
                            <th>
                                Birth Date
                            </th>
                            <th>
                                Tl Balance
                            </th>
                            <th>
                                Gold Balance
                            </th>
                            <th>
                                IBAN
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
                        {users.map((usr)=>
                            <tr key ={usr.userId}>
                                <td>{usr.userId}</td>
                                <td>{usr.name}</td>
                                <td>{usr.surname}</td>
                                <td>{usr.gender}</td>
                                <td>{new Date(usr.birthDate).toDateString()}</td>
                                <td>{usr.tlBalance}</td>
                                <td>{usr.goldBalance}</td>
                                <td>{usr.iban}</td>
                                <td>{usr.isActive ? 'true': 'false'}</td>
                                <td>{usr.updatedBy}</td>
                                <td>{usr.updatedDate}</td>
                                <td>
                                    <button type="button" 
                                            className="btn btn-light mr-1"     
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={()=>this.editClick(usr)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </button>
                                </td>
                                <td>

                                    <button type="button" 
                                            className="btn btn-light mr-1"                                       
                                            onClick={()=>this.deleteClick(usr.userId)}>
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
                        <div className="input-group mb-3">
                            <span className="input-group-text">Name</span>
                            <input type="text" className="form-control"
                                value={userName}
                                onChange={this.changeUserName}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Surname</span>
                            <input type="text" className="form-control"
                                value={userSurname}
                                onChange={this.changeUserSurname}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Gender</span>
                            <input type="text" className="form-control"
                                value={userGender}
                                onChange={this.changeUserGender}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Birth Date</span>
                            <input type="text" className="form-control"
                                value={userBirthDate}
                                onChange={this.changeUserBirthDate}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Tl Balance</span>
                            <input type="number" className="form-control"
                                value={userTlBalance}
                                onChange={this.changeUserTlBalance}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Gold Balance</span>
                            <input type="number" className="form-control"
                                value={userGoldBalance}
                                onChange={this.changeUserGoldBalance}/>
                        </div>

                        {userId==0?
                        <button type="button"
                        className="btn btn-primary float-start"
                        onClick={()=>this.createClick()}
                        >Create</button>
                        :null}

                        {userId!=0?
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