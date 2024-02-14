ALTER TABLE users
ADD COLUMN account_id BIGINT,
ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES account(id);
