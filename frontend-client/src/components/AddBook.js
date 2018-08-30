import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }

    displayAuthors() {
      let data = this.props.getAuthorsQuery
        //console.log(this.props)
      if(data.loading){
          return (<option>Loading authors...</option>)
      } else {
          return (
              data.authors.map(author => {
                  return (<option key={ author.id } value={ author.id }>{ author.name }</option>)
              })
          )
      }
    }
    
    submitForm(e) {
        e.preventDefault()
        //console.log(this.state)
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{
                query: getBooksQuery
            }]
        })
        this.setState({
            name: '',
            genre: '',
            authorId: '' 
        })
    }

  render() {
    return (
        //not separating inputs into own function is bad practice... but will work here for now
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
        <div className="field">
            <label>Book name:</label>
            <input type="text" value={ this.state.name } onChange={ (e) => this.setState({ name: e.target.value })}/>
        </div>
        
        <div className="field">
            <label>Genre:</label>
            <input type="text" value={ this.state.genre } onChange={ (e) => this.setState({ genre: e.target.value })}/>
        </div>

        <div className="field">
            <label>Author:</label>
            <select onChange={ (e) => this.setState({ authorId: e.target.value })} value={ this.state.authorId }>
                <option>Select author</option>
                { this.displayAuthors() }
            </select>
        </div>

        <button>+</button>
      </form>
    )
  }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook)
