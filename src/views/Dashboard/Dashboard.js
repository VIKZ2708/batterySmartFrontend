import React, {useEffect, useState} from 'react';

import { Box } from "@material-ui/core";
import axios from 'axios';
import { PageBody, PageHeader } from "../../components";
import { DataGrid } from '@mui/x-data-grid';

const Dashboard = () => {

  const [users, setUsers] = useState([])

  // const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/tasks/getAll")
      .then(function(response) {
        setUsers(response.data.data)
        console.log(users);
      }).catch(function(error) {
        console.log(error);
      })
  }, []);

    console.log(users);
    const columns = [
      { field: 'id', headerName: 'Name', width: 130 },
      { field: 'phoneNumber', value: 'Phone Number', width: 130 },
      { field: 'value', headerName: 'Value', width: 130},
      { field: 'emailId', headerName: 'Email', width: 250 },
  ];
    const rows =users.map(user=>({ id: user.name, phoneNumber: user.phoneNumber,  value: user.value, emailId: user.emailId }));

  return (
    <React.Fragment>
      <PageHeader title='CRUD of   List of Battery Owners' />
      <PageBody style={{ display: "flex" }}>
      {<DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
     }   </PageBody>
    </React.Fragment>
  );
};

export default Dashboard;
