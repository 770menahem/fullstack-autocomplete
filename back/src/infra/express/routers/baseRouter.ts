import * as express from 'express';
// import  BaseController  from "./basecontroller";

export abstract class BaseRouter<T> {
    public path;
    protected _router = express.Router();
    protected controller: T;
    public auth?: express.RequestHandler;

    constructor(controller: T, auth?: express.RequestHandler) {
        this.controller = controller;
        this.auth = auth;
        this.initializeRoutes();
    }

    get router() {
        return this._router;
    }

    public abstract initializeRoutes(): void;
}
