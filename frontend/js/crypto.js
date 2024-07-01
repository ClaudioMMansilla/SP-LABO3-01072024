import { CryptoBase } from "./cryptobase.js";

class Crypto extends CryptoBase{
    constructor(id, nombre, fechaCreacion, simbolo, precioActual, consenso, cantidadCirculacion, algoritmo, sitioWeb) {
        super(id, nombre, fechaCreacion, simbolo, precioActual);
        this.consenso = consenso;
        this.cantidadCirculacion = cantidadCirculacion;
        this.algoritmo = algoritmo;
        this.sitioWeb = sitioWeb;
    }

    verify(nombre, simbolo, precioActual, cantidadCirculacion, sitioWeb) {

        if(super.verify(nombre, simbolo, precioActual) &&
        this.checkCantidad(cantidadCirculacion) && 
        this.checkSitioweb(sitioWeb) 
        ){
            return true;
        } else {return false; }
    }

    checkCantidad(cantidadCirculacion) {
        if(cantidadCirculacion != null && parseInt(cantidadCirculacion) >0){
            return true;
        } else { 
            alert("El campo 'cantidad' es inválido, verifique datos (debe ser mayor a cero)");
            return false;
        }
    }

    checkSitioweb(sitioWeb) {
        if(sitioWeb != null && sitioWeb.length >0 && sitioWeb.length <31){
            return true;
        } else { 
            alert("El campo 'Sitio Web' es inválido, verifique datos (máx 30 carácteres)");
            return false;
        }
    }


}

export { Crypto };