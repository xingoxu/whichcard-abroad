import { response } from './functions/currency';
import { Router } from 'express';
import url from 'url';

const router = Router();

router.get('/currency', (req, res, next) => {
  if (
    !req.headers.referer ||
    !(
      url
        .parse(req.headers.referer)
        .host?.includes('xingoxu.com') ||
      url
        .parse(req.headers.referer)
        .host?.includes('localhost')
    )
  )
    return res.json({});

  response(req)
    .then(res.json.bind(res))
    .catch(next);
});

export default router;
