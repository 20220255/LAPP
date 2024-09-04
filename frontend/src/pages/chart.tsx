import { BarChart } from '@mui/x-charts/BarChart';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { ExpenseType, getExpenseList } from '../features/expenses/expenseSlice';
import { useEffect } from 'react';
import { getSalesList } from '../features/sales/salesSlice';
import Spinner from '../components/Spinner';

export default function BasicBars() {

    const { isLoading, salesList } = useSelector((state: RootState) => state.sales)

    const { expenseList, isLoadingExp, isSuccessExp } = useSelector((state: RootState) => state.expense)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {

        const dipatchExpenseAndSales = async() => {
            await dispatch(getSalesList())
            await dispatch(getExpenseList())
        }

        dipatchExpenseAndSales();

    }, [dispatch])


    /** Get sales data per day */
    const groupedByDate = salesList.reduce((acc: any, item) => {
        const dateEntered = item.dateEntered!;
        (acc[dateEntered] = acc[dateEntered] || []).push(item.totalSales);
        return acc;
    }, {});

    const resultArray = Object.values(groupedByDate)
    const arrayLength = resultArray.length
    var sales = []
    for (let index = 0; index < arrayLength; index++) {
        const arrayElement = resultArray[index] as number[];
        sales[index] = arrayElement.reduce((a, c) => {
            return a + c
        }, 0)
    }


    /** Get expense data per day */
    const groupedByDateExp = expenseList.reduce((accExp: any, item: ExpenseType) => {
        const dateGrp = item.dateEntered;
        (accExp[dateGrp!] = accExp[dateGrp!] || []).push(item.amount);
        return accExp;
    }, {});

    const resultArrayExp = Object.values(groupedByDateExp)
    const arrayLengthExp = resultArrayExp.length
    var expense: number[] = []
    for (let index = 0; index < arrayLengthExp; index++) {
        const arrayElement = resultArrayExp[index] as number[];
        expense[index] = arrayElement.reduce((a, c) => {
            return a + c
        }, 0)
    }


    /** Get the dates entered */
    let uniqueDates = salesList.map(item => item.dateEntered).filter((value, index, self) =>
        self.indexOf(value) === index);

    var netIncome = sales.map(function (item: any, index) {
        // In this case item correspond to currentValue of array a, 
        // using index to get value from array b
        return item - expense[index];
    })

    if (isLoadingExp || !isSuccessExp || isLoading || !isSuccessExp) {
        return <Spinner />;
    } else {
        return (
            <BarChart
                width={500}
                height={300}
                series={[
                    { data: sales, label: 'Sales', id: 'salesId' },
                    { data: expense, label: 'Expense', id: 'expenseId' },
                    { data: netIncome, label: 'Net Income', id: 'netIncomeId' },
                ]}
                xAxis={[{
                    data: uniqueDates,
                    scaleType: 'band',
                }]}
                colors={['green', 'red', 'blue']}
            />
        );
    }


}






