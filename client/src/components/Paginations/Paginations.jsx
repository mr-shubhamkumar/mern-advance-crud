import Pagination from "react-bootstrap/Pagination";

function Paginations({ handleNext, handlePrevios, page, pageCount, setPage }) {
  return (
    <>
      {pageCount > 0 ? (
        <div className="pagination_div d-flex justify-content-end  mx-5">
          <Pagination>
            <Pagination.Prev onClick={() => handlePrevios()} />
              {
                Array(pageCount).fill(null).map((element,index)=>{
                  return(
                    <>
                    <Pagination.Item active={page == index+1 ? true : ""}  onClick={()=>setPage(index+1)}>{index+1}</Pagination.Item>
                    </>
                  )
                })
              }
            
            <Pagination.Next onClick={() => handleNext()} />
          </Pagination>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Paginations;
