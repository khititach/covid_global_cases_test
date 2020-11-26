/* eslint-disable no-template-curly-in-string */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React , {useState , useEffect} from 'react'
import './style.scss'

function RandomColorBar () {
    useEffect(() => {
        return "#"+((1<<24)*Math.random()|0).toString(16)
    },[])
}

function RandomNumber () {
    
    return Math.floor(Math.random() * 100); 
}


const num_test = [ 
    { 
        "Country":'1',
        "num": RandomNumber(),
    },
    { 
        "Country":'2',
        "num": RandomNumber(),
    },
    { 
        "Country":'3',
        "num": RandomNumber(),
    },
    { 
        "Country":'4',
        "num": RandomNumber(),
    },
    { 
        "Country":'5',
        "num": RandomNumber(),
    },
    { 
        "Country":'6',
        "num": RandomNumber(),
    },
    { 
        "Country":'7',
        "num": RandomNumber(),
    },
    { 
        "Country":'8',
        "num": RandomNumber(),
    },
    { 
        "Country":'9',
        "num": RandomNumber(),
    },
    { 
        "Country":'10',
        "num": RandomNumber(),
    },
       
]
  


function CovidGlobalCases () {
        
        // date 1 month
    const [Date , setDate] = useState([])
        // data country > Country Name , date , cases 1 month
    const [Data , setData] = useState([])
        // Totalcases 1 month
    const [TotalCases , setTotalCases] = useState([])
        // Country Name
    const [CountryNameList , setCountryNameList] = useState([])
        // country Position 
    const [CPosition , setCPosition] = useState([])
        // most case
    const [mostCase , setmostCase] = useState([])
        // bar color
    const [barColor, setbarColor] = useState([])

        // url get country 
    const urlGetCountry = 'https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&allowNull=false'
        // url get specify > https://disease.sh/v3/covid-19/historical/[country]?lastdays=30
    const urlusa = 'https://disease.sh/v3/covid-19/historical/usa?lastdays=30'
        // url get total cases
    const urlTotalCases = 'https://disease.sh/v3/covid-19/historical/all?lastdays=30';

    useEffect(async() => {
        const CountryName = [];
        const CountryData = [];
        const barColorArr = [];

            // test func
        // num_test.sort((a,b) => {
        //     return b.num - a.num
        // })
        // console.log(num_test);
        // setData(num_test)

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
                // const CountryData = new Array(res) ;
                // console.log(CountryData);

                    // delete country empty data
                const DataProcess = res.filter(country => country.country)
                    // get date
                const getDate = Object.keys(DataProcess[0].timeline.cases);
                setDate(getDate)

                    // set Data
                setData(DataProcess)

                    // set color
                setbarColor(barColorArr)
                // console.log(Data);

                    // get totalcases 
                fetch(urlTotalCases)
                .then(res => res.json())
                .then(res => {
                    // console.log(res.cases);
                    setTotalCases(res.cases)
                })
                .catch(err => console.log(err))

               

                    // get value cases
                // console.log(Data[0].timeline.cases['10/26/20']);
                // console.log(Data[0].timeline.cases['10/26/20']);
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
                {/* <span>Day : {Date[countday]} </span> */}
                <span>Day : {Date[countday]} </span>
            </div>

            <div className="test-data">
                {/* <span>Total cases : {TotalCases.cases['11/3/20']}</span> */}
            </div>

                {/* chart bar */}
            <div className="chart-body">
                <div className="chart-text">
                    
                        {Data.map((item ,index) => {

                            

                            const itemWidth = '100%'
                            const topPosition = ''+ index * 100 + 'px'
                            const randColor = barColor[index]
                            
                            return(
                                <div key={index} className="country-bar" style={{top:'50px', transition:'all 0.3s'}}>
                                    <div className="bg-bar" style={{'backgroundColor':randColor,width:'50%', transition:'all 0.3s'}}></div>
                                <span className="country-text">{item.country} (cases : {item.timeline.cases[Date[countday]]})</span>
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

                     {/* <div>
                        <ul>
                            <li className="li-content" style={{top:'0px',transition:'all 0.3s'}} > 
                                <div className="country-bar">
                                    <div className="bg-bar" style={{backgroundColor:'red',width:'100%',transition:'all 0.3s'}}></div>
                                    <span className="country-text">Test_country_1 (10000 Cases)</span>
                                </div>
                            </li>

                            <li className="li-content" style={{top:'50px',transition:'all 0.3s'}}> 
                                <div className="country-bar">
                                    <div className="bg-bar" style={{backgroundColor:'yellow',width:'40%',transition:'all 0.3s'}}></div>
                                    <span className="country-text">Test_country_2 (30000 Cases)</span>
                                </div>
                            </li>

                            <li className="li-content" style={{top:'150px',transition:'all 0.3s'}}> 
                                <div className="country-bar">
                                    <div className="bg-bar" style={{backgroundColor:'blue',width:'20%',transition:'all 0.3s'}}></div>
                                    <span className="country-text">Test_country_2 (30000 Cases)</span>
                                </div>
                            </li>
                          
                        </ul>
                    </div>  */}
            

                </div>
            </div>

        </div>
    )
}

export default CovidGlobalCases;