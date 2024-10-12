
  const EventDeleteApi = async (idEvento, user) => {
    
    try {
        const response = await fetch(`https://babytracker.develotion.com/eventos.php?idEvento=${idEvento}`, {
            
            method: 'DELETE', 
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
  
  export default EventDeleteApi;