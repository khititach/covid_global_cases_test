/* eslint-disable no-template-curly-in-string */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React , {useState , useEffect} from 'react'
import './style.scss'

function RandomNumber () {
    return Math.floor(Math.random() * 100); 
}


const num_test = [ 
    { 
        "Country":'1',
        "num": RandomNumber(),
        'timeline':{}
    },
    { 
        "Country":'2',
        "num": RandomNumber(),
        'timeline':{}
    },
    { 
        "Country":'3',
        "num": RandomNumber(),
        'timeline':{}
    },
    { 
        "Country":'4',
        "num": RandomNumber(),
        'timeline':{}
    },
    { 
        "Country":'5',
        "num": RandomNumber(),
        'timeline':{}
    },
    { 
        "Country":'6',
        "num": RandomNumber(),
        'timeline':{}
    },
    { 
        "Country":'7',
        "num": RandomNumber(),
        'timeline':{}
    },
    { 
        "Country":'8',
        "num": RandomNumber(),
        'timeline':{}
    },
    { 
        "Country":'9',
        "num": RandomNumber(),
        'timeline':{}
    },
    { 
        "Country":'10',
        "num": RandomNumber(),
        'timeline':{}
    },
       
]

  


function CovidGlobalCases () {
        
        // date 1 month
    const [Date , setDate] = useState([])
        // data country > Country Name , date , cases 1 month
    const [Data , setData] = useState([])
        // Country Name
    const [CountryNameList , setCountryNameList] = useState([])
        // country Position 
    const [CountryPosition , setCountryPosition] = useState([])
        // most case
    const [mostCase , setmostCase] = useState([])
        // bar color
    const [barColor, setbarColor] = useState([])

        // test num
    const [numTest, setnumTest] = useState(num_test)

        // url get country 
    const urlGetCountry = 'https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&allowNull=false'
        // url get specify > https://disease.sh/v3/covid-19/historical/[country]?lastdays=30
    const urlusa = 'https://disease.sh/v3/covid-19/historical/usa?lastdays=30'
        // url get total cases
    const urlTotalCases = 'https://disease.sh/v3/covid-19/historical/all?lastdays=30';

    useEffect(async() => {
        const CountryName = [];
        const barColorArr = [];
        // const mostCases = 0;

            // get name country
        await fetch(urlGetCountry)
        .then(res => res.json())
        .then(DataCountry => {
            DataCountry.forEach((data , index) => {
                // console.log(data.country);
                CountryName.push(data.country)

                // random color
                let color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
                barColorArr.push(color)
            });
            // console.log(CountryName);

                // get data specify country
            fetch('https://disease.sh/v3/covid-19/historical/'+CountryName+'?lastdays=30')
            .then(res => res.json())
            .then(res => {
                // console.log(res);

                    // delete country empty data
                const DataProcess = res.filter(country => country.country)
                    // get date
                const getDate = Object.keys(DataProcess[0].timeline.cases);
                setDate(getDate)

                    // set Data
                setData(DataProcess)
                // console.log(Data);
                    // set color
                setbarColor(barColorArr)

                    // view data
                // console.log('Date : ',Date);
                // console.log('Data : ',Data);
                // console.log('barColor : ',barColor);

                    // process most cases per day
                const mostCasesArr = [];
                let mostCases = 0;
                Date.forEach((dayitem ,dayindex ) => {
                    Data.forEach((dataitem , dataindex ) => {
                        // console.log('Date : ',dayitem);
                        // console.log('Data : ',dataitem.timeline.cases);
                        if (mostCases <= dataitem.timeline.cases[dayitem] ) {
                            mostCases = dataitem.timeline.cases[dayitem]
                        }
                    })
                    mostCasesArr[dayindex] = mostCases
                })

                // console.log(mostCasesArr);
                setmostCase(mostCasesArr)
                // console.log(mostCasesArr[0]);
        
            })
            .catch(err => console.log(err))
          
        })
        .catch(err => console.log(err))

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
    }, [countday])

    return (
        <div className="header">
                {/* Header title */}
            <div className="header-title">
                <span>COVID GLOBAL CASES</span>
            </div>
                {/* count day */}
            <div className="count-day">
                <span>Day : {Date[countday]} </span>
            </div>

            <div className="test-data">
                {/* <span>Total cases : {TotalCases.cases['11/3/20']}</span> */}
            </div>

                {/* chart bar */}
            <div className="chart-body">
                <div className="chart-text">
                    
                        {Data.map((item ,index) => {
                            let cases = item.timeline.cases[Date[countday]];
                            // const barWidth = parseInt((cases/mostCase[countday])*100)+'%'
                            // console.log(barWidth);
                            const topPosition = ''+ index * 60  + 'px'

                            const randColor = barColor[index]
                            
                            return(
                                <div key={index} className="country-bar" style={{top:topPosition, transition:'all 0.3s'}}>
                                    <div className="bg-bar" style={{'backgroundColor':randColor,width:parseInt((cases/mostCase[countday])*100)+'%', transition:'all 0.3s'}}></div>
                                    <span className="country-text">{item.country} (cases : {cases})  </span>
                                </div>
                            )
                        })}

                           {/* <div className="country-bar" style={{top:'50px'}}>
                                <div className="bg-bar" style={{backgroundColor:'red',width:'100%', transition:'all 0.3s'}}></div>
                                <span className="country-text">Country_1 cases :95</span>
                            </div>
                            <div className="country-bar" style={{top:'100px'}}>
                                <div className="bg-bar" style={{backgroundColor:'red',width:'70%', transition:'all 0.3s'}}></div>
                                <span className="country-text">Country_2 cases :80</span>
                            </div>
                            <div className="country-bar" style={{top:'150px'}}>
                                <div className="bg-bar" style={{backgroundColor:'red',width:'70%', transition:'all 0.3s'}}></div>
                                <span className="country-text">Country_2 cases :80</span>
                            </div> */}

                </div>
            </div>

        </div>
    )
}

export default CovidGlobalCases;