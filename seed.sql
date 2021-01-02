
USE employee_tracker;

INSERT INTO department (name)
VALUES ("Research");

INSERT INTO department (name)
VALUES ("Management");

INSERT INTO department (name)
VALUES ("Design");

INSERT INTO department (name)
VALUES ("Production");

INSERT INTO role (title, salary, department_id)
VALUES ("Scientist", 90000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 80000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Designer", 70000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 95000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 2, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Man", "Ager", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("En", "Gineer", 4, 1);