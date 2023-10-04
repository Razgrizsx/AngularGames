// @ts-nocheck
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottles',
  templateUrl: './bottles.component.html',
  styleUrls: ['./bottles.component.css']
})
export class BottlesComponent implements OnInit{
    constructor(private elementRef:ElementRef) {};

ngOnInit(): void {
    this.game = document.getElementById("game");
    this.level = document.getElementById("level");
}

    game : any
    level : any
    color=["red","blue","yellow","green","purple","lightgreen","lightblue","orange","brown","pink"]
    water : any[] =[]
    w : any[] = []
    currentLevel : any
    clicked : any[] = []
    transferring=false
    t=false
    size=1
    sizechange=0.05
    won=false
    moves=0;
    
    testTubePosition : any = {
        0: [[-110,130], [-20, 130], [70, 130], [-65,320], [15, 320]],
        1: [[-110,130], [-20, 130], [70, 130],[-110,320], [-20, 320], [70, 320]],
        2: [[-140,130],[-60,130],[20,130],[100,130],[-110,320], [-20, 320], [70, 320]],
        3: [[-140,130],[-60,130],[20,130],[100,130],[-140,320],[-60,320],[20,320],[100,320]],
        7: [[-140,100],[-60,100],[20,100],[100,100],[-140,275],[-60,275],[20,275],[100,275],[-140,450],[-60,450],[20,450],[100,450]],
    }
    
    onload = () => {
        this.game = document.getElementById("game");
        this.level = document.getElementById("level");
    }
    
    OpenLevel(x : any) {
        this.moves = 0;
        this.currentLevel=x;
        this.won=false;
        this.level.style.display = "block";
        this.level.innerHTML = "";
        this.water=[];
        let a = [],c=0;
        for (let i = 0; i < x+3; i++) {
            for (let j = 0; j < 4; j++) {
                a.push(this.color[i]);
            }
        }
        a = this.shuffle(a);
        for (let i = 0; i < x+3; i++) {
            this.water[i]=[];
            for (let j = 0; j < 4; j++) {
                this.water[i].push(a[c]);
                c++;
            }
        }
        this.water.push(["transparent","transparent","transparent","transparent"],["transparent","transparent","transparent","transparent"]);
        this.w = this.water.map((a)=>[...a]);
        //console.log(water[0]);
        this.ApplyInfo();
    }
    
    ApplyInfo(a : any = this.water) {
        if (!this.won) {
            let d=0,heading=["EASY","MEDIUM","HARD","VERY HARD","","","","IMPOSSIBLE"][this.currentLevel];
            this.level.innerHTML = `<div id = 'lvl-heading'>${heading}</div>`;
            for (let i of this.testTubePosition[this.currentLevel]) {
                this.level.innerHTML += `<div class = "test-tube" style="top:${i[1]}px;left:calc(50vw + ${i[0]}px);transform:rotate(0deg);" onclick="Clicked(${d});">
                    <div class="colors" style = "background-color:${a[d][0]};top:100px;">Hola</div>
                    <div class="colors" style = "background-color:${a[d][1]};top:70px;"></div>
                    <div class="colors" style = "background-color:${a[d][2]};top:40px;"></div>
                    <div class="colors" style = "background-color:${a[d][3]};top:10px;"></div>
                </div>`;
                d++;
            }
            this.level.innerHTML+=`<div id = "restart" class = "game-buttons" (click) = "Restart()">RESTART</div><div id = "home" class = "game-buttons" (click)="ShowMenu()">HOME</div><div id = "moves">Moves: ${this.moves}</div>`;
        }
    }
    
    Clicked(x : any) {
        //console.log(x);
        if (!this.transferring) {
            if (this.clicked.length == 0) {
                this.clicked.push(x);
                document.getElementsByClassName("test-tube")[x].style.transition = "0.2s linear";
                document.getElementsByClassName("test-tube")[x].style.transform = "scale(1.08)";
            }
            else {
                this.clicked.push(x);
                let el = document.getElementsByClassName("test-tube")[clicked[0]];
                el.style.transform = "scale(1) rotate(0deg)";
                if (this.clicked[0]!=this.clicked[1]) {
                    el.style.transition = "1s linear";
                    this.moves++;
                    document.getElementById("moves").innerHTML = "Moves: "+this.moves;
                    this.Transfer(...clicked);
                }
                this.clicked = [];
            }
        }
    }
    
    TransferAnim(a,b) {
        let el = document.getElementsByClassName("test-tube")[a];
        this.transferring = true;
        el.style.zIndex = "100";
        el.style.top = `calc(${this.testTubePosition[this.currentLevel][b][1]}px - 90px)`;
        el.style.left = `calc(50vw + ${this.testTubePosition[this.currentLevel][b][0]}px - 70px)`;
        el.style.transform = "rotate(75deg)";
        setTimeout(function() {
            el.style.transform = "rotate(90deg)";
        },1000)
        setTimeout(function() {
            el.style.left = `calc(50vw + ${this.testTubePosition[this.currentLevel][a][0]}px)`;
            el.style.top = `calc(${this.testTubePosition[this.currentLevel][a][1]}px)`;
            el.style.transform = "rotate(0deg)";
        },2000);
        setTimeout(function() {
            el.style.zIndex = "0";
            this.transferring=false;
        },3000)
    }
    
