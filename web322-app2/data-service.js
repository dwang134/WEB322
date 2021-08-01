var employee = {};
var departments = [];
var fs = require("fs"); //requires file system allow interaction

module.exports.initialize = function(){
    return new Promise(function(resolve, reject){
        try {
            fs.readFile('./data/employees.json', function(error, data)
            {
                if (error) throw error;
                employess = JSON.parse(data);
            });
            fs.readFile('./data/departments.json', function(error, data)
            {
                if (error) throw error;
                departments = JSON.parse(data);
            });
        } catch (ex) {
            reject("Read File Error!");
        }
        resolve("JSON file successfully read.");
    });
}

module.exports.getAllEmployees = function() {
    var m_allEmployees = [];
    return new Promise(function(resolve, reject) 
    {
        for (var i = 0; i < employess.length; i++) 
        {
            m_allEmployees.push(employess[i]);
        }
        if (m_allEmployees.length == 0) 
        {
            reject("No data");
        }
        resolve(m_allEmployees);
    })
}

module.exports.getEmployeesByStatus = function(status) {
    var m_byStatus = [];
    return new Promise(function(resolve, reject) 
    {
        for (let i = 0; i < employess.length; i++) 
        {
            if (employess[i].status == status) 
            {
                m_byStatus.push(employess[i]);
            }
        }
        if (m_byStatus.length == 0) {
            reject("No Data");
        }
        resolve(m_byStatus);
    });
}

module.exports.getEmployeesByDepartment = function(department) {
    var m_byDepartment = [];
    return new Promise(function(resolve, reject) 
    {
        for (let i = 0; i < employess.length; i++) 
        {
            if (employess[i].department == department) 
            {
                m_byDepartment.push(employess[i]);
            }
        }
        if (m_byDepartment.length == 0) {
            reject("No Data");
        }
        resolve(m_byDepartment);
    });
}

module.exports.getEmployeesByManager = function(manager) 
{
    var m_employeesBymaneger = [];

    return new Promise(function(resolve, reject) 
    {
        for (let i = 0; i < employess.length; i++) 
        {
            if (employess[i].employeeManagerNum == manager) 
            {
                m_employeesBymaneger.push(employess[i]);
            }
        }
        if (m_employeesBymaneger.length == 0) {
            reject("No Data");
        }
        resolve(m_employeesBymaneger);
    });
}

module.exports.getEmployeeByNum = function(num) {
    return new Promise(function(resolve, reject) 
    {
        for (let j = 0; j < employess.length; j++) 
        {
            if (employess[j].employeeNum == num) 
            {
                resolve(employess[j]);
            }
        }
        reject("No Data");
    });
}

module.exports.getManagers = function() {
    var m_manager = [];
    return new Promise(function(resolve, reject) 
    {
        if (employess.length == 0) 
        {
            reject("No Data");
        } else {
            for (var q = 0; q < employess.length; q++) {
                if (employess[q].isManager == true) {
                    m_manager.push(employess[q]);
                }
            }
            if (m_manager.length == 0) {
                reject("No Data");
            }
        }
        resolve(m_manager);
    });
}

module.exports.getDepartments = function() {
    var m_department = [];
    return new Promise(function(resolve, reject) 
    {
        if (employess.length == 0) 
        {
            reject("No Data");
        } else {
            for (var v = 0; v < departments.length; v++) 
            {
                m_department.push(departments[v]);
            }
            if (m_department.length == 0) 
            {
                reject("No Data");
            }
        }
        resolve(m_department);
    });
}