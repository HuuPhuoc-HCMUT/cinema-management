CREATE DATABASE cinema_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE cinema_db;

CREATE TABLE Theater (
    theater_id      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    location        VARCHAR(255) NOT NULL,
    district		VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Staff (
    user_id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role           VARCHAR(50) NOT NULL,
    last_active    DATETIME NULL,
    email          VARCHAR(255) NOT NULL,
    phone          VARCHAR(20)  NOT NULL,
    password_hash  VARCHAR(255) NOT NULL,
    gender         ENUM('male', 'female', 'other') NULL,
    name           VARCHAR(255) NOT NULL,
    dob            DATE NOT NULL,
    theater_id     INT UNSIGNED NULL,
    manager_id     INT UNSIGNED NULL,

    UNIQUE KEY uk_staff_email (email),
    UNIQUE KEY uk_staff_phone (phone),

    CONSTRAINT chk_staff_dob  
        CHECK (dob >= '1900-01-01'),

    CONSTRAINT chk_staff_phone 
        CHECK (phone REGEXP '^[0-9]+$'),

    -- FK to Theater
    CONSTRAINT fk_staff_theater 
        FOREIGN KEY (theater_id)
        REFERENCES Theater(theater_id)
        ON UPDATE CASCADE 
        ON DELETE SET NULL,

    -- FK to Staff (manager self reference)
    CONSTRAINT fk_staff_manager
        FOREIGN KEY (manager_id)
        REFERENCES Staff(user_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE Customer (
    user_id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    date_join      DATETIME NOT NULL,
    email          VARCHAR(255) NOT NULL,
    phone          VARCHAR(20)  NOT NULL,
    password_hash  VARCHAR(255) NOT NULL,
    gender         ENUM('male', 'female', 'other') NULL,
    name           VARCHAR(255) NOT NULL,
    dob            DATE NOT NULL,
    UNIQUE KEY uk_customer_email (email),
    UNIQUE KEY uk_customer_phone (phone),
     CONSTRAINT chk_customer_dob  CHECK (DOB >= '1900-01-01'),
    CONSTRAINT chk_customer_phone CHECK (phone REGEXP '^[0-9]+$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Crew (
    person_id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    person_name   VARCHAR(255) NOT NULL,
    experience    INT UNSIGNED NULL,          -- e.g. years of experience
   image_url VARCHAR(500) NULL, 
    award         VARCHAR(255) NULL           -- could also be TEXT if many awards
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Movie (
    movie_id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    production_company VARCHAR(255) NULL,
    duration           INT UNSIGNED NOT NULL,     -- minutes
    title              VARCHAR(255) NOT NULL,
    release_date       DATE NULL,
    plot_description   TEXT NULL,
    age_restrict       VARCHAR(20) NULL,         -- e.g. 'PG-13'
    user_id            INT UNSIGNED NOT NULL,    -- staff who created/owns it
   status 	ENUM('ongoing','stop') NOT NULL DEFAULT 'ongoing',
   image_url VARCHAR(500) NULL, 
    CONSTRAINT fk_movie_staff
        FOREIGN KEY (user_id) REFERENCES Staff(user_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Auditorium (
    theater_id      INT UNSIGNED NOT NULL,
    screen_number   INT UNSIGNED NOT NULL,
    seat_capacity   INT UNSIGNED NOT NULL,
    seat_map        TEXT NULL,                  -- e.g. JSON or text layout
    formats ENUM('2D','3D','IMAX') NOT NULL DEFAULT '2D',         -- e.g. '2D,3D,IMAX'
    PRIMARY KEY (theater_id, screen_number),
    CONSTRAINT fk_auditorium_theater
        FOREIGN KEY (theater_id) REFERENCES Theater(theater_id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Seat (
    theater_id      INT UNSIGNED NOT NULL,
    screen_number   INT UNSIGNED NOT NULL,
    seat_number     VARCHAR(10) NOT NULL,       
    seat_type  ENUM('normal','VIP') NOT NULL,
    price 	INT UNSIGNED NOT NULL,
    PRIMARY KEY (theater_id, screen_number, seat_number),
CONSTRAINT chk_seat_price CHECK (price > 0),
    CONSTRAINT fk_seat_auditorium
        FOREIGN KEY (theater_id, screen_number)
        REFERENCES Auditorium(theater_id, screen_number)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE Showtime (
    theater_id      INT UNSIGNED NOT NULL,
    screen_number   INT UNSIGNED NOT NULL,
    start_time      TIME NOT NULL,
    end_time        TIME NOT NULL,
    date            DATE NOT NULL,
    user_id         INT UNSIGNED NOT NULL,      -- staff who scheduled
    movie_id        INT UNSIGNED NOT NULL,
    PRIMARY KEY (theater_id, screen_number, start_time, end_time, date),
    CONSTRAINT fk_showtime_auditorium
        FOREIGN KEY (theater_id, screen_number)
        REFERENCES Auditorium(theater_id, screen_number)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_showtime_staff
        FOREIGN KEY (user_id) REFERENCES Staff(user_id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_showtime_movie
        FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Booking (
    booking_id      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    payment_method  VARCHAR(50) NOT NULL,       -- e.g. 'cash','card','wallet'
    discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    amount_paid     DECIMAL(10,2) NOT NULL,
    date_time       DATETIME NOT NULL,
    scan_at         DATETIME NULL,              -- when ticket scanned at entrance
    user_id         INT UNSIGNED NOT NULL,      -- customer
CONSTRAINT chk_booking_amounts	CHECK (discount_amount >= 0 AND amount_paid >= 0),
    CONSTRAINT fk_booking_customer
        FOREIGN KEY (user_id) REFERENCES Customer(user_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
    -- NOTE: "total participation of Customer.user_id in Booking"
    -- cannot be enforced directly; handle in app logic.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE Ticket (
    ticket_id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    purchase_at             DATETIME NOT NULL,
    price_paid              DECIMAL(10,2) NOT NULL,
    theater_id_seat         INT UNSIGNED NOT NULL,
    screen_number_seat      INT UNSIGNED NOT NULL,
    seat_number             VARCHAR(10) NOT NULL,
    theater_id_showtime     INT UNSIGNED NOT NULL,
    screen_number_showtime  INT UNSIGNED NOT NULL,
    start_time              TIME NOT NULL,
    end_time                TIME NOT NULL,
    date                    DATE NOT NULL,
    booking_id              INT UNSIGNED NOT NULL,

    -- FK to Seat
    CONSTRAINT fk_ticket_seat
        FOREIGN KEY (theater_id_seat, screen_number_seat, seat_number)
        REFERENCES Seat(theater_id, screen_number, seat_number)
        ON UPDATE CASCADE ON DELETE RESTRICT,

    -- FK to Showtime
    CONSTRAINT fk_ticket_showtime
        FOREIGN KEY (theater_id_showtime, screen_number_showtime, start_time, end_time, date)
        REFERENCES Showtime(theater_id, screen_number, start_time, end_time, date)
        ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT uniq_ticket_seat_showtime UNIQUE(
    theater_id_showtime,
    screen_number_showtime,
    date,
    start_time,
    seat_number
), 

    -- FK to Booking
    CONSTRAINT fk_ticket_booking
        FOREIGN KEY (booking_id) REFERENCES Booking(booking_id)
        ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Combo (
    combo_id   VARCHAR(20) PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    price      DECIMAL(10,2) NOT NULL,
image_url VARCHAR(500) NULL,
    CONSTRAINT chk_combo_price CHECK (price > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELIMITER $$

CREATE TRIGGER trg_combo_id
BEFORE INSERT ON Combo
FOR EACH ROW
BEGIN
    DECLARE next_num INT;

    IF NEW.combo_id IS NULL OR NEW.combo_id = '' THEN
        SELECT IFNULL(
            MAX(CAST(SUBSTRING(combo_id, 3) AS UNSIGNED)), 
            0
        ) + 1
        INTO next_num
        FROM Combo;

        SET NEW.combo_id = CONCAT('CB', LPAD(next_num, 6, '0'));
    END IF;
END$$

DELIMITER ;

CREATE TABLE BookingCombo (
    booking_id  INT UNSIGNED NOT NULL,
    combo_id    VARCHAR(20) NOT NULL,
    count       INT UNSIGNED NOT NULL CHECK (count > 0),

    PRIMARY KEY (booking_id, combo_id),

    CONSTRAINT fk_bookingcombo_booking
        FOREIGN KEY (booking_id)
        REFERENCES Booking(booking_id)
        ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT fk_bookingcombo_combo
        FOREIGN KEY (combo_id)
        REFERENCES Combo(combo_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;





CREATE TABLE Review (
    movie_id      INT UNSIGNED NOT NULL,
    user_id       INT UNSIGNED NOT NULL,
    rating_id     INT UNSIGNED NOT NULL,
    review_text   TEXT NULL,
    created_at    DATETIME NOT NULL,
    stars         TINYINT UNSIGNED NOT NULL, -- 1–5
    PRIMARY KEY (movie_id, user_id, rating_id),
    CONSTRAINT fk_review_movie
        FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_review_customer
        FOREIGN KEY (user_id) REFERENCES Customer(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE Participate (
    person_id   INT UNSIGNED NOT NULL,
    movie_id    INT UNSIGNED NOT NULL,
    role        VARCHAR(100) NOT NULL,   -- e.g. 'director','actor'
    PRIMARY KEY (person_id, movie_id),
    CONSTRAINT fk_participate_crew
        FOREIGN KEY (person_id) REFERENCES Crew(person_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_participate_movie
        FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
        ON UPDATE CASCADE ON DELETE CASCADE
    -- NOTE: "total participation of Movie.movie_id in Participate"
    -- = every movie must have at least one crew row; enforce in app logic.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `Format` (
    movie_id     INT UNSIGNED NOT NULL,
    format_type  ENUM('2D','3D','IMAX') NOT NULL,
    PRIMARY KEY (movie_id, format_type),
    CONSTRAINT fk_format_movie
        FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE `Genre` (
    movie_id    INT UNSIGNED NOT NULL,
    genre_type  ENUM('Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi') NOT NULL,
    PRIMARY KEY (movie_id, genre_type),
    CONSTRAINT fk_genre_movie
        FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
