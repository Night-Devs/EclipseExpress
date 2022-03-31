import bodyParser from 'body-parser'
import { EventEmitter } from 'events'
import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import Http, { createServer } from 'http'
import { HttpError } from 'http-errors'
import { ValidationError } from 'express-json-validator-middleware'
import path from 'path'
import { initDataSource, readdirRecursive } from '../utility'
import { Router } from './router'

declare global {
  namespace Express {
    interface Request {
      server: Server
    }
  }
}

export class Server extends EventEmitter {
  public readonly app: Application = express()
  public readonly http: Http.Server = createServer(this.app)

  private useHelmet(): void {
    this.app.use(helmet.contentSecurityPolicy())
    this.app.use(helmet.crossOriginEmbedderPolicy())
    this.app.use(helmet.crossOriginOpenerPolicy())
    this.app.use(helmet.crossOriginResourcePolicy())
    this.app.use(helmet.dnsPrefetchControl())
    this.app.use(helmet.expectCt())
    this.app.use(helmet.frameguard())
    this.app.use(helmet.hidePoweredBy())
    this.app.use(helmet.hsts())
    this.app.use(helmet.ieNoOpen())
    this.app.use(helmet.noSniff())
    this.app.use(helmet.originAgentCluster())
    this.app.use(helmet.permittedCrossDomainPolicies())
    this.app.use(helmet.referrerPolicy())
    this.app.use(helmet.xssFilter())
  }

  private registerRoutes(): void {
    this.app.use(
      (request: Request, _response: Response, next: NextFunction) => {
        request.server = this
        next()
      },
    )
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    for (const file of readdirRecursive(path.join(__dirname, '..', 'routes'))) {
      try {
        const { basePath, router }: Router = new (require(file).default)()
        this.app.use(basePath, router)
      } catch (error) {
        console.error(error)
      }
    }
    this.app.use(this.errorHandler)
    this.useHelmet()
  }

  private errorHandler(
    error: Error | HttpError,
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    if (error instanceof HttpError) {
      return response.status(error.statusCode).json({
        message: error.message,
        code: error.statusCode,
      })
    } else if (error.name === 'JsonSchemaValidationError') {
      return response.status(400).json({
        code: 400,
        message: 'Bad Request',
        errors: (<ValidationError>error).validationErrors,
      })
    }
    return response.status(500).json({ code: 500, message: error.message })
  }

  public async start(): Promise<void> {
    const port = +process.env.PORT || 3000
    await initDataSource()
    this.registerRoutes()
    this.http.listen(port, '0.0.0.0', () => this.emit('ready'))
  }

  public close(): void {
    this.http.close()
  }
}
