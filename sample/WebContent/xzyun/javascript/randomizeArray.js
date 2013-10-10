for(var i=0;i<=10;i++){
	var arr=new Array();
	arr[i]=i;
	document.write(arr[i]);
	document.write(" ");
}

//方法一
var a=[0,1,2,3,4,5,6,7,8,9];
for(var i=0; i<a.length; ++i){
    j = parseInt(a.length*Math.random());
    k = a[i];
    a[i] = a[j];
    a[j] = k;
}
document.write(a);
document.write(" ");
document.write(Math.random());


//方法二
var a=[0,1,2,3,4,5,6,7,8,9];
function changePosition(size,arr) {   
        for(index=size-1; index>=0; index--) {   
            //从0到index处之间随机取一个值，跟index处的元素交换   
            exchange(parseInt(Math.random()*size), index,arr);   
        }   
}   
    
function exchange(p1, p2,arr){   
        temp = arr[p1];   
        arr[p1] = arr[p2];   
        arr[p2] = temp;   
}  
changePosition(a.length,a);
alert(a);

//方法三
var testArray=[1,2,3,4,5,6,7,8,9,10,22,33,55,77,88,99]; 
testArray.sort(function(){return Math.random()>0.5?-1:1;});
alert(testArray); 