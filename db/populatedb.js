const { Client } = require("pg");
require('dotenv').config()

const SQL = `
-- Route Table
CREATE TABLE IF NOT EXISTS Route (
    route_id VARCHAR(20) PRIMARY KEY,
    route_name VARCHAR(100) ,
    price DECIMAL(6, 2) 
);

-- Driver Table
CREATE TABLE IF NOT EXISTS Driver (
    driver_id VARCHAR(20) PRIMARY KEY,
    phone VARCHAR(15) ,
    name VARCHAR(100) 
);

-- Conductor Table
CREATE TABLE IF NOT EXISTS Conductor (
    conductor_id VARCHAR(20) PRIMARY KEY,
    phone VARCHAR(15) ,
    name VARCHAR(100)
);

-- Bus Table
CREATE TABLE IF NOT EXISTS Bus (
    bus_id SERIAL PRIMARY KEY,
    capacity INTEGER,
    driver_id VARCHAR(20) REFERENCES Driver(driver_id),
    conductor_id VARCHAR(20) REFERENCES Conductor(conductor_id),
    route_id VARCHAR(20) REFERENCES Route(route_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL UNIQUE,      
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100) PRIMARY KEY NOT NULL,
    phone VARCHAR(15),
    balance DECIMAL(10, 2) DEFAULT 0,
    bus_id INTEGER REFERENCES Bus(bus_id) DEFAULT NULL 
);

-- Ratings Table
CREATE TABLE IF NOT EXISTS Ratings (
    rating_id SERIAL PRIMARY KEY,
    username VARCHAR(100) REFERENCES Users(name),
    driver_id VARCHAR(20) REFERENCES Driver(driver_id),
    conductor_id VARCHAR(20) REFERENCES Conductor(conductor_id),
    driver_rating INTEGER CHECK (driver_rating BETWEEN 1 AND 5),
    conductor_rating INTEGER CHECK (conductor_rating BETWEEN 1 AND 5)
);

--table alters documented below:

ALTER TABLE Users ADD CONSTRAINT fk_bus FOREIGN KEY (bus_id) REFERENCES Bus (bus_id) ON DELETE SET NULL;

ALTER TABLE Bus ADD CONSTRAINT fk_driver FOREIGN KEY (driver_id) REFERENCES Driver(driver_id) ON DELETE SET NULL;

ALTER TABLE Bus ADD CONSTRAINT fk_conductor FOREIGN KEY (conductor_id) REFERENCES Conductor(conductor_id) ON DELETE SET NULL;

ALTER TABLE Ratings ADD CONSTRAINT fk_driver_rating FOREIGN KEY (driver_id) REFERENCES Driver(driver_id) ON DELETE CASCADE;

ALTER TABLE Ratings ADD CONSTRAINT fk_conductor_rating FOREIGN KEY (conductor_id) REFERENCES Conductor(conductor_id) ON DELETE CASCADE;

ALTER TABLE Ratings ADD COLUMN comment TEXT;

ALTER TABLE Users ADD COLUMN role VARCHAR(20) DEFAULT 'user';

-- Populate Route Table
INSERT INTO Route (route_id, route_name, price) VALUES
('route01', 'Mohammadpur A', 100.00),
('route02', 'Mohammadpur B', 100.00),
('route03', 'Mirpur A', 100.00),
('route04', 'Mirpur B', 100.00),
('route05', 'Bashundhara', 50.00),
('route06', 'Jigatola', 100.00),
('route07', 'Narayanganj', 150.00),
('route08', 'New Market', 100.00),
('route09', 'Baldha Garden', 100.00),
('route10', 'Abdullahpur', 100.00),
('route11', 'Gazipur', 200.00),
('route12', 'Munshiganj', 250.00);

-- Populate Driver Table
INSERT INTO Driver (driver_id, phone, name) VALUES
('dv01', '1234567890', 'Zorblax Quasar'),
('dv02', '1234567891', 'Glipnor Nebula'),
('dv03', '1234567892', 'Xylo Andromeda'),
('dv04', '1234567893', 'Blorp Sirius'),
('dv05', '1234567894', 'Grak Vega'),
('dv06', '1234567895', 'Zibbit Rigel'),
('dv07', '1234567896', 'Flarn Betelgeuse'),
('dv08', '1234567897', 'Klorp Kepler'),
('dv09', '1234567898', 'Snorblax Titan'),
('dv10', '1234567899', 'Plibnor Callisto'),
('dv11', '1234567800', 'Wibbit Europa'),
('dv12', '1234567801', 'Grobble Enceladus');

-- Populate Conductor Table
INSERT INTO Conductor (conductor_id, phone, name) VALUES
('cd01', '2234567890', 'Ziblorp Quasar'),
('cd02', '2234567891', 'Blibnor Nebula'),
('cd03', '2234567892', 'Xorblax Andromeda'),
('cd04', '2234567893', 'Flibbit Sirius'),
('cd05', '2234567894', 'Gribbit Vega'),
('cd06', '2234567895', 'Zobbit Rigel'),
('cd07', '2234567896', 'Sniblor Betelgeuse'),
('cd08', '2234567897', 'Klibbit Kepler'),
('cd09', '2234567898', 'Pliblor Titan'),
('cd10', '2234567899', 'Wiblor Callisto'),
('cd11', '2234567800', 'Grobbit Europa'),
('cd12', '2234567801', 'Snorbit Enceladus');

-- Populate Bus Table
INSERT INTO Bus (capacity, driver_id, conductor_id, route_id) VALUES
(50, 'dv01', 'cd01', 'route01'),
(45, 'dv02', 'cd02', 'route02'),
(60, 'dv03', 'cd03', 'route03'),
(55, 'dv04', 'cd04', 'route04'),
(40, 'dv05', 'cd05', 'route05'),
(70, 'dv06', 'cd06', 'route06'),
(65, 'dv07', 'cd07', 'route07'),
(50, 'dv08', 'cd08', 'route08'),
(55, 'dv09', 'cd09', 'route09'),
(60, 'dv10', 'cd10', 'route10'),
(45, 'dv11', 'cd11', 'route11'),
(50, 'dv12', 'cd12', 'route12');
`;

async function main() {
  console.log("seeding...");
  console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_NAME);
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
