import React,{useEffect,useState} from 'react'
import Navbar from '../Navbar/Navbar'
import firebaseConfig, { firestore } from '../../Config/fire'
import { Link, Redirect, Route } from "react-router-dom";
import Drawer from './Drawer'
import { Loading } from '../Loading/Loading';



import DataGrid, {
    Column,
    FilterRow,
    HeaderFilter,
    Scrolling,
    Pager,
    Paging,
    Selection,
    Sorting,
  } from "devextreme-react/data-grid";




export default function Reportpost(props) {
    const [reportpost, setreportpost] = useState([]);
    const [selectedItemKeys, setSelectedItemKeys] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

      const report = []
      firestore.collection("Report").where("typePost","==","Post").get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
           report.push(doc.data())
          });
      }).then(()=>{
          for (let i = 0; i < report.length; i++) {
              console.log(i)
              const element = report[i].postid;
              console.log(element)
             firestore.collection("Post").where("postid","==", element).get()
             .then((querySnapshot)=>{
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data());
                report[i]["contentText"] = doc.data().contentText
               report[i]["student"] = doc.data().student
               report[i]["titleName"] = doc.data().titleName
               report[i]["catagory"] = doc.data().catagory
            });
              
           }).then(()=>{
            setreportpost(report)
            // setLoading(false);  

           })
          
          }

      })
    
     
   

  

     

  }, [])
    const displayMode = "compact";
  const showPageSizeSelector = true;
  const showInfo = true;
  const showNavButtons = true;
  const allowedPageSizes = [5, 10, 30, 50, 100, "all"];
  

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const Delete = () => {
    selectedItemKeys.forEach(element => {
      var deletereport = firestore.collection("Report").where("postid", "==", element.postid)

      var deletepost = firestore.collection("Post").where("postid", "==", element.postid)
      
      deletepost.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        })})
      
     deletereport.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      })})})}
   
  const renderTime = (cellData) => {
    const dateCount = new Date(
      cellData.value.seconds * 1000
    ).toLocaleDateString("en-US", options);
    const time = new Date(cellData.value.seconds * 1000).toLocaleTimeString();
    return (
      <div>
        {dateCount} {time}
      </div>
    );
  };
  const selectionChanged = ({ selectedRowsData }) => {
    setSelectedItemKeys(getData(selectedRowsData));
  };
  const getData = (selectedRowsData) => {
    return selectedRowsData.length ? selectedRowsData : [];
  };
 
  console.log(selectedItemKeys); 
    return(
      <div>
      {loading === false ? (
      <Loading />
    ) :(
       <div>
            <Navbar/>
            <Drawer/>
            <div className="row justify-content-center">
            <div className="col-xl-2 col-lg-0 col-md-0 col-sm-0 col-0"></div>
                <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12">
                  <DataGrid
                    id="gridContainer"
                    dataSource={reportpost}
                    columnsAutoWidth={true}
                    showBorders={true}
                    showColumnLines={true}
                    showColumnHeaders={true}
                    showRowLines={true}
                    wordWrapEnabled={true}
                    allowColumnResizing={true}
                    columnResizingMode="widget"
                    onSelectionChanged={selectionChanged}
                  >
                    <FilterRow visible={true} />
                    <HeaderFilter visible={true} className="headerFilter" />
                    <Scrolling
                      useNative={true}
                      scrollByContent={true}
                      scrollByThumb={true}
                      showScrollbar="always"
                    />
                    <Selection mode="multiple" showCheckBoxesMode="always" />

                    <Paging defaultPageSize={5} />
                    <Pager
                      visible={true}
                      allowedPageSizes={allowedPageSizes}
                      displayMode={displayMode}
                      showPageSizeSelector={showPageSizeSelector}
                      showInfo={showInfo}
                      showNavigationButtons={showNavButtons}
                    />
                    <Sorting mode="multiple" />

                    <Column
                      dataField="postid"
                      allowSorting={true}
                      width="auto"
                    />
                    <Column dataField="reporter" width={140}  caption="Student report"/>
                    <Column dataField="report" width={140}  caption="Report"/>
                   
                   
                    <Column
                      dataField="reporttime"
                      dataType="date"
                      width={140}
                      cellRender={renderTime}
                      allowFiltering={false}
                    />
                    <Column dataField="student" width={140} />
                    <Column dataField="catagory" width={140} />
                    <Column
                      dataField="titleName"
                      width="auto"
                    />
                      <Column
                      dataField="contentText"
                      width="auto"
                    />
                    
                  </DataGrid>
                  <center>
                  <button 
                    className="button-action btn btn-warning"
                    disabled={selectedItemKeys.length === 0}
                    onClick={Delete}
                  >
                    Delete
                  </button>
                  </center>
                </div>
              </div>
              </div>
    )}
          </div>

    )
}