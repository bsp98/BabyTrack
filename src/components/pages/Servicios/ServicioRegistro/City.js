const CityApi = async (idCity) => {
    try {
      const response = await fetch(`https://babytracker.develotion.com/ciudades.php?idDepartamento= ${idCity}`);
  
      if (response.status === 200)
      {
          const data = await response.json();
        return data;
      }
      else 
      {
        return Promise.reject({
          message: "Ha ocurrido un error",
          status: response.status,
        });
      }
    } catch (error) {
      return Promise.reject({
        message: "Ha ocurrido un error",
      });
    }
  };
  
  export  default CityApi;