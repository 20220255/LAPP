import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import Spinner from "../components/Spinner";
import { DataGridStyle, StripedDataGrid } from "./TransactionList.style";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useCallback, useMemo, useState } from "react";
import { getSalesList, initialState, SalesType } from "../features/sales/salesSlice";
import { GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { Autocomplete, TextField } from "@mui/material";
import { getAllUsers } from "../features/users/userSlice";
import useDatagrid from "../hooks/useDatagrid";

const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'Customer', width: 100 },
    { field: 'folds', headerName: 'Folds', width: 50 },
    { field: 'foldsShare', headerName: 'Share', valueFormatter: (foldsValue: number) => foldsValue + '.00', width: 80 },
    { field: 'dateEntered', headerName: 'Date Entered', width: 125 },

];

const columnsAdmin: GridColDef[] = [
    { field: 'firstName', headerName: 'Customer', width: 135 },
    { field: 'folds', headerName: 'Folds' },
    { field: 'foldsShare', headerName: 'Share', valueFormatter: (foldsValue: number) => foldsValue + '.00', width: 80 },
    { field: 'dateEntered', headerName: 'Date Entered', width: 125 },
    { field: 'userId', headerName: 'Entered by', valueFormatter: (value: SalesType) => value.firstName, width: 200 },
];


const FoldsList = () => {

    const [mySalesList, setMySalesList] = useState(initialState.salesList) as [SalesType[], (p: object) => void]
    const [totalFoldsNum, setTotalFoldsNum] = useState() as [number, (p: number) => void]

    // const [userValue, setUserValue] = useState<string | null>('');

    /** Gets the current user logged in with the auth state */
    const { user } = useSelector((state: RootState) => state.auth)

    /** Gets the users list state auth*/
    const { users, isUserLoading, isUserSuccess } = useSelector((state: RootState) => state.user)

    /** Gets all the sales list from sales state */
    const { isLoading, salesList, isSuccess } = useSelector((state: RootState) => state.sales)

    const [userValue, setUserValue] = useState<string | null>('');

    const dispatch = useDispatch<AppDispatch>()

    /** Get the Total Folds computation function */
    const getTotalFolds = (salesList: SalesType[]): number => {
        return salesList.reduce((accumulator, currentValue) => accumulator + currentValue.foldsShare, 0)
    }

    /** Used to get the list or array of user first name for the  Autocomplete text component*/
    const selectedValues = useMemo(() => users.map((user) => user.firstName), [users])


    /** This will get states fronm db and it uses useMemo for performance improvement to retrieve (dispatch) states. Does not execute on re render if values for users and sales list were not changed */
    useMemo(() => dispatch(getAllUsers()), [dispatch])
    useMemo(() => dispatch(getSalesList()), [dispatch])

    /** useCallback to prevent re-rendering and is used outside of useEffect */
    const getMyFoldsList = useCallback(async (userId: any, startDate: string, endDate: string, isAdmin: boolean) => {

        let myFoldsList = []

        /** Filter sales list based on user id and if user is not admin*/
        if (!isAdmin) {
            myFoldsList = salesList.filter((sales: SalesType) => sales.userId._id === userId) as SalesType[]
        } else {
            /** If no user was entered in ther filter box, all sales will be displayed */
            if (!userValue || userValue === '') {
                myFoldsList = salesList
            } else {
                myFoldsList = salesList.filter((sales: SalesType) => sales.userId.firstName === userValue)
            }
        }

        /** Filter sales based on the start and end date entered on the date picker */
        /** Parse date value into string as is in UTC format and convert it into locale date */
        const myFilteredFoldsSalesList = myFoldsList.filter((sales: SalesType) => {
            return new Date(sales.dateEntered!) > new Date(startDate) && new Date(sales.dateEntered!) < new Date(endDate)
        })

        /** Filter sales that has folds only */
        const filterWithFoldsOnly = myFilteredFoldsSalesList.filter((sales: SalesType) => sales.folds > 0)

        setMySalesList(filterWithFoldsOnly)

        /** Get total folds share computation */
        const totalFolds = getTotalFolds(filterWithFoldsOnly)
        setTotalFoldsNum(totalFolds)
    }, [salesList, userValue])

    /** Custom hook to set the user and current date after mounting the datagrid component */
    const { dateValue, onChange } = useDatagrid(getMyFoldsList, user)

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

    if (isLoading || isUserLoading || !isSuccess || !isUserSuccess) {
        return <Spinner />;
    } else {
        return (
            <>
                <DataGridStyle>
                    <div style={{ flexWrap: 'wrap', flexDirection: 'row', display: 'flex', alignContent: 'center' }}>
                        <div style={{ margin: 'auto', color: 'green', marginBottom: '0.25rem', textAlign: 'center', fontSize: '1.5rem' }}>
                            {`Total Folds Share: `} <span style={{ paddingLeft: '0.25rem' }}> &#8369;{` ${totalFoldsNum}`}.00</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '0.15rem' }}>
                        <StripedDataGrid
                            rows={mySalesList}
                            columns={user.isAdmin ? columnsAdmin : columns}
                            density='standard'
                            slots={{
                                toolbar: CustomToolbar,
                            }}
                            pageSizeOptions={[5, 10, 100]}
                            getRowId={(row) => row._id}
                            getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                            }
                            // autoHeight
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

export default FoldsList
