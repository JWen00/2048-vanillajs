var input = document.getElementById('input-board-size')
var currValue = 4;
input.value = currValue;
document.getElementById('incrementBtn').addEventListener('onclick', () => { 
    input.value = currValue++;
})
document.getElementById('decrementBtn').addEventListener('onclick', () => { 
    input.value = currValue--;
})