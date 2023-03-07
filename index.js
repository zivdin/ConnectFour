const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

const path = require('path');
const { response } = require('express');
app.use(express.static(path.join(__dirname, "img")));
app.set("view engine", "ejs");

const router = express.Router();
router.get('/',function(req,res){  
    res.render("index", {});
  });
 
var board=[[0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0]]; 
var currplayers=0;
var lastMove={player:0,row:-1,col:-1};
let isWin=false;
let isInitialized=0;
router.get('/GetInitGame/',function(req,res){
  if(isInitialized==0){
    isInitialized++;
    currplayers=0;
    lastMove={player:0,row:-1,col:-1};
    board=[[0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]];
    
    
    
  }
  res.send({msg:"Initalized"});
  
})
router.get('/GetPlayer/',function(req,res){  
    if(currplayers==0){
      
        res.send({player:1});
        currplayers++;
    }
    else if(currplayers==1){
        res.send({player:2});
        currplayers=2;
        isInitialized=0;
        
    }
    else{
        res.send({player:-1});
    }
});

router.get('/GetMove/:p/:c/',function(req,res){
    
    let player=req.params.p;
    let col=req.params.c;
    let row=EnterMove(player,col);
    let response={
        r:row,
        error:""
    }
    if(lastMove==-1){
        response.error="Column is full!";
    }
    else{
        lastMove.player=player;
        lastMove.row=row;
        lastMove.col=col;
        response.row=row;
        board[row][col]=player;
        
    }
    
    res.send(response);

 
})
function EnterMove(player,col){
    for(let i =5;i>=0;i--){
        if(board[i][col]==0){
            board[i][col]=player;
            return i;
        }
    }
    return -1;
}
router.get('/GetLast',function(req,res){
  let response={
    player:lastMove.player,
    currplayers:currplayers,
    col:lastMove.col,
    row:lastMove.row,
    msg:null
  };
  if(CheckWin(lastMove)&&lastMove.player!=0){
        console.log(lastMove.player,"wins");
        response.msg=`player ${lastMove.player} wins`;
        
        console.log(response.msg)
       
        
    } 
    
    
      res.send(response);
    
  
});

function CheckWin(lastMove){
    let cnt=0;
    //check rows
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (cnt == 4) return true;
        if (board[row][col] == lastMove.player) {
          cnt++;
        } else {
          cnt = 0;
        }
      }
      if(cnt==4) return true;

      cnt = 0; // reset counter for each row
    }
    
    cnt = 0;
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {
        if (cnt == 4) return true;
        if (board[row][col] == lastMove.player) {
          cnt++;
        } else {
          cnt = 0;
        }
      }
      if(cnt==4) return true;
      cnt = 0; // reset counter for each column
    }
    
    cnt=0;
    for(let row=0;row<3;row++){
      for(let col=0;col<4;col++ ){
        for(let i=0;i<4;i++){
          if(cnt==4) return true;
          if(board[row+i][col+i]==lastMove.player){
            cnt++;
          }
          else{
            cnt=0;
          }
        } 
        if(cnt==4) return true;

      }
    }
    for(let row=5;row>2;row--){
        for(let col=0;col<4;col++ ){
          for(let i=0;i<4;i++){
            if(cnt==4) return true;
            if(board[row-i][col+i]==lastMove.player){
              cnt++;
            }
            else{
              cnt=0;
            }
          }
          if(cnt==4) return true;
  
        }
      }
    return false;   
  }



  //add the router
app.use('/', router);


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});
