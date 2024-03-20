import React, { useEffect } from 'react'
import ImageComp from './ImageComp'

const Pictures = ({ params,data }) => {
    const { id } = params
    const data2 = data.filter((items) => items.id === id) 

    console.log(data2[0].eventimg, "is this data");

    return (
        <div fluid className=" container cameracomp">
            <section className="cameratext">
                <p>Tap on camera icon to capture photos</p>
            </section>
            <section className="cameraimage">
                <div className="cameraimagess">
                    {data2[0]?.eventimg?.map((items, index) => (
                        <>
                            <ImageComp key={index} image={items} index={index} />
                        </>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Pictures