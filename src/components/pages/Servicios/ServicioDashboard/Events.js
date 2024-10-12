
const EventsApi = async (user) => {

    try {
        const response = await fetch(`https://babytracker.develotion.com/eventos.php?idUsuario=${user.id}`, {
            
            method: 'GET', 
            headers: {          
                'apikey': user.apikey, 
                'iduser': user.id           
            }
        });
        
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
  
  export  default EventsApi;