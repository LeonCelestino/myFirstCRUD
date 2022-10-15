
CREATE TABLE tb_post_options (
    option_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    post_id INT,
    option1 VARCHAR(30),
    option2 VARCHAR(30),
    option3 VARCHAR(30),
    CONSTRAINT fk_post_id
    FOREIGN KEY (post_id)
    REFERENCES tb_post(post_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE 
);



