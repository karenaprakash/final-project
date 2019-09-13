   /**
    * home_container : component for home 
    * it is conected with redux store
    * 
    */
   import React, { Component } from 'react';
    import { connect } from 'react-redux';
    import { getBooks } from '../actions';
    import BookItem from '../widgetsUI/book_item';


    class HomeContainer extends Component {

        componentWillMount(){
            this.props.dispatch(getBooks(5,0,'desc'))
        }

        renderItems = (books) => (
            books.list ? 
            books.list.map(item => (
                <BookItem {...item} key = { item._id } />
            ))
            : null
        )

        loadmore = () => {
            const count = this.props.books.list.length;
            this.props.dispatch(getBooks(5,count,'desc',this.props.books.list))
        }

        render() {
            return (
                <div>
                    {this.renderItems(this.props.books)}
                    <div className='loadmore'
                        onClick={this.loadmore}
                    >Load More</div>
                </div>
            )
        }
    }

    function mapStateToProps(state){
        console.log(state)
        return {
            books : state.books
        }

    }

    export default   connect(mapStateToProps)(HomeContainer);