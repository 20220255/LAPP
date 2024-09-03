import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from "react-icons/md";
import { Textarea, TypographyStyled } from './SalesAccordion.style';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormGroup, MenuItem, Modal, Slide, TextField } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { BiSolidCommentDetail } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import { GrDocumentUpdate } from "react-icons/gr";
import { RiDeleteBin2Line } from "react-icons/ri";
import { deleteExpense, ExpenseType, resetExpense, updateExpense } from '../features/expenses/expenseSlice';
import expense from '../data/expense.json'
import { toast } from 'react-toastify';
import { BsCashCoin } from 'react-icons/bs';

export const ExpenseAccordionsMaintenance = ({ expenseId }: { expenseId: string | undefined }) => {

    const dispatch = useDispatch<AppDispatch>()

    const { expenseList } = useSelector((state: RootState) => state.expense)

    const expenseRecord = expenseList.find((obj) => obj._id === expenseId)

    const [expanded, setExpanded] = useState<string | false>(false);

    const initializeExpenseData = {
        _id: expenseRecord?._id || '',
        name: expenseRecord?.name || '',
        type: expenseRecord?.type || '',
        amount: expenseRecord?.amount || 0,
        comment: expenseRecord?.comment || '',
        userId: {
            _id: expenseRecord?.userId?._id || '',
            firstName: expenseRecord?.userId?.firstName || '',
        },
        dateEntered: expenseRecord?.dateEntered || '',
    }


    const [formData, setFormData] = useState<ExpenseType>(initializeExpenseData)

    const { _id, name, amount, comment, } = formData

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
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const navigate = useNavigate()

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDelete = () => {
        setOpenDeleteDialog(false);
    };

    const handleDeleteSales = () => {
        handleClose()
        dispatch(deleteExpense(_id))
        navigate('/expense-list')
    }


    useSelector((state: RootState) => state.sales)
    // const navigate = useNavigate()

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        /** Get the type of expense */
        const filteredExpense = expense.filter((item) => item.name === name)

        if (filteredExpense.length === 0) {
            toast.error('Please enter expense')
            return
        }
        const expenseInput = { ...formData, type: filteredExpense[0].type }

        dispatch(updateExpense(expenseInput))
        handleClose()
        /** resets the sale state to blank */
        dispatch(resetExpense())
        /** Initializes the transaction form to blank after entry */
        setFormData(initializeExpenseData)
        navigate('/expense-list')
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
                        <Box>
                            <Button color='error' sx={{ mt: '1rem', width: '40%', m: '1rem' }} startIcon={<RiDeleteBin2Line />} size='medium' variant='contained' onClick={handleClickOpenDeleteDialog}>Delete</Button>

                            <Button sx={{ mt: '1rem', width: '40%', m: '1rem' }} startIcon={<GrDocumentUpdate />} size='medium' variant='contained' onClick={handleOpen}>Update</Button>
                        </Box>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Total Sales: &#8369; {amount}.00
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>Expense: {name}</div>
                                    <div>Amount: {amount}</div>
                                </Typography>
                                <Button onClick={onSubmit} variant='contained' endIcon={<GrDocumentUpdate />} sx={{ width: '100%' }}>Submit</Button>
                            </Box>
                        </Modal>
                    </div>

                    <div>

                        <Dialog
                            open={openDeleteDialog}
                            TransitionComponent={Slide}
                            keepMounted
                            onClose={handleCloseDelete}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle color='red'> <div>Customer: {name} </div> <div>Expense Amount: {amount}</div>  </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    This sales transaction item will be deleted. Are your sure?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDelete}>Cancel</Button>
                                <Button onClick={handleDeleteSales}>Yes</Button>
                            </DialogActions>
                        </Dialog>

                    </div>

                </FormGroup>
            </FormControl>

        </div>
    );
}


export default ExpenseAccordionsMaintenance