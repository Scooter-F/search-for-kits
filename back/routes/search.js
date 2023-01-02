import express from 'express';
import searchService from '../services/search.js'

const search = express.Router();

/**
 * @swagger
 * tags:
 *   name: Search APIs
 *   description: APIs to handle kit search.
 */

/**
 * @swagger
 * /api/search/{term}:
 *   get:
 *     summary: Retrieves kit information based on a search term
 *     parameters:
 *       - in: path
 *         name: term
 *         schema:
 *           type: string
 *         required: true
 *         description: term to search on
 *       - in: query
 *         name: fuzzy
 *         schema:
 *           type: boolean
 *         required: false
 *         description: flag to determine whether to do an exact search
 *       - in: query
 *         name: count
 *         schema:
 *           type: number
 *         required: false
 *         description: The number of kits to return. Defaults to 5.
 *       - in: query
 *         name: pagenum
 *         schema:
 *           type: number
 *         required: false
 *         description: The page number of kits to return. Defaults to 0.
 *     responses:
 *       "200":
 *         descriptions: a list of matching kits
 */
search.get('/:term', searchService.filter);

export default search;