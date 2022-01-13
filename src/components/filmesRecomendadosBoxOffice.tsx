import { IonContent, IonHeader, IonPage, IonBackButton, IonToolbar, IonButtons, IonTitle } from '@ionic/react';
import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import {Filme, filmeRecomendadosID, filmesBilheteiraID} from '../pages/homePage';
import '../pages/styles.css';
import { Chart } from "react-google-charts";

const options = {
    title: "Box Office"
}

function VerBoxOfficeRecomendados(){
    const[data, setData] = useState([["Movie", "$"]]);
    const API_URL = 'http://www.omdbapi.com/?apikey=';
    const API_KEY = 'ec279820';

    const getFilme = (movies : string[]) =>{
        for(const id of movies){
          axios({
            method:'GET',
            url: API_URL + API_KEY + '&type=movie' + '&i=' + id
          }).then((res)=>{
            setData(data=>[...data, [res.data["Title"], Number(res.data["BoxOffice"].substring(1).replace(/[, ]+/g, "").trim())]])
          })
        }
    }

    React.useEffect(()=>{
        getFilme(filmeRecomendadosID);
    },[])

    return(
        <IonPage id="view-Recomendados-BoxOffice-page">
            <IonHeader translucent>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton text="Voltar" defaultHref="/home"></IonBackButton>
                </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            <IonTitle className="alignTitle">Filmes Recomendados - Box Office</IonTitle>
                <div className="graphsWrapper">
                {(data.length>1)?(<div className="justAlign">
                        <Chart
                        chartType="ColumnChart"
                        data={ data}
                        options={ options }
                        width="70vw"
                        height="70vh"
                        legendToggle
                        />
                    </div>):<div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                </div>
      </IonContent>
    </IonPage>
    );
}

export default VerBoxOfficeRecomendados;