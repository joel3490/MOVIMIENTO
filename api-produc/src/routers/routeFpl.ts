// routers/routeFpl.ts
import { Router } from 'express';
import { param, query } from 'express-validator';
import { handleInputErrors } from '../middleware';
import { getFpl, getFpltById, searchFpl } from '../handelers/fpl';

const router = Router();

router.get('/', getFpl);

router.get('/search',
    [
        query('searchTerm')
    ],
    handleInputErrors,
    searchFpl
);








router.get('/:id', 
    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    getFpltById
);

export default router;
