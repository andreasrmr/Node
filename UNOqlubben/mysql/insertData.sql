use unodb;

#Create players
INSERT INTO players (name) VALUES
('Christian'),
('Søren'),
('Andreas'),
('Søren');
SELECT * FROM players;

#Create Game
INSERT INTO games (WinnerID, LooserID) VALUES
(2,3);
INSERT INTO games (WinnerID, LooserID) VALUES
(1,2);
INSERT INTO games (WinnerID, LooserID) VALUES
(3,2);
select * from games;

#Save players who attendted a specific game
INSERT INTO playersGames(PlayerID, GameID) VALUES 
(1, 1000);
INSERT INTO playersGames(PlayerID, GameID) VALUES 
(2, 1000);
INSERT INTO playersGames(PlayerID, GameID) VALUES 
(3, 1000);


SELECT * FROM players;
select * from playersgames;
#UPDATE games SET LooserID = 2 where gameid = 1000;
