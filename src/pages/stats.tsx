import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonSlides , IonSearchbar, IonRouterLink } from '@ionic/react';
import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import {Filme, filmeRecomendadosID, filmesBilheteiraID} from './homePage';
import './styles.css';
import { Chart } from "react-google-charts";

const options = {
    title: "Box Office"
}

const playData = [
    [
        "Movie",
        "IMDB",
        "Rotten Tomatoes",
        "Metacritic",
        "Média"
    ],
    ["Fellowship of the Ring", 89, 93, 94, 92],
    ["The Two Towers", 87, 95, 87, 90],
    ["The Return of the King", 88, 92, 92, 91],
]

const playOptions = {
    title: "LOTR Ratings",
    vAxis: { title: "Rating", ticks: [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100] },
    hAxis: { title: "Movie" },
    seriesType: "bars",
    series: { 3: { type: "line" } },
}

const justOneMovie = ["tt0167260"]
const Stats: React.FC = () => {
    const [valorProcura, setValorProcura] = useState('');
    const[dataR, setDataR] = useState([["Movie", "$"]]);
    const API_URL = 'http://www.omdbapi.com/?apikey=';
    const API_KEY = 'ec279820';
    

    const getFilme = (movies : string[]) =>{
        for(const id of movies){
          axios({
            method:'GET',
            url: API_URL + API_KEY + '&type=movie' + '&i=' + id
          }).then((res)=>{
            console.log(res.data["Ratings"]);
            setDataR(dataR=>[...dataR, [res.data["Title"], Number(res.data["BoxOffice"].substring(1).replace(/[, ]+/g, "").trim())]])
          })
        }
    }

    React.useEffect(()=>{
        getFilme(justOneMovie);
    },[])

    

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonGrid>
                    <IonRow>
                    <IonCol><IonRouterLink href="/home"><IonTitle>Criticos... </IonTitle></IonRouterLink></IonCol>
                    <IonCol></IonCol>
                    <IonCol>
                        <form action={"search/" + valorProcura}>
                        <IonSearchbar 
                            type="search"
                            className="searchBarTB" 
                            value = {valorProcura} 
                            onIonChange={(e)=>setValorProcura(e.detail.value!)} 
                            placeholder = "O que procura?">
                        </IonSearchbar>
                        </form> 
                    </IonCol>
                    </IonRow>
                </IonGrid>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonTitle className="alignTitle">Filmes Recomendados - Box Office</IonTitle>
                <div className="graphsWrapper">
                    {/* {(dataR.length>1)?(<div className="justAlign">
                        <Chart
                        chartType="ColumnChart"
                        data={ dataR }
                        options={ options }
                        width="70vw"
                        height="70vh"
                        legendToggle
                        />
                    </div>):<div className="lds-ring"><div></div><div></div><div></div><div></div></div>} */}
                    {(playData.length>1)?(<div className="justAlign">
                        <Chart
                        chartType="ComboChart"
                        data={ playData }
                        options={ playOptions }
                        width="70vw"
                        height="70vh"
                        legendToggle
                        />
                    </div>):<div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Stats;