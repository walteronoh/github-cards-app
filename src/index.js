import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

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
        <div><span>Name:</span>{this.props.name===null?'Github User':this.props.name}</div>
        <div><span>Organization:</span>{this.props.company===null?'GitHub':this.props.company}</div>    
        <div><span>Projects:</span>{this.props.public_repos}</div>   
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
  handleSubmit=(e)=>{
    e.preventDefault();
    let user=this.state.username.trim();
    if(user!==''){
      fetch(`https://api.github.com/users/${user}`).then(resp=>{
        resp.json().then(data=>{
          if(data.message){
            alert(`User ${data.message}`);
          }else{
            this.props.onSubmit(data);
          }
        })
      })
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

