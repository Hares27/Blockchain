

 function vm(data){
     this.vmdata=data;
     this.ip=0;
     this.stack=new Stack() ;
     this.contractState= {};
     
 }

 





 vm.prototype.runVm=function(){

   this.data.forEach((instr)=>
    {
        
        instruction=Instructions[instr];
        
        if(instruction){
            this.executevminstruction(instruction);
        }
     this.ip++; 
    })
}


 vm.prototype.executevminstruction=function(instruction){
     let a;
     let b;
     let c;
     
      switch(instruction){
         
          case "PUSH":
             this.sp++;
              this.stack.push(this.data[this.ip-1].toString());
              
              break;
              
          case "ADD":
              a=Number(this.popStack());
              b=Number(this.popStack());
              c= a+b;
              console.log(c);
              this.sp++;
              this.stack.push(c);
              break;

        case "Pushbytes":
            this.stack.stackBytes.push(this.data[this.ip-1])
            break;

        case "PackBytes":
           
             let packedByteString=this.getStringFromBytes();

             this.stack.push(packedByteString);
             
             this.stack.stackBytes=[];

             this.sp++;
             break;
        case "SUB":

        a=Number(this.popStack());
        b=Number(this.popStack());
         c=a-b;
        this.sp++;
        this.stack.push(c);
        break;

        case "StoreState":
            
            
            let key=this.stack.stack[this.stack.sp-1];
           
            let value=this.stack.stack[this.stack.sp-1];

            this.contractState[key]=value;
            
            break;

        case "getState":

            let statekey=this.stack.stack[this.stack.sp-1];
            
             statevalue=this.contractState[statekey];
           
             this.popStack();

             this.stack.push(statevalue);

             break;

        case "MUL":
         a=Number(this.popStack());
         b=Number(this.popStack());
         c=b*a;
        this.sp++;
        this.stack.push(c);
        break;

      case "DIV":
        
        a=Number(this.popStack());
        
        b=Number(this.popStack());
        c=a/b;   
        this.sp++;
        this.stack.push(c);
        break;

             
              

      }
 }

 vm.prototype.popStack=function(){
     let value=this.stack.stack.pop();
     console.log("value",value);
     this.sp--;
     return value;
 }
 vm.prototype.getStringFromBytes=function(){
    let packedByteString="";

            
    this.stack.stackBytes.forEach((byte)=>
    {
        packedByteString= packedByteString+byte.toString();
    })
    return packedByteString;

 }



 function Stack(){
    this.stack=[];
    this.sp=0;
    this.stackBytes=[];
    
}

Stack.prototype.push=function(number){
    this.stack.push(number);
    this.sp++;
    console.log(this.stack);

}

Stack.prototype.pop=function(){

    this.stack.pop();
    this.sp--;
    console.log(this.stack);

}

 



 const Instructions={"0x0a" : "PUSH","0x0b":"ADD","0x0c":"Pushbytes","0x0d":"PackBytes","0x0e":"SUB","0x0f":"StoreState","0x0g":"getState","0x0h":"MUL","0x0i":"DIV"};

 // Testing pushBytes
//  const newvm=new vm([2,"0x0a",(Buffer.from("a","utf-8")),"0x0c",(Buffer.from("b")),"0x0c","0x0d","0x0f",(Buffer.from("a","utf-8")),"0x0c",Buffer.from("b"),"0x0c","0x0d","0x0g"]);
 

 // Testing arithmetic operations
const newvm=new vm([2,"0x0a",4,"0x0a","0x0b"])
 newvm.runVm();
//  console.log(newvm.contractState);
//  console.log(newvm.stack.stack);
 


 // How can we push bytes



 
