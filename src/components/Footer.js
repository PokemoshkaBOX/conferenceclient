import React from 'react';
import {} from "mdbreact";
import {CONFERENCE_ROUTE} from "../utils/consts";
import { MDBIcon, MDBCol, MDBContainer, MDBFooter, MDBRow } from 'mdb-react-ui-kit';

const Footer = () => {
    return (
       <MDBFooter bgcolor='dark' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>

      </section>

      <section>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                Имя компании
              </h6>
              <p>
                Описание
              </p>
            </MDBCol>
            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Контакты: </h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                Ярославль
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-2' />
                Официальная почта
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-2' /> Телефон
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href={CONFERENCE_ROUTE}> Адрес сайта</a>
      </div>
    </MDBFooter>
    );
};

export default Footer;