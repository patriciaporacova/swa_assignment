// Modern JavaScript - class
class Event {
    constructor(time, place) {
        this.time = time
        this.place = place
    }
}


class WeatherData extends Event {
    constructor(value, time, place, type, unit) {
        super(time, place)
        this.value = value
        this.unit = unit
        this.type=type
    }

}

WeatherData.prototype.convertToF = function () {

    // return ` ${this.value} celsius is : ${Math.round((this.value * (9 / 5)) + 32)} fahrenheits`
    let fahrenheit =   Math.round((this.value.value * (9 / 5)) + 32)
    this.value.value=fahrenheit
    this.unit='US'
    return fahrenheit
}
WeatherData.prototype.convertToC = function () {
    //return ` ${p} fahrenheits is : ${Math.round((p - 32) * (9 / 5))} celsius`
    let celsius =Math.round((this.value.value - 32) * (9 / 5))
    this.value.value=celsius
    this.unit='INT'
    return celsius
}

WeatherData.prototype.convertToMM = function(){
    let mm = this.value.value * 25.4;
    this.value.value = mm
    options.unit = 'INT'
    return mm
}

WeatherData.prototype.convertToInches = function(){

    let inches = this.value.value / 25.4;
    this.value.value = inches
    this.unit = 'US'
    return inches
}

WeatherData.prototype.convertToMPH = function(){
    let mph = this.value.value  * 2.2369362920544
    this.value.value = mph
    this.unit = 'US'
    return mph

}
WeatherData.prototype.convertToMS = function(){

    let ms = this.value.value * 0.44704
    this.value.value = ms
    this.unit = 'INT'
    return ms
}


class WeatherPrediction {
    constructor(from, to, weatherData){
        this.from = from
        this.to = to
        this.weatherData = weatherData
    }
}
WeatherPrediction.prototype.matches = function () {
    let isMatch = false
    if(this.weatherData.value <= this.to && this.weatherData.value >= this.from) {
        isMatch = true;
    }
    return isMatch
}

class WeatherHistory {
    constructor({ currentPlace, currentType, data}) {
        this.currentPeriod = {}
        this.currentPlace = currentPlace
        this.currentType = currentType
        this.data = data
    }

}

WeatherHistory.prototype.add = function (data) {this.data.push(data)}

WeatherHistory.prototype.setCurrentPlace = function(place)  {this.currentPlace = place}
WeatherHistory.prototype.getCurrenPlace = function(){return this.currentPlace}
WeatherHistory.prototype.clearCurrentPlace = function(){this.currentPlace=''}

WeatherHistory.prototype.setCurrentPeriod = function(start, end) {this.currentPeriod.start = start; this.currentPeriod.end = end}
WeatherHistory.prototype.getCurrentPeriod = function(){return this.currentPeriod}
WeatherHistory.prototype.clearCurrentPeriod = function(){this.currentPeriod=''}

WeatherHistory.prototype.setCurrentType = function(type) {this.currentType=type}
WeatherHistory.prototype.getCurrentType = function(){return this.currentType}
WeatherHistory.prototype.clearCurrentType = function(){this.currentType=''}


WeatherHistory.prototype.convertToUSUnits = function(){
    let internationalUnits = this.data.filter(item => item.unit === 'INT');
    internationalUnits.forEach(element => this.convert(element))
}

WeatherHistory.prototype.convertToINTUnits = function(){
    let internationalUnits = this.data.filter(item => item.unit === 'US');
    internationalUnits.forEach(element => this.convert(element))

}

WeatherHistory.prototype.convert=function(element){
    //element - instance of WeatherData
    switch (element.type) {
        case 'temp':
            element.unit === 'INT' ?  element.convertToF() : element.convertToC()
            break;
        case 'precipitation':
            element.unit === 'INT' ?  element.convertToInches() : element.convertToMM()
            break;
        case 'wind':
            element.unit === 'INT' ?  element.convertToMPH() : element.convertToMS()
            break;
    }
}








e = new WeatherData({value: 12, subtype: 'north west'}, '15:00', 'Horsens', 'temp', 'US')
b = new WeatherData({value: 132, subtype: 'north west'}, '15:00', 'Kolding', 'precipitation', 'INT')
c = new WeatherData({value: 34, subtype: 'north west'}, '15:00', 'Horsens', 'temp', 'INT')
//t = new Temperature(e.value)
h = new WeatherHistory({data: []})
h.setCurrentPlace('Kolding')

h.setCurrentType('temp')
h.setCurrentPeriod('5', '4')



h.add(e)
h.add(b)
h.add(c)


h.convertToUSUnits()
console.log(h)
//console.log(h.data)
