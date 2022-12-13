function returnRandomPassword(array)
{
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}

var password ="";
var singlePasswordCopy="";
var displayPassword = "";
var passwordCopy ="";
const main = document.querySelector("#main");
const title = document.querySelector("#title");
const hangmanImg = document.querySelector("#hangmanImg");
var wrongprogress = 1;
var goodprogress = 0;
var randomPasswords = [];
randomPasswords.push("Python","Lorem ipsum","Graphics Card","Frog","Diamond","Stylesheet","Table with no legs","Word dictionary","Jazz music","Boxing ring","Object Oriented Programming","Fashion designer","Resignation","Cristiano Ronaldo","Lionel Messi","Referee","Special agent");

function updateDisplayPassword(key)
{
    for(let i = 0; i < password.length;i++)
    {
        if(password[i] == key)
        {
            for(let j = 0; j < displayPassword.length;j++)
            {
                if(passwordCopy[j]  == key)
                {
                    displayPassword[j] = passwordCopy[j];
                }
            }
            title.innerHTML = displayPassword.toString().replaceAll(',','');
        }
    }
}
function passwordButtons()
{
    
    title.innerHTML="";
    for(let i = 0; i < 2;i++)
    {
    let btn = document.createElement("div");
    btn.setAttribute("id","btn");
    title.appendChild(btn);
    }
    const startButtons = title.querySelectorAll("#btn");
    startButtons[0].innerText = "Random";
    startButtons[1].innerText = "Your own";
    
    startButtons[0].addEventListener("click", function()
    {
        password = returnRandomPassword(randomPasswords).toLowerCase();
        displayPassword = password.replaceAll(/\w/g,'_').split('');
        password = password.toLowerCase();
        passwordCopy = password.replaceAll(' ','_');
        password = password.replaceAll(' ','');
        singlePasswordCopy = Array.from(new Set(password.split('')));
        startGame(password);
    });
    startButtons[1].addEventListener("click", function()
    {
        password = prompt("Type in your password");
        displayPassword = password.replaceAll(/\w/g,'_').split('');
        password = password.toLowerCase();
        passwordCopy = password.replaceAll(' ','_');
        password = password.replaceAll(' ','');
        const word = /[a-zA-Z]/g;
        var isWord = password.match(word);
        if(isWord.length==password.length)
        {
            password = password.toLowerCase();
            singlePasswordCopy = Array.from(new Set(password.split('')));
            startGame(password);
        }
        else
        {
        passwordButtons();
        }
    });
}

function renderKeyboard()
{
    const keyArray = "abcdefghijklmnopqrstuvwxyz".split('');
    const keysContainer = document.querySelector("#keys");
    keysContainer.innerHTML = "";
    for(let i=0;i<keyArray.length;i++)
    {
        keysContainer.innerHTML +='<div class="letter">'+keyArray[i]+"</div>";
    }
    const buttons = document.querySelectorAll('.letter');
    buttons.forEach(element => 
        {
            element.addEventListener('click', event => 
            {
                if(!element.classList.contains("clicked"))
                {
                    checkLetter(element,singlePasswordCopy);
                }
            });
        });
    
}
function checkLetter(element,password)
{
    for(i=0;i<password.length;i++)
    {
        if(password[i] == element.innerText)
        {
            element.classList.add("exist");
            element.classList.add("clicked");
            updateDisplayPassword(password[i]);
            goodprogress++;
            if(goodprogress==singlePasswordCopy.length)
            {
                endGame("won");
            }
            return;
        }
    }
    element.classList.add("notexist");
    element.classList.add("clicked");
    
    wrongProgress();
    }

function wrongProgress()
{
    const image = document.querySelector("#hangman");
    image.setAttribute("src",'./img/s'+wrongprogress+'.jpg');
    wrongprogress++;
    if(wrongprogress>9)
    {
        endGame("lost");
    }
}

function renderImage()
{
    hangmanImg.innerHTML = "";
    const firstImage = document.createElement('img');
    firstImage.setAttribute("id","hangman");
    firstImage.setAttribute("src","./img/s0.jpg");
    hangmanImg.appendChild(firstImage); 
}

function endGame(state)
{
    if(state == "lost")
    {
        hangmanImg.innerHTML ="";
        title.innerHTML = passwordCopy.toString().replaceAll(',','').replaceAll('_',' ');
        let btn = document.createElement("div");
        btn.setAttribute("id","btn");
        title.appendChild(btn);
        btn = document.querySelector("#btn");
        btn.innerHTML = "You lost, want one more?";
        btn.addEventListener("click",function () {
            passwordButtons();});
        const keys = document.querySelector("#keys");
        keys.innerHTML = "";
    }
    else if(state=="won")
    {
        hangmanImg.innerHTML ="";
        title.innerHTML = "";
        title.innerHTML = passwordCopy.toString().replaceAll(',','').replaceAll('_',' ');
        let btn = document.createElement("div");
        btn.setAttribute("id","btn");
        title.appendChild(btn);
        btn = document.querySelector("#btn");
        btn.innerHTML = "You won, want one more?";
        btn.addEventListener("click",function () {
            passwordButtons();});
        const keys = document.querySelector("#keys");
        keys.innerHTML = "";
    }
}


passwordButtons();

function startGame(apassword)
{
    title.innerHTML = displayPassword.toString().replaceAll(',','');
    wrongprogress = 1;
    goodprogress = 0;
    password = apassword;
    renderImage();
    renderKeyboard();
}
