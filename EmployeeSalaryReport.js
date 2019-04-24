function GetEmployeeSalaryReport() {
    var id = document.getElementById("empId").value;
    var Employee = localStorage.getItem(id);
    var EmpObj = JSON.parse(Employee);

    var doc = document.getElementById("report");
    var table = "<table border=1><tr><th>Id</th><th>Name</th><th>Role</th><th>DOJ</th><th>Basic</th><th>Allowances</th><th>BonusPercent</th><th>GrossAnnualSalary</th><th>MonthlyInvestment</th><th>TaxableIncome</th><th>TaxPayable</th><th>AnnualNetSalary</th></tr>";
    table += "<tr><td>" + EmpObj.EmpId + "</td><td>" +
        EmpObj.EmpName + "</td><td>" +
        EmpObj.Role + "</td><td>" +
        EmpObj.DateOfJoining + "</td><td>" +
        EmpObj.Basic + "</td><td>" +
        EmpObj.Allowances + "</td><td>" +
        EmpObj.BonusPercent + "</td><td>" +
        EmpObj.GrossAnnualSalary + "</td><td>" +
    document.getElementById("investment").value + "</td><td>" +
        GetTaxableIncome() + "</td><td>" +
        GetTaxPayable() + "</td><td>" +
        GetAnnualNetSalary() + "</td></tr>";
    table += "</table > ";
    doc.innerHTML = table;
}
function GetTaxableIncome() {
    var id = document.getElementById("empId").value;
    var invest = document.getElementById("investment").value;

    var Employee = localStorage.getItem(id);
    var EmpObj = JSON.parse(Employee);
    var doj = EmpObj.DateOfJoining;

    var TaxableIncome = 0;

    if ((doj < '2017-03-31') || ((doj >= '2017-03-31') && (doj < '2018-03-31')) || ((doj >= '2018-03-31') && (doj < '2019-03-31'))) {
        if ((parseFloat(invest) * 12) < 150000) {
            TaxableIncome = parseFloat(EmpObj.GrossAnnualSalary) - (parseFloat(invest) * 12);
        }
        else if ((parseFloat(invest) * 12) >= 150000) {
            TaxableIncome = parseFloat(EmpObj.GrossAnnualSalary) - 150000;
        }
    }
    else if (doj >= '2019-03-31') {
        if ((parseFloat(invest) * 12) < 200000) {
            TaxableIncome = parseFloat(EmpObj.GrossAnnualSalary) - (parseFloat(invest) * 12);
        }
        else if ((parseFloat(invest) * 12) >= 150000) {
            TaxableIncome = parseFloat(EmpObj.GrossAnnualSalary) - 200000;
        }

    }
    return TaxableIncome;
}
function GetAnnualNetSalary() {
    var taxableIncome = GetTaxableIncome();
    var taxPayable = GetTaxPayable();
    var annualSalary = parseFloat(taxableIncome) - parseFloat(taxPayable);
    return annualSalary;
}
function GetTaxPayable() {
    var id = document.getElementById("empId").value;

    var Employee = localStorage.getItem(id);
    var EmpObj = JSON.parse(Employee);
    var DateOfJoin = EmpObj.DateOfJoining;
    var doj = document.getElementById("assessment").value;

    var income = GetTaxableIncome();
    var TaxPayable = 0;

    if (doj < '2017-03-31') {
        if ((income > 250000) && (income <= 500000)) {
            TaxPayable = (income - 250000) * 0.1;
        }
        else if ((income > 500000) && (income <= 1000000)) {
            TaxPayable = ((income - 500000) * 0.2) + 25000;
        }
        else if (income > 1000000) {
            TaxPayable = ((income - 1000000) * 0.3) + 125000;
        }
    }
    else if ((doj >= '2017-03-31')&&(doj < '2019-03-31')) {
        if ((income > 250000) && (income <= 500000)) {
            TaxPayable = (income - 250000) * 0.05;
        }
        else if ((income > 500000) && (income <= 1000000)) {
            TaxPayable = ((income - 500000) * 0.2) + 12500;
        }
        else if (income > 1000000) {
            TaxPayable = ((income - 1000000) * 0.3) + 112500;
        }
    }
    else if (doj >= '2019-03-31') {
        if ((DateOfJoin >= '2019-04-01') && (DateOfJoin < '2020-03-31')) {
            if ((income > 500000) && (income <= 1000000)) {
                TaxPayable = ((income - 500000) * 0.2);
            }
            else if (income > 1000000) {
                TaxPayable = ((income - 1000000) * 0.3) + 100000;
            }
        }
        else {
            if ((income > 250000) && (income <= 500000)) {
                TaxPayable = (income - 250000) * 0.05;
            }
            else if ((income > 500000) && (income <= 1000000)) {
                TaxPayable = ((income - 500000) * 0.2) + 12500;
            }
            else if (income > 1000000) {
                TaxPayable = ((income - 1000000) * 0.3) + 112500;
            }
        }

    }
    return TaxPayable;
}