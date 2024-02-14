CREATE TABLE account (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT,
    account_number VARCHAR(5) NOT NULL UNIQUE,
    balance DECIMAL(19, 4),
    status VARCHAR(50),
    creation_date DATETIME,
    last_updated DATETIME,
    PRIMARY KEY (id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);
