CREATE DATABASE IF NOT EXISTS backcountry;

USE backcountry;

CREATE TABLE IF NOT EXISTS Users (
  UserID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Reviews (
  ReviewID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ReviewText MEDIUMTEXT
);

CREATE TABLE IF NOT EXISTS Trips (
  TripID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  ReviewID INT,
  IsPublished BOOLEAN,
  Popularity INT,
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (ReviewID) REFERENCES Reviews(ReviewID)
);

CREATE TABLE IF NOT EXISTS Days (
  DayID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  TrailList MEDIUMTEXT,
  Campsite MEDIUMTEXT
);

CREATE TABLE IF NOT EXISTS TrailReports (
  TrailReportID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ReviewID INT,
  FOREIGN KEY (ReviewID) REFERENCES Reviews(ReviewID),
  ReportType INT,
  Comment MEDIUMTEXT
);