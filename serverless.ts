import { app } from "./app";
import { createServer, proxy } from "aws-serverless-express";
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

const BINARY_MIME_TYPES = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
]

const server = createServer(app, undefined, BINARY_MIME_TYPES)
exports.handler = (event: APIGatewayProxyEvent, context: Context) => proxy(server, event, context)
