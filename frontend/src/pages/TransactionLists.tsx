import { GridColDef, GridEventListener, GridToolbar } from '@mui/x-data-grid'
import { DataGridStyle, StripedDataGrid } from './TransactionList.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { useEffect } from 'react';
import { getSalesList } from '../features/sales/salesSlice';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
    // { field: '_id', headerName: 'Sales ID', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'totalSales', headerName: 'Total Sales', width: 150 },
    { field: 'createdAt', headerName: 'Date Entered', width: 200 },
];


const TransactionLists = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const { salesList, isLoading } = useSelector((state: RootState) => state.sales)

    useEffect(() => {

        const getList = async () => {
            await dispatch(getSalesList())
        }
        getList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        const { _id } = params.row
        navigate(`/transaction-maintenance/${_id}`)
    }

    if (isLoading) {
        return <Spinner />;
    } else {
        return (
            <DataGridStyle>
                <StripedDataGrid
                    rows={salesList}
                    columns={columns}
                    density='comfortable'
                    slots={{ toolbar: GridToolbar }}
                    onRowClick={handleRowClick}
                    getRowId={(row) => row._id}
                    getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    } />
            </DataGridStyle>
        )
    };

}

export default TransactionLists
