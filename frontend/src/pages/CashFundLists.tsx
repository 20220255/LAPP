import { GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid'
import { DataGridStyle, StripedDataGridExpense } from './TransactionList.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { getLast20CF } from '../features/cashFund/cashFundSlice';

interface UserId {
    firstName: string;
    _id: string;
  }

const columns: GridColDef[] = [
    { field: 'amount', headerName: 'Amount', width: 125 },
    { field: 'amountAdded', headerName: 'Amount Added', valueFormatter: (amountAdded: number) => amountAdded ? amountAdded + '.00' : '', width: 150 },
    { field: 'amountDeducted', headerName: 'Amount Deducted', valueFormatter: (amountDeducted: number) => amountDeducted ? amountDeducted + '.00' : '', width: 175 },
    { field: 'expenseName', headerName: 'Expense', width: 250 },
    { field: 'dateEntered', headerName: 'Date Entered', width: 175 },
    { field: 'userId', headerName: 'Entered by', valueFormatter: (value: UserId) => value.firstName,  width: 200 },
    { field: 'comment', headerName: 'Comment/Description', width: 250 },

];

const CashFundLists = () => {

    const dispatch = useDispatch<AppDispatch>()

    /** Gets the users list state auth*/
    const { isUserLoading } = useSelector((state: RootState) => state.user)

    /** Gets all the cash fund list from the cash fund state */
    const { isLoadingCf, cashFundList, isSuccessCf } = useSelector((state: RootState) => state.cashFund)

    useEffect(() => {

        const getCashFundList = async () => {
            await dispatch(getLast20CF())
        }

        getCashFundList()

    }, [dispatch])

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer style={{ marginTop: '0.5rem' }}>
                <div style={{ flexWrap: 'wrap', flexDirection: 'row', display: 'flex', alignContent: 'center', columnGap: '23rem' }}>
                    <div style={{ margin: 'auto' }} >
                        <GridToolbarColumnsButton />
                        <GridToolbarFilterButton />
                        <GridToolbarExport />
                    </div>
                </div>
            </GridToolbarContainer>
        )
    }

    if (isLoadingCf || isUserLoading || !isSuccessCf) {
        return <Spinner />;
    } else {
        return (
            <>
                <DataGridStyle>
                    <div style={{ flexWrap: 'wrap', flexDirection: 'row', display: 'flex', alignContent: 'center' }}>
                        <div style={{ margin: 'auto', marginBottom: '0.25rem', textAlign: 'center', fontSize: '1.5rem' }}>
                            Cash Fund Last 20 Transactions
                        </div>

                    </div>

                    <div style={{ marginTop: '0.15rem' }}>

                        <StripedDataGridExpense
                            rows={cashFundList}
                            columns={columns}
                            density='standard'
                            slots={{
                                toolbar: CustomToolbar,
                            }}
                            pageSizeOptions={[5, 10, 100]}
                            // onRowClick={handleRowClick}
                            getRowId={(row) => row._id}
                            getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                            }
                            sx={{ height: '28rem' }}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 5, page: 0 },
                                },
                            }}
                        />
                    </div>
                </DataGridStyle>

            </>

        )
    };

}

export default CashFundLists
