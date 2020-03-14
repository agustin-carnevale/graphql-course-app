import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import fetchSongsQuery from '../queries/fetchSongs'

class SongCreate extends Component {

    constructor (props){
       super(props)
       this.state = {title: ''}
    }

    onSubmitHandler(event){
        event.preventDefault()

        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{query: fetchSongsQuery}]
        }).then(()=>{
            hashHistory.push('/')  
        }).catch((e)=>{console.log(e)})

    }

    render(){
        return(
           <div>
               <Link to="/">Back</Link>
               <h3>Create a New Song</h3>
               <form onSubmit={this.onSubmitHandler.bind(this)}>
                   <label>Song Title</label>
                   <input 
                        type="text"
                        onChange={event => this.setState({title: event.target.value})}
                        value={this.state.title}
                   />
                   <button type="submit">Create</button>
               </form>
           </div>
        )
    }
}

const mutation = gql`
mutation AddSong($title: String){
   addSong(title: $title ){
       title
   }
}
`

export default graphql(mutation)(SongCreate)