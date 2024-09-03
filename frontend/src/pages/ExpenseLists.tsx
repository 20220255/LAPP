import { GridColDef, GridEventListener, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid'
import { DataGridStyle, StripedDataGrid } from './TransactionList.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { useEffect, useMemo, useState } from 'react';
import { SalesType } from '../features/sales/salesSlice';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs'
import { Autocomplete, TextField } from '@mui/material';
import { getAllUsers } from '../features/users/userSlice';
import { ExpenseType, getExpenseList, initialExpenseState } from '../features/expenses/expenseSlice';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Expense', width: 125 },
    { field: 'amount', headerName: 'Total Amount', valueFormatter: (foldsValue: number) => foldsValue + '.00', width: 150 },
    { field: 'dateEntered', headerName: 'Date Entered', width: 175 },
    { field: 'comment', headerName: 'Comment/Description', width: 250 },

];

/** Take note of tha valueFormatter function for nested object fields */
const columnsAdmin: GridColDef[] = [
    { field: 'name', headerName: 'Expense', width: 125 },
    { field: 'amount', headerName: 'Total Amount', valueFormatter: (foldsValue: number) => foldsValue + '.00', width: 150 },
    { field: 'dateEntered', headerName: 'Date Entered', width: 175 },
    { field: 'comment', headerName: 'Comment/Description', width: 350 },
    { field: 'userId', headerName: 'Entered by', valueFormatter: (value: SalesType) => value.firstName, width: 200 },
];


const ExpenseLists = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    /** Gets the current user logged in with the auth state */
    const { user } = useSelector((state: RootState) => state.auth)

    /** Gets the users list state auth*/
    const { users, isUserLoading } = useSelector((state: RootState) => state.user)

    /** Gets all the expense list from expense state */
    const { isLoading, expenseList, isSuccess } = useSelector((state: RootState) => state.expense)

    const [totalAmountList, setTotalAmountList] = useState() as [number, (p: number) => void]
    const [myExpenseList, setMyExpenseList] = useState(initialExpenseState.expenseList) as [ExpenseType[], (p: object) => void]

    const [userValue, setUserValue] = useState<string | null>('');

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

            /** Get the end date from the date picker */
            const plus1EndDate = new Date(endDate);
            plus1EndDate.setDate(plus1EndDate.getDate());

            /** Due to typescript, needed to validate start and end date first */
            if (minus1StartDate && plus1EndDate) {
                const dayjsStartDate = dayjs(minus1StartDate).format('YYYY-MM-DD')
                const dayjsEndDate = dayjs(plus1EndDate).format('YYYY-MM-DD')

                /** If user is admin, all expense will be displayed otherwise, Only the sales entered by the user will be displayed hence the isAdmin parameter*/
                const getUser = async () => {
                    await getMyExpenseList(user._id, dayjsStartDate, dayjsEndDate, user.isAdmin)
                }
                getUser()
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateValue, userValue, expenseList])


    /** Get the Total Sales computation function */
    const getTotalExepense = (expenseList: ExpenseType[]): number => {
        return expenseList.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)
    }

    /** Used to get the list or array of user first name for the  Autocomplete text component*/
    const selectedValues = useMemo(() => users.map((user) => user.firstName), [users])

    /** This will get states fronm db and it uses useMemo for performance improvement to retrieve (dispatch) states. Does not execute on re render if values for users and sales list were not changed */
    useMemo(() => dispatch(getAllUsers()), [dispatch])
    useMemo(() => dispatch(getExpenseList()), [dispatch])

    /** Get sales transaction based on user id that's logged in and date filtered from the date picker  as well filter users from Autocomplete component*/
    const getMyExpenseList = async (user: any, startDate: string, endDate: string, isAdmin: boolean) => {
        let myExpenseList = []

        /** Filter sales list based on user id and if user is not admin*/
        if (!isAdmin) {
            // const allSalesList =   await (await dispatch(getSalesList())).payload
            // mySalesList = allSalesList.filter((sales: SalesType) => sales.userId._id === user) as SalesListType[]
            myExpenseList = expenseList!.filter((item: ExpenseType) => item.userId?._id === user) as ExpenseType[]
        } else {
            /** If no user was entered in ther filter box, all expense will be displayed */
            if (!userValue || userValue === '') {
                myExpenseList = expenseList!
            } else {
                myExpenseList = expenseList!.filter((item: ExpenseType) => item.userId?.firstName === userValue)
            }
        }

        /** Filter expense based on the start and end date entered on the date picker */
        /** Parse date value into string as is in UTC format and convert it into locale date */
        const myFilteredDateExepenseList = myExpenseList.filter((item: ExpenseType) => {
            return Date.parse(new Date(item.dateEntered!).toLocaleDateString()) > Date.parse(startDate.toString()) && Date.parse(new Date(item.dateEntered!).toLocaleDateString()) < Date.parse(endDate.toString())
        })

        setMyExpenseList(myFilteredDateExepenseList)

        /** Get total sales computation */
        const totalExpense = getTotalExepense(myFilteredDateExepenseList)
        setTotalAmountList(totalExpense)
    }

    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        const { _id } = params.row
        navigate(`/expense-maintenance/${_id}`)
    }


    const CustomToolbar = () => {
        return (
            <GridToolbarContainer style={{ marginTop: '0.5rem' }}>
                <div style={{ marginRight: 'auto', justifySelf: 'end', flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexShrink: 'inherit' }}>

                    {user.isAdmin ? (
                        <>
                            <Autocomplete
                                value={userValue}
                                onChange={(event: any, newValue: string | null) => {
                                    setUserValue(newValue);
                                }}
                                id="controllable-states-demo"
                                options={selectedValues}
                                sx={{ width: 300, mr: 1, ml: 1 }}
                                renderInput={(params) => <TextField {...params} label="User" />}
                                isOptionEqualToValue={(option, value) => option.valueOf === value.valueOf}
                            />
                            <DateRangePicker onChange={onChange} value={dateValue}
                            />

                        </>
                    ) : (
                        <>
                            <DateRangePicker onChange={onChange} value={dateValue}
                            />
                        </>
                    )
                    }
                </div>

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

    if (isLoading || isUserLoading || !isSuccess) {
        return <Spinner />;
    } else {
        return (
            <>
                <DataGridStyle>
                    <div style={{ flexWrap: 'wrap', flexDirection: 'row', display: 'flex', alignContent: 'center' }}>
                        <div style={{ margin: 'auto', color: 'green', marginBottom: '0.25rem', textAlign: 'center', fontSize: '1.5rem' }}>
                            Total Expense: <span style={{ paddingLeft: '0.25rem' }}>&#8369; {`${totalAmountList}.00`}</span>
                        </div>

                    </div>

                    <div style={{ marginTop: '0.15rem' }}>

                        <StripedDataGrid
                            rows={myExpenseList}
                            columns={user.isAdmin ? columnsAdmin : columns}
                            density='standard'
                            slots={{
                                toolbar: CustomToolbar,
                            }}
                            pageSizeOptions={[5, 10, 100]}
                            onRowClick={handleRowClick}
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

export default ExpenseLists
