function vm(data) {
  this.vmdata = data;
  this.ip = 0;
  this.stack = new Stack();
  this.contractState = {};
}

vm.prototype.runVm = function () {
  this.vmdata.forEach((instr) => {
    instruction = Instructions[instr];

    if (instruction) {
      this.executevminstruction(instruction);
    }
    this.ip++;
  });
};

vm.prototype.getLastTwoElements = function () {
  let a = Number(this.stack.pop());
  let b = Number(this.stack.pop());
  return { a: a, b: b };
};

vm.prototype.executevminstruction = function (instruction) {
  let lastTwoElements;
  switch (instruction) {
    case "PUSH":
      this.sp++;
      this.stack.push(this.vmdata[this.ip - 1].toString());

      break;

    case "ADD":
      lastTwoElements = this.getLastTwoElements();
      c = lastTwoElements.a + lastTwoElements.b;
      this.sp++;
      this.stack.push(c);
      break;

    case "Pushbytes":
      this.stack.stackBytes.push(this.data[this.ip - 1]);
      break;

    case "PackBytes":
      let packedByteString = this.getStringFromBytes();

      this.stack.push(packedByteString);

      this.stack.stackBytes = [];

      this.sp++;
      break;
    case "SUB":
      lastTwoElements = this.getLastTwoElements();
      c = lastTwoElements.a + lastTwoElements.b;
      this.sp++;
      this.stack.push(c);
      break;

    case "StoreState":
      let key = this.stack.stack[this.stack.sp - 1];

      let value = this.stack.stack[this.stack.sp - 1];

      this.contractState[key] = value;

      break;

    case "getState":
      let statekey = this.stack.stack[this.stack.sp - 1];

      statevalue = this.contractState[statekey];

      this.stack.pop();

      this.stack.push(statevalue);

      break;

    case "MUL":
      lastTwoElements = this.getLastTwoElements();
      c = lastTwoElements.b * lastTwoElements.a;
      this.sp++;
      this.stack.push(c);
      break;

    case "DIV":
      lastTwoElements = this.getLastTwoElements();
      c = lastTwoElements.a / lastTwoElements.b;
      this.sp++;
      this.stack.push(c);
      break;
  }
};

vm.prototype.getStringFromBytes = function () {
  let packedByteString = "";

  this.stack.stackBytes.forEach((byte) => {
    packedByteString = packedByteString + byte.toString();
  });
  return packedByteString;
};

function Stack() {
  this.stack = [];
  this.sp = 0;
  this.stackBytes = [];
}

Stack.prototype.push = function (number) {
  this.stack.push(number);
  this.sp++;
};

Stack.prototype.pop = function () {
  let value = this.stack.pop();
  this.sp--;
  return value;
};

const Instructions = {
  "0x0a": "PUSH",
  "0x0b": "ADD",
  "0x0c": "Pushbytes",
  "0x0d": "PackBytes",
  "0x0e": "SUB",
  "0x0f": "StoreState",
  "0x0g": "getState",
  "0x0h": "MUL",
  "0x0i": "DIV",
};

// Testing pushBytes
//  const newvm=new vm([2,"0x0a",(Buffer.from("a","utf-8")),"0x0c",(Buffer.from("b")),"0x0c","0x0d","0x0f",(Buffer.from("a","utf-8")),"0x0c",Buffer.from("b"),"0x0c","0x0d","0x0g"]);

// Testing arithmetic operations
const newvm = new vm([2, "0x0a", 4, "0x0a", "0x0b"]);
newvm.runVm();
//  console.log(newvm.contractState);
//  console.log(newvm.stack.stack);

// How can we push bytes
