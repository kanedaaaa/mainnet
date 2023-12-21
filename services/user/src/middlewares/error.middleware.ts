import * as error from "../handlers/error.handler";

const errorResponseMap = new Map([
    [error.ValidationError, { message: 'Validation error', log: false }],
    [error.AuthorizationError, { message: 'Authorization error', log: false }],
    [error.NotFoundError, { message: 'Not found', log: false }],
    [error.ConflictError, { message: 'Conflict error', log: false }],
]);

const errorMiddleware = (err: any, req: any, res: any, next: any) => {
    const errorType = errorResponseMap.get(err.constructor);

    if (errorType) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Internal server error" });
    }

    next();
};

export default errorMiddleware;