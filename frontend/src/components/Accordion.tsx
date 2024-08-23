import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdExpandMore, MdMiscellaneousServices } from "react-icons/md";
import { TypographyStyled } from './Accordion.style';
import { Box, Button, FormControl, FormControlLabel, FormGroup, MenuItem, Modal, Switch, TextField } from '@mui/material';
import products from '../data/prodcut.json'
import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { inputSales, resetSales, SalesType } from '../features/sales/salesSlice';
import { FaCircleUser, FaJugDetergent } from "react-icons/fa6";
import { BiSolidDryer } from "react-icons/bi";
import { BiSolidWasher } from "react-icons/bi";
import { ImEnter } from "react-icons/im";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import { reset } from '../features/auth/authSlice';

type ProductType = {
    id: number;
    name: string;
    price: number;
    type: string;
}

function filterItems(arr: ProductType[], query: string): ProductType[] {
    return arr.filter((el) => el.type === query);
}

const field = [
    'id',
    'name',
    'price',
    'type'
] as const
type Field = typeof field[number];

const filterItem = (arr: ProductType[], query: string, field1: Field, count?: number): number => {
    const record = arr.filter((el: ProductType) => el[field1] === query);
    return record[0]['price']
}




export default function ControlledAccordions() {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [expanded, setExpanded] = useState<string | false>(false);

    const initializeData = {
        firstName: '',
        lastName: '',
        w1: false,
        w2: false,
        w3: false,
        w4: false,
        w5: false,
        d1: false,
        d2: false,
        d3: false,
        d4: false,
        d5: false,
        detergent: {
            name: '',
            count: 0,
        },
        fabCon: {
            name: '',
            count: 0,
        },
        extraDry: 0,
        folds: 0,
        spinDry: 0,
        totalSales: 0,
        userId: ''
    }


    const [formData, setFormData] = useState<SalesType>(initializeData)

    const { firstName, lastName, w1, w2, w3, w4, w5, d1, d2, d3, d4, d5, detergent, fabCon, extraDry, folds, spinDry, totalSales } = formData

    const [detergentProducts, setDetergentProducts] = useState<ProductType[]>(products)
    const [fabconProducts, setFabconProducts] = useState<ProductType[]>(products)

    useEffect(() => {
        // filter all detergent products from product.json from mounting
        const detergentProducts = filterItems(products, "detergent")
        setDetergentProducts(detergentProducts)

        // filter all fab con products from product.json from mounting
        const fabConProducts = filterItems(products, "fabcon")
        setFabconProducts(fabConProducts)

        // Get total sales
        const getTotalSales = async (data: SalesType) => {
            // Wash
            const washPrice = filterItem(products, 'Wash', 'name')
            const w1Price = w1 ? washPrice : 0
            const w2Price = w2 ? washPrice : 0
            const w3Price = w3 ? washPrice : 0
            const w4Price = w4 ? washPrice : 0
            const w5Price = w5 ? washPrice : 0

            // Dry
            const dryPrice = filterItem(products, 'Dry', 'name')
            const d1Price = d1 ? dryPrice : 0
            const d2Price = d2 ? dryPrice : 0
            const d3Price = d3 ? dryPrice : 0
            const d4Price = d4 ? dryPrice : 0
            const d5Price = d5 ? dryPrice : 0

            // Extra Dry
            const extraDryPrice = filterItem(products, 'Extra Dry', 'name')
            const extraDryPriceSales = extraDryPrice * extraDry

            // Folds
            const foldsPrice = filterItem(products, 'Folds', 'name')
            const foldsPriceSales = foldsPrice * folds

            // Spin Dry
            // const spinDryPrice = products.filter((prod) => prod.name === 'Spin Dry')
            const spinDryPrice = filterItem(products, 'Spin Dry', 'name')
            const spinDryPriceSales = spinDryPrice * spinDry

            // Detergent
            const breezePrice = filterItem(products, 'Breeze Detergent', 'name')
            const arielPrice = filterItem(products, 'Surf Detergent', 'name')
            const smartPrice = filterItem(products, 'Smart Detergent', 'name')
            const surfPrice = filterItem(products, 'Surf Detergent', 'name')
            const genericPrice = filterItem(products, 'Generic Bottled Detergent', 'name')

            let detergentPrice = 0
            switch (detergent.name) {
                case 'Breeze Detergent':
                    detergentPrice = breezePrice * detergent.count
                    break;
                case 'Ariel Detergent':
                    detergentPrice = arielPrice * detergent.count
                    break;
                case 'Surf Detergent':
                    detergentPrice = surfPrice * detergent.count
                    break;
                case 'Smart Detergent':
                    detergentPrice = smartPrice * detergent.count
                    break;
                case 'Generic Bottled Detergent':
                    detergentPrice = genericPrice * detergent.count
                    break;
                default:
                    detergentPrice = 0
                    break;
            }

            // Fabcon
            const smDownyFabconPrice = filterItem(products, 'Small Downy Fabcon', 'name')
            const bgDownyFabconPrice = filterItem(products, 'Big Downy Fabcon', 'name')
            const smSurfFabconPrice = filterItem(products, 'Small Surf Fabcon', 'name')
            const bgSurfFabconPrice = filterItem(products, 'Big Surf Fabcon', 'name')
            const genBottledFabconPrice = filterItem(products, 'Generic Bottled Fabcon', 'name')
            let FabconPrice = 0

            switch (fabCon.name) {
                case 'Small Downy Fabcon':
                    FabconPrice = smDownyFabconPrice * fabCon.count
                    break;
                case 'Big Downy Fabcon':
                    FabconPrice = bgDownyFabconPrice * fabCon.count
                    break;
                case 'Small Surf Fabcon':
                    FabconPrice = smSurfFabconPrice * fabCon.count
                    break;
                case 'Big Surf Fabcon':
                    FabconPrice = bgSurfFabconPrice * fabCon.count
                    break;
                case 'Generic Bottled Fabcon':
                    FabconPrice = genBottledFabconPrice * fabCon.count
                    break;
                default:
                    FabconPrice = 0
                    break;
            }

            data.totalSales = w1Price + w2Price + w3Price + w4Price + w5Price +
                d1Price + d2Price + d3Price + d4Price + d5Price + detergentPrice + FabconPrice + extraDryPriceSales + foldsPriceSales + spinDryPriceSales
            setFormData(data)
        }

        getTotalSales(formData)
        console.log('192 - ', formData)
    }, [d1, d2, d3, d4, d5, detergent.count, detergent.name, extraDry, fabCon.count, fabCon.name, folds, formData, spinDry, w1, w2, w3, w4, w5])


    // Accordion
    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    // Form    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { type, name, checked, value } = e.target
        setFormData((prevState) => {
            return { ...prevState, [name]: type === 'checkbox' ? checked : name === 'firstName' || name === 'lastName' ? value : parseInt(value) }
        })
    }

    const onChangeProdDetName = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        // split the name until period and get the next
        // or just create another function for number
        setFormData((prevState) => {
            return { ...prevState, [name]: { ...prevState.detergent, 'name': value } }
        })
    }

    const onChangeProdFabconName = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        // split the name until period and get the next
        // or just create another function for number
        setFormData((prevState) => {
            return { ...prevState, [name]: { ...prevState.fabCon, 'name': value } }
        })
    }

    const onChangeProdDetCount = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState) => {
            return { ...prevState, [name]: { ...prevState.detergent, 'count': parseInt(value) } }
        })
    }

    const onChangeProdFabconCount = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState) => {
            return { ...prevState, [name]: { ...prevState.fabCon, 'count': parseInt(value) } }
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

    const { isSuccess, sales } = useSelector((state: RootState) => state.sales)

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const salesInput = { ...formData }
        await dispatch(inputSales(salesInput))
        handleClose()
        dispatch(resetSales())
        setFormData(initializeData)
    }


    return (
        <div >
            <h2 style={{ color: 'green' }}> &#8369; {totalSales}.00 </h2>
            <FormControl component="fieldset" variant="standard" sx={{ minWidth: '100%' }}>
                <FormGroup sx={{ paddingBottom: '5rem' }} >
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <TypographyStyled >
                                <FaCircleUser /> Customer
                            </TypographyStyled>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
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
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <TypographyStyled> <BiSolidWasher /> Washers</TypographyStyled>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {/* You are currently not an owner */}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display='block'>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={w1} onChange={onChange} name="w1" />
                                        }
                                        label="W1"
                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={w2} onChange={onChange} name="w2" />
                                        }
                                        label="W2"
                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={w3} onChange={onChange} name="w3" />
                                        }
                                        label="W3"

                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={w4} onChange={onChange} name="w4" />
                                        }
                                        label="W4"
                                    />
                                </div>

                                <FormControlLabel
                                    control={
                                        <Switch checked={w5} onChange={onChange} name="w5" />
                                    }
                                    label="W5"
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"

                        >
                            <TypographyStyled >
                                <BiSolidDryer />    Dryers
                            </TypographyStyled>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {/* Filtering has been entirely disabled for whole web server */}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display='block'>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={d1} onChange={onChange} name="d1" />
                                        }
                                        label="D1"
                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={d2} onChange={onChange} name="d2" />
                                        }
                                        label="D2"

                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={d3} onChange={onChange} name="d3" />
                                        }
                                        label="D3"

                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch checked={d4} onChange={onChange} name="d4" />
                                        }
                                        label="D4"

                                    />
                                </div>

                                <FormControlLabel

                                    control={
                                        <Switch checked={d5} onChange={onChange} name="d5" />
                                    }
                                    label="D5"

                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <TypographyStyled> <FaJugDetergent /> Detergent & Fab Con</TypographyStyled>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ mb: '2rem' }}>
                                <TextField
                                    id="detergent"
                                    select
                                    label="Detergent"
                                    defaultValue=""
                                    helperText="Please select your detergent"
                                    value={detergent?.name}
                                    onChange={onChangeProdDetName}
                                    name='detergent'
                                    sx={{ mb: '0.75rem', mr: '0.5rem' }}
                                >
                                    {detergentProducts.map((product) => (
                                        <MenuItem key={product.id} value={product.name}>
                                            {product.name}: <span>&#8369;</span>{product.price}.00
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    type='number'
                                    id="countDet"
                                    label="Detergent Count"
                                    // defaultValue={detergent?.count}
                                    value={detergent?.count}
                                    name='detergent'
                                    onChange={onChangeProdDetCount}
                                    disabled={detergent?.name === '' ? true : false}
                                    sx={{ width: '12rem', }}

                                />

                            </Box>

                            <Box sx={{ mb: '1rem' }}>
                                <TextField
                                    id="fabcon"
                                    select
                                    label="Fab Con"
                                    defaultValue=""
                                    helperText="Please select your fab con"
                                    value={fabCon?.name}
                                    onChange={onChangeProdFabconName}
                                    name='fabCon'
                                    sx={{ mb: '0.75rem', mr: '0.75rem' }}
                                >
                                    {fabconProducts.map((product) => (
                                        <MenuItem key={product.id} value={product.name}>
                                            {product.name}: <span>&#8369;</span>{product.price}.00
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    type='number'
                                    id="countFab"
                                    label="Fab Con Count"
                                    // defaultValue={detergent?.count}
                                    value={fabCon?.count}
                                    name='fabCon'
                                    onChange={onChangeProdFabconCount}
                                    disabled={fabCon?.name === '' ? true : false}
                                    sx={{ width: '12rem', }}

                                />

                            </Box>

                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel5bh-content"
                            id="panel5bh-header"
                        >
                            <TypographyStyled> <MdMiscellaneousServices /> Additional Services</TypographyStyled>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ mb: '1rem' }}>
                                <TextField
                                    type='number'
                                    id="extraDry"
                                    label="Extra Dry Count"
                                    value={extraDry}
                                    name='extraDry'
                                    onChange={onChange}
                                    sx={{ width: '12rem', }}
                                />
                            </Box>
                            <Box sx={{ mb: '1rem' }}>
                                <TextField
                                    type='number'
                                    id="withFolds"
                                    label="Folds Count"
                                    value={folds}
                                    name='folds'
                                    onChange={onChange}
                                    sx={{ width: '12rem' }}
                                />
                            </Box>

                            <Box>
                                <TextField
                                    type='number'
                                    id="spinDry"
                                    label="Spin Dry Count"
                                    value={spinDry}
                                    name='spinDry'
                                    onChange={onChange}
                                    sx={{ width: '12rem' }}
                                />
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
                                    Total Sales: &#8369; {totalSales}.00
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div>Customer: {firstName}</div>
                                    <div>Washer: {w1 && 'W1'} {w2 && 'W2'} {w3 && 'W3'} {w4 && 'W4'} {w5 && 'W5'} </div>
                                    <div>Dryer: {d1 && 'D1'} {d2 && 'D2'} {d3 && 'D3'} {d4 && 'D4'} {d5 && 'D5'} </div>
                                    <div>Detergent: {detergent.name} {detergent.count} pcs </div>
                                    <div>Fabcon: {fabCon.name} {fabCon.count} pcs </div>
                                    <div>Additional Services: </div>
                                    <div style={{ marginLeft: '10px' }} > {spinDry > 0 ? `Spin Dry ${spinDry} times` : null} </div>
                                    <div style={{ marginLeft: '10px' }}> {extraDry > 0 ? `Extra Dry ${extraDry} times` : null} </div>
                                    <div style={{ marginLeft: '10px' }}> {folds > 0 ? `Folds ${folds} times` : null} </div>
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
