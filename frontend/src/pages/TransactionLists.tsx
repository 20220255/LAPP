import { GridColDef, GridEventListener, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid'
import { DataGridStyle, StripedDataGrid } from './TransactionList.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { useEffect, useState } from 'react';
import { getSalesList, SalesListType, SalesType } from '../features/sales/salesSlice';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { initialState } from '../features/sales/salesSlice'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs'

const columns: GridColDef[] = [
    // { field: '_id', headerName: 'Sales ID', width: 150 },
    { field: 'firstName', headerName: 'Customer', width: 125 },
    // { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'totalSales', headerName: 'Total Sales', width: 75 },
    { field: 'dateEntered', headerName: 'Date Entered', width: 200 },
    { field: 'userId', headerName: 'Entered by', width: 200 },
];


const TransactionLists = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    /** Gets the current user logged in with the auth state */
    const { user } = useSelector((state: RootState) => state.auth)
    const { salesList, isLoading } = useSelector((state: RootState) => state.sales)

    const [totlSalesList, setTotalSalesList] = useState() as [number, (p: number) => void]
    const [allSalesList, setAllSalesList] = useState(salesList) as [SalesListType[], (p: object) => void]
    const [mySalesList, setMySalesList] = useState(initialState.salesList) as [SalesListType[], (p: object) => void]

    type ValuePiece = Date | null | string;
    type Value = ValuePiece | [ValuePiece, ValuePiece];

    //* new Date() - currrent
    const [dateValue, onChange] = useState<Value>([new Date(), new Date()]);

    useEffect(() => {
        /** This will trigger if the dates for the date picker has changed - dateValue */
        /* Get the start date for filtering the sales list for the data grid */
        const startDate = dateValue?.toString().split(',')[0]
        const endDate = dateValue?.toString().split(',')[1]

        if (endDate && startDate) {
            /** Get the start date from the date picker and subtract 1. This will correctly display the sales on the data grid */
            const minus1StartDate = new Date(startDate)
            minus1StartDate.setDate(minus1StartDate.getDate() - 1)

            /** Get the end date from the date picker and add 1. This will correctly display the sales on the data grid */
            const plus1EndDate = new Date(endDate);
            plus1EndDate.setDate(plus1EndDate.getDate() + 1);

            /** Due to typescript, needed to validate start and end date first */
            if (minus1StartDate && plus1EndDate) {
                const dayjsStartDate = dayjs(minus1StartDate).format('YYYY-MM-DD')
                const dayjsEndDate = dayjs(plus1EndDate).format('YYYY-MM-DD')

                /** If user is admin, all sales will be displayed otherwise, Only the sales entered by the user will be displayed */
                const getUser = async () => {
                    !user.isAdmin ? await getMySalesList(user._id, dayjsStartDate, dayjsEndDate) : await getAllTransactionList()
                }
                getUser()
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateValue])

    /** Get the Total Sales computation function */ 
    const getTotalSales = (salesList: SalesListType[]): number => {
        return salesList.reduce((accumulator, currentValue) => accumulator + currentValue.totalSales, 0)
    }

    /* Get all sales transactions from the sales state function */
    const getAllTransactionList = async () => {
        const allSalesList = await dispatch(getSalesList())
        setAllSalesList(allSalesList.payload)
        const totalSales = getTotalSales(allSalesList.payload)
        setTotalSalesList(totalSales)
    }

    /** Get sales transaction based on user id that's logged in and date filtered from the date picker */ 
    const getMySalesList = async (user: any, startDate: string, endDate: string) => {
        const allSalesList = await dispatch(getSalesList())
        
        /** filter sales list based on user id */
        const mySalesList = await allSalesList.payload.filter((sales: SalesType) => sales.userId === user) as SalesListType[]

        /** Filter sales based on the start and end date entered on the date picker */
        /** Parse date value into string as is in UTC format and convert it into locale date */
        const myFilteredDateSalesList = mySalesList.filter((sales: SalesListType) => { return Date.parse(new Date(sales.dateEntered).toLocaleDateString()) > Date.parse(startDate.toString()) && Date.parse(new Date(sales.dateEntered).toLocaleDateString()) <= Date.parse(endDate.toString()) })
        setMySalesList(myFilteredDateSalesList)

        /** Get total sales computation */
        const totalSales = getTotalSales(myFilteredDateSalesList)
        setTotalSalesList(totalSales)
    }

    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        const { _id } = params.row
        navigate(`/transaction-maintenance/${_id}`)
    }

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
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

    if (isLoading) {
        return <Spinner />;
    } else {
        return (
            <>
                <DataGridStyle>
                    <div style={{ flexWrap: 'wrap', flexDirection: 'row', display: 'flex', alignContent: 'center' }}>
                        <div style={{ margin: 'auto', color: 'green', marginBottom: '0.25rem', textAlign: 'center', fontSize: '1.5rem' }}>
                            Total Sales: <span style={{ paddingLeft: '0.25rem' }}>&#8369; {`${totlSalesList}.00`}</span>
                        </div>
                        <div style={{ margin: 'auto', justifySelf: 'end' }}>
                            <DateRangePicker onChange={onChange} value={dateValue}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '0.15rem' }}>
                        <StripedDataGrid
                            rows={user.isAdmin ? allSalesList : mySalesList}
                            columns={columns}
                            density='standard'
                            slots={{
                                toolbar: CustomToolbar,
                            }}
                            pageSizeOptions={[5, 10, 100]}
                            onRowClick={handleRowClick}
                            getRowId={(row) => row._id}
                            getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                            }
                            autoHeight
                        />
                    </div>
                </DataGridStyle>

            </>

        )
    };

}

export default TransactionLists
