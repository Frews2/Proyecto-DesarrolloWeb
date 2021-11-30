import React, { Component } from "react";

export class VistaNoticia extends Component {
    render() {
        const queryString = window.location.search;
        const urlParametros = new URLSearchParams(queryString);
        const idNoticia = urlParametros.get('idNoticia');
        console.log(idNoticia);
        return(
            <div>
                <h1>noticia</h1>
            </div>
        );
    }
}