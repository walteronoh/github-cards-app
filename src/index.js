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
        <div>{this.props.name}</div>
        <div>{this.props.company}</div>      
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
    fetch(`https://api.github.com/users/${this.state.username}`).then(resp=>{
      resp.json().then(data=>{
        this.props.onSubmit(data);
      })
    })
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className="form-control" onChange={event=>this.setState({username:event.target.value})} placeholder="Enter Github Username" type="text"/><br/>
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
      profile:[...prevState.profile,profileData]
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

