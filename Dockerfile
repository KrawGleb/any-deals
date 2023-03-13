FROM mcr.microsoft.com/mssql/server:2019-latest

USER root

RUN mkdir /app
RUN mkdir /app/Migrations
RUN mkdir /app/Migrations/Data
COPY ./src/SaM.AnyDeals.DataAccess/Migrations/Data/. /app/Migrations/Data/
