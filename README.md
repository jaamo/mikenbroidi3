# Planmill dashboard

https://online.planmill.com/evermade/api/registrations.jsp

Install dependencies:
`npm install`

Run the app:
`DEBUG=mikenbroidi3:* npm start`

## Database

Spin up:  
`docker run --name mikenbroidi_db -e POSTGRES_USER=mikenbroidi -e POSTGRES_DB=mikenbroidi -e POSTGRES_PASSWORD=jolotilollero -p 5432:5432 -v $(pwd)/data:/var/lib/postgresql/data -d postgres:11.2`

## Migrations

More info:
https://github.com/salsita/node-pg-migrate

Create migration:  
`npm run migrate create projects`

Run migration:
`DATABASE_URL=postgres://mikenbroidi:jolotilollero@127.0.0.1:5432/mikenbroidi npm run migrate up`
