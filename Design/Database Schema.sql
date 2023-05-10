--
-- File generated with SQLiteStudio v3.4.4 on Wed May 10 15:20:55 2023
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Category
CREATE TABLE IF NOT EXISTS Category (
CategoryID INTEGER PRIMARY KEY NOT NULL, 
FoodCategory TEXT NOT NULL, 
PrepMethod TEXT);

-- Table: Food
CREATE TABLE IF NOT EXISTS Food (
FoodID INTEGER PRIMARY KEY NOT NULL, 
FoodName TEXT NOT NULL, 
FoodQuan INTEGER, 
FoodExp TEXT NOT NULL, 
CategoryID INTEGER REFERENCES Category (CategoryID) MATCH SIMPLE, 
LocationID INTEGER REFERENCES Location (LocationID) MATCH SIMPLE);

-- Table: Location
CREATE TABLE IF NOT EXISTS Location (
LocationID TEXT PRIMARY KEY NOT NULL, 
LocationName TEXT NOT NULL) STRICT;

-- Table: Usage
CREATE TABLE IF NOT EXISTS Usage (
UsageID INTEGER PRIMARY KEY NOT NULL, 
FoodID INTEGER REFERENCES Food (FoodID) ON DELETE NO ACTION NOT NULL, 
RemovalMethod TEXT, Date TEXT, Quantity NUMERIC);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
