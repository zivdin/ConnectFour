
var board=[[0,0,0,2,1,1,2],
           [0,0,0,0,0,0,2],
           [0,0,0,1,0,0,1],
           [0,0,0,0,0,1,0],
           [0,0,0,0,1,1,1],
           [0,0,0,1,0,1,1]];
console.log(board[5][6])
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
  
  console.log(CheckWin({player: 1})); // true
  