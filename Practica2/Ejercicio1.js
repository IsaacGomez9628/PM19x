const persona = {
  nombre: "Isaac",
  edad: 37,
  direccion: {
    ciudad: "Qro",
    pais: "MX",
  },
};

const {
  nombre,
  edad,
  direccion: { ciudad, pais },
} = persona;
console.log(
  `Me llaman ${nombre}, tengo ${edad} años y vivo en ${ciudad}, ${pais}`
);
