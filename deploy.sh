#!/bin/bash
while getopts 'p:v:' OPT; do
    case $OPT in
        p) dockerPassword="$OPTARG";;
        v) version="$OPTARG";;
    esac
done

dockerHubUrl=registry-vpc.cn-shenzhen.aliyuncs.com
echo 部署版本:$version,仓库地址:$dockerHubUrl
docker login --username=松弛科技 $dockerHubUrl --password=$dockerPassword

projectName=hello-seen
echo 应用:$projectName
cd $projectName
docker build -t $dockerHubUrl/poolsnowhui/$projectName:$version .
docker tag $dockerHubUrl/poolsnowhui/$projectName:$version $dockerHubUrl/poolsnowhui/$projectName:$version
docker push $dockerHubUrl/poolsnowhui/$projectName:$version
#kubectl set image deployment/$projectName --namespace=seen $projectName=$dockerHubUrl/poolsnowhui/$projectName:$version --record
kubectl create deployment $projectName --namespace=seen --image=$dockerHubUrl/poolsnowhui/$projectName:$version --port=80

cd ..

echo 结束

kubectl get pods --namespace=seen