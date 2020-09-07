/* AJAX
http://restclass.azurewebsites.net/api/points
HTTP verbs
POST: create/send data
GET: get info
PUT: update some existing elements
PATCH: update part off an existing elements
DELETE: remove an existing element

*/

//object constructor for ITEM
var c=1;
class Item{
    constructor(code,title,price,description,category,image) {
        this.code=code;
        this.title=title;
        this.price=price;
        this.description=description;
        this.category=category;
        this.image=image;
        this.user="Miguel";
        this.id=c;
        c++;

    }

}


function register(){
    // GET values from the inputs
    // save them in variables
    // display the values on the console


    var code=$("#code").val();
    var title=$("#title").val();
    var price=$("#price").val();
    var description=$("#description").val();
    var category=$("#category").val();
    var image=$('#image').val();
    if(code!="" && title!="" && price!=""){
    var item=new Item(code,title,price,description,category,image);
    console.log(item);
    console.log(JSON.stringify(item));
    $.ajax({
        url:'http://restclass.azurewebsites.net/api/points',
        type:'POST',
        data:JSON.stringify(item),
        contentType:'application/json',
        success:function(response){
            console.log('Yayyyy',response);
            $("#alert-box").removeClass("hidden");
            setTimeout(function(){
                $("#alert-box").addClass("hidden");
            },3000);
        },
        error:function(errorDetails){
            console.log('Ouch',errorDetails);
        }
    });
    }
    else{
        alert("Add a code, title, and price");
    }
    //create AJAX request
    
    clearForm(); //execution
}

function clearForm(){ //declaration
    $("#code").val("");
    $("#title").val("");
    $("#price").val("");
    $("#description").val("");
    $("#category").val("");
    $("#image").val("");
}

function init(){
    console.log('Admin page');

    
    //hook events
    $(".btn-primary").click(register);

    
       /* if ($("#code").val() === "" || $("#title").val() === "" || $("#price").val() === "" || $("#description").val() === "" || $("#category").val() === ""){
            alert("Please fill out all the blanks");
            return false;
        }else{
            register();
            $("#code").val("");
            $("#title").val("");
            $("#price").val("");
            $("#description").val("");
            $("#category").val("");
            $("#image").val("");
    } */


}
window.onload=init;