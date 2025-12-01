CREATE TABLE if not EXISTS User(
    uid INt Primary Key Auto_Increment,
    username VARCHAR (50) Not Null Unique,
    password_hash VARCHAR (255) Not Null,
    created_at TIMESTAMP Default CURRENT_TIMESTAMP,
    UserPlayCount INT Default 0
);

CREATE Table if not EXISTS CustomMap(
    MapID INT Primary Key Auto_Increment,
    MapName VARCHAR(100) Not Null,
    MapData TEXT Not Null,
    CreatedAt TIMESTAMP Default CURRENT_TIMESTAMP,
    MapPlayCount INT Default 0
);