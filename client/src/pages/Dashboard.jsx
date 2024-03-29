import React from 'react';
import classNames from 'classnames';
import '@coreui/coreui/dist/css/coreui.min.css';
import { useState,useEffect } from 'react';
import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import { getStyle } from '@coreui/utils';
import { CChart } from '@coreui/react-chartjs';
import CIcon from '@coreui/icons-react';
import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cibGoogle,
    cibFacebook,
    cibLinkedin,
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs,
    cibTwitter,
    cilCloudDownload,
    cilPeople,
    cilUser,
    cilUserFemale,
} from '@coreui/icons';

import avatar1 from '../assets/images/avatars/1.jpg';
import avatar2 from '../assets/images/avatars/2.jpg';
import avatar3 from '../assets/images/avatars/3.jpg';
import avatar4 from '../assets/images/avatars/4.jpg';
import avatar5 from '../assets/images/avatars/5.jpg';
import avatar6 from '../assets/images/avatars/6.jpg';

import WidgetsDropdown from '../components/WidgetsDropdown';
import MainChart from '../components/MainChart';
import axios from 'axios';

export default function DashboardPage() {
  const [ans, setAns] = useState(null); 
    const [avg, setAvg] = useState(null);
    const progressExample = [
        {
            title: 'Electricity',
            value: '29.703 Kg',
            percent: 20,
            color: 'success',
        },
        {
            title: 'Transportation',
            value: '24.093 Kg',
            percent: 20,
            color: 'info',
        },
        { title: 'Waste', value: '78.706 Kg', percent: 60, color: 'warning' },
    ];

    const progressGroupExample1 = [
        { title: 'Monday', value1: 34, value2: 78 },
        { title: 'Tuesday', value1: 56, value2: 94 },
        { title: 'Wednesday', value1: 12, value2: 67 },
        { title: 'Thursday', value1: 43, value2: 91 },
        { title: 'Friday', value1: 22, value2: 73 },
        { title: 'Saturday', value1: 53, value2: 82 },
        { title: 'Sunday', value1: 9, value2: 69 },
    ];

    const progressGroupExample2 = [
        { title: 'Male', icon: cilUser, value: 53 },
        { title: 'Female', icon: cilUserFemale, value: 43 },
    ];

    const tableExample = [
        {
            avatar: { src: avatar1, status: 'success' },
            user: {
                name: 'Cherie Tan',
                new: true,
                registered: 'Jan 1, 2023',
            },
            usage: {
                value: 50,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'success',
            },
            activity: '10 sec ago',
        },
        {
            avatar: { src: avatar2, status: 'danger' },
            user: {
                name: 'Gerald Smith',
                new: false,
                registered: 'Jan 1, 2023',
            },
            usage: {
                value: 22,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'info',
            },
            activity: '5 minutes ago',
        },
        {
            avatar: { src: avatar3, status: 'warning' },
            user: {
                name: 'Benjamin Chang',
                new: true,
                registered: 'Jan 1, 2023',
            },
            usage: {
                value: 74,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'warning',
            },
            activity: '1 hour ago',
        },
        {
            avatar: { src: avatar4, status: 'secondary' },
            user: { name: 'Divya Gupta', new: true, registered: 'Jan 1, 2023' },
            usage: {
                value: 98,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'danger',
            },
            activity: 'Last month',
        },
        {
            avatar: { src: avatar5, status: 'success' },
            user: {
                name: 'Kim Hyun Bin',
                new: true,
                registered: 'Jan 1, 2023',
            },
            usage: {
                value: 22,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'primary',
            },
            activity: 'Last week',
        },
        {
            avatar: { src: avatar6, status: 'danger' },
            user: {
                name: 'Paturi Karthik',
                new: true,
                registered: 'Jan 1, 2023',
            },
            usage: {
                value: 43,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'success',
            },
            activity: 'Last week',
        },
    ];


  
  useEffect(() => {
    fetchData(); 
}, []);

async function fetchData() {
  try {
    const response = await axios.get('/allscore');
    const items = response.data;
    console.log(items);
    if (items) {
      console.log('yes');
      let count = 0;
      let nature = 0;
      let senti = 0;
      let carbon = 0;
      items.forEach((item) => {
        count++;
        nature += item.natureScoreArray.slice(-1)[0];
        carbon += item.carbonScoreArray.slice(-1)[0];
        senti += item.nlpScoreArray.slice(-1)[0];
      });
      nature /= count;
      carbon /= count;
      senti /= count;
      const avg = (nature + carbon + senti) / 3;
      const data = {
        data: [nature, carbon, senti],
        backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56'],
      };
      console.log(data);
      setAns(data);
      setAvg(avg);
    }
  } catch (error) {
    // Handle error
    console.error('Error:', error);
  }
}

    console.log(ans)
    return (
        <>
            <WidgetsDropdown className="mb-4" />
            <CCard className="mb-4">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 id="traffic" className="card-title mb-0">
                                Total Carbon Emmisions
                            </h4>
                            <div className="small text-body-secondary">
                                January - July 2023
                            </div>
                        </CCol>
                        <CCol sm={7} className="d-none d-md-block">
                            <CButton color="primary" className="float-end">
                                <CIcon icon={cilCloudDownload} />
                            </CButton>
                            <CButtonGroup className="float-end me-3">
                                {['Day', 'Month', 'Year'].map((value) => (
                                    <CButton
                                        color="outline-secondary"
                                        key={value}
                                        className="mx-0"
                                        active={value === 'Month'}
                                    >
                                        {value}
                                    </CButton>
                                ))}
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                    <MainChart />
                </CCardBody>

                <CCardFooter>
                    <CRow
                        xs={{ cols: 1, gutter: 4 }}
                        sm={{ cols: 2 }}
                        lg={{ cols: 4 }}
                        xl={{ cols: 5 }}
                        className="mb-2 text-center justify-content-between"
                    >
                        {progressExample.map((item, index, items) => (
                            <CCol
                                className={classNames({
                                    'd-none d-xl-block':
                                        index + 1 === items.length,
                                })}
                                key={index}
                            >
                                <div className="text-body-secondary">
                                    {item.title}
                                </div>
                                <div className="fw-semibold text-truncate">
                                    {item.value} ({item.percent}%)
                                </div>
                                <CProgress
                                    thin
                                    className="mt-2"
                                    color={item.color}
                                    value={item.percent}
                                />
                            </CCol>
                        ))}
                    </CRow>
                </CCardFooter>
            </CCard>
            <CCard className="mb-4">
    <CCardBody>
        <div className="text-center">
            <h4 className="card-title mb-0">Environmental Impact Overview</h4>
            <div className="small text-body-secondary">Analysis based on data collected</div>
        </div>
        <CRow className="justify-content-center">
            <CCol sm={12} md={6} lg={3}>
                <CChart
                    className=""
                    type="polarArea"
                    style={{ height: '400px' }}
                    data={{
                        labels: ['Nature', 'Carbon', 'Sentiment'],
                        datasets: ans ? [ans] : [],
                    }}
                    options={{
                        plugins: {
                            legend: {
                                labels: {
                                    color: getStyle('--cui-body-color'),
                                },
                            },
                        },
                        maintainAspectRatio: true,
                        scales: {
                            r: {
                                grid: {
                                    color: getStyle('--cui-border-color'),
                                },
                            },
                        },
                    }}
                />
            </CCol>
        </CRow>
        {avg && (
            <div className="text-center mt-3">
                <h5 className="mb-2">Average Score</h5>
                <div className="fs-5 fw-semibold">{avg.toFixed(2)}</div>
            </div>
        )}
    </CCardBody>
</CCard>


            <CRow>
                <CCol xs>
                    <CCard className="mb-4">
                        <CCardHeader>Volunteer Profile</CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol xs={12} md={6} xl={6}>
                                    <CRow>
                                        <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-info py-1 px-3">
                                                <div className="text-body-secondary text-truncate small">
                                                    New Volunteers
                                                </div>
                                                <div className="fs-5 fw-semibold">
                                                    23
                                                </div>
                                            </div>
                                        </CCol>
                                        <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                                <div className="text-body-secondary text-truncate small">
                                                    Returning Volunteers
                                                </div>
                                                <div className="fs-5 fw-semibold">
                                                    91
                                                </div>
                                            </div>
                                        </CCol>
                                    </CRow>
                                    <hr className="mt-0" />
                                    {progressGroupExample1.map(
                                        (item, index) => (
                                            <div
                                                className="progress-group mb-4"
                                                key={index}
                                            >
                                                <div className="progress-group-prepend">
                                                    <span className="text-body-secondary small">
                                                        {item.title}
                                                    </span>
                                                </div>
                                                <div className="progress-group-bars">
                                                    <CProgress
                                                        thin
                                                        color="info"
                                                        value={item.value1}
                                                    />
                                                    <CProgress
                                                        thin
                                                        color="danger"
                                                        value={item.value2}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </CCol>
                                <CCol xs={12} md={6} xl={6}>
                                    <CRow>
                                        <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                                <div className="text-body-secondary text-truncate small">
                                                    Total
                                                </div>
                                                <div className="fs-5 fw-semibold">
                                                    114
                                                </div>
                                            </div>
                                        </CCol>
                                    </CRow>

                                    <hr className="mt-0" />

                                    {progressGroupExample2.map(
                                        (item, index) => (
                                            <div
                                                className="progress-group mb-4"
                                                key={index}
                                            >
                                                <div className="progress-group-header">
                                                    <CIcon
                                                        className="me-2"
                                                        icon={item.icon}
                                                        size="lg"
                                                    />
                                                    <span>{item.title}</span>
                                                    <span className="ms-auto fw-semibold">
                                                        {item.value}%
                                                    </span>
                                                </div>
                                                <div className="progress-group-bars">
                                                    <CProgress
                                                        thin
                                                        color="warning"
                                                        value={item.value}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}

                                    <div className="mb-5"></div>
                                </CCol>
                            </CRow>

                            <br />

                            <CTable
                                align="middle"
                                className="mb-0 border"
                                hover
                                responsive
                            >
                                <CTableHead className="text-nowrap">
                                    <CTableRow>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">
                                            <CIcon icon={cilPeople} />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">
                                            User
                                        </CTableHeaderCell>

                                        <CTableHeaderCell className="bg-body-tertiary">
                                            Growth
                                        </CTableHeaderCell>

                                        <CTableHeaderCell className="bg-body-tertiary">
                                            Activity
                                        </CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {tableExample.map((item, index) => (
                                        <CTableRow
                                            v-for="item in tableItems"
                                            key={index}
                                        >
                                            <CTableDataCell className="text-center">
                                                <CAvatar
                                                    size="md"
                                                    src={item.avatar.src}
                                                    status={item.avatar.status}
                                                />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.user.name}</div>
                                                <div className="small text-body-secondary text-nowrap">
                                                    <span>
                                                        {item.user.new
                                                            ? 'New'
                                                            : 'Recurring'}
                                                    </span>{' '}
                                                    | Registered:{' '}
                                                    {item.user.registered}
                                                </div>
                                            </CTableDataCell>

                                            <CTableDataCell>
                                                <div className="d-flex justify-content-between text-nowrap">
                                                    <div className="fw-semibold">
                                                        {item.usage.value}%
                                                    </div>
                                                    <div className="ms-3">
                                                        <small className="text-body-secondary">
                                                            {item.usage.period}
                                                        </small>
                                                    </div>
                                                </div>
                                                <CProgress
                                                    thin
                                                    color={item.usage.color}
                                                    value={item.usage.value}
                                                />
                                            </CTableDataCell>

                                            <CTableDataCell>
                                                <div className="small text-body-secondary text-nowrap">
                                                    Last login
                                                </div>
                                                <div className="fw-semibold text-nowrap">
                                                    {item.activity}
                                                </div>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
}

