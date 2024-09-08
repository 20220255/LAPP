import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdExpandMore, MdMiscellaneousServices } from "react-icons/md";
import { Textarea, TypographyStyled } from './SalesAccordion.style';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, FormControlLabel, FormGroup, MenuItem, Slide, Switch, TextField } from '@mui/material';
import products from '../data/prodcut.json'
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { inputSales, resetSales } from '../features/sales/salesSlice';
import { FaCircleUser, FaJugDetergent } from "react-icons/fa6";
import { BiSolidDryer } from "react-icons/bi";
import { BiSolidWasher } from "react-icons/bi";
import { BiSolidCommentDetail } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import { ImEnter } from "react-icons/im";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { addCashFund, CashFundType } from '../features/cashFund/cashFundSlice';

export default function CashFundAccordion() {

    const dispatch = useDispatch<AppDispatch>()

    const [expanded, setExpanded] = useState<string | false>(false);

    const initializeData = {
        amountAdded: 0,
        comment: '',
    } as CashFundType


    const [formData, setFormData] = useState(initializeData)

    const { amountAdded, comment } = formData

    const { amount } = useSelector((state: RootState) => state.cashFund.cashFund)

    

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
            return { ...prevState, [name]: name === 'amountAdded' ? parseInt(value) : value }
        })
    }

    const [newAmount, setNewAmount] = useState(0)

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        console.log(amountAdded)

        console.log('amount', amount)
        setNewAmount(amount + amountAdded!)
    
    };
    const handleClose = () => setOpen(false);
    

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setNewAmount(amount + amountAdded!)    
        // console.log('newAmount - ', newAmount)
        const addedCashFund = { ...formData, amountAdded, amount: newAmount }
        dispatch(addCashFund(addedCashFund))
        handleClose()
        /** resets the sale state to blank */
        // dispatch(reset())
        /** Initializes the transaction form to blank afte entry */
        setFormData(initializeData)
    }

    return (
        <div >
            <h2 style={{ color: 'green' }}> &#8369; {amount ? amount : 0}.00 </h2>
            <FormControl component="fieldset" variant="standard" sx={{ minWidth: '100%' }}>
                <FormGroup sx={{ paddingBottom: '5rem' }} >
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <TypographyStyled >
                                <FaCircleUser /> Add to Cash Fund
                            </TypographyStyled>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ mb: '1rem' }}>
                                <TextField
                                    type='number'
                                    id="amountAdded"
                                    label="Add to Cash Fund"
                                    value={amountAdded}
                                    name='amountAdded'
                                    onChange={onChange}
                                    sx={{ width: '12rem', }}
                                />
                            </Box>
                        </AccordionDetails>

                            {/* <Box>
                                <Box paddingBlock={0.75} >
                                    <TextField
                                        required
                                        id="firstName"
                                        label="First Name"
                                        value={firstName}
                                        name='firstName'
                                        placeholder='Enter first name'
                                        onChange={onChange}
                                        sx={{ width: '280px' }}
                                    />
                                </Box>
                                <Box paddingBlock={0.75}>
                                    <TextField
                                        sx={{ width: '280px' }}
                                        id="lastName"
                                        label="Last Name"
                                        value={lastName}
                                        name='lastName'
                                        placeholder='Enter last name'
                                        onChange={onChange}
                                    />
                                </Box>
                            </Box> */}
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
                                        <Typography sx={{ color: 'green' }} id="modal-modal-title" variant="h5" component="span">
                                            Cash Fund at Hand: &#8369;{newAmount}.00
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }} component='span' >
                                            <div>Comment: {comment && comment}</div>
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
