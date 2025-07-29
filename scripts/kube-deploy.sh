#!/bin/bash

## login to your docker
docker login

## connect to your azure
az login

## connect to azure container registry
az acr login --a4eacr1

## build, tag and  push the docker image to registry
docker build -t a4eacr1.azurecr.io/image1:v1 .
docker push a4eacr1.azurecr.io/image1:v1

## connect to azure kubernetes service
az aks get-credentials --resource-group PizzaHouse --name a4eaks
kubectl get nodes

## connect aks to acr
az aks update --resource-name PizzaHouse --name a4eaks --attach-acr a4eacr1

## to download nginx-ingress
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml

## to debug 
kubectl get pods
kubectl logs <backend-pod-name>
kubectl get svc
kubectl describe ingress

## deploy the pods
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/backend-service.yml
kubectl apply -f k8s/frontend-service.yml
kubectl apply -f k8s/ingress.yml

## access the site
kubectl get svc
