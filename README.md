# Mainnet

## What is this?

An attempt.

Furthermore, an attempt to create a hub where anybody can deploy their machine, or deep learning models, get an automatically generated API. This API will have custom pricing model, access control, rate limiting, branding, etc, all created and managed by users themselves for their models.

## Limiting factors

Running pre-trained deep learning models is expensive unless there is a platform that can work, building something that would already cost soo much money seems idiotic, So, at first only machine learning models with slightly less computational requirements will be supported. If things work out, why not slap a subscription/pricing model and afford servers for proper deep learning models as well?

## What it is not

It is not a platform to train models, or share and version control source code for given models, this is too complex to maintain and nevertheless, there are tons of platforms for it, including the hugging face. aim of this project is to have rather a more marketized approach, if this even makes sense, basically, a place where people can monetize or make their models accessible to others.

## Early project structure

It's a microservice design, so all the code can be found in the `services` dir, each service is self-contained, for now only `user` service will be available as it's starting point. It will contain authentication, profile management, etc. Other services will be added as the project progresses.

For DB, it will be same one for every service, but i will try to isolate data in schemas as much as possible and have loose coupling between the services. 

Prisma as ORM obviously, why would i have horrible time with typeorm or smth. And docker will be main player i suppose for every deployment, from project itself to models. 