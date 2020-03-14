import React, {Component} from 'react'
import { graphql} from 'react-apollo'
import fetchSongQuery from '../queries/fetchSong'
import {Link} from 'react-router'
import LyricCreate from '../components/LyricCreate'
import LyricsList from '../components/LyricsList'

class SongDetail extends Component{

    render(){
        if(!this.props.data.song) return <div>Loading...</div>
        return(
            <div>
                <Link to="/">Back</Link>
                <h3>{`Title: ${this.props.data.song.title}`}</h3>
                <LyricsList lyrics={this.props.data.song.lyrics}/>
                <LyricCreate songId={this.props.params.id}/>
            </div>
        )
    }
}

export default graphql(fetchSongQuery,{
    options: (props) => {return {variables:{id: props.params.id}}}
})(SongDetail)