// will contain user-facing routes; homepage adn login page
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

// get all posts for homepage
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        include: [User]
        // attributes: [
        //     'id',
        //     'title',
        //     'content',
        //     'created_at'
        // ],
        // include: [
        //     {
        //         model: Comment,
        //         attributes: [
        //             'id',
        //             'comment_text',
        //             'post_id',
        //             'user_id',
        //             'created_at'
        //         ],
        //         include: {
        //             model: User,
        //             attributes: [
        //                 'username'
        //             ]
        //         }
        //     },
        //     {
        //         model: User,
        //         attributes: [
        //             'username'
        //         ]
        //     }
        // ]})
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // console.log(posts);
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// redirect user to homepage once logged in
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// render signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// render single post page
router.get('/post/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: [
                        'username'
                    ]
                }
            },
            {
                model: User,
                attributes: [
                    'username'
                ]
            }
        ]})
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id.' });
            return;
        }

        // serialize the data
        const post = dbPostData.get({ plain: true });
        console.log(post);

        // pass data to template
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;