import React,{useEffect,useState} from 'react'
import Navbar from '../Navbar/Navbar'
import firebaseConfig, { firestore } from '../../Config/fire'
import { Link, Redirect, Route } from "react-router-dom";
import { useHistory } from "react-router";
import './Post.css';
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




export default function Post(props) {
    const [post, setpost] = useState([]);
    const [selectedItemKeys, setSelectedItemKeys] = useState([]);
    const history = useHistory();
    const [loading, setLoading] = useState(true);

 
    useEffect(() => {
       firestore.collection("Post").onSnapshot((snap)=>{
            setpost(snap.docs.map((doc)=>doc.data()))
            setLoading(false);  
        })
    }, [])
    const displayMode = "compact";
  const showPageSizeSelector = true;
  const showInfo = true;
  const showNavButtons = true;
  const allowedPageSizes = [5, 10, 30, 50, 100, "all"];
  const renderImg = (cellData) => {
    return (
      <div>
        <img src={cellData.value} width="100%" />
      </div>
    );
  };
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const Delete = () => {
    // return firebaseConfig.database().ref('Post').remove();
    selectedItemKeys.forEach(element => {
     var deletepost = firestore.collection("Post").where("postid","==",element.postid);
     deletepost.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      }
    )})})}

    
  

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
      {loading === true ? (
      <Loading />
    ) :(
        <div>
            <Navbar/>
            <div className="contain container">
            <div className="row justify-content-center">
         
                  <DataGrid
                    id="gridContainer"
                    dataSource={post}
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
                    <Column dataField="student" width={140} />
                    <Column dataField="catagory" width={140} />
                    <Column
                      dataField="urlImage"
                      cellRender={renderImg}
                      allowFiltering={false}
                      width={140}
                    />
                    <Column
                      dataField="timestamp"
                      dataType="date"
                      width={140}
                      cellRender={renderTime}
                      allowFiltering={false}
                    />
                    <Column
                      dataField="titleName"
                      width="auto"
                    />
                      <Column
                      dataField="contentText"
                      width="auto"
                    />
                    
                  </DataGrid>
                  <button
                    className="button-action btn btn-warning"
                    disabled={selectedItemKeys.length === 0}
                    onClick={Delete}
                  >
                    Delete
                  </button>
                </div>
              </div>
              </div>
    )}
              </div>
          

    )
}