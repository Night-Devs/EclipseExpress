import express from 'express'

export class Router {
  public readonly router: express.Router = express.Router()
  public basePath: string = '/'
  constructor() {
    this.route()
  }

  public route(): void {}
}
