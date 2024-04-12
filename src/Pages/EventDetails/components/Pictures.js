import React from 'react'
import ImageComp from './ImageComp'
import Skeleton from '@mui/material/Skeleton';

const Pictures = ({ data, localprocessdata }) => {
    return (
        <div fluid className=" container cameracomp">
            <section className="cameratext">
                <p>Photos</p>
            </section>
            <section className="cameraimage">
                <div className="cameraimagess">
                    {
                        data[0]?.eventimg ? (
                            data[0]?.eventimg?.map((items, index) => (
                                <>
                                    <ImageComp image={items} process={localprocessdata && localprocessdata[index]} />
                                </>
                            ))
                        ) : (<Skeleton variant="rounded" width={210} height={60} />)
                    }
                </div>
            </section>
        </div>
    )
}

export default Pictures