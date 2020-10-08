DROP DATABASE IF EXISTS my_db;
CREATE DATABASE my_db CHARACTER SET utf8 COLLATE utf8_general_ci;
USE my_db;

CREATE TABLE cars (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50),
  color varchar(50),
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO cars (id, name, color) VALUES
(1, 'Mitsubishi', 'Red'),
(2, 'Audi', 'Blue'),
(3, 'Honda', 'Yellow'),
(4, 'Volkswagen', 'Grey');

select * from cars;

UPDATE cars SET name = "Ferrari", color = "Red" WHERE id = 5