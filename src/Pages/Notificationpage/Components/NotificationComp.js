import React from 'react'

const NotificationComp = ({ item }) => {
   
    return (
        <div className='container mt-2'>
            <div className='notificationdiv row gx-0'>
                <div className='notificationImg col-3'>
                    <img src={item.eventimg[0]} />
                </div>
                <div className=' notificationcont col-9'>
                    <p>Event upload status</p>
                    <span>{item.name ? (`${item.name} event photos are uploaded.`) : ("No Data")}</span>
                    <span>{item.date}, {item.uplodtime}</span>
                </div>
            </div>
        </div>
    )
}

export default NotificationComp