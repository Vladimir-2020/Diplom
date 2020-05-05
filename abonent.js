let bool1 = true; //2 переменные (флага)
let bool2 = true;
let arrayData = [];

let abonent = angular.module('Abonent', []);


abonent.controller('AbonentController', function ($scope, $http, $window) {
    $('#validator_filled').hide();//скрывает элемент с id="validator_filled"
    $('#validator_correct').hide();//скрывает элемент с id="validator_correct"
    $('#collapseOne').show();


    firebase.database().ref().orderByValue().on('value', snapshot => {
        // arrayData = [];
        const keyArr = Object.keys(snapshot.val());
        let obj = snapshot.val()
        let strJSON = JSON.stringify(obj)
        for (keyData of keyArr) {
            keyData += "";

            let oneAbonentInfo;

            JSON.parse(strJSON, (key, value) => {

                if (key == keyData) {
                    value.id = key
                    // console.log(value)
                    return oneAbonentInfo = value;
                }
                return value
            });
            console.log("Данные из бд");
            console.log(oneAbonentInfo);

            arrayData.unshift(oneAbonentInfo);
        }

        console.log("Данные из бд закончились");
        read();

        return null;

    })


    function read() { //короче read() вызывается только когда данные изменяются в бд, вроде норм так
        $http.put(`http://localhost`, JSON.stringify({}));
        //пустой запрос в никуда, когда данные из ФБ получены

        console.log(arrayData);
        $scope.abonent = arrayData;
        arrayData = [];
    }


    $scope.addAbonent = function () {

        let data = {
            lastname: $("#lastname_").val(),
            firstname: $("#firstname_").val(),
            street: $("#street_").val(),
            building: $("#building_").val(),
            flat: $("#flat_").val(),
            phone: $("#phone_").val(),
            tarif: $("#tarif_").val(),
        };

        function write(data) {
            firebase.database().ref().push().set(data);
        }

        write(data)
    }

    $scope.reWriteUpd = function (id, lastname, firstname, street, building, flat, phone, tarif) {

        if (bool2) {
            $('#collapseOne').show();
            $('#id_').show();
            $scope.addHide = false;
            $scope.updateHide = false;
            bool2 = false;
            bool1 = true;
        } else {
            $('#collapseOne').hide();
            $('#id_').hide();
            $scope.updateHide = true;
            $scope.addHide = false;
            bool2 = true;
        }
//всталяем в инпуты по id данные, которые получили в функцию и добавляем +"" (что бы 100% были строки, даже если там цифры)
        $("#id_").val(id + "");
        $("#lastname_").val(lastname + "");
        $("#firstname_").val(firstname + "");
        $("#street_").val(street + "");
        $("#building_").val(building + "");
        $("#flat_").val(flat + "");
        $("#phone_").val(phone + "");
        $("#tarif_").val(tarif + "");

        //выводим данные в консоль (что бы дэбажить было у меня)
        console.log(lastname + " _ " + firstname + " _ " + street + " _ " + building + " _ " + flat + " _ " + phone + " _ " + tarif);

    }
    
    $scope.updateAbonent = function () {
        let myKey = $("#id_").val()

        newAbonent = {
            lastname: $("#lastname_").val(),
            firstname: $("#firstname_").val(),
            street: $("#street_").val(),
            building: $("#building_").val(),
            flat: $("#flat_").val(),
            phone: $("#phone_").val(),
            tarif: $("#tarif_").val(),
        };

        firebase.database().ref().child(myKey).set(newAbonent);
    }

    $scope.deleteAbonent = function (id) {
        firebase.database().ref().child(id).remove();
    }
})