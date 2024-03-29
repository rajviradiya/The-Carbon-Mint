import React from 'react'
import ImageComp from './ImageComp'

const Pictures = ({ data, process }) => {
    return (
        <div fluid className=" container cameracomp">
            <section className="cameratext">
                <p>Photos</p>
            </section>
            <section className="cameraimage">
                <div className="cameraimagess">
                    {data[0]?.eventimg.map((items, index) => (
                        <>
                            <ImageComp image={items} process={process[index]} />
                        </>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Pictures