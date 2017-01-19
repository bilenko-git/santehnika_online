'use strict';

/*Task 1*/
(function() {
    console.time('Task_1');

    Array.prototype.objUnique = function() {
        var array = this,
            objBuffer = {},
            uniqueValues = {};

        for(var indexArr = 0; indexArr < array.length; indexArr++) {
            var el = array[indexArr];

            if(objBuffer[el]) {
                continue;
            }
            
            if(!uniqueValues[el] && !objBuffer[el]) {
                uniqueValues[el] = el;
            } else {
                objBuffer[el] = el;
                delete uniqueValues[el];
            }
        }

        return uniqueValues;
    };

    console.log([2,3,2,4,3].objUnique());

    console.timeEnd('Task_1');
})();

/*Task 2*/
(function() {
    function ToggleSimpleCollapse() {}

    ToggleSimpleCollapse.prototype.init = function() {
        $('.collapse-control', this.simpleCollapse).click(function() {
            $('.collapse-content', this.simpleCollapse).slideToggle("slow");
        });
    };

    function SimpleCollapse(perentClass) {
        this.simpleCollapse = perentClass;
    }

    SimpleCollapse.prototype.init = function() {
        $('.collapse-control', this.simpleCollapse).click(function() {
            var content = $('.collapse-content', this.simpleCollapse);
            content.css({'display': (content.css('display') === 'block' ? 'none' : 'block')});
        });
    };

    SimpleCollapse.prototype.__proto__ = Object.create(ToggleSimpleCollapse.prototype);
    SimpleCollapse.prototype.constructor = SimpleCollapse;

    var obSimpleCollapse = new SimpleCollapse(".simple-collapse");
    obSimpleCollapse.init();
})();

/*Task 3*/
(function() {
    var theItem = null;
    var replaceItem = function () {
        var priorItem = theItem;
        var writeToLog = function () {
            if (priorItem) {
                console.log("hi");
            }
        };

        theItem = {
            longStr: new Array(1000000).join('*'),
            someMethod: function () {
                console.log(someMessage);
            }
        };

        priorItem = null;
    };
    setInterval(replaceItem, 1000);
})();

/*
    Причина 

    Метод "replaceItem" вызывается каждую секунду, 
    после чего вызывается "theItem" с методом "longStr", который добавляет
    по 1мб в "priorItem" и методом "someMethod", который хранит ссылку на 
    внешнюю область видимости. Так же у нас есть еще одно замыкание "writeToLog", 
    которое содержит переменную "priorItem" и, так же хранит ссылку на 
    внешнюю область видимости. И, так как область видимости у них одна мы 
    имеем список связанных замыканий "priorItem = theItem". 


    Решения 

    0. После завершения метода обнулить переменную priorItem = null;
    1. Не присваивать var priorItem = theItem;
    2. Удалить someMethod
    3. Не использовать в методе "writeToLog" if (priorItem)

    Примечание

    Скриншоты тестирования в родительской папке "test"
    (decision.png, without_priorItem.png, with_priorItem.png)
*/
