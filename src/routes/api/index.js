import express from 'express';

const router = express.Router();

/*Examples of api services being added to router

import articles from './articles';
router.use('/articles', articles);

import images from './images';
router.use('/images', images);
*/

import hello from './hello';
router.use('/hello', hello);

export default router;