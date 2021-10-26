let fs = require('fs');
let text = fs.readFileSync('inputh.txt').toString(); 
let alph = new Array();
let tree = new Array();
let i, j;
function Node(letter, freq, used, father, code){
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
}

for (i=0; i < text.length; i++)
    alph[text.charAt(i)] = 0;
for (i=0; i < text.length; i++)
    alph[text.charAt(i)]++; //получаем кол-во букв
for (i in alph){
    let n = new Node(i, alph[i], false, null, ' ');
    tree.push(n);
}
let len = tree.length;
for (i=0; i<len-1; i++) {
    let minLength1 = text.length, minLength2 = text.length;
    let n1, n2;
    for (j=0; j<tree.length; j++) {
        if (tree[j].freq < minLength1 && tree[j].used==false) {
            minLength1 = tree[j].freq;
            n1 = j;
        }
    }
    tree[n1].used = true;
    tree[n1].code = '0';
    tree[n1].father = tree.length;
    for (j=0; j<tree.length; j++) {
        if (tree[j].freq < minLength2 && tree[j].used==false) {
            minLength2 = tree[j].freq;
            n2 = j;
        }
    }
    tree[n2].father = tree.length;
    tree[n2].used = true;
    tree[n2].code = '1'
    let n = new Node(tree[n1].letter + tree[n2].letter, tree[n1].freq + tree[n2].freq, false, null, ' ');
    tree.push(n); 
}
// console.log(tree);
let str = new Array();
for (let i = 0; i < len; i++) {
    let g = i;
    str[tree[g].letter] = '';
    while (tree[g].father != null) {
        str[tree[i].letter] = tree[g].code + str[tree[i].letter];
        g = tree[g].father;

    }
}
let res = new String();
for (i = 0; i < len; i++) 
    res += str[text[i]];

console.log(res);
