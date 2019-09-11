    const express = require('express');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const mongoose = require('mongoose');
    const config = require('./config/config').get(process.env.NODE_ENV);
    const app = express();

    mongoose.Promise = global.Promise;
    mongoose.connect(config.DATABASE);
    /*----------- Models Start -----------*/
    const { Book } = require('./models/book');
    const { User } = require('./models/user');
    /*----------- Models End -----------*/
    /*----------- Middelware Start -----------*/
    const { auth } = require('./middleware/auth');
    /*----------- Middelware End -----------*/

    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use(express.static('client/build'))

    /**
     * 
     *  BOOK ---------------------------------------------  
     * 
     */
    
    /*------------- GET ------------------*/
    //GET METHOD : Get one book 

    app.get("/api/getBook",(req,res)=>{

        let id = req.query.id;

        Book.findById(id,(err,doc)=>{
            if(err) return res.status(400).send(err);
            res.send(doc)
        })

    })

    //GET METHOD : Get books 
    app.get("/api/getBooks",(req,res)=>{
        // http://localhost:3001/api/getBooks?skip=3&limit=2&order=asc
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const order =  req.query.order;             // ORDER = asc || desc 

        Book.find().skip(skip).sort({_id : order}).limit(limit).exec((err,doc)=>{
            if(err) return res.status(400).send(err);
            res.send(doc)
        })  

    })


       //get user posts

       app.get("/api/user_posts",(req,res)=>{
        Book.find({ownerId : req.query.id}).exec((err,docs)=>{
            if(err) return res.status(400).send(err);
            res.send(docs);
             })
        })


    /*------------- POST ------------------*/

    //POST METHOD : STORE BOOK IN DATABASE 
    /*
    app.post("/api/book",(req,res)=>{
        const book = new Book(req.body);

        book.save((err,doc)=>{
            if(err) return res.status(400).send(err);
            res.status(200).json({
                post : true,
                bookId : doc._id
            })
        })
    })
    */
   
/*============ Image upload Start ===========*/

/*----------- Multer -----------*/

//add static public folder 
app.use(express.static('client/public'));

const multer = require('multer');
const storage = multer.diskStorage({
    destination : function( req , file , cb ){  
        cb(null,'client/public/images');
    },
    filename: function( req , file , cb ){
        cb(null,new Date().toISOString() + file.originalname);
    }
})
const uploadImage = multer({storage : storage})

/*============ Image upload End ===========*/

    app.post("/api/book",uploadImage.single('bookImage'),(req,res)=>{
        const book = new Book(req.body);
        book.bookImage = req.file.filename;
        console.log(book)
        book.save((err,doc)=>{
            
            if(err) return res.json({
                post : false
            })

            res.status(200).json({
                post : true,
                bookId : doc._id
            })
        })
    })
    

    /*------------- UPDATE ------------------*/
    
    //Post Method for update book information 
    app.post("/api/book_update",(req,res)=>{
        Book.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
            if(err) return res.status(400).send(err);
            res.json({
                success : true,
                doc 
            })
        })

    })

    /*------------- DELETE ------------------*/

    //delete method for delete book 

    app.delete("/api/delete_book",(req,res)=>{
         const id =  req.query.id;

         Book.findByIdAndRemove(id,(err,doc)=>{
            if(err) return res.status(400).send(err);
            res.json(true)
         })
    })



    /**
     * 
     *  User ---------------------------------------------  
     * 
     */
    
     
    /*------------- GET ------------------*/

    //Get : checks user is valid 

    app.get("/api/auth",auth,(req,res)=>{
        res.json({
            isAuth : true,
            id : req.user._id,
            email : req.user.email,
            name : req.user.name,
            lastname : req.user.lastname
        })
    })


    //GET USER : API FOR USER LOGOUT

    app.get("/api/logout",auth,(req,res)=>{
        req.user.deleteToken(req.token,(err,user)=>{
            if(err) return res.status(400).send(err);
            res.sendStatus(200)
        })
      
    })


    //GET METHOD : get reviewer 

    app.get("/api/getReviewer",(req,res)=>{
        let id = req.query.id;

        User.findById(id,(err,doc)=>{
            if(err) return res.status(400).send(err);
            res.json({
                name : doc.name,
                lastname : doc.lastname
            })
        })

    })

    //get users

    app.get("/api/users",(req,res)=>{
        User.find({},(err,users)=>{
            if(err) return res.status(400).send(err);
            res.status(200).send(users)
        })
    })


    /*------------- POST ------------------*/

    //POST METHOD : Register 
    app.post("/api/register",(req,res)=>{
        const user = new User(req.body);

        user.save((err,doc)=>{
            if(err) return res.json({success:false});
            res.status(200).json({
                success : true,
                user : doc
            })
        })
    })

   //POST METHOD : Login 
   app.post("/api/login",(req,res)=>{

    User.findOne({'email' : req.body.email } , (err,user)=>{
        if(!user)  return res.json({
            isAuth : false,
            message : 'Auth Faild , user not found.'
        })

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth : false,
                message : 'Wrong Password'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                        isAuth : true,
                        id : user._id,
                        email : user.email
                })
            })
        })
    })


})
    /*------------- UPDATE ------------------*/
    
    //Post Method for update 
    

    /*------------- DELETE ------------------*/

    //delete method for delete 

    if(process.env.NODE_ENV === 'production'){
        const path  =  require('path');
        app.get('/*',(req,res)=>{
            res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
        })
    }

    const port = process.env.PORT || 3001;
    app.listen(port,()=>{
        console.log('SERVER RUNNING.')
    })


