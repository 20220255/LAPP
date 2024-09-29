import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from "react-icons/md";
import { Textarea, TypographyStyled } from './SalesAccordion.style';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, FormGroup, MenuItem, Slide, TextField } from '@mui/material';
import expense from '../data/expense.json'
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { BiSolidCommentDetail } from "react-icons/bi";
import { ImEnter } from "react-icons/im";
import { IoMdSend } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { inputExpense, resetExpense } from '../features/expenses/expenseSlice';
import { BsCashCoin } from "react-icons/bs";
import { toast } from 'react-toastify';
import { TiCancel } from 'react-icons/ti';

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
        setFormData((prevState) => {
            return { ...prevState, [name]: name === 'amount' ? parseInt(value) : value }
        })
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // useSelector((state: RootState) => state.sales)

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        /** Get the type of expense */
        const filteredExpense = expense.filter((item) => item.name === name)

        if (filteredExpense.length === 0) {
            toast.error('Please enter expense')
            return
        }


        const expenseInput = { ...formData, type: filteredExpense[0].type }

        dispatch(inputExpense(expenseInput))
        handleClose()
        /** resets the sale state to blank */
        dispatch(resetExpense())
        /** Initializes the transaction form to blank after entry */
        setFormData(initializeData)
    }



    return (
        <div >
            <h2 style={{ color: 'red' }}> &#8369; {amount}.00 </h2>
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
                                    {expense.sort((a, b) => a.name > b.name ? 1 : -1).map((item) => (
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
                        <Dialog
                            open={open}
                            TransitionComponent={Slide}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description" component='span' >
                                    <Box component='span'>
                                        <Typography sx={{ color: 'red' }} id="modal-modal-title" variant="h5" component="span">
                                            Total Amount: &#8369; {amount}.00
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }} component='span' >
                                            <div>Expense: {name}</div>
                                            <div>Comment: {comment}</div>
                                        </Typography>
                                    </Box>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} variant='contained' endIcon={<TiCancel />} sx={{ width: '100%' }}>Cancel</Button>
                                <Button onClick={onSubmit} variant='contained' endIcon={<IoMdSend />} sx={{ width: '100%' }}>Submit</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </FormGroup>
            </FormControl>

        </div>
    );
}
