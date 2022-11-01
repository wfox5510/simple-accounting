import React, {useState, useEffect } from 'react';
import './ListGenerate.css'
import GenNonDuplicateID from './GenNonDuplicateID'
function ListGenerate({ del, listData, listItemsNum }) {
    const [listAll, setListAll] = useState([])
    var tdList = []    
    useEffect(() => {
        updateTable()
        setTableLists()
    }, [listItemsNum])



    function updateTable() {
        for (let i = 0; i < listItemsNum + 1; i++) {
            if (i == 0)
                tdList[i] =
                    <tr key={GenNonDuplicateID()}>
                        <td style={{ flex: '1.5' }}>{listData.itemData[i][0]}</td>
                        <td style={{ flex: '1' }}>{listData.itemData[i][1]}</td>
                        <td style={{ flex: '5' }}>{listData.itemData[i][2]}</td>
                        <td style={{ flex: '3' }}>{listData.itemData[i][3]}</td>
                        <td style={{ flex: '3' }}>{listData.itemData[i][4]}</td>
                        <td style={{ flex: '3' }}>{listData.itemData[i][5]}</td>
                        <td style={{ flex: '1' }}>{listData.itemData[i][6]}</td>
                    </tr>
            else{
                let profitColor
                if(listData.itemData[i][5] > 0) profitColor = "green"
                if(listData.itemData[i][5] < 0) profitColor = "red"
                if(listData.itemData[i][5] === 0) profitColor = "black"
                tdList[i] =
                    <tr key={GenNonDuplicateID()}>
                        <td style={{ flex: '1.5' }}>{listData.itemData[i][0]}</td>
                        <td style={{ flex: '1' }}>{listData.itemData[i][1]}</td>
                        <td style={{ flex: '5' }}>{listData.itemData[i][2]}</td>
                        <td style={{ flex: '3' }}>{listData.itemData[i][3]}</td>
                        <td style={{ flex: '3' }}>{listData.itemData[i][4]}</td>
                        <td style={{ flex: '3' ,color:`${profitColor}`}}>{listData.itemData[i][5]}</td>
                        <td style={{ flex: '1' }}><button className='listDelBtn' 
                        onClick={() => del(listData.itemData[i][0],listData.itemData[i][5],listData.itemData[i][6])}>刪除</button></td>
                    </tr>
            }
        }
    }

    function setTableLists() {
        setListAll(tdList)
    }

    return (
        <table className="tableList">
            <tbody>
                {listAll}
            </tbody>
        </table>
    )
}
export default ListGenerate