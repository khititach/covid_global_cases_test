/* eslint-disable react-hooks/exhaustive-deps */
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import './style.scss'


function GetNameCountry (data) {
    const countryName = [];
    const country = data.data
    // console.log(country);
    country.forEach(item => {
        // console.log(item.countryInfo.iso3);
        countryName.push(item.countryInfo.iso3)
    });
    return countryName
}

function GetCountryData (data) {
    const mostCasesArr = [];   

    const countryData = data.data
    // console.log(countryData);

         // delete country empty data
    const DataProcess = countryData.filter(country => country.country)
    // console.log(DataProcess);

        // get Date
    const getDate = Object.keys(DataProcess[0].timeline.cases);
    // console.log(getDate);

        // get cases max per day
    getDate.forEach((dayitem , dayindex ) => {
        const casesmax = Math.max(...DataProcess.map(item => item.timeline.cases[dayitem]))
        mostCasesArr.push(casesmax)
    })
    // console.log(mostCasesArr);

    // return data , date ,
    return [DataProcess , getDate , mostCasesArr]
}

function RandomColor (data) {
    const colorArr = []
    for (let i = 0; i < data.length; i++) {
        colorArr.push( '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6))
    }
   return colorArr
}

function Covid19globalcases () {
    const [NameCountry , setNameCountry] = useState([])
    const [Date , setDate] = useState([])
    const [Data , setData] = useState([])
    const [mostCase , setmostCase] = useState([])
    const [color , setcolor] = useState([])

    useEffect(() => {
            // url get country 
        const urlGetCountry = 'https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&allowNull=false'
        axios.get(urlGetCountry)
        .then(res => {
            const nameCountry = GetNameCountry(res)
            // console.log(nameCountry);
            setNameCountry(nameCountry)
        })
        // console.log(NameCountry);

            // url get specify > https://disease.sh/v3/covid-19/historical/[country]?lastdays=30
        const urlGetData = 'https://disease.sh/v3/covid-19/historical/'+NameCountry+'?lastdays=30'

        axios.get(urlGetData)
        .then(res => {
            // console.log(res);
            const [DataProcess , getDate , mostCasesArr] = GetCountryData(res)
            const randomcolor = RandomColor(DataProcess)
            // console.log(CountryData);
            setDate(getDate)
            setData(DataProcess)
            setmostCase(mostCasesArr)
            setcolor(randomcolor)
        })

        // console.log('Date : ',Date);
        


    },[])


        // count day
    const [countday , setcountday] = useState(0)
    useEffect(() => {
        if (countday >= 29 ) {
            setTimeout(()=>{
                setcountday(0)
            },3000)
        } else {
            setTimeout(()=>{
                setcountday(countday + 1 )
            },1000)
        }
    })

   
    return(
        <div className="header">
                    {/* Header title */}
                <div className="header-title">
                    <span>COVID GLOBAL CASES</span>
                </div>
                    {/* count day */}
                <div className="count-day">
                    <span>Day : {Date[countday]}</span>
                </div>

                    {/* chart bar */}
                <div className="chart-body">
                    <div className="chart-text">
                        {Data.map((item , index ) => {
                            const cases = item.timeline.cases[Date[countday]];
                            const barWidth = parseInt((cases/mostCase[countday])*100)+'%'
                            return(
                                <div key={index} className="country-bar" style={{top:index*60+'px', transition:'all 0.3s'}}>
                                    <div className="bg-bar" style={{'backgroundColor':color[index],width:barWidth, transition:'all 0.3s'}}></div>
                                    <span className="country-text">{item.country} (cases : {cases}) </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

        </div>
    )
    
}

export default Covid19globalcases;