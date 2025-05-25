function verificarUsuario(usuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usuario === "admin") {
        resolve("Acceso concedido");
      } else {
        reject("Acceso denegado");
      }
    }, 2000);
  });
}

verificarUsuario("admin")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

verificarUsuario("Ivan")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