    Transfer(a,b) {
        /* 
        a represents the index of the glass from which water is to ne taken
        b represents the index of the glass to which water is to be transferred
        constraints:
        b should have white
        last element of a = last non-white element in b
        */
        if (!this.water[b].includes("transparent") || this.water[a] == ["transparent","transparent","transparent","transparent"]) {
            this.moves-=1;
            document.getElementById("moves").innerHTML = "Moves: "+this.moves;
            return;
        }
        let p,q,r=false,s=false,count=0,c=0;
        for (let i = 0; i < 4; i++) {
            if (((this.water[a][i]!="transparent" && this.water[a][i+1]=="transparent") || i === 3) && !r) {
                r=true;
                p=[this.water[a][i],i];
                if (this.water[a].map(function(x) {
                    if (x=="transparent" || x==p[0]) {return 1;} else {return 0;}
                }).reduce((x,y)=>x+y) === 4) {
                    p.push(i+1)
                }
                else {
                    for (let j = 1; j < 4; j++) {
                        if (i-j>=0 && this.water[a][i-j]!=p[0]) {
                            p.push(j);
                            break;
                        }
                    }
                }
            }
            if (((this.water[b][i]!="transparent" && this.water[b][i+1]=="transparent") || this.water[b][0]=="transparent") && !s) {
                s=true;
                q=[this.water[b][i],i,this.water[b].map((x)=>x= (x=="transparent") ? 1 : 0).reduce((x,y)=>x+y)];
            }
        }
        //console.log(p);
        if (q[0]!="transparent" && p[0]!=q[0]) {
            this.moves-=1;
            document.getElementById("moves").innerHTML = "Moves: "+this.moves;
            return;
        }
        for (let i = 3; i >= 0; i--) {
            if ((this.water[a][i]==p[0] || this.water[a][i]=="transparent") && count<q[2]) {
                if (this.water[a][i]==p[0]) {
                    count++;
                }
                this.water[a][i]="transparent";
            }
            else {
                break;
            }
        }
        //console.log(count);
        //console.log(q);
        c=count;
        setTimeout(function() {this.WaterDec(p,a,c);},1010);
        setTimeout(function() {this.WaterInc(p,q,b,c);},1010);
        for (let i = 0; i < 4; i++) {
            if (this.water[b][i]=="transparent" && count>0) {
                count--;
                this.water[b][i]=p[0];
            }
        }
        setTimeout(function() {this.ApplyInfo();},3020);
        setTimeout(function() {this.TransferAnim(a,b);},10);
        setTimeout(this.Won,3000);
    }
    
    WaterDec(p,a,count) {
        p[1] = 3-p[1];
        //console.log(count*30);
        document.getElementsByClassName("test-tube")[a].innerHTML += `<div id = "white-bg" style = "top:calc(10px + ${p[1]*30}px - 1px);"></div>`;
        setTimeout(function() {document.getElementById("white-bg").style.height = count*30+1 + "px";},50);
        setTimeout(function() {
            document.getElementsByClassName("test-tube")[a].innerHTML = `
                <div class="colors" style = "background-color:${water[a][0]};top:100px;"></div>
                <div class="colors" style = "background-color:${water[a][1]};top:70px;"></div>
                <div class="colors" style = "background-color:${water[a][2]};top:40px;"></div>
                <div class="colors" style = "background-color:${water[a][3]};top:10px;"></div>`;
        },1050);
    }
    
    WaterInc(p,q,b,count) {
        q[1] = 4-q[1];
        q[1]-= (q[0]!="transparent" ? 1: 0);
        document.getElementsByClassName("test-tube")[b].innerHTML += `<div id = "colorful-bg" style = "background-color:${p[0]};top:calc(10px + ${q[1]*30}px);"></div>`;
        setTimeout(function() {
            document.getElementById("colorful-bg").style.height = count*30+1 + "px";
            document.getElementById("colorful-bg").style.top = `calc(10px + ${q[1]*30}px - ${count*30}px)`;
        },50);
    }
    
    Restart() {
        this.moves = 0;
        this.water = w.map((a)=>[...a]);
        this.won=false;
        this.ApplyInfo(w);
    }
    
    ShowMenu() {
        document.getElementById("level").style.display = "none";
    }
    
    Won() {
        for (let i of this.water) {
            if (i[0]!=i[1]||i[1]!=i[2]||i[2]!=i[3]) {
                return;
            }
        }
        this.won=true;
        //console.log("hello");
        this.level.innerHTML = `<div id="won">YOU WON</div><div id = "restart" class = "game-buttons" onclick = "Restart();">RESTART</div><div id = "home" class = "game-buttons" onclick = "ShowMenu();">HOME</div>`;
    }
    
    shuffle(x : any)  {
        let a=[],len=x.length;
        for (let i = 0; i < len; i++) {
            let n = Math.floor(Math.random()*x.length);
            a.push(x[n]);
            x.splice(n,1);
        }
        return a;
    }
    
    ShowRules() {
        document.getElementById("rules-page").style.display = "block";
        setTimeout(function() {
            document.getElementById("rules-page").style.opacity = "1";
        },50);
    }
    
    HideRules() {
        setTimeout(function() {
            document.getElementById("rules-page").style.display = "none";
        },500);
        document.getElementById("rules-page").style.opacity = "0";
    }
    
    
}