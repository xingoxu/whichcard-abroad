import { response } from './functions/currency';
import { Router } from 'express';

const router = Router();

router.get(
  '/currency',
  (req, res, next) => {
    response(req)
      .then(res.json.bind(res))
      .catch(next);
  }
);

export default router;
