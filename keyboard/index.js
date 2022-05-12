let keyboard=[['§','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','Del'],
['CapsLock','a','s','d','f','g','h','j','k','l',';',"'",'Enter'],
['Shift','`','z','x','c','v','b','n','m',',','.','/','▲','Shift'],
['fn','Control','option','cmd','probel','cmd','option','◄','▼','►']];

let keyboard_upper=[['§','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
['Tab','Q','W','E','R','T','Y','U','I','O','P','[',']','\\','Del'],
['CapsLock','A','S','D','F','G','H','J','K','L',';',"'",'Enter'],
['Shift','`','Z','X','C','V','B','N','M',',','.','/','▲','Shift'],
['fn','Control','option','cmd','probel','cmd','option','◄','▼','►']];

let keyboard_shift=[['±','!','@','#','$','%','^','&','*','(',')','_','+','Backspace'],
['Tab','Q','W','E','R','T','Y','U','I','O','P','{','}','|','Del'],
['CapsLock','A','S','D','F','G','H','J','K','L',':','"','Enter'],
['Shift','`','Z','X','C','V','B','N','M','<','>','?','▲','Shift'],
['fn','Control','option','cmd','probel','cmd','option','◄','▼','►']];

let body=document.querySelector('body');
let wrapper=document.createElement('div');
let textarea=document.createElement('textarea');
textarea.placeholder='Клавиатура на mac:)';
body.appendChild(textarea);
wrapper.classList.add('wrapper');
body.appendChild(wrapper);
let upperCase=false;


//развешивание стилей
initialize(keyboard);
function initialize(func_keyboard){

    for (let i=0;i<func_keyboard.length;i++){
        for (let j=0;j<func_keyboard[i].length;j++){
            //Todo придумать что делать с cmd и option и стрелками
            const key=document.createElement('div');
            key.id=func_keyboard[i][j];
            key.classList.add('key');
            switch(key.id){
                case 'Backspace':
                    key.classList.add('backspace');
                    break;
                case 'Tab':
                    key.classList.add('tab');
                    break;
                case 'CapsLock':
                    key.classList.add('capslock');
                    break;
                case 'Enter':
                    key.classList.add('enter');
                    break;
                case 'Shift':
                    key.classList.add('shift');
                    break;
                case 'probel':
                    key.classList.add('probel');
                    break;
                case 'Alt':
                    key.classList.add('alt');
                    break;
                case 'Control':
                    key.classList.add('control');
                    break;
                case 'option':
                    key.classList.add('option');
                    break;
                
                default: 
                    break;
            }
            key.innerHTML=func_keyboard[i][j];
            wrapper.appendChild(key);
        }
    }
}

//анимация при нажатии с реальной клавиатуры
click_realkeyboard();
function click_realkeyboard(){
    let real_keyboard=document.querySelectorAll('.key');
    document.addEventListener('keydown', function(event) {
        real_keyboard.forEach(element => {

            if ((element.id===event.key)||((element.id=='option')&&(event.key=='Alt'))||((element.id=='cmd')&&(event.key=='Meta'))||((element.id=='probel')&&(event.key==' '))){
                
                //Todo установить курсор в текстареа
                //Todo научиться отличать правый и левый option и cmd и shift
                if(element.id=='CapsLock'){ //Todo разобраться почему капслок отключается только со второго клика
                    upperCase=!upperCase;
                    click_capslock();
                }
                else{
                element.classList.add('press');
                setTimeout(() => element.classList.remove('press'), 1000);}
                if (element.id=='Shift'){
                    refresh(keyboard_shift);//Todo придумать что-то с шифтом
                }
            }
        });
            
    });
}

//обработка капслока
function click_capslock(){
    if (upperCase){
        refresh(keyboard_upper);      
        let capslock=document.getElementById('CapsLock');
        capslock.classList.add('press');             
    }
    else {
        refresh(keyboard);
    }
}

//обработка клика на экранной клавиатуре
click_btnkeyboard();
function click_btnkeyboard(){
    
    let real_keyboard=document.querySelectorAll('.key');
    real_keyboard.forEach(element => {
        element.addEventListener('click',function(event){
            if(element.id=='CapsLock'){ 
                upperCase=!upperCase;
                click_capslock();
            }
            else{
                element.classList.add('press');
                setTimeout(() => element.classList.remove('press'), 1000);}
                //Todo при вводе с разных клавиатур все ломается
            switch(event.target.id){
                case 'Backspace':
                    textarea.innerHTML='alena';//Todo обрезать последний символ
                    break;
                case 'Tab':
                    textarea.innerHTML+='    ';
                    break;
                case 'Enter':
                        textarea.innerHTML+='перенос';//Todo заменить на нормальный перенос
                        break;
                case 'probel':
                        textarea.innerHTML+=' ';
                        break;
                case 'option':
                        break;
                case 'Shift':
                        break;
                case 'CapsLock':
                        break;
                case 'cmd':
                        break;
                case 'Control':
                        break;
                case 'fn':
                        break;
                default: textarea.innerHTML+=event.target.id;
            }
        })
    });
}

//Обновление клавиатуры
function refresh(func_keyboard){
    body.removeChild(wrapper);
    wrapper=document.createElement('div');

    wrapper.classList.add('wrapper');
    body.appendChild(wrapper);
    initialize(func_keyboard);
    click_realkeyboard();
    click_btnkeyboard();
}