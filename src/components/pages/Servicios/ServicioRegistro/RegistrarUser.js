const RergistrarUserApi = async (username, password,idDepartament,idCity) => {
    try {
      const response = await fetch(
        "https://babytracker.develotion.com/usuarios.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario: username,
            password: password,
            idDepartamento: idDepartament,
            idCiudad: idCity
          }),
        }
      );
  //Si es correcto devuelve     "codigo": 200, "apiKey": "6f6367644190ac921d370536827c8db2", "id": 5224
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        return Promise.reject({
          
          message:"Ha ocurrido un error",
          status: response.status
        });
        
      }
    } catch (error) {
      return Promise.reject({
          message:"Ha ocurrido un error",
      
      });
    }
  };

  export default RergistrarUserApi;