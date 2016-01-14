function displayDate()
{
window.addEventListener("resize",function(){
document.getElementById("resize").innerHTML="yo minimized"});
var today=new Date();
var h=today.getHours();
var m=today.getMinutes();
var s=today.getSeconds();
m=checTime(m);
s=checTime(s);
document.getElementById("date").innerHTML=h + ":" + m + ":" + s;;
var t=setTimeout(displayDate,500);
}
function checTime(id)
{
if(id<10)
{id="0"+id;}
return id;
}
function display(xxx)
{
	var x = document.getElementById("expr");
	x.value=x.value.concat(xxx.toString());
	document.getElementById("expr").focus();
}

function display2(xxx)
{
var x = document.getElementById("expr");

switch(xxx)
{
	case "cl":
		x.value=null;
		break;
	case "bk":
		x.value = x.value.substring(0, x.value.length - 1);
		break;
	default:
		x.value=x.value.concat(xxx);
}

	document.getElementById("expr").focus();
}

function checkkey(e) 
{
	var x = document.getElementById("expr");
	var res=x.value.split("");
	var t=res[res.length-1];

	if(t<='9' && t>='0'){
	}
	else if(t=='*' || t=='/' || t=='+' ||t=='-' || t=='(' || t==')' || t=='.' || t=='^'){
	}
	else{
	x.value = x.value.substring(0, x.value.length - 1);
	}
}



function cal()
{
var x=document.getElementById("expr");
var sp=x.value.split("");
var len=x.value.length;
var arr=[];
var tt=0;var j=0;var spi=0;
arr[j]=sp[spi];spi++;
do
{
		if(!isNaN(sp[spi]))
		{
			if(isNaN(sp[spi-1])){
				j++;
				arr[j]=sp[spi];}
			else
			{	arr[j]=arr[j].toString()+sp[spi].toString();}
		}
		else if(sp[spi]=="."){
			arr[j]=arr[j].toString()+sp[spi].toString()+sp[spi+1].toString();
			spi++;
		}
		else{		
			j++;
			arr[j]=sp[spi];
			}
	spi++;
}
while(spi<len);

// infix to postfix
var temp;var operator=[];var final=[];
var aa=arr.length;
for(var i=0;i<aa;i++){
	temp=parseFloat(arr[i]);
	if(!isNaN(arr[i])){
		final.push(arr[i]);
	}
	else{
		if(arr[i]=='('){
			operator.push(arr[i]);
			if(arr[i+1]=='-'){
			i++;
			final.push(parseFloat(arr[i]+arr[i+1]));
			i++;
			}
		}
		else if(arr[i]==')'){	
			var tt=operator.pop();
			while(tt!='(' && tt!=null){
			final.push(tt);
			tt=operator.pop();
			}
		}
		else{
			if(operator.length <1){
						operator.push(arr[i]);
					      }
			else{
				while(prio(arr[i]) < prio(operator[operator.length-1])){
					final.push(operator.pop());
					}
				operator.push(arr[i]);
			    }		
		}
	}
}
while(operator.length>0)
{
final.push(operator.pop());
}

function prio(a)
{
	if(a=='(')
	return 0;
	else if(a=='+' || a=='-')
	return 1;
	else if(a=='*' || a== '/')
	return 2;
	else if(a=='^')
	return 3;
}



//postfix evaluation
var i=0;var ll=final.length-1;var stack=[];
while(i <= ll)
{
	if(!isNaN(final[i]))
	{
		stack.push(parseFloat(final[i]));
	}
	else
	{
	switch(final[i]){
	case '+':

		var ax1=parseFloat(stack.pop());
		var ax2=parseFloat(stack.pop());
		var ax=parseFloat(ax1)+parseFloat(ax2);
		stack.push(parseFloat(ax));
		break;
	case '-':
		var ax1=stack.pop();
		var ax2=stack.pop();
		var ax=ax2-ax1;
		stack.push(ax);
		break;
	case '*':
		var ax1=stack.pop();
		var ax2=stack.pop();
		var ax=ax2*ax1;
		stack.push(ax);
		break;
	case '/':
		var ax1=stack.pop();
		var ax2=stack.pop();
		var ax=ax2/ax1;
		stack.push(ax);
		break;
	case '^':
		var ax1=stack.pop();
		var ax2=stack.pop();
		ax=Math.pow(ax2,ax1);
		stack.push(ax);
		break;
	}}
i++;
}
x.value=stack.pop();

}
