let bool1 = true; //2 переменные (флага)
let bool2 = true;

let abonent = angular.module('Abonent', []);//в хтмл есть элемент сверху с подписью 'Car' - эту часть и будет рисовать ангуляр

/*** контроллер car , который работает с 'AutoController' и получает анонимную функцию       **/
abonent.controller('AbonentController', function($scope, $http, $window) {
    $('#validator_filled').hide();//скрывает элемент с id="validator_filled"
    $('#validator_correct').hide();//скрывает элемент с id="validator_correct"
    $('#collapseOne').show();


    function read() {
        let arrayData = [];

        firebase.database().ref().orderByValue().on('value', snapshot => {

            const keyArr = Object.keys(snapshot.val());
            let obj = snapshot.val()
            let strJSON = JSON.stringify(obj)


            for (keyData of keyArr) {
                keyData += "";

                let result;

                let value = JSON.parse(strJSON, (key, value) => {

                    if (key == keyData) {
                        value.id = key
                        // console.log(value)
                        return result = value;
                    }
                    return value
                });

                arrayData.unshift(result);
                console.log(result);
            }
            return null;
        })

        $scope.abonent = arrayData;

    }

    read()


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
        read()
    }


    $scope.reWriteUpd = function (id, lastname, firstname, street, building, flat, phone, tarif) {
        //флаги для показа одной кнопки и прятанья 2-ой (35строка схожа)
        if (bool2) {
            $('#collapseOne').show();
            $('#id_').show();
            $scope.addHide = true;
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
        read();
    }


    $scope.deleteAbonent = function(id){
        firebase.database().ref().child(id).remove();
        read();
    }


})

