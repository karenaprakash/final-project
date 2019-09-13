/**
 *  actions : all actions which are used in this project
 */
import axios from 'axios';
//getBooks : get all books
export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''

){
    const request = axios.get(`/api/getBooks?limit=${limit}&skip=${start}&order=${order}`)
                    .then( response => {
                        if(list){
                            return [...list,...response.data]
                        }else{
                            return response.data
                        }
                    })


    return{
        type : 'GET_BOOKS',
        payload : request 
    }
}
//getBookWithReviewer
export function getBookWithReviewer(id){
  
    const request = axios.get(`/api/getBook?id=${id}`)
  
    return (dispatch) => {
        request.then(({data})=>{
            let book = data;

            axios.get(`/api/getReviewer?id=${book.ownerId}`)
            .then(({data})=>{
                let response = {
                    book,
                    reviewer : data
                }
                console.log(response)
                dispatch({
                    type : 'GET_BOOK_W_REVIEWER',
                    payload : response 
                })
            })

            
        })
    }

}
//clearBookWithReviewer : clear book used when we go inside perticuler book and come outside  
export function clearBookWithReviewer(){
        return{
            type : 'CLEAR_BOOK_W_REVIEWER',
            payload : {
                book : {},
                reviewer : {}
            } 
        }
}


//addBook : add book action
export function addBook(book){
    const request = axios.post('/api/book',book)
                    .then(response => response.data);

                    return{
                        type : 'ADD_BOOK',
                        payload : request
                    }
}
//clearNewBook : clear new book in add review page 
export function clearNewBook(){
    return{
        type : 'CLEAR_NEWBOOK',
        payload : {}
    }
}

//getUserPosts : get user's all post
export function getUserPosts(userId){
    const request = axios.get(`/api/user_posts?id=${userId}`)
                    .then(response => response.data)
    return{
        type : 'GET_USER_POSTS',
        payload : request
    }
}

//getBook 
export function getBook(id){
    const request = axios.get(`/api/getBook?id=${id}`)
                    .then(response => response.data)    
        return{
            type : 'GET_BOOK',
            payload : request
        }
}
//updateBook_with_image
export function updateBook_with_image(data){
    const request = axios.post(`/api/book_with_img_update`,data)
                     .then(response => response.data)    
    return{
        type : 'UPDATE_BOOK_WITH_IMG',   
        payload : request
    }
}

//updateBook_without_image
export function updateBook_without_image(data){
    const request = axios.post(`/api/book_without_img_update`,data)
                     .then(response => response.data)    
    return{
        type : 'UPDATE_BOOK_WITHOUT_IMG',   
        payload : request
    }
}
//deleteBook
export function deleteBook(id){
    const request = axios.delete(`/api/delete_book?id=${id}`)
                    .then(response => response.data)

                    return{
                        type : 'DELETE_BOOK',   
                        payload : request
                    }

}
//clearBook
export function clearBook(){
    return {
        type : 'CLEAR_BOOK',
        payload : {
            book : null,
            updateBook : false,
            postDeleted : false
        }
    }
}

/*========== USER : actions related to user ============*/
//loginUser : for login
export function loginUser({email,password}){
    const request = axios.post("/api/login",{email,password})
                    .then(response => response.data )

    return{
        type : 'USER_LOGIN',
        payload : request
     }
}
//auth : for authentication
export function   auth(){
   const request = axios.get('/api/auth')
                    .then(response => response.data);

    return {
        type : 'USER_AUTH',
        payload : request
    }
}
//getUsers : get all users
export function getUsers(){
    const request = axios.get('/api/users')
                    .then(response => response.data)
    return {
        type : 'GET_USER',
        payload : request
    }

}
//userRegister : add new user
export function userRegister(user,userList){
    const request = axios.post('/api/register',user)
    

    return (dispatch) => {
        request.then(({data})=>{
            let users = data.success ? [...userList,data.user] : userList
            let response = {
                success : data.success,
                users 
            }

            dispatch({
                type : 'USER_REGISTER',
                payload : response
            })
        })
    }


}