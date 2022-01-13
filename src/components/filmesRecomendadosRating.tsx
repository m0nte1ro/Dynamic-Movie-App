import { IonContent, IonHeader, IonPage, IonBackButton, IonToolbar, IonButtons, IonTitle } from '@ionic/react';
import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import {filmeRecomendadosID} from '../pages/homePage';
import '../pages/styles.css';
import { Chart } from "react-google-charts";

const options = {
    title: "Ratings",
    vAxis: { title: "Rating", ticks: [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100] },
    hAxis: { title: "Movie" },
    seriesType: "bars",
    series: { 3: { type: "line" } },
}

const justOneMovie = ["tt0167260"]

function VerRatingsRecomendados(){
    const[data, setData] = useState([["Movie", "IMDB", "Rotten Tomatoes", "Metacritic", "Média"]]);
    const API_URL = 'http://www.omdbapi.com/?apikey=';
    const API_KEY = 'ec279820';

    const getFilme = (movies : string[]) =>{
        for(const id of movies){
          axios({
            method:'GET',
            url: API_URL + API_KEY + '&type=movie' + '&i=' + id
          }).then((res)=>{
            setData(data=>[...data, 
                [
                    res.data["Title"], 
                    Number(res.data["Ratings"][0]["Value"].replace("/10","")*10), 
                    Number(res.data["Ratings"][1]["Value"].replace("%","")), 
                    Number(res.data["Ratings"][2]["Value"].replace("/100","")), 
                    (((Number(res.data["Ratings"][0]["Value"].replace("/10","")*10)) + (Number(res.data["Ratings"][1]["Value"].replace("%",""))) + (Number(res.data["Ratings"][2]["Value"].replace("/100",""))))/3)
                ], 
            ])
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
                        chartType="ComboChart"
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

export default VerRatingsRecomendados;