import React, {Component} from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link} from 'react-router'
import fetchSongsQuery from '../queries/fetchSongs'


class SongList extends Component {

    onSongDelete(id){
        this.props.mutate({
            variables:{id},
        }).then(()=> this.props.data.refetch())
    }

    renderSongs(){
        return this.props.data.songs.map(song => 
            (<li className="collection-item" key={song.id}>
                <Link to={`/songs/${song.id}`}>{song.title}</Link>
                <i
                    className="material-icons"
                    onClick={()=> this.onSongDelete(song.id)}
                >delete
                </i>
            </li>)
        )
    }

    render(){
        return(
            <div>
                <ul className="collection">
                    {this.props.data && this.props.data.songs 
                    && this.renderSongs()}
                </ul>
                <Link to="/songs/new"
                    className="btn-floating btn-large red right"
                >
                 <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

const mutation = gql`
mutation DeleteSong($id: ID){
    deleteSong(id: $id ){
         id
    }
 }`

export default graphql(mutation)(
    graphql(fetchSongsQuery)(SongList)
)