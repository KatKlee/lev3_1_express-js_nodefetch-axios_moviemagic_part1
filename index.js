import axios from 'axios'
import express from 'express'

const PORT = 9898
const app = express()

// Set view engine
app.set('view engine', 'ejs')

// Request logging – Middleware
app.use((req, _, next) => {
    console.log('Request:', req.method, req.url)
    next()
})

// Express looks up 
app.use(express.static('./public'))

// Request for index-page with axios fetch
app.get('/', (req, res) => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=2dd1763f39568c4d921f3b54b563350a&language=en-US')
        .then(response => {
            const movies = response.data
            movies.morepages = movies.page + 5
            res.render('index', { movies })
        })
})


app.get('/movie:id', (req, res) => {
    const id = req.params.id
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2dd1763f39568c4d921f3b54b563350a&language=en-US`)
        .then(response => {
            const movie = response.data
            console.log(response.data)
            res.render('movie', { movie })
        })
})


app.get('/:page', (req, res) => {
    const page = req.params.page
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2dd1763f39568c4d921f3b54b563350a&language=en-US&page=${page}`)
        .then(response => {
            const movies = response.data
            movies.morepages = movies.page + 5
            res.render('index', { movies })
        })
})


// Start server and listen to requests on given port
app.listen(PORT, () => {
    console.log('Server runs on Port:', PORT)
})
