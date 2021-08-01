// Create by Xiaochen Wang

var fs = require("fs");

var employess = []; //global array
var departments = []; //global array
var empCount = 0;

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile('./data/employees.json', (err, data) => {
                if (err) throw err;
                employess = JSON.parse(data);
                empCount = employess.length;
            });
            fs.readFile('./data/departments.json', (err, data) => {
                if (err) throw err;
                departments = JSON.parse(data);
            });
        } catch (ex) {
            reject("Unable to read file!");
        }
        resolve("Good!!! It's successfully read JSON file.");
    });
}

// alternative solution
// // for initialize JSON file:
// module.exports.initialize = function() {
//     return new Promise(function(resolve, reject) {
//         fs.readFile('./data/departments.json', function(err, data) {
//             if (err) {
//                 reject("Can Not Open Employees.json File");
//             } else {
//                 employess = JSON.parse(data);
//                 fs.readFile('./data/employees.json', function(err, data) {
//                     if (err) {
//                         reject("Can Not Open Department.json File ");
//                     } else {
//                         departments = JSON.parse(data);
//                     }
//                 });
//             }
//         });
//     });
// }

module.exports.getAllEmployees = () => {
    var arryAllEmployees = [];
    return new Promise((resolve, reject) => {
        for (var i = 0; i < employess.length; i++) {
            arryAllEmployees.push(employess[i]);
        }
        if (arryAllEmployees.length == 0) {
            reject("No Result Returned!!!");
        }
        resolve(arryAllEmployees);
    })
}

module.exports.getEmployeesByStatus = (status) => {
    var arryByStatus = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < employess.length; i++) {
            if (employess[i].status == status) {
                arryByStatus.push(employess[i]);
            }
        }
        if (arryByStatus.length == 0) {
            reject("No Result Returned!!!");
        }
        resolve(arryByStatus);
    });
}

module.exports.getEmployeesByDepartment = (department) => {
    var arryByDepartment = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < employess.length; i++) {
            if (employess[i].department == department) {
                arryByDepartment.push(employess[i]);
            }
        }
        if (arryByDepartment.length == 0) {
            reject("No Result Returned!!!");
        }
        resolve(arryByDepartment);
    });
}

module.exports.getEmployeesByManager = (manager) => {
    var arrayGetEmployeesByMannager = [];

    return new Promise((resolve, reject) => {
        for (let i = 0; i < employess.length; i++) {
            if (employess[i].employeeManagerNum == manager) {
                arrayGetEmployeesByMannager.push(employess[i]);
            }
        }
        if (arrayGetEmployeesByMannager.length == 0) {
            reject("No Result Returned!!!");
        }
        resolve(arrayGetEmployeesByMannager);
    });
}

module.exports.getEmployeeByNum = (num) => {
    return new Promise((resolve, reject) => {
        for (let j = 0; j < employess.length; j++) {
            if (employess[j].employeeNum == num) {
                resolve(employess[j]);
            }
        }
        reject("No Result Returned!!!");
    });
}

module.exports.getManagers = () => {
    var arryGetManagers = [];
    return new Promise((resolve, reject) => {
        if (employess.length == 0) {
            reject("No Result Returned!!!");
        } else {
            for (var q = 0; q < employess.length; q++) {
                if (employess[q].isManager == true) {
                    arryGetManagers.push(employess[q]);
                }
            }
            if (arryGetManagers.length == 0) {
                reject("No Result Returned!!!");
            }
        }
        resolve(arryGetManagers);
    });
}

module.exports.getDepartments = () => {
    var arryGetDepartments = [];
    return new Promise((resolve, reject) => {
        if (employess.length == 0) {
            reject("No Result Returned!!!");
        } else {
            for (var v = 0; v < departments.length; v++) {
                arryGetDepartments.push(departments[v]);
            }
            if (arryGetDepartments.length == 0) {
                reject("No Result Return!!!");
            }
        }
        resolve(arryGetDepartments);
    });
}

module.exports.addEmployee = (employeeData) => {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    employeeData.employeeNum = ++empCount;
    return new Promise((resolve, reject) => {
        employess.push(employeeData);
        if (employess.length == 0) {
            reject("No Result Returned!");
        }
        resolve(employess);
    });
}

module.exports.updateEmployee = (employeeData) => {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < employess.length; i++) {
            if (employess[i].employeeNum == employeeData.employeeNum) {
                employess.splice(employeeData.employeeNum - 1, 1, employeeData);
            }
        }
        if (employess.length == 0) {
            reject("No Result Returned!!!");
        }
        resolve(employess);
    });
}