function admin(){
    var login = prompt('Введите логин', );
    if (login == 'admin'){
        var password = prompt('Введите пароль', );
            if (password == 'admin') {
                window.open("index.html");
            }else{
                alert("Не верный пароль")
            }
    }else {
        alert("Не верный логин")
    }
}