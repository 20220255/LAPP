import { GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import products from '../data/prodcut.json'
import { DataGridStyle, StripedDataGridExpense } from '../pages/TransactionList.style';
import SupplyCard from './SupplyCard'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { SupplyType } from '../features/supplies/supplyTypes';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { getAllSupplies } from '../features/supplies/supplySlice';

export type LaundrySupplies = {
    supplyName: string;
    id: number;
    count: number;
    image: string;
}

const columns: GridColDef[] = [
    { field: 'supplyName', headerName: 'Supply', width: 125 },
    { field: 'count', headerName: 'Total', width: 100 },
    { field: 'countAdded', headerName: 'Added', width: 125 },
    { field: 'countDeducted', headerName: 'Deducted', width: 125 },
    { field: 'dateEntered', headerName: 'Date', width: 125 },
    { field: 'customerName', headerName: 'Customer', width: 200 },
    { field: 'userId', headerName: 'Entered by', valueFormatter: (value: SupplyType) => value.firstName, width: 250 },
    { field: 'comment', headerName: 'Comment', width: 200 },
];


export default function SuppliesDetergent() {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getAllSupplies())
    }, [dispatch])

    /** Filter the laundry Supplies with type detergent */
    const detergentSupplies = products.filter(product => product.type === 'detergent' && product.name !== 'No Detergent').map((product) => {
        return { supplyName: product.name, id: product.id, count: 0, image: product.image }
    })

    /** Gets the all the supplies transactions */
    const { supplyList, isLoadingSupply, isSuccessSupply } = useSelector((state: RootState) => state.supply)

    let copyDetergentSupplies: SupplyType[] = [];

    detergentSupplies.forEach(async (supply) => {
        supplyList.forEach(async (item) => {
            if (item.supplyName === supply.supplyName) {
                /** Creates a copy of the supplies from the supplies list from the database and adds the image coming from the laundry supplies */
                copyDetergentSupplies = [...copyDetergentSupplies, { ...item, image: supply.image }];
            }
        })
    });

    /** Gets the unique supplies from the list of supplies and takes latest transaction date from each unique supplies  */
    const supplyResult = Object.values(
        copyDetergentSupplies.reduce(function (r: any, e: SupplyType) {
            if (!r[e.supplyName]) r[e.supplyName] = e;
            else if (e.createdAt > r[e.supplyName].createdAt) r[e.supplyName] = e;
            return r;
        }, {})
    ) as SupplyType[];


    const CustomToolbar = () => {
        return (
            <GridToolbarContainer style={{ marginTop: '0.5rem' }}>
                <div style={{ marginRight: 'auto', justifySelf: 'end', flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexShrink: 'inherit' }}>

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


    if (isLoadingSupply || !isSuccessSupply) {
        return <Spinner />;
    } else {

        return (
            <>
                <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }} >
                    {supplyResult.map((supply) => (
                        <SupplyCard key={supply._id} supply={supply} />
                    ))}
                </div>


                <DataGridStyle>
                    <div style={{ flexWrap: 'wrap', flexDirection: 'row', display: 'flex', alignContent: 'center' }}>
                    </div>

                    <div style={{ marginTop: '0.15rem' }}>

                        <StripedDataGridExpense
                            rows={supplyList}
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
                            sx={{ height: '20rem' }}
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
    }
}
