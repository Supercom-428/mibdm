# Made in Bury - Backend Application

## Get started
1) create the docker containers
2) install node packages
3) create the database using sequelize
4) start creating models
5) migrate models
6) commit changes

## How-Tos

### Create docker containers
```$xslt
cd backend
docker-compose up -d
```

### Access node container
```$xslt
cd backend
bash enter.sh node
```

### Install node packages
Access node container, then
```
npm install
```

### Run sequelize
```$xslt
cd backend
bash node-run.sh sequelize [command]
bash node-run.sh sequelize db:create
bash node-run.sh sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
bash node-run.sh sequelize-cli db:migrate
```

### Commit changes
```$xslt
git checkout -b 'branch-name-goes-here'
git add [files]
git commit -m 'Meaningful commit message as to what was done'
git push
``` 
