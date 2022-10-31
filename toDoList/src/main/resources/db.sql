CREATE TABLE IF NOT EXISTS tasks
(
    id           BIGINT         NOT NULL PRIMARY KEY,
    taskText        VARCHAR(100)  NOT NULL,
    done boolean NOT NULL,
    date   VARCHAR(300)  NOT NULL
);

select * from tasks
drop table tasks;
