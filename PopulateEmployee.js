function PopulateEmployee() {
    var EmployeeId = document.getElementById("empId").value;
    var EmployeeName = document.getElementById("empName").value;
    var roleName = document.getElementById("roleName");
    var roleIndex = roleName.options[roleName.selectedIndex].value;
    var DOJ = document.getElementById("doj").value;
    var allowan = document.getElementById("allowance").value;

    var EmployeeJSON = {
        EmpId: EmployeeId,
        EmpName: EmployeeName,
        Role: roleIndex,
        DateOfJoining: DOJ,
        Basic: GetBasicSalary(),
        Allowances: allowan,
        BonusPercent: GetBonusPercent(),
        GrossAnnualSalary: GetGrossAnnualSalary()
    }

    localStorage.setItem(EmployeeJSON.EmpId, JSON.stringify(EmployeeJSON));
}

function DisplayAddedEmployee() {
    var id = document.getElementById("empId").value;
    var obj = localStorage.getItem(id);
    console.log(obj);
    var EmployeeObj = JSON.parse(obj);

    var element = document.getElementById("display");
    var Display = "<table border=1><tr><th>Id</th><th>Name</th><th>Role</th><th>DOJ</th><th>Basic</th></tr>";
    Display += "<tr><td>" + EmployeeObj.EmpId + "</td><td>" +
        EmployeeObj.EmpName + "</td><td>" +
        EmployeeObj.Role + "</td><td>" +
        EmployeeObj.DateOfJoining + "</td><td>" +
        EmployeeObj.Basic + "</td></tr>";
    Display += "</table>";
    element.innerHTML = Display;
}

function GetBasicSalary() {
    var roleName = document.getElementById("roleName");
    var roleIndex = roleName.options[roleName.selectedIndex].value;
    var result = 0;

    switch (roleIndex) {
        case 'JuniorSoftwareDeveloper':
            result = 20000;
            break;
        case 'SeniorSoftwareDeveloper':
            result = 30000;
            break;
        case 'JuniorQualityAnalyst':
            result = 20000;
            break;
        case 'SeniorQualityAnalyst':
            result = 30000;
            break;
        case 'BusinessAnalyst':
            result = 35000;
            break;
        case 'TeamLead':
            result = 50000;
            break;
        case 'Manager':
            result = 100000;
            break;
        default:
            document.write("Invalid Role name");
            break;
    }
    return result;
}

function GetBonusPercent() {
    var roleName = document.getElementById("roleName");
    var roleIndex = roleName.options[roleName.selectedIndex].value;
    var bonusPer = 0;

    switch (roleIndex) {
        case 'JuniorSoftwareDeveloper':
            bonusPer = 5;
            break;
        case 'SeniorSoftwareDeveloper':
            bonusPer = 10;
            break;
        case 'JuniorQualityAnalyst':
            bonusPer = 5;
            break;
        case 'SeniorQualityAnalyst':
            bonusPer = 10;
            break;
        case 'BusinessAnalyst':
            bonusPer = 7;
            break;
        case 'TeamLead':
            bonusPer = 15;
            break;
        case 'Manager':
            bonusPer = 20;
            break;
        default:
            document.write("Invalid Role name");
            break;
    }
    return bonusPer;
}

function GetGrossAnnualSalary() {
    var allowance = document.getElementById("allowance").value;
    var basic = GetBasicSalary();
    var gross = GetBonusPercent() / 100;
    var grossAnnual = (parseFloat(basic)+parseFloat(allowance) + parseFloat(basic * gross)) * 12;
    return grossAnnual;
}