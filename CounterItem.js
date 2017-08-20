function CounterItem (data) {
    this._value = data.value;
    this._defaultValue = data.defaultValue;
    this._counterItemClassName = data.counterItemClassName;
    this._counterItemListClassName = data.counterItemListClassName;
    
    Object.defineProperty(this, 'value', {
        get: function () { 
            return this._value; 
        },
        set: function (value) { 
            this._value = value;
            this._setCounterItem();
        },
        enumerable: true,
        configurable: true
    });
}

CounterItem.prototype._renderItem = function (text) {
    var li = document.createElement('li');
    li.innerHTML = text;
    return li;
}

CounterItem.prototype.render = function () {
    this.counterItem = document.createElement('div');
    this.counterItem.className = this._counterItemClassName;
    this.counterItemList = document.createElement('ul');
    this.counterItemList.className = this._counterItemListClassName;

    this.counterItemList.appendChild(this._renderItem(this._defaultValue));

    for (var i = 0; i < 10; i++) {
        this.counterItemList.appendChild(this._renderItem(i));
    }

    this.counterItem.appendChild(this.counterItemList);
    this._addEvents();
    return this.counterItem;
}

CounterItem.prototype._addEvents = function () {
    document.addEventListener('DOMContentLoaded', this._setCounterItem.bind(this));
}

CounterItem.prototype.setDefaultItem = function () {
    this._value = -1; // делаем дефолтное пустое значение
    this._setCounterItem();
}

CounterItem.prototype._setCounterItem = function () {
    // +1 так как дефолтное значение есть ещё
    var height = window.getComputedStyle(this.counterItem).getPropertyValue('height');
    this.counterItemList.style.bottom = (+this._value + 1) * parseInt(height);
}