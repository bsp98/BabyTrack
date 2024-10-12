const RegistrarEventApi = async (idCategoria,user,detalle,fecha) => {
    try {
      const response = await fetch(
        "https://babytracker.develotion.com/eventos.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'apikey': user.apikey,
            'iduser':user.id     
          },
          body: JSON.stringify({
            idCategoria: idCategoria,
            idUsuario: user.id,
            detalle: detalle,
            fecha: fecha
          }),
        }
      );
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

  export default RegistrarEventApi;