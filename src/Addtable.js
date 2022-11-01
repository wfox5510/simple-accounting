import React, { useState, useEffect, useRef} from 'react';
import BuildChart from './BuildChart';
import ListGenerate from './ListGenerate';
import GenNonDuplicateID from './GenNonDuplicateID'
import './Addtable.css';

var year = ""
var month = ""
var itemData = [["年份", "月份", "品項", "收入", "成本", "獲利", "    "]]
var listItemsNum = 0
var profitYearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function Addtable() {
    const submittingStatus = useRef(false);
    async function fetchData() {
        const res = await fetch("http://localhost:3000/post/1")
        const data = await res.json()
        itemData = data.itemData
        profitYearData = data.profitYearData
        listItemsNum = data.listItemsNum
        setListData({ itemData })
        console.log(listItemsNum)
    }

    async function uploadData() {
        console.log("uploadData")
        await fetch("http://localhost:3000/post/1", {
            method: "PUT",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ itemData, listItemsNum,profitYearData})
          })
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (!submittingStatus.current){
            return
        }
        uploadData(itemData)
    }, [listItemsNum])

    const [listData, setListData] = useState({ itemData })
    
    
    const [inputItem, setInputItem] = useState("")

    function handleInput(e) {
        if (e.target.value.length <= 28) {
            setInputItem(e.target.value)
        }
    }

    function del(year, profit, id) {
        profitYearData[year - 2020] -= profit
        submittingStatus.current = true
        itemData = itemData.filter(item => item[6] !== id)
        setListData({ itemData })
        listItemsNum--
    }

    function handleClick() {
        if (year == "" || year == 0) {
            alert("請輸入年份")
            return
        }
        if (month == "" || month == 0) {
            alert("請輸入月份")
            return
        }

        if (inputItem == "") {
            alert("請輸入品項")
            return
        }
        var income = window.prompt("收入")

        if (income == "") {
            alert("請輸入收入")
            return
        }
        if (income == null) {
            return
        }
        var cost = window.prompt("成本")

        if (cost == "") {
            alert("請輸入成本")
            return
        }
        if (cost == null) {
            return
        }
        var profit = income - cost
        if (isNaN(profit)) {
            alert("無法計算獲利")
            return
        }
        profitYearData[year - 2020] += profit
        submittingStatus.current = true
        itemData.push([year, month, inputItem, income, cost, profit, GenNonDuplicateID()])
        listItemsNum++
        sortForYear(itemData, 1, listItemsNum)
        for (var i = 2020; i <= 2030; i++) {
            let start = 0
            let end = 0
            for (var t = 1; t < listItemsNum + 1; t++) {
                if (itemData[t][0] == i) {
                    start = t
                    break
                }
            }
            for (var t = start; t < listItemsNum + 1; t++) {
                if (itemData[t][0] == i)
                    end = t
                if (itemData[t][0] != i)
                    break
            }
            if (start != 0 && end != 0) {
                sortForMonth(itemData, start, end)
            }

        }
        setListData({ itemData })
        //console.log(listData)
    }


    //var test = [3,2,1,4,5,8,7,9]
    function sortForYear(data, left, right) {
        if (left >= right)         
            return
        let i = left                     
        let j = right                     
        let key = data[left]               

        while (i != j) {
            while (parseInt(data[j][0]) < parseInt(key[0]) && i < j)
                j -= 1    
            while (parseInt(data[i][0]) >= parseInt(key[0]) && i < j)
                i += 1
            if (i < j) {
                [data[i], data[j]] = [data[j], data[i]];
            }
        }
       
        data[left] = data[i]
        data[i] = key
        sortForYear(data, left, i - 1)
        sortForYear(data, i + 1, right)
    }

    function sortForMonth(data, left, right) {
        if (left >= right)        
            return
        let i = left                 
        let j = right                   
        let key = data[left]             

        while (i != j) {
            while (parseInt(data[j][1]) < parseInt(key[1]) && i < j) {
                j -= 1
            }  

            while (parseInt(data[i][1]) >= parseInt(key[1]) && i < j) {
                i += 1
            }  

            if (i < j) {
                [data[i], data[j]] = [data[j], data[i]];
            }
        }
      
        data[left] = data[i]
        data[i] = key
        sortForMonth(data, left, i - 1)   
        sortForMonth(data, i + 1, right) 
    }


    function selectMonth(e) {
        month = e.target.value
    }

    function selectYear(e) {
        year = e.target.value
    }

    return (
        <div className='container'>
            <div className="addTable" >
                <div className="inputData">
                    <select className="selectYearMon" onChange={(e) => selectYear(e)}>
                        <option value={0}>請選擇年份</option>
                        <option>2020</option><option>2021</option>
                        <option>2022</option><option>2023</option>
                        <option>2024</option><option>2025</option>
                        <option>2026</option><option>2027</option>
                        <option>2028</option><option>2029</option>
                        <option>2030</option>
                    </select>
                    <select className="selectYearMon" onChange={(e) => selectMonth(e)}>
                        <option value={0}>請選擇月份</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                    <button className="summitBTN" onClick={() => handleClick()}>新增</button>
                </div>
                <div className="inputData">
                    <p>品項</p>
                    <input className="inputItemName" type="text"
                        onInput={(e) => handleInput(e)} value={inputItem} />
                </div>

            </div>
            <ListGenerate del={del} listData={listData} listItemsNum={listItemsNum}></ListGenerate>
            <BuildChart profitYearData={profitYearData} />
        </div>
    );
}

export default Addtable;
