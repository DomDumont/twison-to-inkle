#! /usr/bin/env node
console.log('hello world 2');

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync(myArgs[0], 'utf8'));
console.log(obj)

var output = ""
obj.passages.forEach(function(p) {
    var n = CleanPart(p)
    output += "=== ";
    output += n.name;
    output += " ===\n";
    output += "- ";
    output += CleanText(n.text);
    output += "\n";
  });

  fs.writeFileSync(myArgs[1], output);

  function CleanPart(part){
    var tempPart = part;
      tempPart.name = part.name.replaceAll(".","_");
      tempPart.text = part.text.replaceAll(".","_");
    return tempPart;
  }
  function CleanText(text){
    var temp1 =  text.replace(/ *\([^)]*\) */g, "");
    var temp2 = temp1.replaceAll("[[","*");
    return temp2.replaceAll("]]","")
  }