# Mainnet

## What is this?

An attempt.

Furthermore, an attempt to create a hub where anybody can deploy their machine, or deep learning models, get an automatically generated API. This API will have custom pricing model, access control, rate limiting, branding, etc, all created and managed by users themselves for their models.

## Limiting factors

Running pre-trained deep learning models is expensive unless there is a platform that can work, building something that would already cost soo much money seems idiotic, So, at first only machine learning models with slightly less computational requirements will be supported. If things work out, why not slap a subscription/pricing model and afford servers for proper deep learning models as well?

## What it is not

It is not a platform to train models, or share and version control source code for given models, this is too complex to maintain and nevertheless, there are tons of platforms for it, including the hugging face. aim of this project is to have rather a more marketized approach, if this even makes sense, basically, a place where people can monetize or make their models accessible to others.

## API Reference

**Base URL**: `https://non-existent-url.com/api/v1/`
**Gateway PORT**: 4000
**User Service PORT**: 3000

## User Service `/user`

### Auth `/auth`

### Signup

**Method**: `POST`
**URL**: `/signup`
**Body**:

```json
{
  "username": "username",
  "password": "password",
  "email": "email",
  "fullname": "fullname",
  "bio": "bio"
}
```

**Response 200**:

```json
{
  "message": "User created successfully"
}
```

### Login

**Method**: `POST`
**URL**: `/login`
**Body**:

```json
{
  "username": "username",
  "password": "password"
}
```

**Response 200**
```json
{
    "token": "token" // JWT token for dev purposes
}
```

## Error Classes

Every error class comes with default object:
```json
{
    "message": "message",
    "error": "error" // optional
}
```

Every error `message` can be safely wrapped in alert on client,
but **500** will probably require something more descriptive. It's
the kind of error that can not be revealed to the client.

**NotFoundError** - 404

*Requesting a resource that does not exist*

**ConflictError** - 409

*Trying to create a resource that already exists*

**ValidationError** - 400

*Request body is not valid*

**UnauthorizedError** - 401

*Trying to access a protected resource without authorization*

**AssertionError** - 500

*Internal server error*


