CREATE TABLE test_table (
	id       INT     PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	sentence TEXT    NOT     NULL,
	archived BOOLEAN NOT     NULL DEFAULT  FALSE
);

INSERT INTO test_table (sentence, archived)
	VALUES
		('Test Row 1', TRUE),
		('Test Row 2', TRUE),
		('Test Row 3', TRUE);
