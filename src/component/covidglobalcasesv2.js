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
        countryName.push(item.country)
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

    const dataPositionPerDay = [];  
    let allCasesPerDay = [];
        // get cases max per day
    getDate.forEach((dayitem , dayindex ) => {
        const casesmax = Math.max(...DataProcess.map(item => item.timeline.cases[dayitem]))
        mostCasesArr.push(casesmax)

            // process position bar
       
        // console.log(dayitem);
        DataProcess.map((item , index) => {
            // console.log(item);
            // console.log('Country : ', item.country, ' cases : ' , item.timeline.cases[dayindex]);

            allCasesPerDay[index] = {'country':item.country,'cases':item.timeline.cases[dayitem],'beforePosition':index+1}
            
            // const saveData = {
            //     '10/01/20':[
            //                 {  'country':'usa',
            //                     'cases':1000
            //                 },
            //                 {  'country':'uk',
            //                     'cases':1000
            //                 },
            //     ],
            //     '10/02/20':[
            //         {  'country':'usa',
            //             'cases':1000
            //         }
            //     ],
            // }
        })
        // dataPositionPerDay.push({[dayitem]:allCasesPerDay})

        dataPositionPerDay[dayitem] = allCasesPerDay

        // console.log(dataPositionPerDay['10/28/20']);

        allCasesPerDay = [];
        // console.log(dataPositionPerDay[0]);

        dataPositionPerDay[dayitem].sort((a,b) => { 
            // console.log('a : ',a , ' / b : ' , b) 
            return b.cases - a.cases
        })
        // console.log(dataPositionPerDay);
        dataPositionPerDay[dayitem].forEach((item ,index) => {
            // console.log(dataPositionPerDay['10/28/20'][item.country]);
            Object.assign(item,{'positionBar':index+1})
        })

        dataPositionPerDay[dayitem].sort((a,b) => { 
            // console.log('a : ',a , ' / b : ' , b) 
            return a.beforePosition - b.beforePosition
        })

    })

    // return data , date ,
    return [DataProcess , getDate , mostCasesArr , dataPositionPerDay]
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

function Covid19globalcases () {
    const [loading, setloading ] = useState(true)
    const [NameCountry , setNameCountry] = useState([])
    const [Date , setDate] = useState([])
    const [Data , setData] = useState([])
    const [mostCase , setmostCase] = useState([])
    const [color , setcolor] = useState([])
    const [positionBar , setpositionBar ] = useState([])

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
            const [DataProcess , getDate , mostCasesArr , dataPositionPerDay] = GetCountryData(res)
            const randomcolor = RandomColor(DataProcess)
            // console.log(DataProcess);
            setDate(getDate)
            setData(DataProcess)
            setmostCase(mostCasesArr)
            setcolor(randomcolor)
            setpositionBar(dataPositionPerDay)
            setloading(false)
        })

        // console.log('positionBar : ',positionBar[0]);
        


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

    if (loading) { return <SomeLoadingScreen />} else {
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
                            const positionCountry = positionBar[Date[countday]][index].positionBar ;
                
                            // console.log(positionCountry);
                
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

export default Covid19globalcases;