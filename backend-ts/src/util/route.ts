import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wraps an async controller to be compatible with Express.
 * Automatically types req as your custom request type (e.g., AuthRequest)
 * and catches errors for next().
 */
export const wrapAsync = <Req extends Request = Request>(
  fn: (req: Req, res: Response, next?: NextFunction) => Promise<any>
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    // cast Request to your custom type
    return fn(req as Req, res, next).catch(next);
  };
};
