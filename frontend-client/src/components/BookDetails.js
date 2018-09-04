import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {

  render() {
      //console.log(this.props)
    return (
      <div id="details">
          <p>Kirjan tiedot tulee tähän</p>
      </div>
    )
  }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)