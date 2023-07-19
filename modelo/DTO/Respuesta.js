class Respuesta{
    constructor(status,error,resultado,data,mensaje){
        this.status=status;///STATUS
        this.data=data;///DATOS PEDIDIDOS
        this.resultado=resultado; /// true si la accion se hizo , false si no
        this.mensaje=mensaje; /// detalles de la accion
        this.error =error; /// Si hubo error interno true
    }
}

module.exports = Respuesta