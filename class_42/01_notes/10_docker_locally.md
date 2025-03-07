### Docker commands that i have used in the class 4 of excalidraw clone is:

if you wnat to use the postgres locally then first install docker and have it started in your local machine, then:
```bash
docker ps # for seeing that there are any existing docker file

docker kill <CONTAINER ID> # for remove that file if no needed

docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres # to create a new file

docker ps 
```
you will see your created file there in the cli and also in your docker app

after that i goes to my db (database) folder in my draw-app and changed my `.env` file with this: 

```cs
DATABASE_URL="postgres://postgres:mysecretpassword@localhost:5432"
```
always check the port should be same as when you creted the database.

after that i locally generated all the existing sql commands that prisma have for exactly copying the databse
```bash
cd .\packages\db\
npx prisma generate dev
npx prisma generate # to generate the client locally 
```
after that if you go to your data base like this way:
```bash
psql "postgres://postgres:mysecretpassword@localhost:5432" # before running psql command i have installed the psql cli in my terminal from google

\dt # this will show all the tables

SELECT * FROM "User" # you can write SQL queries there
```