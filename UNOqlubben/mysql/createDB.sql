DROP DATABASE IF EXISTS UNOdb;
CREATE DATABASE UNOdb CHARACTER SET utf8 COLLATE utf8_general_ci;
USE UNOdb;

CREATE TABLE players (
  PlayerID int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) UNIQUE,
  PRIMARY KEY (PlayerID)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


CREATE TABLE games (
  GameID int(11) NOT NULL AUTO_INCREMENT,
  WinnerID int,
  LooserID int,
  PRIMARY KEY (GameID),
  FOREIGN KEY (WinnerID) REFERENCES players(PlayerID),
  FOREIGN KEY (LooserID) REFERENCES players(PlayerID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 auto_increment=1000;

CREATE TABLE playersGames ( 
	PlayerID int,
    GameID int,
    FOREIGN KEY (PlayerID) REFERENCES players(PlayerID),
    FOREIGN KEY (GameID) REFERENCES games(GameID)
);
