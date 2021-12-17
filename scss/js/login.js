var loginButton = document.getElementById('btn-login');

var info = [
    {
        username: "admin",
        password: "123456"
    }
]

function checkAccount() {
    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    var formValidate = document.querySelector(".form-validate");

    if (username == "") {
        formValidate.innerHTML = "Please enter your username!";
        formValidate.style.color = "red";
    } else if (password == "") {
        formValidate.innerHTML = "Please enter your password!";
        formValidate.style.color = "red";
    } else {
        for (i = 0; i < info.length; i++) {
            if (username == info[i].username && password == info[i].password) {
                window.location.href = "index.html";
                document.querySelector("#username").submit;
                localStorage.setItem('userList', JSON.stringify(info));
                var list = localStorage.getItem('userList');

            } else {
                formValidate.innerHTML = "Sorry, username or password is incorrect !";
                formValidate.style.color = "red";
            }
        }
    }
}

function createUser(name) {
    return {
        id: Date.now().toString(),
        name: name,
        complete: false
    }
}
