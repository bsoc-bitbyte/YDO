CREATE TABLE user_info (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	age SMALLINT NOT NULL CHECK(age > 0),
	year SMALLINT NOT NULL CHECK(year IN (1,2,3,4)),
	branch VARCHAR(50) NOT NULL CHECK(branch IN ('CSE','ECE','MECH','SM','BDES')),
	bio VARCHAR(500),
	image VARCHAR(200),
	public_key VARCHAR(500) NOT NULL
);

CREATE TABLE tags_table (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

CREATE TABLE tags_user_table (
	tag_id BIGINT NOT NULL REFERENCES tags_table(id),
	user_id BIGINT NOT NULL REFERENCES user_info(id)
);

CREATE TABLE choices_for_chooser (
	chooser_id BIGINT NOT NULL REFERENCES user_info(id),
	chosen_id BIGINT REFERENCES user_info(id),
	UNIQUE (chooser_id)
);

CREATE TABLE choices_for_chosen (
	chosen_id BIGINT NOT NULL REFERENCES user_info(id),
	chooser_id BIGINT REFERENCES user_info(id),
	UNIQUE (chosen_id)
);
