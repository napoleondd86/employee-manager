USE employees_db;

INSERT INTO department (name)
VALUES
("Engineering"),
("Finance"),
("Marketing"),
("Design");

INSERT INTO role (title, salary, department_id)
VALUES
("Junior Developer", 82000, 1),
("Software Engineer", 150000, 1),
("Accountant", 90000, 2),
("Chief Finance Officer", 160000, 2),
("Marketing Associate", 96000, 3),
("Marketing Lead", 134000, 3),
("UI/UX Designer", 88000, 4),
("Product Design Lead", 120000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
("Kal", "Penn", 4),
("Bobby", "Lee", 6),
("Paula", "Garces", 2),
("Chris", "Meloni", 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John", "Cho", 1, 4),
("Neil", "Harris", 3, 1),
("Malin", "Ackerman", 5, 2),
("David", "Krumholtz", 7, 4),
("Ryan", "Reynolds", 1, 3);

