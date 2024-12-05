@echo off

for /f "tokens=1,2 delims==" %%a in (../docker/.env) do (
    set %%a=%%b
)

docker stack down mapletool
docker stack deploy -c ../docker/docker-compose-be.yaml mapletool
docker stack deploy -c ../docker/docker-compose-fe.yaml mapletool