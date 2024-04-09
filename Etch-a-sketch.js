let playground=document.querySelector(".playground");
let reset=document.querySelector(".reset");
let dropdown=document.querySelector(".dropdown");
let count;
let playgroundSize=600;
let leftMouseDown=false;
let rightMouseDown=false;
let boColor;
let markerColor = "#000000";
let gridVisible=false;
let grid=document.querySelector(".grid");
let colorpick=document.querySelector("#colorPicker");
colorpick.addEventListener("input",(event)=>{
    const selectedColor=event.target.value;
    markerColor=selectedColor;
})
grid.addEventListener("click",()=>{
    if(gridVisible)
    {
        gridVisible=false;
        hideGrid();
    }
    else
    {
        gridVisible=true;
        showGrid();
    }
});
dropdown.addEventListener("click",()=>{
    resetGrid();
    let gridsize=dropdown.value;
    createGrid(gridsize);
})
reset.addEventListener("click",()=>{
    resetGrid();
});
function draworErase(event)
{
    if(leftMouseDown)
    {
        let element=event.target;
        element.style.backgroundColor=markerColor;
        event.target.style.borderColor=markerColor;
    }
    if(rightMouseDown)
    {
    event.target.style.backgroundColor='white';
    event.target.style.borderColor="white";
    }

}
function createGrid(count)
{
    let innerDivSize =(playgroundSize / count)-1.6;   //1.6 is manually found as the correct reduction rate for all counts such that it fits the playground perfectly.
    for(let i=0;i<count;i++)
    {
        let outerdiv=document.createElement("div");
        outerdiv.classList.add("outerdiv");
        for(let j=0;j<count;j++)
        {
            let innerdiv=document.createElement("div");
            innerdiv.classList.add("innerdiv");
            innerdiv.style.width=innerDivSize+"px";
            innerdiv.style.height=innerDivSize+"px";
            //innerdiv.style.borderColor=boColor;
            outerdiv.appendChild(innerdiv)
        }
        playground.appendChild(outerdiv);
    }
    let draw=document.querySelectorAll(".innerdiv");
    draw.forEach(divdraw=>{
        divdraw.addEventListener("mousedown",(event)=>
        {
            if(event.button===0) {
            leftMouseDown=true; }
            else if(event.button===2) {
            rightMouseDown=true;}
            draworErase(event);

        });
        divdraw.addEventListener("mouseup",()=>{
            leftMouseDown=false;
            rightMouseDown=false;
            divdraw.removeEventListener("mousemove", draworErase);
        });
        divdraw.addEventListener("mouseover", draworErase);
        divdraw.addEventListener("dragstart", (e) => e.preventDefault());
        divdraw.addEventListener("contextmenu",(event)=>{
            event.preventDefault();
        });
});
}
function resetGrid()
{
    playground.innerHTML="";
}
function showGrid()
{
    let innerDivs = document.querySelectorAll(".innerdiv");
    innerDivs.forEach(div => {
        div.style.borderColor = "#1c1919bb";
    });
}
function hideGrid() {
    let innerDivs = document.querySelectorAll(".innerdiv");
    innerDivs.forEach(div => {
        div.style.borderColor = div.style.backgroundColor;
    });
}
let gridsize=dropdown.value;
    createGrid(gridsize);
