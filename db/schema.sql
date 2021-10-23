CREATE TABLE departments (
  department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
CREATE TABLE roles (
  role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  role_title VARCHAR(30) NOT NULL,
  role_department VARCHAR(30) NOT NULL,
  role_salary VARCHAR(30) NOT NULL
  
);
CREATE TABLE employees (
  employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  employee_fname VARCHAR(30) NOT NULL,
  employee_lname VARCHAR(30) NOT NULL,
  employee_role VARCHAR(30) NOT NULL,
  employee_department VARCHAR(30) NOT NULL,
  employee_salary VARCHAR(30) NOT NULL,
  employee_manager VARCHAR(30) NOT NULL
);