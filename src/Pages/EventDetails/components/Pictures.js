import React, { useEffect } from 'react'
import ImageComp from './ImageComp'

const Pictures = ({ data,process}) => {

    console.log(data[0], "is this data");
    console.log(process, "progressEventDetails")  
    
    let inc = 0;
    const processid = process.filter((item) => {   
        return item.id == data[0].id+"_"+inc,"idd"
        inc++; 
    });
    
    console.log(processid,"iddd")

    return (
        <div fluid className=" container cameracomp">
            <section className="cameratext">
                <p>Photos</p>
            </section>
            <section className="cameraimage">
                <div className="cameraimagess">
                    {data[0]?.eventimg.map((items, index) => (
                        <>
                            <ImageComp  image={items} process={process} />
                        </>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Pictures