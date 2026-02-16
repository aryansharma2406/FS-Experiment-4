const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let employees = [];

// Load data if file exists
if (fs.existsSync('employees.json')) {
    try {
        const data = fs.readFileSync('employees.json', 'utf-8');
        employees = JSON.parse(data);
    } catch (error) {
        console.log("Error reading employees.json. Starting with empty list.");
        employees = [];
    }
}

// Save data to file
function saveData() {
    fs.writeFileSync('employees.json', JSON.stringify(employees, null, 2));
}

// Show Main Menu
function showMenu() {
    console.log("\nEmployee Management System");
    console.log("1. Add Employee");
    console.log("2. List Employees");
    console.log("3. Update Employee");
    console.log("4. Delete Employee");
    console.log("5. Exit");

    rl.question("Select an option: ", handleMenu);
}

// Handle Menu Option
function handleMenu(option) {
    switch (option) {
        case '1':
            addEmployee();
            break;
        case '2':
            listEmployees();
            break;
        case '3':
            updateEmployee();
            break;
        case '4':
            deleteEmployee();
            break;
        case '5':
            console.log("Exiting program...");
            rl.close();
            break;
        default:
            console.log("Invalid option! Please try again.");
            showMenu();
    }
}

// Add Employee
function addEmployee() {
    rl.question("Employee Name: ", name => {
        name = name.trim();

        rl.question("Position: ", position => {
            position = position.trim();

            rl.question("Salary: ", salary => {
                salary = salary.trim();

                if (!name || !position || isNaN(salary) || Number(salary) <= 0) {
                    console.log("Invalid input! Please enter valid details.");
                    return showMenu();
                }

                const employee = {
                    id: Date.now() + Math.floor(Math.random() * 1000),
                    name,
                    position,
                    salary: Number(salary)
                };

                employees.push(employee);
                saveData();

                console.log("Employee added successfully!");
                showMenu();
            });
        });
    });
}

// List Employees
function listEmployees() {
    console.log("\nEmployee List:");

    if (employees.length === 0) {
        console.log("No employees found.");
    } else {
        employees.forEach(emp => {
            console.log(
                `ID: ${emp.id}, Name: ${emp.name}, Position: ${emp.position}, Salary: ₹${emp.salary}`
            );
        });
        console.log(`Total employees: ${employees.length}`);
    }

    showMenu();
}

// Update Employee
function updateEmployee() {
    rl.question("Enter Employee ID to update: ", id => {
        id = id.trim();

        const employee = employees.find(emp => emp.id == id);

        if (!employee) {
            console.log("Employee not found!");
            return showMenu();
        }

        rl.question("New Name: ", name => {
            name = name.trim();

            rl.question("New Position: ", position => {
                position = position.trim();

                rl.question("New Salary: ", salary => {
                    salary = salary.trim();

                    if (!name || !position || isNaN(salary) || Number(salary) <= 0) {
                        console.log("Invalid input!");
                        return showMenu();
                    }

                    employee.name = name;
                    employee.position = position;
                    employee.salary = Number(salary);

                    saveData();

                    console.log("Employee updated successfully!");
                    showMenu();
                });
            });
        });
    });
}

// Delete Employee
function deleteEmployee() {
    rl.question("Enter Employee ID to delete: ", id => {
        id = id.trim();

        const index = employees.findIndex(emp => emp.id == id);

        if (index === -1) {
            console.log("Employee not found!");
            return showMenu();
        }

        employees.splice(index, 1);
        saveData();

        console.log("Employee deleted successfully!");
        showMenu();
    });
}

// Start Program
showMenu();

