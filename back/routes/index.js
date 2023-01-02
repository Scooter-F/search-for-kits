import express from 'express';
import search from './search.js'

const routes = express.Router();

routes.use('/search', search)

export default routes