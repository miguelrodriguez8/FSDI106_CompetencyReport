// global vars (array)
var catalog=[];
var categories=[];

function fetchData(){
    //get data from the server
    //this is an used object literal
    /*catalog=[
        {code:'001',
         title:'Iphone 11',
         price:1000.00,
         category:'Phone',
         img:'https://www.kindpng.com/picc/m/266-2662141_apple-iphone-11-pro-max-iphone-11-pro.png'
        },
        {code:'002',
        title:'Samsung TV',
        price:2000.00,
        category:'Electronics',
        img:'https://toshiba-tv.com/files/perspective-2_180A25029294.png'    
       },
       {code:'003',
       title:'Speakers',
       price:200.00,
       category:'Sound',
       img:'https://www.pngitem.com/pimgs/m/109-1090236_transparent-studio-speaker-png-studio-monitor-png-download.png'
       }

    ]*/

    $.ajax({
        url:'http://restclass.azurewebsites.net/api/points',
        type:'GET',
        success:function(allitems){
            console.log(allitems);
//travel the array
//check my user
//push my items into the array
            for(var i=0;i<allitems.length;i++){
                var item=allitems[i];
                if(item.user==="Miguel"){
                    catalog.push(item);
                    //push the categories
                    categories.push(item.category);
                    //if item.category
                }
                
            }
            displayCatalog();
           displayCategories();
        },
        error:function(details){
            console.log('Error getting data', details);
        }
    });
//other instructions

}

function displayCategories(){
    //travel the categories array
    for(var i=0;i<categories.length;i++){
        var cats=categories[i];
        var syntax=`<li> ${cats} </li>`; //COMPETENCY RPRT: add search function on each category once you click on it
        $('#categories').append(syntax);
    }
    //get each category from the array
    //create syntax for li
    //append the syntax to the #categories
}

function displayCatalog(){
    //travel the array of items with a for loop
    //get each item
    //display the item on the HTML
    for(var i=0;i<catalog.length;i++){
        var item=catalog[i]; //this will give us the item from the catalog
        

        // display on the HTML

       drawItem(item);
   }
}
function drawItem(item){
    var syntax=`
        <div id="${item.code}">
           <img src="${item.image}"> 
           <h4> ${item.title} </h4>
           <h6 class="itemPrice"> $ ${item.price}</h6>
           <p> ${item.category} </p>
           <button class="btn btn-primary"> Add to Cart </button>
        </div>
        `;

        $('#catalog').append(syntax);
}

function search(text){
    console.log(text);
    //clear the previous results
    $('#catalog').html("");
    //travel the array
    for(var i=0; i<catalog.length;i++){
        var item = catalog[i];
        if(item.title.toLowerCase().includes(text.toLowerCase()) || item.category.toLowerCase().includes(text.toLowerCase()) || item.code.toLowerCase().includes(text.toLowerCase())){ 
            drawItem(item);
        

        }
    }
    //get each item
    //if the item title contains the text
    //display the item
    
    
}

function init(){
    console.log('Catalog page');
    //hook events
    $('#btn-search').click(function(){
        var text = $('#txt-search').val();
        search(text);
    });
    fetchData();
    displayCatalog();
    $('#categories').on('click', 'li', function(){search(this.id);
    });
}

window.onload=init;