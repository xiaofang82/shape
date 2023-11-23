'user strict'

function onEvent(event, selector, callback){
    return selector.addEventListener(event,callback);
}

function select(selector,parent = document){
    return parent.querySelector(selector);
}

function selectById(selector,parent = document){
    return parent.getElementById(selector);
}

function selectAll(selector,parent = document){
    return [...parent.querySelectorAll(selector)];
}

function create(element,parent=document){
    return parent.createElement(element);
}

class Shape {
    _shapeArray
    constructor(){
        this._shapeArray = [];
    }

    set color(color){
        this._color = color;
    }

    get color(){
        return this._color;
    }

    set shape(shape){
        this._shape = shape;
    }

    get shape(){
        return this._shape;
    }

    createShape(){
        let shapeObj = {
            shape: this._shape,
            color: this._color,
        };
        this._shapeArray.push(shapeObj);
        
        return this._shapeArray.length;
    }

    getInfo(num){
        return this._shapeArray[num - 1];
    }
}

const background = select('.background');
const btnCreate = selectById('btn-create');
const selColor = selectById('color');
const selShape = selectById('shape');
const shape = new Shape();
let number = 0;

initBoard(background);
onEvent('click', btnCreate, function(){
    if (selColor.value != '' && selShape.value !='' && number < 24){
        shape.color = selColor.value;
        shape.shape = selShape.value;
        number = shape.createShape();
        let shapeInfo = shape.getInfo(number);
       // console.log(number);
        //console.log(shapeInfo);
        addShape(number, shapeInfo);
    }
})


function initBoard(parent, row = 4, colum = 6) {
    const eleRow = new Array();
    const eleColum = Array.from(new Array(row),() => new Array(colum));
    for(let i = 0; i < row; i++){
        eleRow[i] = create('div');
        eleRow[i].classList.add('row');
        parent.append(eleRow[i]);
        for(let j = 0; j < colum; j++){
            eleColum[i][j] = create('div');
            eleColum[i][j].classList.add('column');
            eleColum[i][j].id = `block${(row - i - 1) * colum + j + 1}`;
            //console.log(eleColum[i][j].id);
            eleRow[i].append(eleColum[i][j]);      
            //eleColum[i][j].innerHTML =    (row - i - 1) * colum + j + 1;
        }
    }
}

function addShape(id,obj){
    const newShape = create('div');
    const parent = selectById('block' + id);
    newShape.classList.add('block');
    
    if(obj.shape == 'Circle') {
        newShape.classList.add('circle');
    }
    newShape.style.background = obj.color;
    parent.append(newShape);
}

