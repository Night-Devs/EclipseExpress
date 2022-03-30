import { config } from 'dotenv'
import { Server } from './structures'

config()

const server = new Server()

server.on('ready', () => console.log('ready'))

server.start()
