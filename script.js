var count = 0;

window.addEventListener('resize', function() { 
    positioningAccordion();
});

window.addEventListener('DOMContentLoaded', function() { 
    positioningAccordion();
}); 

//(re)positioning hidden span for accordion
function positioningAccordion() {
    // remove all hidden span
    var elements = document.getElementsByClassName("spacer");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }

    var ulWidth = document.getElementsByClassName("links")[0].offsetWidth;
    var liWidth = document.getElementsByClassName("links")[0].children[0].offsetWidth - 32;
    var perRow = Math.floor(ulWidth / liWidth);
    var maxElem = document.getElementsByClassName("links")[0].children.length;
    var maxRows = parseInt(maxElem / perRow);

    // Limitar el número máximo de filas para evitar que la ventana se desborde hacia arriba
    maxRows = Math.min(maxRows, 4); // Modifica el número 4 según sea necesario

    // create hidden span
    for (row = 1; row <= maxRows; row++) {
        var spacer = document.createElement("SPAN");
        spacer.classList.add("spacer");
        spacer.style.height = 0;

        // positioning new span
        if (row == 1) offset = -1;
        else offset = row - 2; //considering the added (span) element adding an offset

        var afterObj = (perRow * row) + offset;
        var referenceNode = document.getElementsByClassName("links")[0].children[afterObj];
        referenceNode.parentNode.insertBefore(spacer, referenceNode.nextSibling);
    }

    // display selected spacer span
    if (count > 0) { // click an object
        var atRow = parseInt(count / perRow) == count / perRow ? parseInt(count / perRow) - 1 : parseInt(count / perRow);
        document.getElementsByClassName("spacer")[atRow].style.height = document.getElementById("section" + count).offsetHeight + "px";
        document.getElementsByClassName("spacer")[atRow].style.height = "auto;"

        // repositioning section
        document.getElementById("section" + count).style.top = document.getElementsByClassName("spacer")[atRow].offsetTop + "px";
       // document.getElementById("section" + count).style.top = (document.getElementsByClassName("spacer")[atRow].offsetTop + 100) + "px";


        // repositioning close button
        document.getElementsByClassName("close-button")[0].style.top = document.getElementsByClassName("spacer")[atRow].offsetTop + "px";
    }
};


//close button
document.querySelector('.close-button').addEventListener("click", function(){	
    document.querySelector('.panel.active').classList.remove("active");
    document.getElementById("section" + count).classList.remove("expanded"); 
    document.getElementById("section" + count).style.display = "none";
    document.querySelector('.close-button').classList.remove("expanded"); 
    document.querySelector('.close-button').style.display = "none";

    // resize all spacer span to zero
    [].forEach.call(document.getElementsByClassName("spacer"), function(el) { 
        el.style.height = 0;
    }); 
});

//click element
[].forEach.call(document.querySelectorAll("li"), function(el) {
    el.addEventListener("click", function(){	
        [].forEach.call(document.getElementsByClassName("spacer"), function(el) { // resize all spacer span to zero
            el.style.height = 0;
        });

        //calculater spacer position
        var childs = this.parentNode.childNodes;
        var yPos = (this.offsetTop + this.offsetHeight);

        //find correct childnode avoiding spaces between elements
        for(i=0; i < this.childNodes.length ; i++){
            var currNode=this.childNodes[i];
            if(currNode.nodeType==1){
                break;
            }                
        }

        //open / close the element clicked
        if (currNode.classList.contains("active")){//close the already opened selected element
            currNode.classList.remove("active");
        } else {
            if (document.querySelector('.active')) {// close a open accordion
                document.querySelector('.active').classList.remove("active");
            }
            if (document.querySelector('.expanded')) {
                document.querySelector('.expanded').style.display = "none";
                document.querySelector('.expanded').classList.remove("expanded");
            }     
            currNode.classList.add("active"); 
        }

        //find the index of selected object
        count = 0;
        for (i = 0; i < childs.length; i++) {
            if (childs[i].tagName == "LI") 
                count++;
                if (this == childs[i]){
                    break;
                }
        }

        //open / close the relative section
        if(document.getElementById("section" + count).classList.contains("expanded")){//close an already open section
            document.getElementById("section" + count).classList.remove("expanded"); 
            document.getElementById("section" + count).style.display = "none";
            document.querySelector('.close-button').classList.remove("active"); //close the close button
            document.querySelector('.close-button').style.display = "none";
        } else {//open section
            document.getElementById("section" + count).style.height = "auto";
            document.getElementById("section" + count).style.position = "absolute";
            document.getElementById("section" + count).style.left = "0px";
            document.getElementById("section" + count).style.top = yPos + "px"; 
            document.getElementById("section" + count).style.display = "block";
            document.getElementById("section" + count).classList.add("expanded"); 
            //display close button
            document.querySelector('.close-button').classList.add("active"); 
            document.querySelector('.close-button').style.top = yPos + "px"; 
            document.querySelector('.close-button').style.display = "block";
            positioningAccordion();//display accordion
        }
    }); 	
});

// Expanding grid functionality
const panels = document.querySelectorAll('.panel');
const closeButton = document.querySelectorAll('.close-button');
const expandingGrid = document.querySelector('.expanding-grid');

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });
});

closeButton.forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que el evento se propague al panel
        const activePanel = document.querySelector('.panel.active');
        activePanel.classList.remove('active');
        expandingGrid.style.display = 'grid'; // Muestra el grid completo
    });
});

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
}
