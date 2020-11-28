/* eslint-disable react-hooks/exhaustive-deps */
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import './style.scss'


function getNameCountry (data) {
    const countryName = [];
    const country = data.data
    country.forEach(item => {
        countryName.push(item.country)
    });
    return countryName
}

function getCountryData (data) {
    const mostCasesArr = [];   
    const countryData = data.data
    const dataProcess = countryData.filter(country => country.country)
    const getDate = Object.keys(dataProcess[0].timeline.cases);

    const dataPositionPerDay = [];  
    let allCasesPerDay = [];

    getDate.forEach((dayItem , dayIndex ) => {
        const casesMax = Math.max(...dataProcess.map(item => item.timeline.cases[dayItem]))
        mostCasesArr.push(casesMax)

        dataProcess.map((item , index) => {
            allCasesPerDay[index] = {'country':item.country,'cases':item.timeline.cases[dayItem],'beforePosition':index+1}
        })

        dataPositionPerDay[dayItem] = allCasesPerDay
        allCasesPerDay = [];

        dataPositionPerDay[dayItem].sort((a,b) => { 
            return b.cases - a.cases
        })

        dataPositionPerDay[dayItem].forEach((item ,index) => {
            Object.assign(item,{'positionBar':index})
        })

        dataPositionPerDay[dayItem].sort((a,b) => { 
            return a.beforePosition - b.beforePosition
        })

    })
    return [dataProcess , getDate , mostCasesArr , dataPositionPerDay]
}

function RandomColor (data) {
    const colorArr = []
    for (let i = 0; i < data.length; i++) {
        colorArr.push( '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6))
    }
   return colorArr
}

function SomeLoadingScreen () {
    return (
        <div>
            Loading Data
        </div>
    )
}

function Covid19GlobalCases () {
    const [loading, setLoading ] = useState(true)
    const [nameCountry , setNameCountry] = useState([])
    const [date , setDate] = useState([])
    const [data , setData] = useState([])
    const [mostCase , setMostCase] = useState([])
    const [color , setColor] = useState([])
    const [positionBar , setPositionBar ] = useState([])

    useEffect(() => {

        const urlGetCountry = 'https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&allowNull=false'
        axios.get(urlGetCountry)
        .then(res => {
            const nameOfCountry = getNameCountry(res)
            setNameCountry(nameOfCountry)
        })

        const urlGetData = 'https://disease.sh/v3/covid-19/historical/'+nameCountry+'?lastdays=30'
        axios.get(urlGetData)
        .then(res => {
            const [dataProcess , getDate , mostCasesArr , dataPositionPerDay] = getCountryData(res)
            const randomColor = RandomColor(dataProcess)
            setDate(getDate)
            setData(dataProcess)
            setMostCase(mostCasesArr)
            setColor(randomColor)
            setPositionBar(dataPositionPerDay)
            setLoading(false)
        })

    },[])

    const [countday , setCountday] = useState(0)
    useEffect(() => {
        if (countday >= 29 ) {
            setTimeout(()=>{
                setCountday(0)
            },3000)
        } else {
            setTimeout(()=>{
                setCountday(countday + 1 )
            },1000)
        }
    })

    if (loading) { return <SomeLoadingScreen />} else {
    return(
        <div className="header">
                <div className="header-title">
                    <span>COVID GLOBAL CASES</span>
                </div>
                <div className="count-day">
                    <span>Day : {date[countday]}</span>
                </div>
                <div className="chart-body">
                    <div className="chart-text">
                        {data.map((item , index ) => {
                            const cases = item.timeline.cases[date[countday]];
                            const barWidth = parseInt((cases/mostCase[countday])*100)+'%'
                            const positionCountry = positionBar[date[countday]][index].positionBar ;
                            return(
                                <div key={index} className="country-bar" style={{top:positionCountry*60+'px', transition:'all 0.3s'}}>
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
}

export default Covid19GlobalCases;