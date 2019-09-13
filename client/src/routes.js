import React from 'react';
import  { Switch , Route  } from 'react-router-dom';
import Home from './components/Home/home';
import BookView from './components/BookView/book_view';
import Login from './containers/Admin/login';
import Layout from './hoc/Layout/layout';
import Auth from './hoc/Auth/auth';
import User from './components/Admin/user';
import AddBook from './containers/Admin/add';
import EditReview from './containers/Admin/edit';
import UserPosts from './components/Admin/userPosts';
import Register  from './containers/Admin/register';
import Logout from './components/Admin/logout';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/login" exact component={ Auth(Login,false) } />
                <Route path="/user/logout" exact component={ Auth(Logout,true) } />
                <Route path="/user/add" exact component={ Auth(AddBook,true) } />
                <Route path="/user/register" exact component={ Auth(Register,true) } />
                <Route path="/user/edit-post/:id" exact component={ Auth(EditReview,true) } />
                <Route path="/user" exact component={ Auth(User,true) } />
                <Route path="/user/user-reviews" exact component={ Auth(UserPosts,true) } />
                <Route path="/" exact component={ Auth(Home,null) } />
                <Route path="/books/:id" exact component={ Auth(BookView,null) } />
            </Switch>
        </Layout>
       
    );
};

export default Routes;