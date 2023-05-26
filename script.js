const display=document.querySelector("[data-passwordDisplay]");
const inputSlider=document.querySelector("[data-length-slider]");
const LengthDisplay=document.querySelector("[data-length]");
const DataCopying=document.querySelector("[data-copying-message]");
const StrengthIndicator=document.querySelector("[strength-indicator]");
const copybtn=document.querySelector("[data-copy]");
const UpperCaseCheck=document.querySelector("#uppercase");
const LowerCaseCheck=document.querySelector("#lowercase");
const NumberCheck=document.querySelector("#numbers");
const SymbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[strength-indicator]");
const GenerateBtn=document.querySelector(".generate-button");
const AllCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbol="`)(&%^$#@!+_-"
const strengthname=document.querySelector("[strengthindi]");

let password="";
let checkcount=0;
let  passwordlength=10;
handleslider();
function handleslider()
{
  inputSlider.value=passwordlength;
  LengthDisplay.innerText=passwordlength;
}
function SetIndicator(color)
{
  indicator.style.backgroundColor=color;
}

function getRandomInteger(min,max)
{
    return Math.floor(Math.random()*(max-min))+min;
}

function GenerateRandomNumber()
    {
        return getRandomInteger(0,9);
    }

function GenerateRandomLowerCase()
  {
         return String.fromCharCode(getRandomInteger(97,123));
    }

function GenerateRandomUpperCase()
    {
      return String.fromCharCode(getRandomInteger(65,91));
    }
function symbols()
{
  const i =getRandomInteger(0,symbol.length);
  return symbol.charAt(i);
}

function calculatestrength()
{
  let x=0;
  if(UpperCaseCheck.checked)x++;
  if(LowerCaseCheck.checked)x++;
  if(NumberCheck.checked)x++;
  if(SymbolsCheck.checked)x++;
  if(x==4){SetIndicator("#84cc16");
  strengthname.innerText="Strong";
  strengthname.style.color="##000000";
  // strengthname.style.fontsize="20px";
  strengthname.style.fontSize = "20px"
  }
  else if(x==3){SetIndicator("#a7f3d0");
  strengthname.innerText="Medium";
  strengthname.style.color="##000000";
  // strengthname.style.fontsize="20px";
  strengthname.style.fontSize = "20px"
    }
  else{SetIndicator("#ef4444");  
  strengthname.innerText="Weak";
  strengthname.style.color="##000000";
  // strengthname.style.fontsize="20px";
  strengthname.style.fontSize = "20px"
  }
  }
inputSlider.addEventListener('input',function()
{
  passwordlength=inputSlider.value;
  LengthDisplay.innerText=passwordlength;
  handleslider();
});

AllCheckBox.forEach((checkbox)=>{
  checkbox.addEventListener('change',handlecheckbox);
});

function handlecheckbox(){
  checkcount=0;
  AllCheckBox.forEach((checkbox)=>{
    if(checkbox.checked)checkcount++;
  });
    if(passwordlength<checkcount)
    {
      passwordlength=checkcount;
      handleslider();
    }
};

GenerateBtn.addEventListener('click',()=>{
  if(checkcount<=0)return;

  if(passwordlength<checkcount)
  {
    passwordlength=checkcount;
    handleslider();
  }

  password="";
  
  let funarr=[];
  
  if(UpperCaseCheck.checked)
    funarr.push(GenerateRandomUpperCase);

  if(LowerCaseCheck.checked)
    funarr.push(GenerateRandomLowerCase);

  if(SymbolsCheck.checked)
    funarr.push(symbols);
    
  if(NumberCheck.checked)
    funarr.push(GenerateRandomNumber);

  
  for(let i=0;i<funarr.length;i++)
  {
    password+=funarr[i]();
  }

  for(let i =0;i<passwordlength-funarr.length;i++)
  {
    let randomindex=getRandomInteger(0,funarr.length);
    password+=funarr[randomindex]();
   
  }

  display.value=password;
  
  calculatestrength();
});






