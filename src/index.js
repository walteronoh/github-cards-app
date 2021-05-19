import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


//const gitData=[{name:"Walteronoh",avatar_url:"https://avatars.githubusercontent.com/u/48877319?v=4"},
//{name:"Susan",avatar_url:	"https://avatars.githubusercontent.com/u/2305795?v=4"}];

const CardList=(props)=>(
  <div>
    <h1>Github Cards App</h1>
    {props.profiles.map(profile=><Cards key={profile.id} {...profile}/>)}
  </div>
)

class Cards extends React.Component{
  render(){
    return(
    <div>
      <p>{this.props.name}</p>
      <img alt="github profile" src={this.props.avatar_url}/>
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
  handleSubmit=async(e)=>{
    e.preventDefault();
    const resp= await axios.get(`https://api.github.com/users/${this.state.username}`);
    this.props.onSubmit(resp.data);
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={event=>this.setState({username:event.target.value})} placeholder="Enter Name" type="text"/><br/>
          <button type="submit">Add Card</button>
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
      <div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profile}/>
      </div>
    )
  }
}

ReactDOM.render(<App />,document.getElementById('root'));

