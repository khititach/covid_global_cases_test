import React,{useEffect, useState} from 'react'
// import { Helmet } from "react-helmet"
import styled from 'styled-components'
import './style.scss'

const Wrap = styled.div`
    transition: all 0.3s;
    position: relative;
    width:100%;
`

const Guage = styled.div`
    position: absolute;
    transition: all 0.3s;
    height: 30px;
    background-color: ${props => props.color};
    width: ${props => parseInt((((props.total*100)/props.totalcases)*5).toFixed(0))}%;
`

const Bar = styled.div`
  position: absolute;
  transition: all 0.3s;
  width: 100%;
  top: ${props => props.space*7}%;
`
const Text = styled.p`
    position : absolute;
    left: 15px;
    top: 7px;
    padding: 0;
    margin : 0;
`

const randomColor = () => {
    return '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
}

export default function Charts(props) {

    const [totalcases,setTotalcases] = useState([])
    const [getdate,setDate] = useState([])
    const [count,setCount] = useState(0)
    const [data,setData] = useState([])
    const [color,setColor] = useState([])
    useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&sort=cases&allowNull=false')
        .then(res=> res.json())
        .then((result)=>{
            let newData = []
            let country = ""
            let color = []
            // console.log(result);
            result.forEach((item)=>{ 
                newData.push(item.countryInfo.iso3);
                color.push(randomColor())
            });
            country = newData.join(',');
            setColor(color)
            // console.log(color);
            fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`)
            .then(res=> res.json())
            .then((results)=>{
                let dataArr = results.filter(item=> item.country)
                let dateList = Object.keys(results[0].timeline.cases)
                setDate(Object.keys(results[0].timeline.cases))
                // console.log(dataArr);
                fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
                .then(res=> res.json())
                .then((dataResult)=>{
                    setTotalcases(dataResult.cases);
                    for(let i = 0; i <= 29; i++) {
                        let element = dataArr.sort((a,b)=> b.timeline.cases[dateList[i]] - a.timeline.cases[dateList[i]])
                        element.forEach((items,index)=>{
                            items[`${dateList[i]}`] = index
                        });
                    }
                    setData(dataArr) 
                })
                .catch((err)=>{
                    console.log(err)
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
       
    },[])

    useEffect(()=>{
        if(count >= 29) {
            setTimeout(()=>{
                setCount(0)
            },2000)
        } else {
            setTimeout(()=>{
                setCount(count+1)
            },500)
        }
    })
    
    return (
        <>
 
            <meta charSet="utf-8" />
            <title>Covid-19 Report</title>

            <div className={'chart-section'}>
                <div className={'top-section'}>
                    <h1>COVID-19 Global Cases</h1>
                    <h3>Date : {getdate[count]}</h3>
                </div>
                <div className={'data-wrap'}>
                    <div className={'data-section'}>
                        { 
                            data
                            .map((item,i)=>{
                            return <Bar key={i} space={item[getdate[count]]} totalcases={totalcases[getdate[count]]} total={item.timeline.cases[getdate[count]]} >
                                    <Wrap>
                                        <Guage space={item[getdate[count]]} color={color[i]} totalcases={totalcases[getdate[count]]} total={item.timeline.cases[getdate[count]]} />
                                        <Text style={{padding:'0',position:'absolute'}}>{item.country} ( {item.timeline.cases[getdate[count]]} cases)</Text>
                                    </Wrap>
                                </Bar>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
