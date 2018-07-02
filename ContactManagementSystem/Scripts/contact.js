//Load Data in Table when documents is ready  
var formlable = {
    'FirstName': 'First Name*',
    'LastName': 'Last Name*',
    'Email':'Email*',
    'PhoneNumber':'Phone Number*'
};

var emptyform = {
    'FirstName': 'First Name can not be blank',
    'LastName': 'Last Name can not be blank',
    'Email': 'Email can not be blank',
    'PhoneNumber': 'Phone Number can not be blank'
};

var invalidform = {
            'Email': {
                   'pattern': new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i),
                    'msg': 'Invalid Email',
                },
    
            'PhoneNumber': {
                'pattern': new RegExp(/^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})$/),
                'msg': 'Invalid Phone Number'
             }
};

$(document).ready(function () {
    loadAllContacts();
    freshform = $('#contactform').html();
});

//Load Data function  
function loadAllContacts() {
    $.ajax({
        url: "http://localhost:60606/api/GetContacts",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.FirstName + '</td>';
                html += '<td>' + item.LastName + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td>' + item.PhoneNumber + '</td>';
                html += '<td>' + item.Status + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')">Edit</a> | <a href="#" onclick="Delele(' + item.Id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessEmail) {
            alert(errormessEmail.responseText);
        }
    });
}

//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var contactObj = {
        ContactId: $('#ContactId').val(),
        FirstName: $('#FirstName').val(),
        LastName: $('#LastName').val(),
        Email: $('#Email').val(),
        PhoneNumber: $('#PhoneNumber').val(),
        //Status: $('#Status').val()
    };
    $.ajax({
        url: "http://localhost:60606/api/SaveContact/",
        data: JSON.stringify(contactObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (!result) {
                $("#result").text("Contact already exists");
            } else {
                loadAllContacts();
                $('#myModal').modal('hide');
            }
            
      
        },
        error: function (errormessEmail) {
            alert(errormessEmail.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID  
function getbyID(ContactId) {
    $('#FirstName').css('border-color', 'lightgrey');
    $('#LastName').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#PhoneNumber').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "http://localhost:60606/api/GetContactById?contactId=" + ContactId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#ContactId').val(result.Id);
            $('#FirstName').val(result.FirstName);
            $('#LastName').val(result.LastName);
            $('#Email').val(result.Email);
            $('#PhoneNumber').val(result.PhoneNumber);
            $('#Status').val(result.Status);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessEmail) {
            alert(errormessEmail.responseText);
        }
    });
    return false;
}

//function for updating employee's record  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var contactObj = {
        Id: $('#ContactId').val(),
        FirstName: $('#FirstName').val(),
        LastName: $('#LastName').val(),
        Email: $('#Email').val(),
        PhoneNumber: $('#PhoneNumber').val(),
        Status: $('#Status').val(),
    };
    $.ajax({
        url: "http://localhost:60606/api/SaveContact/",
        data: JSON.stringify(contactObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadAllContacts();
            $('#myModal').modal('hide');
            $('#ContactId').val("");
            $('#FirstName').val("");
            $('#LasttName').val("");
            $('#Email').val("");
            $('#PhoneNumber').val("");
            $('#Status').val("");
        },
        error: function (errormessEmail) {
            alert(errormessEmail.responseText);
        }
    });
}

//function for deleting employee's record  
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "http://localhost:60606/api/DeleteContactById?contactId=" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadAllContacts();
            },
            error: function (errormessEmail) {
                alert(errormessEmail.responseText);
            }
        });
    }
}

//Function for clearing the textboxes  
function clearTextBox() {
    //$('#EmployeeID').val("");
    $('#FirstName').val("");
    $('#LastName').val("");
    $('#Email').val("");
    $('#PhoneNumber').val("");
   // $('#Status').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#FirstName').css('border-color', 'lightgrey');
    $('#LastName').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#PhoneNumber').css('border-color', 'lightgrey');
    // $('#Status').css('border-color', 'lightgrey');
    $('#contactform').html(freshform);
    $('#myModal').modal('show'); 
}
//Valdidation using jquery  
function validate() {
    var isValid = true;
  
    $('#contactform *').filter(':input').each(function (index) {
        // ------ null test ----------
        if ($(this).val().trim() == "" && emptyform.hasOwnProperty($(this).attr("id"))) {
            $(this).css('border-color', 'Red');
            if (emptyform.hasOwnProperty($(this).attr("id")))
                $(this).prev().html("<span style='color:#ff0039'>" + emptyform[$(this).attr("id")] + "</span>").show();
            isValid = false;
        } else if ($(this).val().trim() != "" && emptyform.hasOwnProperty($(this).attr("id"))) {
        // ------ Element not null here ----------
            console.log('not null');
            isValid = true;
            $(this).css('border-color', 'lightgrey');
            $(this).prev().text(formlable[$(this).attr("id")]).show

        //
            if (invalidform.hasOwnProperty($(this).attr("id")) && isValid ) {
                if (!invalidform[$(this).attr("id")]['pattern'].test($(this).val())) {
                    $(this).prev().html("<span style='color:#ff0039'>" + invalidform[$(this).attr("id")]['msg'] + "</span>").show();
                    isValid = false;
                } else {
                    $(this).css('border-color', 'lightgrey');
                    isValid = true;
                }
            } 
        }

        console.log(index)
    });
    console.log(isValid);
    return isValid;
}  

