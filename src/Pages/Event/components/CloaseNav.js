import React from "react";
import { Container, } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router";
import { useFierbase } from "../../../context/fierbasecontext";
import Skeleton from '@mui/material/Skeleton';

const CloaseNav = ({ params }) => {
  const navigate = useNavigate()
  const firebase = useFierbase()

  console.log(params?.name, 'paramssss2')

  const filtercrop = firebase?.userdata?.crops?.filter((item) => {
    return item.name === params.name
  })

  if (!filtercrop) {
    return <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
  }


  console.log(filtercrop, "cropsss")
  return (
    <Container className="closeeventnav">
      <div className="closeicondiv">
        <button onClick={() => {
          navigate("/home")
          firebase.setImageUrl([])
          firebase.setRecording(false)
        }}>
          <CgClose />
        </button>
      </div>
      <div className="closenavtext">
        <section>
          <span>{firebase?.userdata?.Landparcel} - Intervention</span>
          <br />
          <p>{filtercrop[0]?.name ||   firebase?.userdata?.Landparcel}, {firebase?.userdata?.city}, {  firebase?.userdata?.district}</p>
        </section>
      </div>
    </Container>
  );
};

export default CloaseNav;
