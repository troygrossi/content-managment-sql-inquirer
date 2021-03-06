CREATE TABLE departments (
  department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);
CREATE TABLE roles (
  role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  role_title VARCHAR(30) NOT NULL,
  role_salary INTEGER NOT NULL,
  role_department INTEGER NOT NULL,
  FOREIGN KEY (role_department) REFERENCES departments(department_id)
);
CREATE TABLE employees (
  employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  employee_fname VARCHAR(30) NOT NULL,
  employee_lname VARCHAR(30) NOT NULL,
  employee_role INTEGER NOT NULL,
  employee_manager INTEGER,
  FOREIGN KEY (employee_manager) REFERENCES employees(employee_id),
  FOREIGN KEY (employee_role) REFERENCES roles(role_id)
);

