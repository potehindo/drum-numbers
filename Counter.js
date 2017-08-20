function Counter (data) {
    this._element = document.querySelector(data.el);
    this._value = data.value;
    this._counterItems = [];
    this._defaultValue = data.defaultValue || '&nbsp;';
    this._counterItemClassName = data.counterItemClassName || 'counter-item';
    this._counterItemListClassName = data.counterItemListClassName || 'counter-item__wrapper';

    Object.defineProperty(this, 'value', {
        get: function () { 
            return this._value; 
        },
        set: function (value) { 
            this._value = value;
            this._setValue();
        },
        enumerable: true,
        configurable: true
    });

    this._render();
}


Counter.prototype._setValue = function () {
    var valueArray = this._value.toString().split(''); 

    for (var i = 0; i < valueArray.length; i++) {
        if (this._counterItems[i]) {
            this._counterItems[i].value = valueArray[i];
        } else {
            // создаем объект если его нет
            var counterItem = this._addItem(valueArray[i]);
            counterItem.value = valueArray[i];
        }
    }

    // если входное числ меньше чем существующее количество объектов, то просто скрываем объекты
    if (valueArray.length < this._counterItems.length) {
        for (var i = valueArray.length; i < this._counterItems.length; i++) {
            this._counterItems[i].setDefaultItem();
        }
    }
}

Counter.prototype._addItem = function (value) {
    var counterItem = new CounterItem({
        value: value,
        defaultValue: this._defaultValue,
        counterItemClassName: this._counterItemClassName,
        counterItemListClassName: this._counterItemListClassName
    });

    this._counterItems.push(counterItem);
    this._element.appendChild(counterItem.render());
    
    return counterItem;
}

Counter.prototype._render = function () {
    var self = this;
    this._value.toString().split('').map( function (valueItem) {
        self._addItem(valueItem);
        return false;
    });
}
