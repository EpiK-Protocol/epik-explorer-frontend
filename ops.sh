#!/bin/bash
appname=epikexplorer
port=4001
devaddr=47.92.64.50

param1=${1}
param2=${2}
param3=${3}

case "$param1" in
    build)
        case "$param2" in
            dev)
                npm install
                npm run build:prod
                docker build . -t ${appname}
            ;;
            prod)
                npm install
                npm run build:prod
                docker build . -t ${appname}
            ;;
        esac
        
    ;;
    push)
        case "$param2" in
            dev)
                docker tag ${appname}:latest registry.cn-beijing.aliyuncs.com/bfssai/${appname}.dev:latest
                docker login --username=bfss_app --password=BFSS811215 registry.cn-beijing.aliyuncs.com
                docker push registry.cn-beijing.aliyuncs.com/bfssai/${appname}.dev:latest
            ;;
            prod)
                docker tag ${appname}:latest registry.cn-beijing.aliyuncs.com/bfssai/${appname}:latest
                docker login --username=bfss_app --password=BFSS811215 registry.cn-beijing.aliyuncs.com
                docker push registry.cn-beijing.aliyuncs.com/bfssai/${appname}:latest
                
            ;;
        esac
    ;;
    run)
        case "$param2" in
            dev)
                ssh root@${devaddr} "
docker login --username=bfss_app --password=BFSS811215 registry.cn-beijing.aliyuncs.com
docker pull registry.cn-beijing.aliyuncs.com/bfssai/${appname}.dev:latest
docker stop ${appname}
sleep 1
docker rm ${appname}
sleep 1
docker run  --network=host -v /etc/localtime:/etc/localtime -d -m 1G --name ${appname} registry.cn-beijing.aliyuncs.com/bfssai/${appname}.dev:latest
docker ps"
            ;;
            prod)
                ssh centos@${devaddr} "
sudo docker login --username=bfss_app --password=BFSS811215 registry.cn-beijing.aliyuncs.com
sudo docker pull registry.cn-beijing.aliyuncs.com/bfssai/${appname}:latest
sudo docker stop ${appname}
sudo sleep 1
sudo docker rm ${appname}
sudo sleep 1
sudo docker run  --network=host -v /etc/localtime:/etc/localtime -d -m 1G --name ${appname} registry.cn-beijing.aliyuncs.com/bfssai/${appname}:latest
sudo docker ps" 
            ;;
            local)
                docker run --rm -p ${port}:${port} --name ${appname} ${appname}
            ;;
        esac  
    ;;
    *)
    echo "Usage :\nsh ops.sh [build,run,push]"
    ;;

esac
