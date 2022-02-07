const formulario  = document.getElementById("formulario")
const empezar = document.getElementById("empezar")
const r = document.querySelector('p')

formulario.addEventListener('submit', e =>{
    e.preventDefault()
    const n = binary_gap(parseInt(e.target[0].value))
    //console.log(binary_gap(parseInt(e.target[0].value)))
    r.innerHTML = "resultado: "+ n
})

function binary_gap(n) {
  let cont1 = 0;
  let cont2 = 0;
  let bits = n.toString(2);//obtenemos una cadena binaria del dato.

  //console.log(bits);//mostramos la cadena binaria. 

  for (let i in  bits){
    let bit = bits[i];// recorremos la cadena. 
    if (bit == 0){
      cont1++; //si el bit es 0 aumentamos el cont1
    }else{
      //si el bit no es 0 y si cont1 > cont2, se guarda el valor de cont1 en cont2 y se reinicia cont1 para volver a contar
      if(cont1 > cont2){
        cont2 = cont1;
      }
      cont1=0;
    }
  }

  return cont2;//se imprime cont2 que contiene el mayor valor
  }

