import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from "react-icons/md";
import { Textarea, TypographyStyled } from './SalesAccordion.style';
import { Box, Button, FormControl, FormGroup, MenuItem, Modal, TextField } from '@mui/material';
import expense from '../data/expense.json'
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { BiSolidCommentDetail } from "react-icons/bi";
import { ImEnter } from "react-icons/im";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { inputExpense, resetExpense } from '../features/expenses/expenseSlice';
import { BsCashCoin } from "react-icons/bs";
import { Toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';

// type ExpenseType = {
//     id: number;
//     name: string;
//     type: string;
// }

// function filterItems(arr: ExpenseType[], query: string): ExpenseType[] {
//     return arr.filter((el) => el.type === query);
// }

// const field = [
//     'id',
//     'name',
//     'type'
// ] as const

// type Field = typeof field[number];

// const filterItem = (arr: ExpenseType[], query: string, field1: Field, count?: number): number => {
//     const record = arr.filter((el: ExpenseType) => el[field1] === query);
//     return record[0]['price']
// }

export default function ExpenseAccordion() {

    const dispatch = useDispatch<AppDispatch>()

    const [expanded, setExpanded] = useState<string | false>(false);

    const initializeData = {
        name: '',
        amount: 0,
        type: '',
        comment: '',
    }


    const [formData, setFormData] = useState(initializeData)

    const { name, amount, comment } = formData

    useEffect(() => {

    }, [])


    // Accordion
    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    // Form    
    const onChange = (e: ChangeEvent<any>) => {
        const { name, value } = e.target
        console.log('name - ', name)
        console.log('value - ', value)
        setFormData((prevState) => {
            return { ...prevState, [name]: name === 'amount' ? parseInt(value) : value }
        })
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useSelector((state: RootState) => state.sales)

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        /** Get the type of expense */
        const filteredExpense = expense.filter((item) => item.name === name)
        
        console.log('filter ', filteredExpense)

        if (filteredExpense.length === 0) {
            toast.error('Please enter expense')
            return
        }


        const expenseInput = { ...formData, type: filteredExpense[0].type}

        dispatch(inputExpense(expenseInput))
        handleClose()
        /** resets the sale state to blank */
        dispatch(resetExpense())
        /** Initializes the transaction form to blank after entry */
        setFormData(initializeData)
    }



    return (
        <div >
            <h2 style={{ color: 'green' }}> &#8369; {amount}.00 </h2>
            <FormControl component="fieldset" variant="standard" sx={{ minWidth: '100%' }}>
                <FormGroup sx={{ paddingBottom: '5rem' }} >

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <TypographyStyled> <BsCashCoin /> Expense</TypographyStyled>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ mb: '2rem' }}>
                                <TextField
                                    id="name"
                                    select
                                    label="Expense"
                                    defaultValue=""
                                    helperText="Please select your expense"
                                    value={name}
                                    onChange={onChange}
                                    name='name'
                                    sx={{ mb: '0.75rem', mr: '0.5rem' }}
                                    required
                                >
                                    {expense.map((item) => (
                                        <MenuItem key={item.id} value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    type='number'
                                    id="amount"
                                    label="Amount"
                                    value={amount}
                                    name='amount'
                                    onChange={onChange}
                                    disabled={name === '' ? true : false}
                                    sx={{ width: '12rem', }}
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel6bh-content"
                            id="panel6bh-header"
                        >
                            <TypographyStyled> <BiSolidCommentDetail /> Comment</TypographyStyled>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ mb: '1rem' }}>
                                <Textarea id='comment' value={comment} name='comment' onChange={onChange} aria-label="minimum height" minRows={3} placeholder="Place your comment here" />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <div>
                        <Button sx={{ mt: '1rem', width: '100%' }} startIcon={<ImEnter />} size='medium' variant='contained' onClick={handleOpen}>Enter Data</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Total Amount: &#8369; {amount}.00
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>Expense: {name}</div>
                                    <div>Amount: {amount}</div>
                                </Typography>
                                <Button onClick={onSubmit} variant='contained' endIcon={<IoMdSend />} sx={{ width: '100%' }}>Submit</Button>
                            </Box>
                        </Modal>
                    </div>

                </FormGroup>
            </FormControl>

        </div>
    );
}
