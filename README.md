openapi: 3.0.0
info:
title: User Signup API
version: 1.0.0
paths:
/signup:
post:
summary: User Registration
requestBody:
required: true
content:
application/json:
schema:
type: object
properties:
email:
type: string
format: email
password:
type: string
confirmPassword:
type: string
responses:
'200':
description: User successfully registered
'400':
description: Bad request
'500':
description: Internal server error
/login:
post:
summary: User Login
requestBody:
required: true
content:
application/json:
schema:
type: object
properties:
email:
type: string
format: email
password:
type: string
responses:
'200':
description: Login successful
'401':
description: Unauthorized
'500':
description: Internal server error
