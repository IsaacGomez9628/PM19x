const personas = [
  { nombre: "Ana", edad: 22 },
  { nombre: "Luis", edad: 35 },
  { nombre: "Maria", edad: 28 },
];

// 1. Usa .find() para buscar a la persona con nombre "Luis".
function personaLuis(nombrePersona) {
  const encontrarPersona = personas.find(
    (persona) => nombrePersona.toLowerCase() === persona.nombre.toLowerCase()
  );

  if (encontrarPersona) {
    return `Se encontro la persona ${encontrarPersona.nombre}`;
  } else {
    return "No se encontró la persona";
  }
}

console.log(personaLuis("Luis"));

// 2. Usa .forEach() para imprimir el nombre de cada persona con su edad.
const todasLasPersonas = personas.forEach((persona) => {
  const { nombre, edad } = persona;
  console.log(`Nombre de la persona: ${nombre}, Edad: ${edad}`);
});
console.log(todasLasPersonas);

// 3. Usa .reduce() para sumar todas las edades y obtener un total.
const totalEdad = personas.reduce((contador, persona) => {
  return contador + persona.edad;
}, 0);

console.log(`La suma de todas las edades es: ${totalEdad}`);
