import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from "react-icons/md";
import { Textarea, TypographyStyled } from './SalesAccordion.style';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, FormGroup, MenuItem, Slide, TextField } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useMemo, useState } from 'react';
import { BiSolidCommentDetail } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { CashFundType, deductCashFund, getLastCF } from '../features/cashFund/cashFundSlice';
import { TbCashRegister } from "react-icons/tb";
import expense from '../data/expense.json'
import { toast } from 'react-toastify';

export default function DeductCashFundAccordion() {

    const dispatch = useDispatch<AppDispatch>()

    const [expanded, setExpanded] = useState<string | false>(false);

    const initializeData = {
        amountDeducted: 0,
        comment: '',
        expenseName: '',
    } as CashFundType

    const [formData, setFormData] = useState(initializeData)

    const { amountDeducted, comment, expenseName } = formData

    useMemo(() => dispatch(getLastCF()), [dispatch])

    const { cashFund } = useSelector((state: RootState) => state.cashFund)

    const { amount } = cashFund

    // Accordion
    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    // Form    
    const onChange = (e: ChangeEvent<any>) => {
        const { name, value } = e.target
        setFormData((prevState) => {
            return { ...prevState, [name]: name === 'amountDeducted' ? parseInt(value) : value }
        })
    }

    const [newAmount, setNewAmount] = useState(0)

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        if (amountDeducted! > amount!) {
            return toast.error('Insufficient Cash Fund')
        }
        if (!expenseName || expenseName === '') {
            return toast.error('Expense name cannot be blank')
        }
        setOpen(true)
        setNewAmount(amount! - amountDeducted!)
    };
    const handleClose = () => setOpen(false);


    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        // setNewAmount(amount! - amountDeducted!)
        const deductedCashFund = { ...formData, expenseName, amountDeducted, amount: newAmount, comment }
        await dispatch(deductCashFund(deductedCashFund))
        dispatch(getLastCF())
        handleClose()
        /** Initializes the transaction form to blank afte entry */
        setFormData(initializeData)
    }

    return (
        <div >
            <h1 style={{ color: 'green' }}> &#8369; {amount}.00 </h1>
            <FormControl component="fieldset" variant="standard" sx={{ minWidth: '100%' }}>
                <FormGroup sx={{ paddingBottom: '5rem' }} >
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <TypographyStyled sx={{color: 'red'}} >
                                <TbCashRegister /> Deduct from Cash Fund
                            </TypographyStyled>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ mb: '1rem' }}>
                                <TextField
                                    id="expenseName"
                                    select
                                    label="Expense"
                                    defaultValue=""
                                    helperText="Please select your expense"
                                    value={expenseName}
                                    onChange={onChange}
                                    name='expenseName'
                                    sx={{ mb: '0.75rem', mr: '0.5rem' }}
                                    required={true}
                                >
                                    {expense.map((item) => (
                                        <MenuItem key={item.id} value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    type='number'
                                    id="amountDeducted"
                                    label="Deduct from Cash Fund"
                                    value={amountDeducted}
                                    name='amountDeducted'
                                    onChange={onChange}
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
                        <Button sx={{ mt: '1rem', width: '100%' }} startIcon={<TbCashRegister />} size='medium' variant='contained' onClick={handleOpen}>Deduct from cash fund</Button>
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
                                        <Typography sx={{ color: 'green' }} id="modal-modal-title" variant="h5" component="span">
                                            Cash at Hand will be: &#8369;{newAmount}.00
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }} component='span' >
                                            <div>Comment: {comment && comment}</div>
                                        </Typography>
                                    </Box>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} variant='contained' endIcon={<TiCancel />} sx={{ width: '100%' }}>Cancel</Button>
                                <Button onClick={onSubmit} variant='contained' endIcon={<IoMdSend />} sx={{ width: '100%' }}>Continue</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                </FormGroup>
            </FormControl>

        </div>
    );
}
