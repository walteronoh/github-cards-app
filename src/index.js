import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import axios from 'axios';

const CardList=(props)=>(
  <div>
    <h3 className="display-title">The Github User Credentials Will Display Here</h3>
    {props.profiles.map(profile=><Cards key={profile.id} {...profile}/>)}
  </div>
)

class Cards extends React.Component{
  render(){
    return(
    <div className="profile-style">
      <img className="img-responsive col-md-3" alt="github profile" src={this.props.avatar_url}/>
      <div className="user-info">
        <div><span>Name: </span>{this.props.name?this.props.name:'Github User'}</div>
        <div><span>Organization: </span>{this.props.company?this.props.company:'Github'}</div>    
        <div><span>Projects: </span>{this.props.public_repos}</div>   
        <div><span>URL: </span><a href={this.props.html_url}>Visit Page</a></div> 
      </div>
    </div>
    )
  }
}

class Form extends React.Component{
  constructor(){
    super();
    this.state={
      username:''
    }
  }
  // componentDidUpdate(prevProps,prevState){
  //   if(prevState.username !== this.state.username){
  //     alert("not same");
  //   }else{
  //     alert("same");
  //   }
  // }
  handleSubmit=async(e)=>{
    e.preventDefault();
    let user=this.state.username.trim();
    if(user!==''){
      axios.get(`https://api.github.com/users/${user}`).then((response)=>{
        this.props.onSubmit(response.data);
      }).catch((error)=>{
          alert(error.message);   
      });
    }else{
      alert("Username Field Is required");
    }
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className="form-control" onChange={event=>this.setState({username:event.target.value})} placeholder="Enter Github Username" type="text" required/><br/>
          <button className="form-control btn btn-info" type="submit">Add Card</button>
        </form>
      </div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      profile:[]
    }
  }
  
  // componentDidUpdate(prevProps,prevState){
  //   if(prevState.profile !== this.state.profile){
  //     console.log("not same");
  //   }
  // }

  addNewProfile=(profileData)=>{
    this.setState(prevState=>({
      profile:[profileData,...prevState.profile]
      })
    );
  }
  render(){
    return(
      <div className="container">
        <h3 className="display-title">The Github Cards App</h3>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profile}/>
      </div>
    )
  }
}

ReactDOM.render(<App />,document.getElementById('root'));

