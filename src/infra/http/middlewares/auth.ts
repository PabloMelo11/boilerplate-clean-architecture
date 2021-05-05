import { adaptMiddleware } from '@/infra/http/adapters/ExpressMiddleware';

import { makeEnsureAuthenticatedMiddleware } from '@/infra/http/factories/middlewares/EnsureAuthenticatedMiddlewareFactory';

const auth = adaptMiddleware(makeEnsureAuthenticatedMiddleware());

export { auth };
