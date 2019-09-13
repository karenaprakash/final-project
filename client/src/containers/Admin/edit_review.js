/**
 * edit_review.js : edit review page using simple react 
 * Not used in this project
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook , updateBook , clearBook , deleteBook } from '../../actions';

class EditBook extends PureComponent {

    state = {
        formData:{
            _id : this.props.match.params.id,
            name : '',
            author : '',
            review : '',
            pages : '',
            rating : '',
            price : ''
        }
    }

    handleInput = (event,name) =>{

        const newFormData = {
            ...this.state.formData
        }

        newFormData[name] =    event.target.value; 

        this.setState({
            formData : newFormData
        })
    }

    submitForm = (event) => {
        event.preventDefault();

       this.props.dispatch(updateBook(this.state.formData))
    }

    deletePost = () => {
        this.props.dispatch(deleteBook(this.props.match.params.id))
    }

    redirectUser = () => {
        setTimeout (()=>{
            this.props.history.push('/user/user-reviews')
        },1000)

    }

    componentWillMount(){
        this.props.dispatch(getBook(this.props.match.params.id))
    }

    componentWillUnmount(){
        this.props.dispatch(clearBook())
    }

    componentWillReceiveProps(nextProps){
        let book = nextProps.books.book;
        console.log(nextProps)
        this.setState({
            formData:{
                _id : book._id,
                name : book.name,
                author : book.author,
                review : book.review,
                pages : book.pages,
                rating : book.rating,
                price : book.price
            }
        })
    }

    render() {
        let books = this.props.books;
        console.log(books)
        return (
            <div className="rl_container article">

            {
                books.updateBook ? 
                    <div className="edit_confirm">
                        post updated, 
                        <Link to={`/books/${books.book._id}`}>
                            click here to see post 
                        </Link>
                    </div>
                : null
            }
            {
                books.postDeleted ? 
                <div className="red_tag">Post Deleted
                    {this.redirectUser()}
                </div>
                :null
            }
                <form onSubmit={this.submitForm}>
                    <h2>Edit Review</h2>
                    <div className="form_element">
                        <input 
                            type = 'text'
                            placeholder = 'Enter Name'
                            value = {this.state.formData.name}
                            onChange = { (event) => this.handleInput(event,'name') }
                        />
                    </div>
                    <div className="form_element">
                        <input 
                            type = 'text'
                            placeholder = 'Enter Author'
                            value = {this.state.formData.author}
                            onChange = { (event) => this.handleInput(event,'author') }
                        />
                    </div>
                    <textarea 
                        value = {this.state.formData.review}
                        onChange = { (event) => this.handleInput(event,'review') }
                    />
                     <div className="form_element">
                        <input 
                            type = 'number'
                            placeholder = 'Enter Pages'
                            value = {this.state.formData.pages}
                            onChange = { (event) => this.handleInput(event,'pages') }
                        />
                    </div>
                    <div className="form_element">
                        <select
                            value = { this.state.formData.rating}
                            onChange = { (event) => this.handleInput(event,'rating') }
                        >
                        <option val='1'>1</option>
                        <option val='2'>2</option>
                        <option val='3'>3</option>
                        <option val='4'>4</option>
                        <option val='5'>5</option>


                        </select>
                    </div>
                    <div className="form_element">
                        <input 
                            type = 'number'
                            placeholder = 'Enter Price'
                            value = {this.state.formData.price}
                            onChange = { (event) => this.handleInput(event,'price') }

                        />
                    </div>
                   <button type="submit">Edit  Review</button>
                   <div className="delete_post">
                            <div className="button"
                                onClick={this.deletePost}
                            >
                                Delete Review
                            </div>
                   </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return{
        books : state.books
    }
}


export default  connect(mapStateToProps)(EditBook)